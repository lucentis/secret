import { ref, computed } from "vue";
import { tokenize } from "@/lib/lang-editor/tokenizer";
import { resolveTokens } from "@/lib/lang-editor/dictionary";

export type ViewMode = "tokens" | "symbols";

export function useLangEditor() {
  const source = ref("");
  const mode = ref<ViewMode>("symbols");
  const cursor = ref({ line: 1, column: 1 });

  const tokens = computed(() => tokenize(source.value));
  const resolved = computed(() => resolveTokens(tokens.value));
  const charCount = computed(() => source.value.length);

  return { source, mode, cursor, tokens, resolved, charCount };
}
