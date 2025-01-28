import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route' // Ajuste o caminho conforme necessário
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    // Obtendo a sessão do usuário
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const user = session.user

    if (!user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    if (user.role !== 'IMOBILIARIA') {
      return NextResponse.json(
        { message: 'Usuário não é uma imobiliária' },
        { status: 403 }
      )
    }

    const imobiliaria = await prisma.imobiliaria.findUnique({
      where: {
        id: user.id,
      },
    })

    if (!imobiliaria) {
      return NextResponse.json(
        { message: 'Imobiliária não encontrada' },
        { status: 404 }
      )
    }

    const imoveis = await prisma.imovel.findMany({
      where: {
        imobiliariaId: imobiliaria.id,
      },
      include: {
        endereco: true,
      },
    })

    return NextResponse.json(imoveis, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar imóveis' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
