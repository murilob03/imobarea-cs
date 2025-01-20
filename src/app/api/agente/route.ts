import prisma from '@/db'
import { AgenteLer } from '@/types/usuarios'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

// Rota para buscar um agente pelo seu CRECI
export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  const { searchParams } = new URL(req.url)
  try {
    const creci = searchParams.get('creci')

    if (!creci) {
      // verifica se é uma imobiliária
      if (!session || !(session.user.role === 'IMOBILIARIA')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      // recupera o id da imobiliária
      const imobiliariaId = session.user.id

      // busca todos os agentes da imobiliária
      const agentes = await prisma.agente.findMany({
        where: {
          imobiliariaId: imobiliariaId,
        },
        include: {
          user: true,
        },
      })

      const agentes_typed: AgenteLer[] = agentes.map((agente) => ({
        id: agente.user.id,
        name: agente.user.name,
        email: agente.user.email,
        cpf: agente.cpf,
        cellphone: agente.user.cellphone,
        creci: agente.creci,
        imobiliariaId: agente.imobiliariaId,
        createdAt: agente.user.createdAt,
      }))

      return NextResponse.json(agentes_typed)
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
