<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import logo from '$lib/assets/logo_basic.png';

	let { children } = $props();
	let mobileMenuOpen = $state(false);

	const navItems = [
		{ href: `${base}/`, label: 'Home' },
		{ href: `${base}/georgia-battle`, label: 'Timeline' },
		{ href: `${base}/faqs`, label: 'FAQs' }
	];

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (mobileMenuOpen && !target.closest('.nav-container')) {
				mobileMenuOpen = false;
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});
</script>

<svelte:head>
	<title>Operation Gospel</title>
	<link rel="icon" href={logo} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-black text-white">
	<!-- Skip to main content link for accessibility -->
	<a
		href="#main-content"
		class="absolute -top-96 left-1/2 -translate-x-1/2 z-[100] bg-red-600 text-white px-6 py-3 font-bold uppercase tracking-widest rounded-b-md focus:top-4 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white"
	>
		Skip to Main Content
	</a>
	<!-- WIP Banner (Global) -->
	{#if !['/fill-the-steps', '/feb-20-2026', '/2-20-2026'].includes($page.url.pathname)}
		<div class="bg-amber-500/10 border-b border-amber-500/20 py-2 px-4 text-center z-[60]">
			<p class="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
				Main Site Work-In-Progress — Expected Completion: February 19, 2026
			</p>
		</div>
	{/if}

	<!-- Navigation -->
	{#if !['/fill-the-steps', '/feb-20-2026', '/2-20-2026'].includes($page.url.pathname)}
		<nav
			class="bg-black text-white shadow-lg sticky top-0 z-50 border-b border-neutral-900 nav-container"
		>
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between items-center h-16">
					<!-- Logo/Brand -->
					<div class="flex items-center space-x-3">
						<div>
							<img src={logo} alt="Operation Gospel Logo" class="h-12 w-auto">
						</div>
						<div>
							<a
								href="{base}/"
								class="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none"
							>
								Operation Gospel
							</a>
							<p class="text-[10px] text-neutral-500 tracking-widest uppercase font-bold">
								The Road to Abolition
							</p>
						</div>
					</div>

					<!-- Desktop Navigation -->
					<div class="hidden md:flex md:items-center md:space-x-1">
						{#each navItems as item}
							<a
								href={item.href}
								class="hover:text-neutral-300 hover:bg-neutral-900 transition-all duration-200 px-3 py-3 text-[10px] font-bold tracking-wider uppercase rounded-sm
									{$page.url.pathname === item.href
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

					<!-- Mobile Menu Button -->
					<div class="flex items-center">
						<button
							onclick={toggleMenu}
							class="md:hidden text-red-500 focus:outline-none"
							aria-label="Toggle menu"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								{#if mobileMenuOpen}
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
			</div>

			<!-- Mobile Navigation -->
			{#if mobileMenuOpen}
				<div class="md:hidden bg-neutral-950 backdrop-blur-md border-t border-neutral-800 p-4">
					{#each navItems as item}
						<a
							href={item.href}
							onclick={() => (mobileMenuOpen = false)}
							class="block w-full text-left py-3 px-4 hover:text-neutral-300 hover:bg-neutral-900 transition-all duration-200 rounded-sm text-[10px] font-bold tracking-wider uppercase
								{$page.url.pathname === item.href
								? 'text-red-500 bg-neutral-900 border-l-2 border-red-600'
								: 'text-neutral-500 border-l-2 border-transparent'}"
						>
							{item.label}
						</a>
					{/each}
					<a
						href="{base}/join"
						onclick={() => (mobileMenuOpen = false)}
						class="block w-full text-center py-4 px-6 bg-red-600 text-white hover:bg-red-700 transition-all duration-200 rounded-sm text-xs font-bold tracking-widest uppercase mt-4"
					>
						Join the Fight
					</a>
				</div>
			{/if}
		</nav>
	{/if}

	<!-- Main Content -->
	<main id="main-content" tabindex="-1" class="flex-1 focus:outline-none">
		{@render children()}
	</main>

	<!-- Footer -->
	{#if !['/fill-the-steps', '/feb-20-2026', '/2-20-2026'].includes($page.url.pathname)}
	<footer class="relative z-10 bg-black text-neutral-400 py-24 border-t border-neutral-900">
			<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
				<!-- Simplified Links -->
				<nav class="flex flex-wrap justify-center gap-x-8 gap-y-4">
					{#each navItems as item}
						<a
							href={item.href}
							class="text-[10px] font-bold tracking-widest uppercase hover:text-white transition-colors"
						>
							{item.label}
						</a>
					{/each}
				</nav>

				<!-- Minimalist Info -->
				<div class="pt-8 border-t border-neutral-900">
					<div class="text-[8px] text-neutral-600 uppercase font-bold tracking-[0.2em] space-y-2">
						<p>Establishing Justice for the Pre-born in Georgia</p>
						<p>© {new Date().getFullYear()} Abolition Georgia</p>
					</div>
				</div>
			</div>
		</footer>
	{/if}
</div>
