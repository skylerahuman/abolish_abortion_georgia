<script lang="ts">
	import PlumbLine from '$lib/components/PlumbLine.svelte';
</script>

<svelte:head>
	<title>The Gold Standard - HB 441</title>
</svelte:head>

<PlumbLine />

<!-- Long scrollable area for testing physics -->
<div class="scroll-container">
	<div class="scroll-marker">Top</div>
	<div class="scroll-marker">Scroll down to see physics sway...</div>
	<div class="scroll-marker">Middle</div>
	<div class="scroll-marker">Keep scrolling...</div>
	<div class="scroll-marker">Bottom</div>
</div>

<style>
	.scroll-container {
		height: 400vh; /* Make it very tall */
		position: relative;
		z-index: 50;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 2rem;
		color: var(--color-bone);
		opacity: 0.5;
	}
	
	.scroll-marker {
		padding: 2rem;
		border-top: 1px dashed var(--color-bone);
	}
</style>
