import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bege: "#F6F3EC",
        marrom: "#9D6F4D"
      },
      spacing: {
        'px-32': '32px',
        'px-100': '100px'
      },
    },
  },
  plugins: [],
} satisfies Config;
