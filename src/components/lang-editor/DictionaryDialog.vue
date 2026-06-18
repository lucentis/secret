<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

defineProps<{
  open: boolean;
}>();

defineEmits<{
  "update:open": [boolean];
}>();

const vowels = [
  ["a", "α"],
  ["e", "ε"],
  ["i", "ι"],
  ["o", "ο"],
  ["u", "υ"],
  ["y", "γ"],
  ["é", "η"],
];

const consonants = [
  ["p", "π"],
  ["k", "κ"],
  ["t", "τ"],
  ["f", "φ"],
  ["v", "β"],
  ["d", "δ"],
  ["b", "ψ"],
  ["s", "σ"],
  ["z", "ζ"],
  ["l", "λ"],
  ["r", "ρ"],
  ["m", "μ"],
  ["n", "н"],
  ["j", "ж"],
  ["w", "ў"],
];

const compounds = [
  ["#ch", "χ"],
  ["#gn", "ξ"],
  ["#in", "ν"],
  ["#en", "θ"],
  ["#on", "ϑ"],
  ["#ou", "ω"],
];
</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="max-h-[80vh] max-w-3xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Dictionnaire</DialogTitle>

        <DialogDescription>
          Correspondance entre les sons et les symboles.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-6">
        <!-- Voyelles -->
        <section>
          <h3 class="mb-3 text-sm font-semibold">Voyelles</h3>

          <div class="grid grid-cols-2 gap-2 md:grid-cols-3">
            <div
              v-for="[token, symbol] in vowels"
              :key="token"
              class="flex items-center justify-between rounded-md border p-3"
            >
              <code class="font-mono">{{ token }}</code>
              <span class="text-2xl">{{ symbol }}</span>
            </div>
          </div>
        </section>

        <!-- Consonnes -->
        <section>
          <h3 class="mb-3 text-sm font-semibold">Consonnes</h3>

          <div class="grid grid-cols-2 gap-2 md:grid-cols-3">
            <div
              v-for="[token, symbol] in consonants"
              :key="token"
              class="flex items-center justify-between rounded-md border p-3"
            >
              <code class="font-mono">{{ token }}</code>
              <span class="text-2xl">{{ symbol }}</span>
            </div>
          </div>
        </section>

        <!-- Sons composés -->
        <section>
          <h3 class="mb-3 text-sm font-semibold">Sons composés</h3>

          <div class="grid grid-cols-2 gap-2 md:grid-cols-3">
            <div
              v-for="[token, symbol] in compounds"
              :key="token"
              class="flex items-center justify-between rounded-md border p-3"
            >
              <code class="font-mono">{{ token }}</code>
              <span class="text-2xl">{{ symbol }}</span>
            </div>
          </div>
        </section>
      </div>
    </DialogContent>
  </Dialog>
</template>