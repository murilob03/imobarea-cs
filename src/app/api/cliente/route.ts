import { NextResponse } from 'next/server'
import prisma from '@/db'
import { ClienteLer } from '@/types/cliente'

// Handle GET requests
export async function GET() {
  try {
    const clientes: ClienteLer[] = await prisma.user.findMany({
      where: { role: 'CLIENTE' },
        select: {
            id: true,
            nome: true,
            email: true,
            cpf: true,
            celular: true,
            dataCriacao: true,
        },
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

// Handle unsupported HTTP methods
export function HEAD() {
  return NextResponse.json(
    { error: 'Method Not Allowed' },
    { status: 405, headers: { Allow: 'GET, POST' } }
  )
}
