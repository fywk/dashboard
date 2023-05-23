/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "<THIRD_PARTY_TS_TYPES>",
    "<TS_TYPES>^[./]",
    "<THIRD_PARTY_MODULES>",
    "^[@/]/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};
