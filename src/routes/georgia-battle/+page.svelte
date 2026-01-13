<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	
	interface TimelineEvent {
		id: string;
		date: string;
		title: string;
		description: string;
		type: 'tragedy' | 'hope' | 'mixed';
		link?: string;
		linkText?: string;
	}
	
	let timeline = $state<TimelineEvent[]>([]);
	let visibleCards = $state<Set<string>>(new Set());
	
	onMount(async () => {
		const response = await fetch(`${base}/data/timeline.json`);
		timeline = await response.json();
		
		// Setup intersection observer for staggered animations
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const id = entry.target.getAttribute('data-id');
						if (id) {
							visibleCards = new Set([...visibleCards, id]);
						}
					}
				});
			},
			{ threshold: 0.2 }
		);
		
		document.querySelectorAll('.timeline-card').forEach(card => {
			observer.observe(card);
		});
		
		return () => observer.disconnect();
	});
	
	function getTypeColor(type: string) {
		switch (type) {
			case 'hope':
				return 'border-amber-600 bg-amber-950/20';
			case 'tragedy':
				return 'border-neutral-700 bg-neutral-900/50';
			case 'mixed':
				return 'border-neutral-600 bg-neutral-800/50';
			default:
				return 'border-neutral-700 bg-neutral-900/50';
		}
	}
</script>

<svelte:head>
	<title>Operation Gospel - Georgia Battle</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-neutral-900 text-neutral-100 px-6 py-16">
	<div class="max-w-5xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16 relative">
			<h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-red-600 mb-3 uppercase">
				The Current Battleground
			</h1>
			<h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-6">
				Georgia HB 441: Equal Protection
			</h2>
			<p class="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
				Trace the legal history from the judicial fiat of 1973 to the legislative battles of today.
			</p>
			<p class="text-base text-neutral-400 max-w-3xl mx-auto leading-relaxed mt-4">
				We have moved beyond the "Heartbeat Bills" that merely set a timing threshold for death. The Georgia Equal Protection Act (HB 441) represents the standard of justice required by God and the Constitution.
			</p>
			<button
				onclick={ () => { navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!'); } }
				class="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors text-sm"
				aria-label="Share this page"
			>
				Share →
			</button>
		</div>

		<!-- Progress Tracker -->
		<div class="bg-neutral-900 border border-neutral-800 p-6 rounded-sm mb-16 text-center">
			<h3 class="text-xl font-bold uppercase tracking-wide text-amber-500 mb-4">HB 441 Status</h3>
			<p class="text-lg text-neutral-300 mb-2">Currently in committee</p>
			<p class="text-base text-neutral-400 mb-4">Next step: Floor vote expected Q2 2026</p>
			<a href="https://www.legis.ga.gov/legislation/64602" target="_blank" rel="noopener noreferrer" class="text-red-500 hover:text-red-400 underline">Track the bill →</a>
		</div>
		
		<!-- Timeline Cards -->
		<div class="space-y-8 mb-16">
			{#each timeline as event, index}
				<div 
					class="timeline-card border-l-4 pl-6 py-4 transition-all duration-500 {getTypeColor(event.type)}"
					data-id={event.id}
					style="animation-delay: {index * 100}ms"
				>
					{#if visibleCards.has(event.id) || true}
						<div class="opacity-0 animate-fade-in-left" style="animation-delay: {index * 150}ms">
							<div class="flex items-baseline gap-3 mb-2">
								<span class="text-sm font-mono font-bold text-neutral-500 tracking-wider">
									{event.date}
								</span>
								{#if event.type === 'hope'}
									<span class="text-xs font-bold text-amber-500 uppercase tracking-wider">⭐ Gospel Hope</span>
								{/if}
							</div>
							<h3 class="text-xl md:text-2xl font-bold mb-3 {event.type === 'hope' ? 'text-amber-400' : 'text-neutral-200'}">
								{event.title}
							</h3>
							<p class="text-base text-neutral-400 leading-relaxed mb-3">
								{event.description}
							</p>
							{#if event.link}
								<a 
									href={event.link} 
									target="_blank" 
									rel="noopener noreferrer"
									class="inline-flex items-center text-sm text-red-500 hover:text-red-400 font-semibold transition-colors"
								>
									{event.linkText || 'Learn More'}
									<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
									</svg>
								</a>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
		
		<!-- Comparison Table -->
		<div class="grid md:grid-cols-2 gap-8 mb-16">
			<!-- Old Way: Regulation -->
			<div class="bg-neutral-900 border border-neutral-800 p-6 rounded-sm">
				<h3 class="text-xl font-bold uppercase tracking-wide text-neutral-400 mb-6 text-center">
					The Old Way: Regulation
				</h3>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<span class="text-red-500 text-xl mt-1">❌</span>
						<div>
							<div class="font-semibold text-neutral-300">Arbitrary Lines</div>
							<div class="text-sm text-neutral-500">Protects life only after heartbeat, 15 weeks, or viability</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-red-500 text-xl mt-1">❌</span>
						<div>
							<div class="font-semibold text-neutral-300">Immunity</div>
							<div class="text-sm text-neutral-500">Often gives immunity to mother or providers</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-red-500 text-xl mt-1">❌</span>
						<div>
							<div class="font-semibold text-neutral-300">Subservient</div>
							<div class="text-sm text-neutral-500">Bows to federal court opinions</div>
						</div>
					</li>
				</ul>
			</div>
			
			<!-- New Way: HB 441 -->
			<div class="bg-amber-950/20 border border-amber-600 p-6 rounded-sm">
				<h3 class="text-xl font-bold uppercase tracking-wide text-amber-500 mb-6 text-center">
					The New Way: HB 441 ⭐ The Standard
				</h3>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<span class="text-green-500 text-xl mt-1">✅</span>
						<div>
							<div class="font-semibold text-neutral-200">Total Abolition</div>
							<div class="text-sm text-neutral-400">Defines life from fertilization. No arbitrary limits.</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-green-500 text-xl mt-1">✅</span>
						<div>
							<div class="font-semibold text-neutral-200">Equal Protection</div>
							<div class="text-sm text-neutral-400">Same laws protecting born people apply to pre-born</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-green-500 text-xl mt-1">✅</span>
						<div>
							<div class="font-semibold text-neutral-200">Interposition</div>
							<div class="text-sm text-neutral-400">Asserts state sovereignty to protect life</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- Bottom Copy -->
		<div class="text-center mb-12">
			<p class="text-lg text-neutral-300 font-semibold">
				Abortion continues in Georgia today. Under current law, preborn neighbors are still being killed daily. HB 441 is the path to justice.
			</p>
		</div>
		
		<!-- CTAs -->
		<div class="flex flex-col md:flex-row gap-4 items-center justify-center">
			<a 
				href="{base}/near-me"
				class="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
			>
				What can I do in my district?
			</a>
			<a 
				href="{base}/respond"
				class="w-full md:w-auto bg-transparent border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 font-semibold px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 text-center"
			>
				Pray. Fight. Give.
			</a>
		</div>
	</div>
</div>

<style>
	@keyframes fade-in-left {
		from {
			opacity: 0;
			transform: translateX(-30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	
	.animate-fade-in-left {
		animation: fade-in-left 0.6s ease-out forwards;
	}
</style>
