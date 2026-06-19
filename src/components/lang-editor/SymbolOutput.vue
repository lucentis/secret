<script setup lang="ts">
import SymbolIcon from "./SymbolIcon.vue";
import type { ResolvedToken } from "@/lib/lang-editor/types";
import type { ViewMode } from "@/composables/useLangEditor";

const props = defineProps<{ items: ResolvedToken[]; mode: ViewMode }>();
</script>

<template>
  <div class="flex flex-wrap gap-x-px gap-y-3">
    <template v-for="item in items" :key="`${item.token.line}-${item.token.column}`">
      <SymbolIcon v-if="mode === 'symbols'" :symbol="item.symbol" />
      <span
        v-else
        class="rounded border px-1.5 py-0.5 font-mono text-xs"
        :class="item.symbol ? '' : 'border-destructive text-destructive'"
      >{{ item.token.raw }}</span>
    </template>
  </div>
</template>
