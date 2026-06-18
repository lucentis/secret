
import { closestKeys } from "./suggestions";
import type { DictionaryEntry, ResolvedToken, ResolveResult, SymbolId, Token } from "./types";

// Vowels: keys with a dedicated keyboard key, no # prefix
// Consonants: same, single keyboard letters
// #ch, #gn, #in, #ou, #en: sounds with no dedicated key, written with #
const ENTRIES: DictionaryEntry[] = [
  { key: "a", symbol: "\u03b1" }, // alpha
  { key: "e", symbol: "\u03b5" }, // epsilon
  { key: "i", symbol: "\u03b9" }, // iota
  { key: "o", symbol: "\u03bf" }, // omicron
  { key: "u", symbol: "\u03c5" }, // upsilon
  { key: "y", symbol: "\u03b3" }, // gamma
  { key: "\u00e9", symbol: "\u03b7" }, // eta, for é
  { key: "p", symbol: "\u03c0" }, // pi
  { key: "k", symbol: "\u03ba" }, // kappa
  { key: "t", symbol: "\u03c4" }, // tau
  { key: "f", symbol: "\u03c6" }, // phi
  { key: "v", symbol: "\u03b2" }, // beta
  { key: "d", symbol: "\u03b4" }, // delta
  { key: "b", symbol: "\u03c8" }, // psi
  { key: "s", symbol: "\u03c3" }, // sigma
  { key: "z", symbol: "\u03b6" }, // zeta
  { key: "l", symbol: "\u03bb" }, // lambda
  { key: "r", symbol: "\u03c1" }, // rho
  { key: "m", symbol: "\u03bc" }, // mu
  { key: "n", symbol: "\u043d" }, // Cyrillic en, the 24 Greek letters are now used up
  { key: "j", symbol: "\u0436" }, // Cyrillic zhe, close to the French j sound
  { key: "w", symbol: "\u045e" }, // Cyrillic short u, used for /w/ in Belarusian
  { key: "#ch", symbol: "\u03c7" }, // chi
  { key: "#gn", symbol: "\u03be" }, // xi
  { key: "#in", symbol: "\u03bd" }, // nu
  { key: "#ou", symbol: "\u03c9" }, // omega
  { key: "#en", symbol: "\u03b8" }, // theta
  { key: "#on", symbol: "\u03d1" }, // ϑ
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