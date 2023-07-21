/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig & import("prettier-plugin-tailwindcss")} */
module.exports = {
  printWidth: 100,
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  // @ianvs/prettier-plugin-sort-imports
  importOrder: [
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^[@/]/(.*)$",
    "",
    "^[./]",
    "",
    "<TYPES>",
    "",
    "<TYPES>^[@/]/(.*)$",
    "",
    "<TYPES>^[./]",
  ],
  // prettier-plugin-tailwindcss
  tailwindAttributes: ["customClasses"],
  tailwindFunctions: ["clsx"],
};
