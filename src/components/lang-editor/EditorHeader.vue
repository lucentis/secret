<script setup lang="ts">
import { Braces, CircleHelp } from "lucide-vue-next";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Download } from "@lucide/vue";
import type { ResolveResult } from "@/lib/lang-editor/types";

const props = defineProps<{
  resolved: ResolveResult;
  source: string;
}>();

function exportText() {
  const content = props.resolved.items
    .map((item) => item.symbol ?? item.token.raw)
    .join(" ");

  downloadFile(content, "document.txt", "text/plain");
}

function exportJson() {
  const symbols = props.resolved.items
    .map((item) => item.symbol ?? item.token.raw)
    .join(" ");

  const tokens = props.resolved.items
    .map((item) => item.token.raw)
    .join(" ");

  const content = JSON.stringify(
    {
      source: props.source,
      output: {
        symbols,
        tokens,
      },
      items: props.resolved.items,
      errors: props.resolved.errors,
    },
    null,
    2
  );

  downloadFile(
    content,
    "document.json",
    "application/json"
  );
}

function downloadFile(
  content: string,
  filename: string,
  mimeType: string
) {
  const blob = new Blob([content], {
    type: mimeType,
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
</script>

<template>
  <header class="flex items-center gap-3 border-b px-6 py-3">
    <Braces class="h-5 w-5 text-violet-600" />
    <h1 class="text-base font-semibold">Lang editor</h1>
    <span class="text-xs text-muted-foreground">v0.1.0</span>

    <div class="ml-auto flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button
            class="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
          >
            <Download class="h-4 w-4" />
            Export
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" class="w-48">
          <DropdownMenuLabel>Exporter</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem @select="exportText">
            Texte brut (.txt)
          </DropdownMenuItem>

          <DropdownMenuItem @select="exportJson">
            JSON (.json)
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem disabled>
            PDF (bientôt)
          </DropdownMenuItem>

          <DropdownMenuItem disabled>
            Image PNG (bientôt)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div class="mx-1 h-5 w-px bg-border" />
      <Popover>
        <PopoverTrigger as-child>
          <button
            class="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Aide"
          >
            <CircleHelp class="h-4 w-4" />
          </button>
        </PopoverTrigger>

        <PopoverContent align="end" class="w-96">
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold">Aide</h3>
              <p class="mt-1 text-sm text-muted-foreground">
                Chaque son correspond à un symbole.
              </p>
            </div>

            <div>
              <h4 class="mb-2 text-sm font-medium">Sons simples</h4>

              <div class="grid grid-cols-4 gap-x-4 gap-y-1 font-mono text-sm">
                <span>a</span>
                <span>e</span>
                <span>i</span>
                <span>o</span>

                <span>u</span>
                <span>y</span>
                <span>é</span>
                <span>p</span>

                <span>k</span>
                <span>t</span>
                <span>f</span>
                <span>v</span>

                <span>d</span>
                <span>b</span>
                <span>s</span>
                <span>z</span>

                <span>l</span>
                <span>r</span>
                <span>m</span>
                <span>n</span>

                <span>j</span>
                <span>w</span>
              </div>
            </div>

            <div>
              <h4 class="mb-2 text-sm font-medium">Sons composés</h4>

              <div class="space-y-1 font-mono text-sm">
                <div>#ch → ch</div>
                <div>#gn → gn</div>
                <div>#in → in</div>
                <div>#en → en</div>
                <div>#on → on</div>
                <div>#ou → ou</div>
              </div>
            </div>

            <div>
              <h4 class="mb-2 text-sm font-medium">Exemple</h4>

              <div class="rounded-md border bg-muted/50 p-3 font-mono text-sm">
                b#onj#our mart#in
              </div>

              <div class="mt-2 text-xs text-muted-foreground">
                Se lit : b · on · j · ou · r &nbsp;&nbsp; m · a · r · t · in
              </div>
            </div>

            <div class="border-t pt-3 text-xs text-muted-foreground">
              Les sons composés doivent être précédés du caractère
              <code>#</code>.
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </header>
</template>
