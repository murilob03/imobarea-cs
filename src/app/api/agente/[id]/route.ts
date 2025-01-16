import prisma from '@/db'
import { NextResponse } from 'next/server'

// TODO provavelmente vai ter que mudar o endpoint
// Rota para associar um agente a uma imobiliária
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id

  try {
    const { imobiliariaId } = await req.json()

    const agente = await prisma.agente.update({
      where: { id },
      data: { imobiliaria: { connect: { id: imobiliariaId } } },
    })

    return NextResponse.json(agente, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
