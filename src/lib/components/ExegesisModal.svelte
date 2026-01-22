<script lang="ts">
	export let showModal: boolean;
</script>

{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
		on:click={() => (showModal = false)}
	>
		<div
			class="relative max-w-2xl p-8 bg-navy-light border border-gold/20 rounded-xl shadow-2xl"
			on:click|stopPropagation
		>
			<button
				class="absolute top-4 right-4 text-gold"
				on:click={() => (showModal = false)}
			>
				<span class="material-symbols-outlined">close</span>
			</button>
			<h3 class="text-2xl font-bold text-white mb-4">Exegesis</h3>
			<p class="text-slate-400">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
				cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</div>
	</div>
{/if}
