import Image from 'next/image'
import CustomButton from '@/components/CustomButton'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/inicio')
  }

  return (
    <div className="flex h-screen flex-col items-center self-stretch p-[64px_24px] justify-between flex-shrink-0">
      <div className="flex flex-col gap-px-100 items-center self-stretch">
        <Image
          src="/imobilearea_logo.svg"
          alt="imobilearea logo"
          width={249.74}
          height={123}
          priority
        />
        <div className="flex flex-col gap-px-32">
          <CustomButton href="/login" text="Continue com o número de celular" />
          <a
            className="flex justify-center items-center gap-2.5 self-stretch p-[26px_32px] border border-solid border-black rounded-full font-bold"
            href=""
          >
            Login com Google
          </a>
          <a
            className="flex justify-center items-center gap-2.5 self-stretch p-[26px_32px] border border-solid border-black rounded-full font-bold"
            href=""
          >
            Login com e-mail
          </a>
        </div>
      </div>
      <p className="">
        Não possui uma conta?{' '}
        <a className="text-marrom" href="/cadastro">
          Cadastro
        </a>
      </p>
    </div>
  )
}
