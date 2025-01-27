import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import prisma from '@/db'

// Adicionar ou remover favoritos
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { imovelId } = await req.json()

  if (!imovelId) {
    return NextResponse.json(
      { error: 'Imóvel não especificado' },
      { status: 400 }
    )
  }

  const existingFavorito = await prisma.Favorito.findUnique({
    where: {
      userId_imovelId: {
        userId: session.user.id,
        imovelId,
      },
    },
  })

  if (existingFavorito) {
    await prisma.Favorito.delete({
      where: {
        id: existingFavorito.id,
      },
    })
    return NextResponse.json({ message: 'Favorito removido' }, { status: 200 })
  } else {
    const favorito = await prisma.Favorito.create({
      data: {
        userId: session.user.id,
        imovelId,
      },
    })
    return NextResponse.json(favorito, { status: 201 })
  }
}

// Listar favoritos
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Consulta os imóveis favoritos do usuário logado
  const favoritosImoveis = await prisma.Favorito.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      imovel: {
        include: {
          endereco: true,
          imobiliaria: { include: { user: true } },
          agente: { include: { user: true } },
        },
      },
    },
  })

  return NextResponse.json(
    favoritosImoveis.map((fav) => fav.imovel),
    { status: 200 }
  )
}
