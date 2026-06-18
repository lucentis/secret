<script setup lang="ts">
defineProps<{ dictionarySize: number }>();
defineEmits<{ "view-dictionary": [] }>();
</script>

<template>
  <div class="flex items-center justify-between border-t px-6 py-2 text-xs text-muted-foreground">
    <div class="flex items-center gap-2">
      <span class="h-2 w-2 rounded-full bg-emerald-500" />
      Ready
    </div>
    <div class="flex items-center gap-4">
      <span>Dictionary: {{ dictionarySize }} tokens</span>
      <button
        class="rounded-md border border-violet-200 px-3 py-1 font-medium text-violet-600 hover:bg-violet-50"
        @click="$emit('view-dictionary')"
      >
        View dictionary
      </button>
    </div>
  </div>
</template>
