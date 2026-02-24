<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

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
	<title>Abolish Abortion Georgia</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-black text-white">
	<!-- Skip to Main Content Link -->
	<a
		href="#main-content"
		class="absolute -top-96 left-4 z-[100] rounded-md border-2 border-red-600 bg-white px-4 py-2 font-bold text-black shadow-xl transition-all duration-200 focus:top-4"
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
						<div class="text-2xl text-red-600 font-bold">
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L11 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c-.25.78-.03 1.661.58 2.173.609.512 1.456.56 2.116.116l.906-.605-.9-2.814a1 1 0 01-.084-.374 1.088 1.088 0 01.084-.374l.9-2.814-.906-.605c-.66-.444-1.507-.396-2.116.116a2.267 2.267 0 00-.58 2.173z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div>
							<a
								href="{base}/"
								class="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none"
							>
								Abolish Abortion
							</a>
							<p class="text-[10px] text-neutral-500 tracking-widest uppercase font-bold">
								Georgia
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
	<main id="main-content" class="flex-1 focus:outline-none" tabindex="-1">
		{@render children()}
	</main>

	<!-- Footer -->
	{#if !['/fill-the-steps', '/feb-20-2026', '/2-20-2026'].includes($page.url.pathname)}
		<footer class="bg-black text-neutral-400 py-24 border-t border-neutral-900">
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
