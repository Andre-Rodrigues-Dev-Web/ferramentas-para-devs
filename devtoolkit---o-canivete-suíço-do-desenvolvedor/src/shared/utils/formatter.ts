import * as prettier from "prettier/standalone";
import * as parserBabel from "prettier/plugins/babel";
import * as parserHtml from "prettier/plugins/html";
import * as parserEstree from "prettier/plugins/estree";

export type ScriptLanguage =
  | "typescript"
  | "babel"
  | "markdown"
  | "html"
  | "css"
  | "json"
  | "angular"
  | "vue";

/**
 * Formats code using Prettier Standalone.
 * Fallbacks to basic indentation if Prettier is not supported for the language (e.g. Kotlin/Dart manual logic).
 */
export const formatCode = async (
  code: string,
  language: ScriptLanguage | "kotlin" | "dart",
): Promise<string> => {
  try {
    if (language === "kotlin") {
      return formatKotlin(code);
    }
    if (language === "dart") {
      return formatDart(code);
    }

    let parser = "babel";
    let plugins: any[] = [parserBabel, parserEstree];

    if (language === "html" || language === "vue" || language === "angular") {
      parser = language === "angular" ? "html" : language;
      if (language === "vue") parser = "vue";
      plugins = [parserHtml, parserBabel, parserEstree];
    }

    const formatted = await prettier.format(code, {
      parser,
      plugins,
      printWidth: 80,
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      trailingComma: "all",
    });

    return formatted;
  } catch (error) {
    console.warn("Prettier format failed, returning original code", error);
    return code;
  }
};

function formatKotlin(code: string): string {
  return indentBasedOnBraces(code);
}

function formatDart(code: string): string {
  return indentBasedOnBraces(code);
}

function indentBasedOnBraces(code: string): string {
  const lines = code
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  let indentLevel = 0;
  const indentString = "  "; // 2 spaces

  return lines
    .map((line) => {
      // Decrease indent if line starts with closing brace
      if (
        line.startsWith("}") ||
        line.startsWith("]") ||
        line.startsWith(")")
      ) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indentedLine = indentString.repeat(indentLevel) + line;

      // Increase indent if line ends with opening brace
      if (line.endsWith("{") || line.endsWith("[") || line.endsWith("(")) {
        indentLevel++;
      }

      return indentedLine;
    })
    .join("\n");
}
