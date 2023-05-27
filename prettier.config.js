module.exports = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^[@/]/(.*)$",
    "^[./]",
    "<THIRD_PARTY_TS_TYPES>",
    "<TS_TYPES>^[@/]/(.*)$",
    "<TS_TYPES>^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  tailwindAttributes: ["customClasses"],
  tailwindFunctions: ["clsx"],
};
