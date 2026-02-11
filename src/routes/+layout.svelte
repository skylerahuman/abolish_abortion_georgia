<script lang="ts">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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

=======
=======
>>>>>>> Home-Page-Revisions
import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/logo_basic.png';
	import { onMount } from 'svelte';
	
	let { children } = $props();
	let mobileMenuOpen = $state(false);
<<<<<<< HEAD
	let menuRef: HTMLElement = $state();
=======
	let menuRef: HTMLElement;
>>>>>>> Home-Page-Revisions
	let justOpened = false;
	let navbarVisible = $state(true);
	let lastScrollY = 0;
	
<<<<<<< HEAD
>>>>>>> Content-Changes-By-Skyler
	const navItems = [
		{ href: `${base}/`, label: 'Home' },
		{ href: `${base}/georgia-battle`, label: 'Timeline' },
		{ href: `${base}/faqs`, label: 'FAQs' }
	];
<<<<<<< HEAD

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		if (mobileMenuOpen) {
			navbarVisible = true;
			justOpened = true;
=======
=======
	const navItems = [
		{ href: `${base}/`, label: 'Home' },
		{ href: `${base}/timeline`, label: 'Timeline' },
		{ href: `${base}/faqs`, label: 'FAQs' }
	];
>>>>>>> Home-Page-Revisions
	
	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		if (mobileMenuOpen) {
			// Show navbar when opening menu
			navbarVisible = true;
			// Set flag to prevent immediate close from scroll
			justOpened = true;
			// Clear flag after 300ms
<<<<<<< HEAD
>>>>>>> Content-Changes-By-Skyler
=======
>>>>>>> Home-Page-Revisions
			setTimeout(() => {
				justOpened = false;
			}, 300);
		}
	}
