import type { Token } from "./types";

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  const lines = source.split("\n");

  lines.forEach((line, lineIndex) => {
    let col = 0
    
    while (col < line.length) {
      const currentChar = line[col]

      if (currentChar === "#") {
        const token = line.slice(col, col+3)
        tokens.push({
          raw: token,
          key: token.toLowerCase(),
          line: lineIndex + 1,
          column: col + 1,
          length: 3
        })

        console.log(tokens);
        col += 3
        continue
      }

      tokens.push({
          raw: currentChar,
          key: currentChar.toLowerCase(),
          line: lineIndex + 1,
          column: col + 1,
          length: 1,
        });
      col++
    }
    
  })

  return tokens
}
