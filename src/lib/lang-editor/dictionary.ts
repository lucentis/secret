import { closestKeys } from "./suggestions";
import type { DictionaryEntry, DictionaryType, ResolvedToken, ResolveResult, SymbolId, Token } from "./types";
import { dictionaries } from "./dictionaries";

export function resolveTokens(tokens: Token[], dictionaryType: DictionaryType): ResolveResult {
  console.log(dictionaryType);
  
  const dictionaryMap = new Map<string, SymbolId>(
    dictionaries[dictionaryType].map((entry: DictionaryEntry) => [entry.key, entry.symbol])
  );

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
