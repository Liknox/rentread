/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         colors: {
            primary: "var(--color-primary)",
            dark: "var(--color-dark)",
            accent: "var(--color-accent)",
            gray: "var(--color-gray)",
         },
      },
   },
   plugins: [],
}