<<<<<<< HEAD
<<<<<<< HEAD

	onMount(() => {
		let scrollTimeout: number;
		let rafId: number | null = null;
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
=======
=======
>>>>>>> Home-Page-Revisions
	
	// Close menu on click outside and on scroll
	onMount(() => {
		let scrollTimeout: number;
<<<<<<< HEAD
=======
		let openTimeout: number;
>>>>>>> Home-Page-Revisions
		
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			// Don't close if clicking the menu button or inside menu
<<<<<<< HEAD
>>>>>>> Content-Changes-By-Skyler
=======
>>>>>>> Home-Page-Revisions
			if (target.closest('button[aria-label="Toggle menu"]')) {
				return;
			}
			if (mobileMenuOpen && menuRef && !menuRef.contains(target)) {
				mobileMenuOpen = false;
				justOpened = false;
			}
		};
<<<<<<< HEAD
<<<<<<< HEAD

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
=======
=======
>>>>>>> Home-Page-Revisions
		
		// Handle scroll: close menu and hide/show navbar
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			
			// Show navbar at top of page
			if (currentScrollY <= 10) {
				navbarVisible = true;
			} else if (!mobileMenuOpen) {
				// Hide navbar when scrolling down (unless menu is open)
				navbarVisible = false;
			}
			
			lastScrollY = currentScrollY;
			
			// Don't close menu if it was just opened
			if (justOpened) {
				return;
			}
			
			// Close menu when scrolling
			clearTimeout(scrollTimeout);
			scrollTimeout = window.setTimeout(() => {
				if (mobileMenuOpen) {
					mobileMenuOpen = false;
				}
			}, 50);
		};
		
		// Use mousedown instead of click for better behavior
		document.addEventListener('mousedown', handleClickOutside);
		window.addEventListener('scroll', handleScroll, { passive: true });
		
		return () => {
			clearTimeout(scrollTimeout);
<<<<<<< HEAD
>>>>>>> Content-Changes-By-Skyler
=======
			clearTimeout(openTimeout);
>>>>>>> Home-Page-Revisions
			document.removeEventListener('mousedown', handleClickOutside);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<title>Operation Gospel</title>
	<link rel="icon" href={logo} />
</svelte:head>

<<<<<<< HEAD
<<<<<<< HEAD
<div class="min-h-screen flex flex-col bg-[#0C1626]">
	<!-- Navigation -->
	<nav
		class="bg-transparent text-white sticky top-0 z-50 transition-all duration-300 {navbarVisible
			? 'translate-y-0 opacity-100'
			: '-translate-y-full opacity-0'}"
	>
		<div class="w-full px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<!-- Menu Button (Left) - Logo Icon - Desktop and Mobile -->
				<div class="flex items-center relative z-50">
=======
<style>
=======
<style>
	.logo-button img {
		transition: filter 0.2s ease;
	}
>>>>>>> Home-Page-Revisions
	.logo-button:hover img {
		filter: brightness(0) saturate(100%) invert(28%) sepia(93%) saturate(3166%) hue-rotate(348deg) brightness(93%) contrast(95%);
	}
</style>

<div class="min-h-screen flex flex-col">
	<!-- Navigation -->
	<nav class="bg-transparent text-white sticky top-0 z-50 transition-all duration-300 {navbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}">
		<div class="w-full px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
<<<<<<< HEAD
				<!-- Menu Button (Left) - Logo Icon - Desktop only -->
				<div class="hidden md:flex items-center relative z-50">
>>>>>>> Content-Changes-By-Skyler
=======
				<!-- Menu Button (Left) - Logo Icon -->
				<div class="flex items-center relative z-50">
>>>>>>> Home-Page-Revisions
					<button
						onclick={toggleMenu}
						class="logo-button focus:outline-none cursor-pointer relative z-50"
						aria-label="Toggle menu"
					>
						<img src={logo} alt="Menu" class="h-10 w-auto" />
					</button>
				</div>
<<<<<<< HEAD
<<<<<<< HEAD

				<!-- Operation Gospel Text (Right) - Desktop only -->
				<div class="hidden md:flex items-center">
					<a
						href="{base}/"
						class="text-xl md:text-2xl font-serif font-bold tracking-tight uppercase leading-none whitespace-nowrap"
						aria-current={$page.url.pathname === `${base}/` ? 'page' : undefined}
					>
=======
				
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
					<a href="{base}/" class="text-xl md:text-2xl font-serif font-bold tracking-tight uppercase leading-none whitespace-nowrap">
>>>>>>> Content-Changes-By-Skyler
						Operation Gospel
					</a>
				</div>
			</div>
		</div>
<<<<<<< HEAD

		<!-- Hamburger Menu -->
		{#if mobileMenuOpen}
			<div
				bind:this={menuRef}
				class="bg-panel backdrop-blur-md border-t border-white/10 p-6 relative z-50"
			>
				{#each navItems as item}
					<a
						href={item.href}
						onclick={() => (mobileMenuOpen = false)}
						class="block w-full text-left py-4 px-6 hover:text-bone hover:bg-charcoal transition-all duration-200 rounded-sm text-base font-bold tracking-wide uppercase
							{$page.url.pathname === item.href
							? 'text-crimson bg-charcoal border-l-4 border-crimson'
							: 'text-bone/70 border-l-4 border-transparent'}"
						aria-current={$page.url.pathname === item.href ? 'page' : undefined}
=======
		
		<!-- Hamburger Menu -->
		{#if mobileMenuOpen}
			<div bind:this={menuRef} class="bg-panel backdrop-blur-md border-t border-white/10 p-6 relative z-50">
=======
				
				<!-- Operation Gospel Text (Right) - Hidden on mobile -->
				<div class="hidden md:flex items-center">
					<a href="{base}/" class="text-xl md:text-2xl font-serif font-bold tracking-tight uppercase leading-none whitespace-nowrap">
						Operation Gospel
					</a>
				</div>
				
				<!-- Logo Icon (Right) - Mobile only -->
				<div class="md:hidden flex items-center">
					<a href="{base}/">
						<img src={logo} alt="Operation Gospel" class="h-10 w-auto" />
					</a>
				</div>
			</div>
		</div>
		
		<!-- Hamburger Menu -->
		{#if mobileMenuOpen}
			<div bind:this={menuRef} class="bg-neutral-950 backdrop-blur-md border-t border-neutral-800 p-6 relative z-50">
>>>>>>> Home-Page-Revisions
=======
	import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();
	let mobileMenuOpen = $state(false);
	
	const navItems = [
		{ href: `${base}/`, label: 'Home' },
		{ href: `${base}/timeline`, label: 'Timeline' },
		{ href: `${base}/get-involved`, label: 'Get Involved' },
		{ href: `${base}/faqs`, label: 'FAQs' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-black text-white">
	<!-- Navigation -->
	<nav class="bg-black text-white shadow-lg sticky top-0 z-50 border-b border-neutral-900">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<!-- Logo/Brand -->
				<div class="flex items-center space-x-3">
					<div class="text-2xl text-red-600 font-bold">
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L11 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c-.25.78-.03 1.661.58 2.173.609.512 1.456.56 2.116.116l.906-.605-.9-2.814a1 1 0 01-.084-.374 1.088 1.088 0 01.084-.374l.9-2.814-.906-.605c-.66-.444-1.507-.396-2.116.116a2.267 2.267 0 00-.58 2.173z" clip-rule="evenodd" />
						</svg>
					</div>
					<div>
						<a href="{base}/" class="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none">
							Equal Protection
						</a>
						<p class="text-[10px] text-neutral-500 tracking-widest uppercase font-bold">The Road to Abolition</p>
					</div>
				</div>
				
				<!-- Desktop Navigation -->
				<div class="hidden md:flex md:items-center md:space-x-1">
					{#each navItems as item}
						<a 
							href={item.href}
							class="hover:text-neutral-300 hover:bg-neutral-900 transition-all duration-200 px-3 py-3 text-[10px] font-bold tracking-wider uppercase rounded-sm
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
>>>>>>> Home-Page-Tweaks
				{#each navItems as item}
					<a
						href={item.href}
						onclick={() => mobileMenuOpen = false}
<<<<<<< HEAD
<<<<<<< HEAD
						class="block w-full text-left py-4 px-6 hover:text-bone hover:bg-charcoal transition-all duration-200 rounded-sm text-base font-bold tracking-wide uppercase
							{$page.url.pathname === item.href ? 'text-crimson bg-charcoal border-l-4 border-crimson' : 'text-bone/70 border-l-4 border-transparent'}"
>>>>>>> Content-Changes-By-Skyler
=======
						class="block w-full text-left py-4 px-6 hover:text-white hover:bg-neutral-900 transition-all duration-200 rounded-sm text-base font-bold tracking-wide uppercase
							{$page.url.pathname === item.href ? 'text-red-500 bg-neutral-900 border-l-4 border-red-600' : 'text-neutral-300 border-l-4 border-transparent'}"
>>>>>>> Home-Page-Revisions
=======
						class="block w-full text-left py-3 px-4 hover:text-neutral-300 hover:bg-neutral-900 transition-all duration-200 rounded-sm text-[10px] font-bold tracking-wider uppercase
							{$page.url.pathname === item.href ? 'text-red-500 bg-neutral-900 border-l-2 border-red-600' : 'text-neutral-500 border-l-2 border-transparent'}"
>>>>>>> Home-Page-Tweaks
					>
						{item.label}
					</a>
				{/each}
<<<<<<< HEAD
				<a
<<<<<<< HEAD
<<<<<<< HEAD
					href="{base}/join"
					onclick={() => (mobileMenuOpen = false)}
					class="block w-full text-left py-4 px-6 text-bone/70 hover:text-bone hover:bg-charcoal transition-all duration-200 rounded-sm text-base font-bold tracking-wide uppercase border-l-4 border-transparent"
					aria-current={$page.url.pathname === `${base}/join` ? 'page' : undefined}
				>
					Join
				</a>
				<a
					href="{base}/support"
					onclick={() => (mobileMenuOpen = false)}
					class="block w-full text-left py-4 px-6 bg-crimson/10 text-crimson hover:bg-crimson/20 hover:text-ember transition-all duration-200 rounded-sm text-base font-bold tracking-wide uppercase border-l-4 border-crimson mt-3"
					aria-current={$page.url.pathname === `${base}/support` ? 'page' : undefined}
				>
					Support
=======
					href="{base}/respond"
					onclick={() => mobileMenuOpen = false}
					class="block w-full text-left py-4 px-6 bg-crimson/10 text-crimson hover:bg-crimson/20 hover:text-ember transition-all duration-200 rounded-sm text-base font-bold tracking-wide uppercase border-l-4 border-crimson mt-3"
				>
					Pray. Fight. Give.
>>>>>>> Content-Changes-By-Skyler
=======
					href="{base}/respond"
					onclick={() => mobileMenuOpen = false}
					class="block w-full text-left py-4 px-6 bg-red-900/20 text-red-500 hover:bg-red-900/40 hover:text-red-400 transition-all duration-200 rounded-sm text-base font-bold tracking-wide uppercase border-l-4 border-red-600 mt-3"
				>
					Pray. Fight. Give.
>>>>>>> Home-Page-Revisions
				</a>
=======
>>>>>>> Home-Page-Tweaks
			</div>
		{/if}
	</nav>

	<!-- Main Content -->
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	<main class="flex-1 flex flex-col">
=======
	<main class="flex-1">
>>>>>>> Content-Changes-By-Skyler
=======
	<main class="flex-1">
>>>>>>> Home-Page-Revisions
=======
	<main class="flex-1">
>>>>>>> Home-Page-Tweaks
		{@render children()}
	</main>

	<!-- Footer -->
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	<footer
		class="bg-panel text-bone/60 border-t border-white/5 relative z-10 {$page.url.pathname ===
		`${base}/support`
			? 'py-6'
			: 'py-12'}"
	>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<p
				class="font-serif font-bold uppercase tracking-widest text-bone {$page.url.pathname ===
				`${base}/support`
					? 'text-sm mb-3'
					: 'text-base mb-2'}"
			>
				<span class="block sm:inline">Scriptural Authority.</span>
				<span class="block sm:inline sm:ml-1">No Compromise.</span>
			</p>

			<div class="flex justify-center {$page.url.pathname === `${base}/support` ? 'mb-3' : 'mb-6'}">
				<a
					href="{base}/about"
					class="font-bold uppercase tracking-wide text-bone/50 hover:text-bone transition-colors {$page
						.url.pathname === `${base}/support`
						? 'text-xs'
						: 'text-sm'}">About Us</a
				>
			</div>

			<div
				class="flex justify-center {$page.url.pathname === `${base}/support`
					? 'mb-3 space-x-4'
					: 'mb-6 space-x-6'}"
			>
				<a
					href="https://www.facebook.com/OperationGospel"
					target="_blank"
					rel="noopener noreferrer"
					class="text-bone hover:text-ember transition-colors"
				>
					<span class="sr-only">Facebook</span>
					<svg
						class="fill-current {$page.url.pathname === `${base}/support` ? 'h-5 w-5' : 'h-6 w-6'}"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
				<a
					href="https://www.youtube.com/@OperationGospel"
					target="_blank"
					rel="noopener noreferrer"
					class="text-bone hover:text-ember transition-colors"
				>
					<span class="sr-only">YouTube</span>
					<svg
						class="fill-current {$page.url.pathname === `${base}/support` ? 'h-5 w-5' : 'h-6 w-6'}"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.254.418-4.814a2.503 2.503 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
							clip-rule="evenodd"
						/>
=======
	<footer class="bg-panel text-bone/60 py-12 border-t border-white/5">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <p class="text-base font-serif font-bold uppercase tracking-widest text-bone mb-2">
				<span class="block sm:inline">Scriptural Authority.</span>
				<span class="block sm:inline sm:ml-1">No Compromise.</span>
			</p>
				<div class="flex justify-center space-x-6 mb-6">
				<a href="https://www.facebook.com/OperationGospel" target="_blank" rel="noopener noreferrer" class="text-bone hover:text-ember transition-colors">
=======
	<footer class="bg-neutral-950 text-neutral-400 py-12 border-t border-neutral-900">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<svg class="w-8 h-8 mx-auto mb-4 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
				<path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"/>
			</svg>

			<div class="flex justify-center space-x-6 mb-6">
				<a href="https://www.facebook.com/OperationGospel" target="_blank" rel="noopener noreferrer" class="text-neutral-500 hover:text-white transition-colors">
>>>>>>> Home-Page-Revisions
					<span class="sr-only">Facebook</span>
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
					</svg>
				</a>
<<<<<<< HEAD
				<a href="https://www.youtube.com/@OperationGospel" target="_blank" rel="noopener noreferrer" class="text-bone hover:text-ember transition-colors">
					<span class="sr-only">YouTube</span>
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.254.418-4.814a2.503 2.503 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" />
>>>>>>> Content-Changes-By-Skyler
=======
				<a href="https://www.youtube.com/@OperationGospel" target="_blank" rel="noopener noreferrer" class="text-neutral-500 hover:text-white transition-colors">
					<span class="sr-only">YouTube</span>
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.254.418-4.814a2.503 2.503 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" />
>>>>>>> Home-Page-Revisions
					</svg>
				</a>
			</div>

<<<<<<< HEAD
			<div class="text-[8px] text-bone/40 uppercase font-mono tracking-wide">
<<<<<<< HEAD
				<p class={$page.url.pathname === `${base}/support` ? 'mt-0' : 'mt-2'}>
					© 2026 Operation Gospel. All rights reserved.
				</p>
=======
				<p class="mt-2">© 2026 Operation Gospel. All rights reserved.</p>
>>>>>>> Content-Changes-By-Skyler
=======
            <p class="text-base font-serif font-bold uppercase tracking-widest text-red-600 mb-2">Scriptural authority. No compromise.</p>
            <div class="text-2xl text-neutral-600 mb-6 font-serif">α &nbsp; ω</div>

			<p class="mb-4 font-serif italic text-xl text-neutral-200">
				"Open your mouth for the mute, for the rights of all who are destitute."
			</p>
			<p class="text-sm mb-8 text-neutral-500">Proverbs 31:8</p>
			<div class="text-[8px] text-neutral-600 uppercase font-mono tracking-wide">
				<p class="mt-2">© 2026 Operation Gospel. All rights reserved.</p>
>>>>>>> Home-Page-Revisions
=======
	<footer class="bg-black text-neutral-400 py-24 border-t border-neutral-900">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
			<!-- Scripture Focus -->
			<div class="space-y-6">
				<div class="text-red-600 font-serif font-bold text-2xl md:text-3xl leading-tight">
					<p class="text-white">"Open thy mouth for the dumb in the cause of all such as are appointed to destruction."</p>
					<p class="mt-4 text-white/90">"Open thy mouth, judge righteously, and plead the cause of the poor and needy."</p>
					<span class="block mt-6 text-red-600 text-sm font-sans uppercase tracking-widest">— Proverbs 31:8-9</span>
				</div>
			</div>

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
>>>>>>> Home-Page-Tweaks
			</div>
		</div>
	</footer>
</div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

<style>
	.logo-button:hover img {
		filter: brightness(0) saturate(100%) invert(28%) sepia(93%) saturate(3166%) hue-rotate(348deg)
			brightness(93%) contrast(95%);
	}
</style>
=======
>>>>>>> Content-Changes-By-Skyler
=======
>>>>>>> Home-Page-Revisions
=======
>>>>>>> Home-Page-Tweaks
