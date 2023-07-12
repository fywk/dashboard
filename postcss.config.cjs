module.exports = {
  plugins: {
    tailwindcss: {},
    "postcss-pxtorem": {
      propList: [
        "font",
        "font-size",
        "letter-spacing",
        "line-height",
        "margin-top",
        "margin-right",
        "margin-bottom",
        "margin-left",
        "padding-top",
        "padding-right",
        "padding-bottom",
        "padding-left",
      ],
    },
    autoprefixer: {},
  },
};
