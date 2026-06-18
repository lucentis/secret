<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  "update:modelValue": [value: string];
  cursor: [value: { line: number; column: number }];
}>();

const textareaRef = ref<HTMLTextAreaElement>();
const highlightRef = ref<HTMLDivElement>();
const linesRef = ref<HTMLDivElement>();

const lines = computed(() => props.modelValue.split("\n"));

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightLine(line: string) {
  const escaped = escapeHtml(line);
  const highlighted = escaped.replace(
    /#[a-zA-Z]{1,2}/g,
    (match) => `<span class="text-violet-500">${match}</span>`
  );
  return highlighted.length ? highlighted : "&nbsp;";
}

const highlightedSource = computed(() => lines.value.map(highlightLine).join("\n"));

function syncScroll() {
  const el = textareaRef.value;
  if (!el) return;
  if (highlightRef.value) {
    highlightRef.value.scrollTop = el.scrollTop;
    highlightRef.value.scrollLeft = el.scrollLeft;
  }
  if (linesRef.value) {
    linesRef.value.scrollTop = el.scrollTop;
  }
}

function reportCursor() {
  const el = textareaRef.value;
  if (!el) return;
  const before = props.modelValue.slice(0, el.selectionStart);
  const linesBefore = before.split("\n");
  emit("cursor", {
    line: linesBefore.length,
    column: linesBefore[linesBefore.length - 1].length + 1,
  });
}

function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
  reportCursor();
}
</script>

<template>
  <div class="flex h-full font-mono text-sm">
    <div ref="linesRef" class="select-none overflow-hidden px-3 py-4 text-right text-muted-foreground" aria-hidden="true">
      <div v-for="(_, index) in lines" :key="index" class="leading-6">{{ index + 1 }}</div>
    </div>

    <div class="relative flex-1">
      <div
        ref="highlightRef"
        class="pointer-events-none absolute inset-0 overflow-auto whitespace-pre px-3 py-4 leading-6"
        v-html="highlightedSource"
      />
      <textarea
        ref="textareaRef"
        :value="modelValue"
        class="caret-black absolute inset-0 h-full w-full resize-none overflow-auto whitespace-pre bg-transparent px-3 py-4 leading-6 text-transparent outline-none"
        
        spellcheck="false"
        @input="onInput"
        @scroll="syncScroll"
        @click="reportCursor"
        @keyup="reportCursor"
      />
    </div>
  </div>
</template>
