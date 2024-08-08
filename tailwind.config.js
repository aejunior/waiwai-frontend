/** @type {import('tailwindcss').Config} */
export default {
    safelist: [
      // Adicione aqui as classes dinâmicas
      {
        pattern: /(bg|text|ring)-(yellow|blue|purple|red|green|pink|indigo)-(50|700|800|600\/10|600\/20|700\/10)/,
      },
    ], content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'),
  ],
}

