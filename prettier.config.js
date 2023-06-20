module.exports = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  // @trivago/prettier-plugin-sort-imports
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
  // prettier-plugin-tailwindcss
  tailwindAttributes: ["customClasses"],
  tailwindFunctions: ["clsx"],
};
