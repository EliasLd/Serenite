/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sereniteBg: "#C3BEF7",
        sereniteAccent: "#EDD382",
        sereniteCard: "#EDE6F2",
        sereniteText: "#074F57",
        sereniteFeature: "#BFDBF7",
        sereniteDetail: "#6D597A",
        sereniteTextLight: "#FFF",
      },
      fontFamily: {
        dmmono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
