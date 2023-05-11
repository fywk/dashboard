/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
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
      fontFamily: {
        oxanium: ["var(--font-oxanium)", ...defaultTheme.fontFamily.mono],
      },
      screens: {
        xs: "475px",
      },
      spacing: {
        "15px": "0.9375rem",
        4.5: "1.125rem", // 18px
        5.5: "1.375rem", // 22px
        6.5: "1.625rem", // 26px
        7.5: "1.875rem", // 30px
        8.5: "2.125rem", // 34px
        9.5: "2.375rem", // 38px
        10.5: "2.625rem", // 42px
      },
    },
  },
  plugins: [],
};
