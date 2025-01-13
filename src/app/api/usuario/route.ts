import { NextResponse } from 'next/server'
import prisma from '@/db'
import { UserCriar } from '@/types'
import bcrypt from 'bcrypt'

// Handle POST requests
export async function POST(req: Request) {
  try {
    const novo_usuario: UserCriar = await req.json()
    novo_usuario.password = await bcrypt.hash(novo_usuario.password, 10)

    const usuario = await prisma.user.create({
      data: novo_usuario,
      select: {
        id: true,
        name: true,
        email: true,
        cellphone: true,
        role: true,
        cpf: true,
        creci: true,
        cnpj: true,
      },
    })

    return NextResponse.json(usuario, { status: 201 })
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
