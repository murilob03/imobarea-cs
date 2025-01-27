import prisma from '@/db'
import { ImovelCriar } from '@/types/imovel'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { ImovelLer } from '@/types/imovel'

// Rota para recuperar imóveis
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let whereClause: Record<string, any> = { escondido: false }

  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')

  let notHiddenImoveis: ImovelLer[] = []
  if (query) {
    const [field, value] = query.split(':')

    if (!field || !value) {
      return NextResponse.json(
        { error: 'Invalid query format, expected "field:value"' },
        { status: 400 }
      )
    }

    whereClause[field] = value
  }

  notHiddenImoveis = await prisma.imovel.findMany({
    where: whereClause,
    include: {
      endereco: true,
      agente: { include: { user: true } },
      imobiliaria: { include: { user: true } },
    },
  })

  let hiddenImoveis: ImovelLer[] = []
  whereClause['escondido'] = true
  if (session.user.role === 'IMOBILIARIA') {
    whereClause['imobiliariaId'] = session.user.id
  } else if (session.user.role === 'AGENTE') {
    whereClause['agenteId'] = session.user.id
  }

  if (session.user.role === 'IMOBILIARIA' || session.user.role === 'AGENTE') {
    hiddenImoveis = await prisma.imovel.findMany({
      where: whereClause,
      include: {
        endereco: true,
        agente: true,
        imobiliaria: true,
      },
    })
  }

  const imoveis = notHiddenImoveis.concat(hiddenImoveis)

  //   const imoveisTipados: ImovelLer[] = imoveis.map((imovel) => {
  //     return {
  //       id: imovel.id,
  //       nome: imovel.nome,
  //       areaPrivada: imovel.areaPrivada,
  //       numQuartos: imovel.numQuartos,
  //       numVagas: imovel.numVagas,
  //       tipo: imovel.tipo,
  //       endereco: imovel.endereco,
  //       imobiliariaId: imovel.imobiliariaId,
  //       agenteId: imovel.agenteId,
  //     }
  //   })

  return NextResponse.json(notHiddenImoveis.concat(hiddenImoveis))
}

// Rota para criar um imóvel
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (
      !session ||
      !(session.user.role === 'IMOBILIARIA' || session.user.role === 'AGENTE')
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      // Talvez seja interessante no futuro adicionar algumas validações por aqui
      // como por exemplo, se o id do usuário logado é o mesmo que o id da imobiliária ou agente
    }

    const imovel: ImovelCriar = await req.json()

    if (imovel.agenteId) {
      const agente = await prisma.agente.findUnique({
        where: { id: imovel.agenteId },
      })

      if (!agente) {
        return NextResponse.json(
          { error: 'Agente não encontrado' },
          { status: 404 }
        )
      }

      if (agente.imobiliariaId !== imovel.imobiliariaId) {
        return NextResponse.json(
          { error: 'Agente não pertence a imobiliária' },
          { status: 400 }
        )
      }
    }

    console.log(imovel)

    const novoImovel = await prisma.imovel.create({
      data: {
        nome: imovel.nome,
        areaPrivada: imovel.areaPrivada,
        numQuartos: imovel.numQuartos,
        numVagas: imovel.numVagas,
        tipo: imovel.tipo,
        endereco: {
          create: imovel.endereco,
        },
        imobiliaria: { connect: { id: imovel.imobiliariaId } },
      },
    })

    return NextResponse.json(novoImovel, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
