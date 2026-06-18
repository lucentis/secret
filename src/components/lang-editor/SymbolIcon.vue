<script setup lang="ts">
import type { SymbolId } from "@/lib/lang-editor/types";

defineProps<{ symbol: SymbolId | null; size?: number }>();
</script>

<template>
  <svg :width="size ?? 18" :height="size ?? 18" viewBox="0 0 18 18" aria-hidden="true">
    <rect v-if="symbol === 'square'" x="2" y="2" width="14" height="14" rx="2" class="fill-foreground" />
    <circle v-else-if="symbol === 'circle'" cx="9" cy="9" r="7" class="fill-foreground" />
    <polygon v-else-if="symbol === 'triangle'" points="9,2 16,15 2,15" class="fill-foreground" />
    <polygon v-else-if="symbol === 'diamond'" points="9,1 17,9 9,17 1,9" class="fill-foreground" />
    <rect
      v-else
      x="2"
      y="2"
      width="14"
      height="14"
      rx="2"
      fill="none"
      stroke-width="1.5"
      stroke-dasharray="3 2"
      class="stroke-destructive"
    />
  </svg>
</template>
