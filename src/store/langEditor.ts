import type { ViewMode } from "@/composables/useLangEditor";
import type { DictionaryType } from "@/lib/lang-editor/types";
import { reactive } from "vue";

export const store = reactive({
  source: '',
  mode: 'symbols' as ViewMode,
  cursor: {line: 1, column: 1},
  dictionaryType: 'rune' as DictionaryType
})

