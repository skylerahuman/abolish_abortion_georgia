<script lang="ts">
import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/logo_basic.png';
	
	let { children } = $props();
	let mobileMenuOpen = $state(false);
	
	const navItems = [
		{ href: `${base}/`, label: 'Home' },
		{ href: `${base}/who-do-i-call`, label: 'Who Do I Call' },
		{ href: `${base}/timeline`, label: 'Timeline' },
		{ href: `${base}/faqs`, label: 'FAQs' }
	];
</script>

<svelte:head>
	<title>Operation Gospel</title>
	<link rel="icon" href={logo} />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<!-- Navigation -->
	<nav class="bg-black text-white shadow-lg sticky top-0 z-50 border-b border-neutral-800">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<!-- Logo/Brand -->
				<div class="flex items-center space-x-3">
					<div>
						<img src={logo} alt="Operation Gospel Logo" class="h-12 w-auto">
					</div>
					<div>
						<a href="{base}/" class="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none">
							Operation Gospel
						</a>
						<p class="text-[10px] text-neutral-500 tracking-widest uppercase font-bold">The Road to Abolition</p>
					</div>
				</div>
				
				<!-- Desktop Navigation -->
				<div class="hidden md:flex md:items-center md:space-x-1">
					{#each navItems as item}
						<a 
							href={item.href}
							class="hover:text-neutral-300 hover:bg-neutral-900 transition-all duration-200 px-4 py-3 text-[10px] font-bold tracking-wider uppercase rounded-sm
								{$page.url.pathname === item.href ? 'text-red-500 bg-neutral-900 border-l-2 border-red-600' : 'text-neutral-500 border-l-2 border-transparent'}"
						>
							{item.label}
						</a>
					{/each}
				</div>
				
				<!-- Mobile Menu Button -->
				<div class="flex items-center">
					<button
						onclick={() => mobileMenuOpen = !mobileMenuOpen}
						class="md:hidden text-red-500 focus:outline-none"
						aria-label="Toggle menu"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{#if mobileMenuOpen}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
							{:else}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
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
						onclick={() => mobileMenuOpen = false}
						class="block w-full text-left py-3 px-4 hover:text-neutral-300 hover:bg-neutral-900 transition-all duration-200 rounded-sm text-[10px] font-bold tracking-wider uppercase
							{$page.url.pathname === item.href ? 'text-red-500 bg-neutral-900 border-l-2 border-red-600' : 'text-neutral-500 border-l-2 border-transparent'}"
					>
						{item.label}
					</a>
				{/each}
			</div>
		{/if}
	</nav>

	<!-- Main Content -->
	<main class="flex-1">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-neutral-950 text-neutral-400 py-12 border-t border-neutral-900">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<svg class="w-8 h-8 mx-auto mb-4 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
				<path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"/>
			</svg>
			<p class="mb-4 font-serif italic text-lg text-white">
				"Open your mouth for the mute, for the rights of all who are destitute."
			</p>
			<p class="text-sm mb-8 text-neutral-500">Proverbs 31:8</p>
			<div class="text-[8px] text-neutral-600 uppercase font-mono tracking-wide">
				<p>This timeline is an educational resource advocating for the equal protection of all human beings.</p>
				<p class="mt-2">© {new Date().getFullYear()} Abolition Georgia. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
