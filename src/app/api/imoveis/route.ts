import prisma from '@/db'
import { ImovelCriar } from '@/types/imovel'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/authOptions'
import { ImovelLer } from '@/types/imovel'

// Rota para recuperar imóveis
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const whereClause: Record<string, any> = { escondido: false }

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
        valor: imovel.valor,
        areaPrivada: imovel.areaPrivada,
        numQuartos: imovel.numQuartos,
        numVagas: imovel.numVagas,
        tipo: imovel.tipo,
        tipoOferta: imovel.tipoOferta,
        endereco: {
          create: imovel.endereco,
        },
        imobiliaria: { connect: { id: imovel.imobiliariaId } },
        agente: imovel.agenteId ? { connect: { id: imovel.agenteId } } : undefined,
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

// Rota para excluir um imóvel
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!session || !(session.user.role === 'IMOBILIARIA')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json(
        { error: 'Id do imóvel não informado' },
        { status: 400 }
      )
    }

    const imovel = await prisma.imovel.findUnique({
      where: { id },
    })

    if (!imovel) {
      return NextResponse.json(
        { error: 'Imóvel não encontrado' },
        { status: 404 }
      )
    }

    if (imovel.imobiliariaId !== session.user.id) {
      return NextResponse.json(
        // { error: 'Unauthorized! O imóvel não pertence a sua imobiliária!' },
        { error: `Unauthorized! ${imovel.imobiliariaId} | ${session.user.id}` },
        { status: 401 }
      )
    }

    await prisma.imovel.delete({
      where: { id },
    })

    const imovelDeletado = await prisma.imovel.findUnique({
      where: { id },
    })

    if (imovelDeletado) {
      return NextResponse.json(
        { error: 'Erro ao deletar imóvel' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Imóvel deletado com sucesso' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
