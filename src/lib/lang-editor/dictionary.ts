import { closestKeys } from "./suggestions";
import type { DictionaryEntry, ResolvedToken, ResolveResult, SymbolId, Token } from "./types";

// Sample entries, extend with the full dictionary
const ENTRIES: DictionaryEntry[] = [
  { key: "a", symbol: "circle" },
  { key: "b", symbol: "square" },
  { key: "j", symbol: "triangle" },
  { key: "m", symbol: "diamond" },
  { key: "#on", symbol: "triangle" },
  { key: "#ou", symbol: "diamond" },
  { key: "#in", symbol: "circle" },
];

const dictionary = new Map<string, SymbolId>(
  ENTRIES.map((entry) => [entry.key, entry.symbol])
);

export const dictionarySize = dictionary.size;

export function resolveTokens(tokens: Token[]): ResolveResult {
  const items: ResolvedToken[] = [];
  const errors: ResolveResult["errors"] = [];
  const knownKeys = Array.from(dictionary.keys());

  for (const token of tokens) {
    const symbol = dictionary.get(token.key) ?? null;
    items.push({ token, symbol });

    if (!symbol) {
      errors.push({
        token,
        suggestions: closestKeys(token.key, knownKeys),
      });
    }
  }

  return { items, errors };
}
