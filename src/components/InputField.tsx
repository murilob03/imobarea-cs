import React from "react";

export default function InputField({
  label,
  type,
  name,
  placeholder,
  required,
}) {
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
