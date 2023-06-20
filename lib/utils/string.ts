export function pluralize(
  word: string,
  count?: number,
  withCount = false,
  customPlural?: string
): string {
  let output: string;

  if (count === 1) {
    output = word;
  } else {
    if (customPlural) {
      output = customPlural;
    } else {
      if (word.endsWith("y")) {
        output = word.slice(0, -1) + "ies";
      } else if (
        word.endsWith("s") ||
        word.endsWith("x") ||
        word.endsWith("z") ||
        word.endsWith("sh") ||
        word.endsWith("ch")
      ) {
        output = word + "es";
      } else {
        output = word + "s";
      }
    }
  }

  return withCount ? `${count} ${output}` : output;
}
