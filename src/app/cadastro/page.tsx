import Image from "next/image";

export default function AccountType() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#FAF5F0] p-6">
      <div className="mt-[64px]">
        <h1 className="text-2xl font-bold mb-[48px]">SEJA BEM-VINDO!</h1>
        <p className="text-base mb-[32px]">Crie sua conta de maneira rápida e fácil!</p>
        <p className="mb-4 font-bold">Selecione o tipo de conta que deseja criar:</p>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <label className="flex items-center gap-3 p-4 rounded-lg ">
          <input
            type="radio"
            name="accountType"
            className="appearance-none h-[30px] w-[30px] bg-[#E9D9C9] rounded-md checked:bg-[#8b5e3cd7] focus:outline-none cursor-pointer"
          />
          <span className="text-xl font-semibold">Cliente</span>
        </label>
        <label className="flex items-center gap-3 p-4 rounded-lg ">
          <input
            type="radio"
            name="accountType"
            className="appearance-none h-[30px] w-[30px] bg-[#E9D9C9] rounded-md checked:bg-[#8b5e3cd7] focus:outline-none cursor-pointer"
          />
          <span className="text-xl font-semibold">Imobiliária</span>
        </label>
        <label className="flex items-center gap-3 p-4 rounded-lg ">
          <input
            type="radio"
            name="accountType"
            className="appearance-none h-[30px] w-[30px] bg-[#E9D9C9] rounded-md checked:bg-[#8b5e3cd7] focus:outline-none cursor-pointer"
          />
          <span className="text-xl font-semibold">Agente Imobiliário</span>
        </label>
      </div >
      <div className="mt-auto w-full flex justify-center">
          <button className="text-base p-4 h-[71px] w-[344px] max-w-sm bg-[#8B5E3C] text-white font-bold rounded-full">
            Continuar
          </button>
        </div>
    </div>
  );
}
