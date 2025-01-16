import prisma from '@/db'
import { AgenteLer } from '@/types/usuarios'
import { NextResponse } from 'next/server'

// Rota para buscar um agente pelo seu CRECI
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  try {
    const creci = searchParams.get('creci')

    if (!creci) {
      return NextResponse.json(
        { error: 'Missing creci parameter' },
        { status: 400 }
      )
    }

    const agente = await prisma.agente.findFirst({
      where: {
        creci: creci,
      },
      include: {
        imobiliaria: true,
        user: true,
      },
    })

    if (!agente) {
      return NextResponse.json({ error: 'Agente not found' }, { status: 404 })
    }

    const agente_typed: AgenteLer = {
      id: agente.user.id,
      name: agente.user.name,
      email: agente.user.email,
      cpf: agente.cpf,
      cellphone: agente.user.cellphone,
      creci: agente.creci,
      imobiliariaId: agente.imobiliariaId,
      createdAt: agente.user.createdAt,
    }

    return NextResponse.json(agente_typed)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
