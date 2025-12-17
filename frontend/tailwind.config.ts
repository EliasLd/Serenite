/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sereniteBg: "#F9F0EB",
        sereniteAccent: "#F0BC74",
        sereniteCard: "#786F45",
        sereniteText: "#373E46",
        sereniteFeature: "#BFDBF7",
        sereniteDetail: "#6D597A",
        sereniteTextLight: "#FFF",
      },
      fontFamily: {
        mulish: ['Mulish'],
        roboto: ['Roboto'],
      },
    },
  },
  plugins: [],
};
