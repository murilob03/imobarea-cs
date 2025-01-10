import React from "react";

interface InputFieldProps {
  label?: string; // Tornar opcional
  type: string;
  name: string;
  placeholder: string;
  required?: boolean; // Tornar opcional
}

export default function InputField({
  label,
  type,
  name,
  placeholder,
  required,
}:InputFieldProps) {
  return (
    <div className="flex flex-col w-full gap-px-16">
      {label && <p className="font-bold">{label}</p>}
      <input
        className="flex border w-full bg-bege border-solid border-black rounded-lg p-[18px_8px]"
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
