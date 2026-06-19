<script setup lang="ts">
import { computed } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { dictionaries } from "@/lib/lang-editor/dictionaries";
import type { DictionaryType } from "@/lib/lang-editor/types";
import { store } from "@/store/langEditor";

defineProps<{
  open: boolean;
}>();

defineEmits<{
  "update:open": [boolean];
}>();


const entries = computed(() => dictionaries[store.dictionaryType]);

const vowels = computed(() =>
  entries.value.filter((entry) => entry.category === "vowel")
);

const consonants = computed(() =>
  entries.value.filter((entry) => entry.category === "consonant")
);

const compounds = computed(() =>
  entries.value.filter((entry) => entry.category === "compound")
);

const separators = computed(() =>
  entries.value.filter((entry) => entry.category === "separator")
);
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

      <div class="mb-6">
        <label class="mb-2 block text-sm font-medium">
          Alphabet
        </label>

        <Select
          :model-value="store.dictionaryType"
          @update:model-value="store.dictionaryType = $event as DictionaryType"
        >
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Choisir un alphabet" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="greek">
              Grec
            </SelectItem>

            <SelectItem value="shape">
              Formes
            </SelectItem>

            <SelectItem value="rune">
              Runes
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-6">
        <!-- Voyelles -->
        <section v-if="vowels.length">
          <h3 class="mb-3 text-sm font-semibold">Voyelles</h3>

          <div class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            <div
              v-for="entry in vowels"
              :key="entry.key"
              class="flex items-center justify-between rounded-md border p-3"
            >
              <code class="font-mono">{{ entry.key }}</code>
              <span class="text-2xl">{{ entry.symbol }}</span>
            </div>
          </div>
        </section>

        <!-- Consonnes -->
        <section v-if="consonants.length">
          <h3 class="mb-3 text-sm font-semibold">Consonnes</h3>

          <div class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            <div
              v-for="entry in consonants"
              :key="entry.key"
              class="flex items-center justify-between rounded-md border p-3"
            >
              <code class="font-mono">{{ entry.key }}</code>
              <span class="text-2xl">{{ entry.symbol }}</span>
            </div>
          </div>
        </section>

        <!-- Sons composés -->
        <section v-if="compounds.length">
          <h3 class="mb-3 text-sm font-semibold">Sons composés</h3>

          <div class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            <div
              v-for="entry in compounds"
              :key="entry.key"
              class="flex items-center justify-between rounded-md border p-3"
            >
              <code class="font-mono">{{ entry.key }}</code>
              <span class="text-2xl">{{ entry.symbol }}</span>
            </div>
          </div>
        </section>

        <!-- Séparateurs -->
        <section v-if="separators.length">
          <h3 class="mb-3 text-sm font-semibold">Séparateurs</h3>

          <div class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            <div
              v-for="entry in separators"
              :key="entry.key"
              class="flex items-center justify-between rounded-md border p-3"
            >
              <code class="font-mono">
                {{ entry.key === " " ? "espace" : entry.key }}
              </code>

              <span class="text-2xl">
                {{ entry.symbol === " " ? "␠" : entry.symbol }}
              </span>
            </div>
          </div>
        </section>
      </div>
    </DialogContent>
  </Dialog>
</template>