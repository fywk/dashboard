import type { PrettierConfig as SortImportsConfig } from "@ianvs/prettier-plugin-sort-imports";
import type { Config as PrettierConfig } from "prettier";
import type { PluginOptions as TailwindCSSPluginOptions } from "prettier-plugin-tailwindcss";

const config: PrettierConfig & SortImportsConfig & TailwindCSSPluginOptions = {
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
  tailwindStylesheet: "./app/globals.css",
};

export default config;
