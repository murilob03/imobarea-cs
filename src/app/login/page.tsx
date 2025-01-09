"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { ArrowLeft } from "lucide-react";
import DropdownButton from "@/components/DropdownButton";
import InputField from "@/components/InputField";

export default function SignIn() {
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const cellphone = (form.elements.namedItem("cellphone") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const result = await signIn("credentials", {
      cellphone,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid cellphone or password");
    } else {
      window.location.href = "/dashboard"; // Redirect after login
    }
  };

  return (
    <div className="flex flex-col p-[64px_24px]">
      <div className="flex flex-col gap-px-32">
        <a href="/">
          <ArrowLeft size={32} color="black"></ArrowLeft>
        </a>
        <h1 className="font-bold text-2xl">Entrar com número de celular</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form
          className="flex flex-col h-screen gap-px-100"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-px-64">
            <div className="flex flex-col gap-px-16">
              <p>Por favor, adicione corretamente o <span className="font-bold">número</span>: </p>
              <div className="flex gap-px-18">
                <DropdownButton></DropdownButton>
                <InputField
                label=""
                type="text"
                name="cellphone"
                placeholder=""
                required
                />
              </div>
            </div>

            <div className="flex flex-col gap-px-32">
              <InputField
                label="Senha: "
                type="password"
                name="password"
                placeholder=""
                required
              />
            </div>
          </div>
          <button
            className="flex w-full justify-center items-center gap-px-64 self-stretch p-[26px_32px] bg-marrom rounded-full font-bold text-white"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-px-80 items-center">
        <p className="">
          Não possui uma conta?{" "}
          <a className="text-marrom" href="/cadastro">
            Cadastro
          </a>
        </p>
      </div>
    </div>
  );
}
