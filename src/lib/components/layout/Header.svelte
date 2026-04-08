<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { PrimaryNavItems, PagesWithHiddenNav } from '$lib/config/navigation';
	import logo from '$lib/assets/logo_basic.png';

	interface Props {
		onMenuToggle: () => void;
		menuOpen: boolean;
	}

	let { onMenuToggle, menuOpen }: Props = $props();

	const isHidden = $derived(PagesWithHiddenNav.includes($page.url.pathname));
	const isActive = (href: string) => $page.url.pathname === href;
</script>

{#if !isHidden}
	<header
		class="bg-black text-white shadow-lg sticky top-0 z-50 border-b border-neutral-900"
	>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<!-- Logo/Brand -->
				<a
					href={PrimaryNavItems[0].href}
					class="flex items-center space-x-3 hover:opacity-90 transition-opacity"
				>
					<img src={logo} alt="Operation Gospel Logo" class="h-10 w-auto" />
					<div>
						<span class="text-lg md:text-xl font-black tracking-tighter uppercase leading-none">
							Operation Gospel
						</span>
						<p class="text-[9px] text-neutral-500 tracking-widest uppercase font-bold">
							The Road to Abolition
						</p>
					</div>
				</a>

				<!-- Desktop Navigation -->
				<div class="hidden md:flex md:items-center md:space-x-1">
					{#each PrimaryNavItems as item}
						<a
							href={item.href}
							class="hover:text-neutral-300 hover:bg-neutral-900 transition-all duration-200 px-3 py-3 text-[10px] font-bold tracking-wider uppercase rounded-sm
								{isActive(item.href)
								? 'text-red-500 bg-neutral-900 border-l-2 border-red-600'
								: 'text-neutral-500 border-l-2 border-transparent'}"
						>
							{item.label}
						</a>
					{/each}
					<a
						href="{base}/join"
						class="ml-4 px-4 py-2 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-red-700 transition-colors"
					>
						Join the Fight
					</a>
				</div>

				<!-- Menu Toggle Button (Mobile) -->
				<button
					onclick={onMenuToggle}
					class="md:hidden text-red-500 focus:outline-none p-2"
					aria-label={menuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={menuOpen}
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if menuOpen}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						{/if}
					</svg>
				</button>
			</div>
		</div>
	</header>
{/if}
