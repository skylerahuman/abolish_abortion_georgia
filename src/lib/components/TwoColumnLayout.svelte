<script lang="ts">
  import type { Snippet } from 'svelte';

  let { left, right }: { left?: Snippet; right?: Snippet } = $props();
</script>

<div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8" data-testid="layout-container">
  <div class="space-y-8" data-testid="left-column">
    {#if left}
      {@render left()}
    {/if}
  </div>
  <!-- Mobile: Horizontal Scroll (Carousel) | Desktop: Vertical Stack -->
  <div class="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:block md:space-y-6 md:overflow-visible md:pb-0 md:sticky md:top-8 md:self-start" data-testid="right-column">
    {#if right}
      {@render right()}
    {/if}
  </div>
</div>