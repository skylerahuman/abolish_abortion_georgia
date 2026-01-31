<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import logo from '$lib/assets/logo_basic.png';
	import { onMount } from 'svelte';

	let { children } = $props();
	let mobileMenuOpen = $state(false);
	let menuRef: HTMLElement | undefined = $state();
	let justOpened = false;
	let navbarVisible = $state(true);
	
	const navItems = [
		{ href: `${base}/`, label: 'Home' },
		{ href: `${base}/georgia-battle`, label: 'Timeline' },
		{ href: `${base}/faqs`, label: 'FAQs' }
	];
	
	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		if (mobileMenuOpen) {
			navbarVisible = true;
			justOpened = true;
			setTimeout(() => {
				justOpened = false;
			}, 300);
		}
	}
	
	onMount(() => {
		let scrollTimeout: number;
		let rafId: number | null = null;
		
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (target.closest('button[aria-label="Toggle menu"]')) {
				return;
			}
			if (mobileMenuOpen && menuRef && !menuRef.contains(target)) {
				mobileMenuOpen = false;
				justOpened = false;
			}
		};
		
		const handleScroll = () => {
			if (rafId) return;

			rafId = requestAnimationFrame(() => {
				const currentScrollY = window.scrollY;

				if (currentScrollY <= 10) {
					navbarVisible = true;
				} else if (!mobileMenuOpen) {
					navbarVisible = false;
				}

				if (justOpened) {
					rafId = null;
					return;
				}

				clearTimeout(scrollTimeout);
				scrollTimeout = window.setTimeout(() => {
					if (mobileMenuOpen) {
						mobileMenuOpen = false;
					}
				}, 50);
				rafId = null;
			});
		};
		
		document.addEventListener('mousedown', handleClickOutside);
		window.addEventListener('scroll', handleScroll, { passive: true });
		
		return () => {
			clearTimeout(scrollTimeout);
			if (rafId) cancelAnimationFrame(rafId);
			document.removeEventListener('mousedown', handleClickOutside);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<title>Operation Gospel</title>
	<link rel="icon" href={logo} />
</svelte:head>

<style>
	.logo-button:hover img {
		filter: brightness(0) saturate(100%) invert(28%) sepia(93%) saturate(3166%) hue-rotate(348deg) brightness(93%) contrast(95%);
	}
</style>

<div class="min-h-screen flex flex-col bg-[#0C1626]">
	<!-- Skip to Content Link -->
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-crimson focus:text-bone focus:px-6 focus:py-3 focus:rounded-md focus:shadow-lg focus:font-bold focus:uppercase focus:tracking-wide focus:border focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
	>
		Skip to main content
	</a>

	<!-- Navigation -->
	<nav class="bg-transparent text-white sticky top-0 z-50 transition-all duration-300 {navbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}">
		<div class="w-full px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<!-- Menu Button (Left) - Logo Icon - Desktop only -->
				<div class="hidden md:flex items-center relative z-50">
					<button
						onclick={toggleMenu}
						class="logo-button focus:outline-none cursor-pointer relative z-50"
						aria-label="Toggle menu"
					>
						<img src={logo} alt="Menu" class="h-10 w-auto" />
					</button>
				</div>
				
				<!-- Centered Logo - Mobile only -->
				<div class="md:hidden flex items-center justify-center w-full relative z-50">
					<button
						onclick={toggleMenu}
						class="logo-button focus:outline-none cursor-pointer"
						aria-label="Toggle menu"
					>
						<img src={logo} alt="Operation Gospel" class="h-10 w-auto" />
					</button>
				</div>
				
				<!-- Operation Gospel Text (Right) - Desktop only -->
				<div class="hidden md:flex items-center">
					<a
						href="{base}/"
						class="text-xl md:text-2xl font-serif font-bold tracking-tight uppercase leading-none whitespace-nowrap"
						aria-current={$page.url.pathname === `${base}/` ? 'page' : undefined}
					>
						Operation Gospel
					</a>
				</div>
			</div>
		</div>
		
		<!-- Hamburger Menu -->
		{#if mobileMenuOpen}
			<div bind:this={menuRef} class="bg-panel backdrop-blur-md border-t border-white/10 p-6 relative z-50">
				{#each navItems as item}
					<a
						href={item.href}
						onclick={() => mobileMenuOpen = false}
						class="block w-full text-left py-4 px-6 hover:text-bone hover:bg-charcoal transition-all duration-200 rounded-sm text-base font-bold tracking-wide uppercase
							{$page.url.pathname === item.href ? 'text-crimson bg-charcoal border-l-4 border-crimson' : 'text-bone/70 border-l-4 border-transparent'}"
						aria-current={$page.url.pathname === item.href ? 'page' : undefined}
					>
						{item.label}
					</a>
				{/each}
				<a
					href="{base}/join"
					onclick={() => mobileMenuOpen = false}
					class="block w-full text-left py-4 px-6 text-bone/70 hover:text-bone hover:bg-charcoal transition-all duration-200 rounded-sm text-base font-bold tracking-wide uppercase border-l-4 border-transparent"
					aria-current={$page.url.pathname === `${base}/join` ? 'page' : undefined}
				>
					Join
				</a>
				<a
					href="{base}/support"
					onclick={() => mobileMenuOpen = false}
					class="block w-full text-left py-4 px-6 bg-crimson/10 text-crimson hover:bg-crimson/20 hover:text-ember transition-all duration-200 rounded-sm text-base font-bold tracking-wide uppercase border-l-4 border-crimson mt-3"
					aria-current={$page.url.pathname === `${base}/support` ? 'page' : undefined}
				>
					Support
				</a>
			</div>
		{/if}
	</nav>

	<!-- Main Content -->
	<main id="main-content" tabindex="-1" class="flex-1 flex flex-col outline-none">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-panel text-bone/60 py-12 border-t border-white/5">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <p class="text-base font-serif font-bold uppercase tracking-widest text-bone mb-2">
				<span class="block sm:inline">Scriptural Authority.</span>
				<span class="block sm:inline sm:ml-1">No Compromise.</span>
			</p>

			<div class="flex justify-center mb-6">
				<a href="{base}/about" class="text-sm font-bold uppercase tracking-wide text-bone/50 hover:text-bone transition-colors">About Us</a>
			</div>

			<div class="flex justify-center space-x-6 mb-6">
				<a href="https://www.facebook.com/OperationGospel" target="_blank" rel="noopener noreferrer" class="text-bone hover:text-ember transition-colors">
					<span class="sr-only">Facebook</span>
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
					</svg>
				</a>
				<a href="https://www.youtube.com/@OperationGospel" target="_blank" rel="noopener noreferrer" class="text-bone hover:text-ember transition-colors">
					<span class="sr-only">YouTube</span>
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.254.418-4.814a2.503 2.503 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" />
					</svg>
				</a>
			</div>

			<div class="text-[8px] text-bone/40 uppercase font-mono tracking-wide">
				<p class="mt-2">© 2026 Operation Gospel. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
