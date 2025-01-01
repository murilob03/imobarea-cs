"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

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
    <div>
      <h1>Sign In</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="cellphone" placeholder="Cellphone" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
