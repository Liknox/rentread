/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         colors: {
            primary: "var(--color-primary)",
            lightPrimary: "var(--color-light-primary)",
            dark: "var(--color-dark)",
            accent: "var(--color-accent)",
            gray: "var(--color-gray)",
            darkGray: "var(--color-dark-gray)",
            white: "var(--color-white)",
         },
         boxShadow: {
            "inset": "0 4px 8px var(--color-shadow)"
         }
      },
   },
   plugins: [],
}
