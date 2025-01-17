import prisma from '@/db'
import { ImovelCriar } from '@/types/imovel'
import { NextRequest, NextResponse } from 'next/server'

// Rota para criar um imóvel
export async function POST(req: NextRequest) {
  try {
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
