import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center self-stretch p-[64px_24px] justify-between flex-shrink-0">
      <div className="flex flex-col gap-px-100 items-center self-stretch">
        <Image
          // className="dark:invert"
          src="/imobilearea_logo.svg"
          alt="imobilearea logo"
          width={249.74}
          height={123}
          priority
        />
        <div className="flex flex-col gap-px-32">
          {/* deixar o _blank por enquanto apenas para testes */}
          <a
            className="flex justify-center items-center gap-2.5 self-stretch p-[26px_32px] bg-marrom rounded-full"
            href="/login"
            target="_blank"
          >
            Continue com o número de celular
          </a>
          <a
            className="flex justify-center items-center gap-2.5 self-stretch p-[26px_32px] border border-solid border-black rounded-full"
            href="/login"
            target="_blank"
          >
            Login com Google
          </a>
          <a
            className="flex justify-center items-center gap-2.5 self-stretch p-[26px_32px] border border-solid border-black rounded-full"
            href="/login"
            target="_blank"
          >
            Login com e-mail
          </a>
        </div>
      </div>
      <p className="">
        Não possui uma conta?{" "}
        <a className="text-marrom" href="/cadastro">
          Cadastro
        </a>
      </p>
    </div>
  );
}
