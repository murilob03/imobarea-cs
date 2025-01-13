import { NextResponse } from 'next/server'
import prisma from '@/db'
import { ClienteCriar, ClienteLer } from '@/types/cliente'
import bcrypt from 'bcrypt'

// Handle GET requests
export async function GET() {
  try {
    const clientes = await prisma.user.findMany({
      where: { role: 'CLIENTE' },
    })
    return NextResponse.json(clientes, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// Handle POST requests
export async function POST(req: Request) {
  try {
    const novo_cliente: ClienteCriar = await req.json()
    novo_cliente.senha = await bcrypt.hash(novo_cliente.senha, 10)

    const cliente: ClienteLer = await prisma.user.create({
      data: novo_cliente,
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        celular: true,
      },
    })

    return NextResponse.json(cliente, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// Handle unsupported HTTP methods
export function HEAD() {
  return NextResponse.json(
    { error: 'Method Not Allowed' },
    { status: 405, headers: { Allow: 'GET, POST' } }
  )
}
