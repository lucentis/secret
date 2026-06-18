<script setup lang="ts">
defineProps<{ symbol: string | null; size?: number }>();
</script>

<template>
  <span
    v-if="symbol"
    class="inline-flex items-center justify-center font-serif leading-none"
    :style="{ width: `${size ?? 22}px`, height: `${size ?? 22}px`, fontSize: `${(size ?? 22) * 0.75}px` }"
  >{{ symbol }}</span>
  <span
    v-else
    class="inline-flex items-center justify-center rounded border border-dashed border-destructive text-xs text-destructive"
    :style="{ width: `${size ?? 22}px`, height: `${size ?? 22}px` }"
  >?</span>
</template>
