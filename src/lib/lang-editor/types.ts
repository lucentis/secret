export type SymbolId = string;

export interface Token {
  raw: string;
  key: string;
  line: number;
  column: number;
  length: number;
}

export interface DictionaryEntry {
  key: string;
  symbol: SymbolId;
}

export interface ResolvedToken {
  token: Token;
  symbol: SymbolId | null;
}

export interface TokenError {
  token: Token;
  suggestions: string[];
}

export interface ResolveResult {
  items: ResolvedToken[];
  errors: TokenError[];
}
