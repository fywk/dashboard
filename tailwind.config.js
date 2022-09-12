/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  dark: "",
  theme: {
    extend: {
      borderWidth: {
        1.5: "1.5px",
        3: "3px",
      },
      colors: {
        gray: { 950: "#0e0e10", ...colors.zinc },
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      },
      opacity: {
        85: ".85",
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        7.5: "1.825rem",
        8.5: "2.125rem",
        9.5: "2.375rem",
        10.5: "2.625rem",
      },
    },
  },
  plugins: [],
};
