<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	
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
	let copied = $state(false);

	function handleShare() {
		try {
			navigator.clipboard.writeText(window.location.href);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (e) {
			console.error("Share: Clipboard write failed", e);
		}
	}
	
	onMount(() => {
		let observer: IntersectionObserver;

		const init = async () => {
			const response = await fetch(`${base}/data/timeline.json`);
			timeline = await response.json();

			// Setup intersection observer for staggered animations
			observer = new IntersectionObserver(
				(entries) => {
					// Optimization: Batch state updates to avoid layout thrashing
					let hasUpdates = false;
					const newVisibleCards = new Set(visibleCards);

					entries.forEach(entry => {
						if (entry.isIntersecting) {
							const id = entry.target.getAttribute('data-id');
							if (id) {
								newVisibleCards.add(id);
								hasUpdates = true;
								// Optimization: Stop observing once visible to save CPU cycles
								observer.unobserve(entry.target);
							}
						}
					});

					if (hasUpdates) {
						visibleCards = newVisibleCards;
					}
				},
				{ threshold: 0.2 }
			);

			// Need to wait for Svelte to render the fetched timeline items
			setTimeout(() => {
				document.querySelectorAll('.timeline-card').forEach(card => {
					observer.observe(card);
				});
			}, 0);
		};
		
		init();
		
		return () => {
			if (observer) observer.disconnect();
		};
	});
	
	function getTypeColor(type: string) {
		switch (type) {
			case 'hope':
				return 'border-gold bg-gold/10';
			case 'tragedy':
				return 'border-white/10 bg-panel/50';
			case 'mixed':
				return 'border-white/20 bg-panel/50';
			default:
				return 'border-white/10 bg-panel/50';
		}
	}
</script>

<svelte:head>
	<title>Operation Gospel - Georgia Battle</title>
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<div class="max-w-5xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-6xl font-black tracking-tight mb-6 uppercase">
				HB 441 Is Dead. <span class="text-red-600">Burns Must Go.</span>
			</h1>
			<p class="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
				Speaker Jon Burns killed the Equal Protection Act to protect his political career. The only path forward is to remove him from office.
			</p>
			<div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/burns-accountability"
					class="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg uppercase tracking-wide rounded transition-colors"
				>
					Primary Jon Burns
				</a>
				<a
					href="/support"
					class="px-8 py-4 border border-neutral-600 hover:border-neutral-400 text-neutral-300 font-semibold text-lg uppercase tracking-wide rounded transition-colors"
				>
					Support the Fight
				</a>
			</div>
		</div>

		<!-- Status Banner -->
		<div class="bg-red-900/30 border border-red-800 p-8 rounded-lg mb-16 text-center">
			<h3 class="text-2xl font-bold uppercase tracking-wide text-red-500 mb-4">HB 441 Status</h3>
			<p class="text-3xl font-black text-white mb-4">KILLED IN COMMITTEE</p>
			<p class="text-neutral-400 max-w-xl mx-auto">
				Speaker Burns sacrificed equal protection for preborn children to protect vulnerable Republicans from a difficult vote.</p>
		
		<!-- Timeline Cards -->
		<div class="space-y-8 mb-16">
			{#each timeline as event, index (event.id)}
				<div 
					class="timeline-card border-l-4 pl-6 py-4 transition-all duration-500 {getTypeColor(event.type)}"
					data-id={event.id}
					style="animation-delay: {index * 100}ms"
				>
					{#if visibleCards.has(event.id)}
						<div class="opacity-0 animate-fade-in-left" style="animation-delay: {index * 150}ms">
							<div class="flex items-baseline gap-3 mb-2">
								<span class="text-sm font-mono font-bold text-bone/50 tracking-wider">
									{event.date}
								</span>
								{#if event.type === 'hope'}
									<span class="text-xs font-bold text-gold uppercase tracking-wider">* Gospel Hope</span>
								{/if}
							</div>
							<h3 class="text-xl md:text-2xl font-bold mb-3 {event.type === 'hope' ? 'text-gold' : 'text-bone'}">
								{event.title}
							</h3>
							<p class="text-base text-bone/70 leading-relaxed mb-3">
								{event.description}
							</p>
							{#if event.link}
								<a 
									href={event.link} 
									target="_blank" 
									rel="noopener noreferrer"
									class="inline-flex items-center text-teal hover:text-ember font-semibold transition-colors text-sm"
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
			<div class="bg-panel border border-white/10 p-6 rounded-sm">
				<h3 class="text-xl font-bold uppercase tracking-wide text-bone/70 mb-6 text-center">
					The Old Way: Regulation
				</h3>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<span class="text-crimson text-xl mt-1">X</span>
						<div>
							<div class="font-semibold text-bone/90">Arbitrary Lines</div>
							<div class="text-sm text-bone/50">Protects life only after heartbeat, 15 weeks, or viability</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-crimson text-xl mt-1">X</span>
						<div>
							<div class="font-semibold text-bone/90">Immunity</div>
							<div class="text-sm text-bone/50">Often gives immunity to mother or providers</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-crimson text-xl mt-1">X</span>
						<div>
							<div class="font-semibold text-bone/90">Subservient</div>
							<div class="text-sm text-bone/50">Bows to federal court opinions</div>
						</div>
					</li>
				</ul>
			</div>
			
			<!-- New Way: HB 441 -->
			<div class="bg-gold/10 border border-gold p-6 rounded-sm">
				<h3 class="text-xl font-bold uppercase tracking-wide text-gold mb-6 text-center">
					The New Way: HB 441 * The Standard
				</h3>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<span class="text-teal text-xl mt-1">✓</span>
						<div>
							<div class="font-semibold text-bone">Total Abolition</div>
							<div class="text-sm text-bone/70">Defines life from fertilization. No arbitrary limits.</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-teal text-xl mt-1">✓</span>
						<div>
							<div class="font-semibold text-bone">Equal Protection</div>
							<div class="text-sm text-bone/70">Same laws protecting born people apply to pre-born</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-teal text-xl mt-1">✓</span>
						<div>
							<div class="font-semibold text-bone">Interposition</div>
							<div class="text-sm text-bone/70">Asserts state sovereignty to protect life</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- Bottom Copy -->
		<div class="text-center mb-12">
			<p class="text-lg text-bone font-semibold">
				HB 441 was killed in committee by Speaker Jon Burns. The path to justice was blocked by Republican leadership. We demand accountability.
			</p>
		</div>
		
		<!-- Final CTA -->
		<div class="bg-neutral-900 border border-neutral-800 p-12 rounded-lg text-center">
			<h2 class="text-2xl font-bold mb-4">The Only Path Forward</h2>
			<p class="text-neutral-400 max-w-xl mx-auto mb-8">
				As long as Jon Burns is Speaker, no equal protection bill will reach the floor. We must primary him and replace him with someone who will fight.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a 
					href="/burns-accountability"
					class="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg uppercase tracking-wide rounded transition-colors"
				>
					Primary Jon Burns
				</a>
				<a 
					href="/join"
					class="px-8 py-4 border border-neutral-600 hover:border-neutral-400 text-neutral-300 font-semibold text-lg uppercase tracking-wide rounded transition-colors"
				>
					Join the Campaign
				</a>
			</div>
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
