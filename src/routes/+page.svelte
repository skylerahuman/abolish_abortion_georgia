<svelte:head>
	<style>
		.home-bg {
			background-image: linear-gradient(to bottom, rgba(2, 6, 23, 0.8), rgba(2, 6, 23, 0.6), rgba(2, 6, 23, 1)), url('/images/backdrop.png');
			background-attachment: fixed;
			background-position: 90% 20%;
			background-size: cover;
			background-repeat: no-repeat;
		}
	</style>
</svelte:head>

<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	let heroSection: HTMLElement;

	onMount(() => {
		// A gentle nudge to encourage scrolling, kept for UX
		setTimeout(() => {
			const currentScroll = window.scrollY;
			if (currentScroll === 0) {
				window.scrollTo({ top: 1, behavior: 'smooth' });
			}
		}, 2500);
	});
</script>

<div class="home-bg">
	<!-- Hero Section -->
	<section
		bind:this={heroSection}
		class="relative min-h-[90vh] md:min-h-[85vh] py-12 md:py-16 px-4 flex flex-col justify-center border-b border-crimson/20 overflow-hidden"
	>
		<div class="relative z-10 w-full mx-auto px-6 md:px-16 mt-auto">
			<div class="w-full max-w-3xl mr-auto">
				<h2
					class="text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light text-bone tracking-normal mb-8 drop-shadow-lg space-y-1 md:space-y-2 leading-tight"
				>
					<div class="text-left whitespace-nowrap">
						<span>Called by <span class="text-crimson">Christ</span></span>
					</div>
					<div class="text-left whitespace-nowrap">
						<span class="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-bone/70"
							>to</span
						> condemn sin
					</div>
					<div class="text-left whitespace-nowrap">
						<span class="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-bone/70"
							>and</span
						> care for sinners
					</div>
					<div class="text-left whitespace-nowrap">
						<span class="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-bone/70"
							>so that we might</span
						> crush child sacrifice.
					</div>
				</h2>
			</div>
		</div>

		<!-- Scroll Down Indicator -->
		<div
			class="relative z-10 mt-auto mx-auto text-center text-bone/50 animate-bounce cursor-pointer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
			</svg>
		</div>
	</section>

	<!-- Our Focus Section -->
	<section class="relative z-10 bg-transparent py-32 sm:py-40">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 class="text-4xl font-serif font-bold text-bone tracking-tight mb-20 text-center">
				Our Focus
			</h2>
			<div class="grid md:grid-cols-3 gap-8">
				<!-- Legislation Engagement -->
				<a
					href="{base}/georgia-battle"
					class="block bg-panel/80 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-panel hover:border-crimson/50 transition-all duration-300 group shadow-lg hover:shadow-crimson/10 hover:-translate-y-1"
				>
					<div
						class="mb-6 inline-block p-3 rounded-lg bg-crimson/20 text-crimson group-hover:bg-crimson/30 group-hover:text-ember transition-colors"
					>
						<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16a2 2 0 100-4 2 2 0 000 4z"
							/>
						</svg>
					</div>
					<h3
						class="text-2xl font-serif font-bold text-bone mb-4 group-hover:text-ember transition-colors"
					>
						Legislation Engagement
					</h3>
					<div class="space-y-4 text-bone/70 text-base leading-relaxed font-sans">
						<p class="font-medium text-bone">Roe is over. Equal Protection Laws Matter.</p>
						<p>The Christian Church must pursue biblical justice to put an end to child sacrifice.</p>
					</div>
					<div
						class="mt-8 flex items-center text-teal text-xs font-bold uppercase tracking-widest"
					>
						<span class="group-hover:mr-2 transition-all">Learn More</span>
						<svg
							class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							></path></svg
						>
					</div>
				</a>

				<!-- Abolition with Evangelism -->
				<a
					href="{base}/abolition-basics"
					class="block bg-panel/80 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-panel hover:border-crimson/50 transition-all duration-300 group shadow-lg hover:shadow-crimson/10 hover:-translate-y-1"
				>
					<div
						class="mb-6 inline-block p-3 rounded-lg bg-crimson/20 text-crimson group-hover:bg-crimson/30 group-hover:text-ember transition-colors"
					>
						<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
							/>
						</svg>
					</div>
					<h3
						class="text-2xl font-serif font-bold text-bone mb-4 group-hover:text-ember transition-colors"
					>
						Abolition with Evangelism
					</h3>
					<div class="space-y-4 text-bone/70 text-base leading-relaxed font-sans">
						<p>
							Through partnerships with two full-time evangelists, we are taking the Gospel to child
							sacrifice centers across GA.
						</p>
						<p>
							We not only condemn the sin of murder, we preach forgiveness in Christ. We also provide
							blessing bags, baby showers, adoptive services, and counseling for mothers and fathers
							who chose life.
						</p>
					</div>
					<div
						class="mt-8 flex items-center text-teal text-xs font-bold uppercase tracking-widest"
					>
						<span class="group-hover:mr-2 transition-all">Learn More</span>
						<svg
							class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							></path></svg
						>
					</div>
				</a>

				<!-- Local Churches -->
				<a
					href="{base}/near-me"
					class="block bg-panel/80 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-panel hover:border-crimson/50 transition-all duration-300 group shadow-lg hover:shadow-crimson/10 hover:-translate-y-1"
				>
					<div
						class="mb-6 inline-block p-3 rounded-lg bg-crimson/20 text-crimson group-hover:bg-crimson/30 group-hover:text-ember transition-colors"
					>
						<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
							/>
						</svg>
					</div>
					<h3
						class="text-2xl font-serif font-bold text-bone mb-4 group-hover:text-ember transition-colors"
					>
						Local Churches
					</h3>
					<div class="space-y-4 text-bone/70 text-base leading-relaxed font-sans">
						<p>
							We work with local churches to equip them in similar outreach programs to fulfill the
							Great Commission.
						</p>
					</div>
					<div
						class="mt-8 flex items-center text-teal text-xs font-bold uppercase tracking-widest"
					>
						<span class="group-hover:mr-2 transition-all">Join the Network</span>
						<svg
							class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							></path></svg
						>
					</div>
				</a>
			</div>
		</div>
	</section>
</div>