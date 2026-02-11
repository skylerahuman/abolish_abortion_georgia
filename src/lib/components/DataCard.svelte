<script lang="ts">
  let { title, value, description, class: className, ...rest }: { title: string; value: string; description?: string; class?: string; [key: string]: any } = $props();
</script>

<div class="bg-black border border-white/20 p-6 shadow-xl hover:border-red-600 transition-colors group {className}" {...rest}>
  <h3 class="text-white/60 text-sm font-sans uppercase tracking-widest mb-1">{title}</h3>
  <div class="text-4xl font-serif font-bold text-white group-hover:text-red-500 transition-colors mb-2">
    {value}
  </div>
  {#if description}
    <p class="text-white/40 text-sm leading-relaxed font-sans">
      {description}
    </p>
  {/if}
</div>
