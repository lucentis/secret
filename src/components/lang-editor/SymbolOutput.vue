<script setup lang="ts">
import { computed } from "vue";
import SymbolIcon from "./SymbolIcon.vue";
import type { ResolvedToken } from "@/lib/lang-editor/types";
import type { ViewMode } from "@/composables/useLangEditor";

const props = defineProps<{ items: ResolvedToken[]; mode: ViewMode }>();

const groups = computed(() => {
  const map = new Map<number, ResolvedToken[]>();
  for (const item of props.items) {
    const list = map.get(item.token.group) ?? [];
    list.push(item);
    map.set(item.token.group, list);
  }
  return Array.from(map, ([id, list]) => ({ id, list }));
});
</script>

<template>
  <div class="flex flex-wrap gap-x-6 gap-y-3">
    <div v-for="group in groups" :key="group.id" class="flex items-center gap-1.5">
      <template v-for="item in group.list" :key="`${item.token.line}-${item.token.column}`">
        <SymbolIcon v-if="mode === 'symbols'" :symbol="item.symbol" />
        <span
          v-else
          class="rounded border px-1.5 py-0.5 font-mono text-xs"
          :class="item.symbol ? '' : 'border-destructive text-destructive'"
        >{{ item.token.raw }}</span>
      </template>
    </div>
  </div>
</template>
