<script setup lang="ts">
import { ref } from "vue";
import { CircleX, ChevronDown } from "lucide-vue-next";
import type { TokenError } from "@/lib/lang-editor/types";

defineProps<{ errors: TokenError[] }>();

const expandedIndex = ref(-1);
function toggle(index: number) {
  expandedIndex.value = expandedIndex.value === index ? -1 : index;
}
</script>

<template>
  <div class="rounded-lg border">
    <p v-if="!errors.length" class="px-4 py-6 text-center text-sm text-muted-foreground">
      No errors detected
    </p>

    <div v-else class="divide-y">
      <div
        v-for="(error, index) in errors"
        :key="`${error.token.line}-${error.token.column}`"
        class="border-l-2 border-l-destructive"
      >
        <button class="flex w-full items-center gap-3 px-4 py-3 text-left" @click="toggle(index)">
          <CircleX class="h-4 w-4 shrink-0 text-destructive" />
          <span class="text-sm">
            Unknown token <span class="font-mono font-medium">&quot;{{ error.token.raw }}&quot;</span>
          </span>
          <span class="rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
            Line {{ error.token.line }}, Col {{ error.token.column }}
          </span>
          <span v-if="error.suggestions.length" class="text-sm text-muted-foreground">
            Did you mean:
            <span class="font-mono text-violet-600">{{ error.suggestions.join(", ") }}</span> ?
          </span>
          <ChevronDown
            class="ml-auto h-4 w-4 text-muted-foreground transition-transform"
            :class="{ 'rotate-180': expandedIndex === index }"
          />
        </button>
        <div v-if="expandedIndex === index" class="px-4 pb-3 text-xs text-muted-foreground">
          Token length {{ error.token.length }}, word group #{{ error.token.group }}.
          No dictionary entry for <span class="font-mono">{{ error.token.key }}</span>.
        </div>
      </div>
    </div>
  </div>
</template>
