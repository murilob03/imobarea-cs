import { NextResponse } from 'next/server'
import prisma from '@/db'
import { UserCriar, UserLer, UserRole } from '@/types'
import bcrypt from 'bcrypt'

// Handle GET requests
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    // const role = searchParams.get('role')
    const query = searchParams.get('query')

    // if (!role || !query) {
    if (!query) {
      return NextResponse.json(
        { error: 'Missing query parameters' },
        { status: 400 }
      )
    }

    const [field, value] = query.split(':')

    if (!field || !value) {
      return NextResponse.json(
        { error: 'Invalid query format, expected "field:value"' },
        { status: 400 }
      )
    }

    const usuarios = await prisma.user.findMany({
      where: {
        [field]: value,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cellphone: true,
        role: true,
        cpf: true,
        creci: true,
        cnpj: true,
        createdAt: true,
      },
    })

    const usuarios_ler: UserLer[] = usuarios.map((usuario) => ({
      ...usuario,
      role: usuario.role as UserRole,
    }))

    return NextResponse.json(usuarios_ler)
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
