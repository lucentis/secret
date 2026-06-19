import { closestKeys } from "./suggestions";
import type { DictionaryEntry, ResolvedToken, ResolveResult, SymbolId, Token } from "./types";
import { useLangEditor } from "@/composables/useLangEditor";
import { dictionaries } from "./dictionaries";
// Vowels: keys with a dedicated keyboard key, no # prefix
// Consonants: same, single keyboard letters
// #ch, #gn, #in, #ou, #en: sounds with no dedicated key, written with #
const { dictionaryType } = useLangEditor()

const dictionaryMap = new Map<string, SymbolId>(
  dictionaries[dictionaryType.value].map((entry: DictionaryEntry) => [entry.key, entry.symbol])
);

export const dictionarySize = dictionaryMap.size;

export function resolveTokens(tokens: Token[]): ResolveResult {
  const items: ResolvedToken[] = [];
  const errors: ResolveResult["errors"] = [];
  const knownKeys = Array.from(dictionaryMap.keys());

  for (const token of tokens) {
    const symbol = dictionaryMap.get(token.key) ?? null;
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
