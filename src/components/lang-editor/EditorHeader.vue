<script setup lang="ts">
import { Braces, Sun, CircleHelp } from "lucide-vue-next";
import type { ViewMode } from "@/composables/useLangEditor";

defineProps<{ mode: ViewMode }>();
defineEmits<{ "update:mode": [value: ViewMode] }>();
</script>

<template>
  <header class="flex items-center gap-3 border-b px-6 py-3">
    <Braces class="h-5 w-5 text-violet-600" />
    <h1 class="text-base font-semibold">Lang editor</h1>
    <span class="text-xs text-muted-foreground">v0.1.0</span>

    <div class="ml-auto flex items-center gap-2">
      <div class="flex overflow-hidden rounded-md border">
        <button
          class="px-3 py-1.5 text-xs font-medium transition-colors"
          :class="mode === 'tokens' ? 'bg-violet-600 text-white' : 'bg-background text-muted-foreground hover:bg-muted'"
          @click="$emit('update:mode', 'tokens')"
        >
          Tokens
        </button>
        <button
          class="px-3 py-1.5 text-xs font-medium transition-colors"
          :class="mode === 'symbols' ? 'bg-violet-600 text-white' : 'bg-background text-muted-foreground hover:bg-muted'"
          @click="$emit('update:mode', 'symbols')"
        >
          Symbols
        </button>
      </div>

      <div class="mx-1 h-5 w-px bg-border" />

      <button class="rounded-md p-1.5 text-muted-foreground hover:bg-muted" aria-label="Toggle theme">
        <Sun class="h-4 w-4" />
      </button>
      <button class="rounded-md p-1.5 text-muted-foreground hover:bg-muted" aria-label="Help">
        <CircleHelp class="h-4 w-4" />
      </button>
    </div>
  </header>
</template>
