import { computed } from "vue";
import { tokenize } from "@/lib/lang-editor/tokenizer";
import { resolveTokens } from "@/lib/lang-editor/dictionary";
import { store } from "@/store/langEditor";

export type ViewMode = "tokens" | "symbols";

export function useLangEditor() {
  const tokens = computed(() => tokenize(store.source));
  const resolved = computed(() => resolveTokens(tokens.value, store.dictionaryType));
  const charCount = computed(() => store.source.length);
 

  return { tokens, resolved, charCount };
}
