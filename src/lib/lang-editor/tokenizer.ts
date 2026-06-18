import type { Token } from "./types";

const LETTER = /[a-zA-Z\u00e9\u00c9]/; // includes é / É

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  const lines = source.split("\n");
  let group = -1;

  lines.forEach((line, lineIndex) => {
    let col = 0;
    let atWordStart = true;

    while (col < line.length) {
      const char = line[col];

      if (char === "#") {
        if (atWordStart) {
          group++;
          atWordStart = false;
        }
        const start = col;
        const limit = Math.min(col + 3, line.length); // # plus exactly 2 letters
        let end = col + 1;
        while (end < limit && LETTER.test(line[end])) {
          end++;
        }
        const raw = line.slice(start, end);
        tokens.push({
          raw,
          key: raw.toLowerCase(),
          line: lineIndex + 1,
          column: start + 1,
          length: raw.length,
          group,
        });
        col = end;
        continue;
      }

      if (LETTER.test(char)) {
        if (atWordStart) {
          group++;
          atWordStart = false;
        }
        tokens.push({
          raw: char,
          key: char.toLowerCase(),
          line: lineIndex + 1,
          column: col + 1,
          length: 1,
          group,
        });
        col++;
        continue;
      }

      // Space, apostrophe, punctuation: separator, not a token
      atWordStart = true;
      col++;
    }
  });

  return tokens;
}
