<script setup lang="ts">
import { computed } from "vue";
import { Copy } from "lucide-vue-next";
import { useLangEditor } from "@/composables/useLangEditor";
import { dictionarySize } from "@/lib/lang-editor/dictionary";
import EditorHeader from "./EditorHeader.vue";
import EditorPane from "./EditorPane.vue";
import SymbolOutput from "./SymbolOutput.vue";
import ErrorPanel from "./ErrorPanel.vue";
import StatusBar from "./StatusBar.vue";

const { source, mode, cursor, resolved, charCount } = useLangEditor();

const errorCount = computed(() => resolved.value.errors.length);

async function copyOutput() {
  const text = resolved.value.items.map((item) => item.symbol ?? item.token.raw).join(" ");
  await navigator.clipboard.writeText(text);
}
</script>

<template>
  <div class="flex h-screen flex-col bg-background text-foreground">
    <EditorHeader v-model:mode="mode" />

    <div class="grid flex-1 grid-cols-2 divide-x overflow-hidden">
      <section class="flex flex-col overflow-hidden">
        <div class="border-b px-4 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Editor
        </div>
        <div class="flex-1 overflow-hidden">
          <EditorPane v-model="source" @cursor="cursor = $event" />
        </div>
        <div class="flex items-center justify-between border-t px-4 py-2 font-mono text-xs text-muted-foreground">
          <span>Ln {{ cursor.line }}, Col {{ cursor.column }}</span>
          <span>{{ charCount }} chars</span>
        </div>
      </section>

      <section class="flex flex-col overflow-hidden">
        <div class="flex items-center justify-between border-b px-4 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <span>Output ({{ mode }})</span>
          <button class="text-muted-foreground hover:text-foreground" aria-label="Copy output" @click="copyOutput">
            <Copy class="h-4 w-4" />
          </button>
        </div>
        <div class="flex-1 overflow-auto p-6">
          <SymbolOutput :items="resolved.items" :mode="mode" />
        </div>
      </section>
    </div>

    <div class="border-t px-6 py-4">
      <div class="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>Errors</span>
        <span
          v-if="errorCount"
          class="rounded-full bg-destructive px-2 py-0.5 text-[11px] font-semibold text-destructive-foreground"
        >
          {{ errorCount }}
        </span>
      </div>
      <ErrorPanel :errors="resolved.errors" />
    </div>

    <StatusBar :dictionary-size="dictionarySize" />
  </div>
</template>
