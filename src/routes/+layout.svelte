<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import logo from '$lib/assets/logo_basic.png';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import OverlayMenu from '$lib/components/layout/OverlayMenu.svelte';
	import { mobileMenuOpen } from '$lib/stores';

	let { children } = $props();

	function closeMenu() {
		mobileMenuOpen.set(false);
	}

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			let isOpen = false;
			mobileMenuOpen.subscribe((v) => (isOpen = v))();
			if (isOpen && !target.closest('.nav-container') && !target.closest('.overlay-menu')) {
				mobileMenuOpen.set(false);
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

	<!-- Header with Menu Toggle -->
	<Header />

	<!-- Full-Screen Overlay Menu -->
	<OverlayMenu onClose={closeMenu} />

	<!-- Main Content -->
	<main id="main-content" tabindex="-1" class="flex-1 focus:outline-none">
		{@render children()}
	</main>

	<!-- Footer -->
	<Footer />
</div>
