<script lang="ts">
	import { page } from '$app/state';
	import { PagesWithHiddenNav } from '$lib/config/navigation';
	import logo from '$lib/assets/logo_basic.png';

	interface Props {
		onMenuToggle: () => void;
		menuOpen: boolean;
	}

	let { onMenuToggle, menuOpen }: Props = $props();

	const isHidden = $derived(PagesWithHiddenNav.includes(page.url.pathname));
</script>

{#if !isHidden}
	<header class="bg-black text-white sticky top-0 z-50 border-b border-neutral-800">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<!-- Logo -->
				<a href="/" class="flex items-center space-x-3 hover:opacity-90 transition-opacity">
					<img src={logo} alt="" class="h-10 w-auto" />
					<span class="text-lg font-black tracking-tight uppercase leading-none">
						Operation Gospel
					</span>
				</a>

				<!-- Right side: Join CTA + Menu -->
				<div class="flex items-center gap-4">
					<a
						href="/join"
						class="hidden sm:inline-flex px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-red-700 transition-colors"
					>
						Join the Fight
					</a>

					<!-- Menu Button -->
					<button
						onclick={onMenuToggle}
						class="text-neutral-400 hover:text-white focus:outline-none p-2 transition-colors"
						aria-label={menuOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={menuOpen}
					>
						{#if menuOpen}
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						{:else}
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						{/if}
					</button>
				</div>
			</div>
		</div>
	</header>
{/if}
