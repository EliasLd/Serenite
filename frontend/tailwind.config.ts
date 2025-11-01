/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sereniteBg: "#000000",
        sereniteAccent: "#008001",
        sereniteCard: "#1E1E1E",
        sereniteText: "#EEEEEE",
      },
      fontFamily: {
        dmmono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
