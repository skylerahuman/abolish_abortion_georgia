<<<<<<< Updated upstream
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

<div class="min-h-screen bg-charcoal text-bone px-6 py-16">
	<div class="max-w-5xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16 relative">
			<h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-crimson mb-3 uppercase">
				The Current Battleground
			</h1>
			<h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-6">
				Georgia HB 441: Equal Protection
			</h2>
			<p class="text-lg text-bone/70 max-w-3xl mx-auto leading-relaxed">
				Trace the legal history from the judicial fiat of 1973 to the legislative battles of today.
			</p>
			<p class="text-base text-bone/70 max-w-3xl mx-auto leading-relaxed mt-4">
				We have moved beyond the "Heartbeat Bills" that merely set a timing threshold for death. The Georgia Equal Protection Act (HB 441) represents the standard of justice required by God and the Constitution.
			</p>
			<button
				onclick={handleShare}
				class="absolute top-4 right-4 text-bone/50 hover:text-bone transition-colors text-sm flex items-center gap-2"
				aria-label={copied ? "Link copied" : "Share this page"}
				disabled={copied}
			>
				{#if copied}
					Copied! ✓
				{:else}
					Share →
				{/if}
			</button>
		</div>

		<!-- Progress Tracker -->
		<div class="bg-panel border border-white/10 p-6 rounded-sm mb-16 text-center">
			<h3 class="text-xl font-bold uppercase tracking-wide text-crimson mb-4">HB 441 Status</h3>
			<p class="text-lg text-bone/90 mb-2">Killed in Committee</p>
			<p class="text-base text-bone/70 mb-4">Speaker Jon Burns refused to allow a vote. April 2026.</p>
			<a href="https://www.legis.ga.gov/legislation/64602" target="_blank" rel="noopener noreferrer" class="text-teal hover:text-ember underline">Track the bill →</a>
		</div>
		
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
									<span class="text-xs font-bold text-gold uppercase tracking-wider">⭐ Gospel Hope</span>
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
						<span class="text-crimson text-xl mt-1">❌</span>
						<div>
							<div class="font-semibold text-bone/90">Arbitrary Lines</div>
							<div class="text-sm text-bone/50">Protects life only after heartbeat, 15 weeks, or viability</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-crimson text-xl mt-1">❌</span>
						<div>
							<div class="font-semibold text-bone/90">Immunity</div>
							<div class="text-sm text-bone/50">Often gives immunity to mother or providers</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-crimson text-xl mt-1">❌</span>
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
					The New Way: HB 441 ⭐ The Standard
				</h3>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<span class="text-teal text-xl mt-1">✅</span>
						<div>
							<div class="font-semibold text-bone">Total Abolition</div>
							<div class="text-sm text-bone/70">Defines life from fertilization. No arbitrary limits.</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-teal text-xl mt-1">✅</span>
						<div>
							<div class="font-semibold text-bone">Equal Protection</div>
							<div class="text-sm text-bone/70">Same laws protecting born people apply to pre-born</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-teal text-xl mt-1">✅</span>
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
				HB 441 was killed in committee. Speaker Burns chose political calculation over the lives of the preborn. The fight for accountability continues.
			</p>
		</div>
		
		<!-- CTAs -->
		<div class="flex flex-col md:flex-row gap-4 items-center justify-center">
			<a 
				href="{base}/join"
				class="w-full md:w-auto bg-crimson hover:bg-ember text-white font-bold text-lg px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
			>
				Join the Fight
			</a>
			<a 
				href="{base}/support"
				class="w-full md:w-auto bg-transparent border border-white/20 hover:border-white/40 text-bone hover:text-white font-semibold px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 text-center"
			>
				Support the Cause
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
=======
<script lang="ts">
	import { base } from '$app/paths';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import ExegesisModal from '$lib/components/ExegesisModal.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();

	let rawTextVisible = $state(true);
	let showModal = $state(false);
	let modalContent = $state({ title: '', content: '' });
	
	let activeSection = $state(-1);
	let billTextContainer = $state<HTMLElement>();

	function openModal(title: string, content: string) {
		modalContent = { title, content };
		showModal = true;
	}

	// Line mappings for each section (approximate line numbers in the bill text)
	const sectionLines = [
		0,   // Intro
		15,  // Preamble
		45,  // Personhood
		80,  // Equal Protection
		110  // Interposition
	];

	function scrollBillToLine(sectionIndex: number) {
		if (!billTextContainer || sectionIndex < 0) return;
		
		const pre = billTextContainer.querySelector('pre');
		if (!pre) return;

		// Calculate approximate scroll position based on line number
		// Assuming ~24px per line
		const lineHeight = 24;
		const targetScroll = sectionLines[sectionIndex] * lineHeight;
		
		billTextContainer.scrollTo({
			top: targetScroll,
			behavior: 'smooth'
		});
	}

	// Action to track visibility of sections
	function observeSection(node: HTMLElement, index: number) {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					activeSection = index;
					scrollBillToLine(index);
				}
			},
			{ threshold: 0.5, rootMargin: "-10% 0px -40% 0px" }
		);
		
		observer.observe(node);
		
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}

	const halfMeasures = [
		{ item: 'Arbitrary Lines', desc: 'Heartbeat, 15 weeks, viability—children before these thresholds have no protection.' },
		{ item: 'Grants Immunity', desc: 'Mothers and providers receive immunity in cases deemed "acceptable."' },
		{ item: 'Defers to Courts', desc: 'Will not enforce if federal courts object.' }
	];

	const equalProtection = [
		{ item: 'Life from Fertilization', desc: 'No arbitrary limits. Protection begins at fertilization.' },
		{ item: 'Equal Application', desc: 'Same laws protect pre-born children as protect born persons.' },
		{ item: 'Interposition', desc: 'Asserts state sovereignty against unjust federal rulings.' }
	];
</script>

<svelte:head>
	<title>HB 441 / HB 496: The Equal Protection Act | Operation Gospel</title>
</svelte:head>

<main class="flex flex-col w-full bg-void text-parchment min-h-screen font-body">
	<!-- Page Header -->
	<section class="relative py-24 px-6 border-b border-charcoal bg-void">
		<div class="max-w-7xl mx-auto">
			<div class="flex flex-col md:flex-row md:items-end justify-between gap-12">
				<div class="md:max-w-3xl">
					<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-burgundy/30 bg-burgundy/10 text-burgundy mb-8">
						<span class="text-xs font-ui font-bold uppercase tracking-widest">Legislative Battle</span>
					</div>
					<h1 class="text-5xl md:text-7xl font-display font-black text-parchment tracking-tight mb-6 leading-tight">
						Georgia's Battle for Equal Protection
					</h1>
					<div class="text-xl text-parchment/80 max-w-2xl leading-relaxed space-y-6 font-body">
						<p>
							Doe v. Bolton—decided by Georgia's own Supreme Court in 1973—authorized abortion on demand through all nine months. Roe v. Wade kept this in place for 50 years.
						</p>
						<p>
							After Dobbs returned authority to the states, Georgia passed a heartbeat bill. It saves some lives, but children before six weeks have no legal protection.
						</p>
						<p class="text-parchment font-medium border-l-2 border-gold pl-4 italic">
							HB 441 (reintroduced as HB 496) would extend equal protection to all pre-born children—from fertilization until birth. This legislation establishes the standard for equal protection in Georgia.
						</p>
					</div>
				</div>
				<div class="flex flex-col gap-6 text-left md:text-right min-w-[240px] border-l md:border-l-0 md:border-r border-charcoal pl-6 md:pl-0 md:pr-6">
					<div class="group">
						<div class="text-xs font-ui text-gold uppercase tracking-widest font-bold mb-2">
							Bill Author
						</div>
						<a href="https://www.emorydunahoo.com/" target="_blank" rel="noopener noreferrer" class="text-parchment font-display font-bold text-2xl tracking-tight hover:text-gold transition-colors">
							Rep. Emory Dunahoo
						</a>
					</div>
					<div class="group">
						<div class="text-xs font-ui text-parchment-muted uppercase tracking-widest font-bold mb-2">
							Sponsors
						</div>
						<div class="text-parchment/80 font-mono text-base leading-relaxed">
							20+ Co-Sponsors
						</div>
					</div>
					<div class="group">
						<div class="text-xs font-ui text-parchment-muted uppercase tracking-widest font-bold mb-2">
							Goal
						</div>
						<div class="text-parchment/80 font-mono text-base leading-relaxed">
							Pass in 2026-2027 Session
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Scrollytelling Bill Analysis -->
	<div class="flex flex-col lg:flex-row max-w-[1920px] mx-auto w-full border-b border-charcoal">
		{#if rawTextVisible}
			<aside
				transition:slide={{ duration: 300, easing: cubicOut }}
				class="w-full lg:w-[45%] bg-panel border-b lg:border-b-0 lg:border-r border-charcoal lg:sticky lg:top-0 lg:h-screen flex flex-col z-20 shadow-[10px_0_30px_-10px_rgba(0,0,0,0.5)]"
			>
				<div class="p-4 lg:p-8 h-full flex flex-col">
					<div class="flex flex-col h-full bg-void rounded-sm border border-charcoal shadow-2xl overflow-hidden relative group">
						<div class="bg-panel px-4 py-3 flex items-center justify-between border-b border-charcoal select-none">
							<div class="flex items-center gap-2">
								<button
									onclick={() => (rawTextVisible = false)}
									class="flex gap-2 opacity-60 hover:opacity-100 transition-opacity"
									aria-label="Collapse bill text view"
								>
									<div class="w-3 h-3 rounded-full bg-burgundy border border-burgundy-dark shadow-sm"></div>
									<div class="w-3 h-3 rounded-full bg-gold border border-gold-muted shadow-sm"></div>
									<div class="w-3 h-3 rounded-full bg-parchment-muted border border-parchment-dark shadow-sm"></div>
								</button>
							</div>
							<div class="text-xs font-mono text-gold flex items-center gap-2 opacity-80">
								source_hb441_hb496.txt
							</div>
							<div class="w-10"></div>
						</div>
						<div class="bg-panel-elevated px-4 py-2 flex items-center gap-4 border-b border-charcoal">
							<a
								href="https://www.legis.ga.gov/legislation/64602"
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gold/10 text-xs font-mono text-parchment-muted hover:text-gold transition-all"
							>
								Track Bill
							</a>
							<div class="ml-auto text-xs font-mono text-parchment-muted">Ln {sectionLines[Math.max(0, activeSection)] || 1}, Col 1</div>
						</div>
						<div bind:this={billTextContainer} class="flex-1 overflow-y-auto terminal-scroll p-6 lg:p-8 font-mono text-sm leading-loose bg-void scroll-smooth relative text-parchment/80">
							<pre class="whitespace-pre-wrap">{data.billText}</pre>
							<div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to bottom, rgba(10, 9, 8, 0) 20%, rgba(10, 9, 8, 0.8) 80%, rgba(10, 9, 8, 1) 100%);"></div>
						</div>
					</div>
				</div>
			</aside>
		{/if}

		<article class:w-full={!rawTextVisible} class:lg:w-[55%]={rawTextVisible} class="relative z-10 bg-void overflow-hidden transition-all duration-300">
			{#if !rawTextVisible}
				<button
					onclick={() => (rawTextVisible = true)}
					class="fixed top-24 left-0 z-50 bg-panel px-4 py-3 rounded-r-sm border border-charcoal shadow-lg hover:bg-panel-elevated transition-colors text-gold font-ui font-bold uppercase tracking-widest text-xs"
					aria-label="Expand bill text view"
				>
					Expand Text
				</button>
			{/if}
			
			<div class="relative z-10 max-w-3xl mx-auto px-8 py-12 lg:py-24 space-y-32">
				<div use:observeSection={0} class="min-h-[60vh] flex flex-col justify-center transition-all duration-700 {activeSection === 0 || activeSection === -1 ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'}">
					<div class="flex items-center gap-4 mb-8">
						<div class="h-px w-12 bg-gold"></div>
						<span class="text-gold font-ui text-sm font-bold tracking-widest uppercase">00. Introduction</span>
					</div>
					<h2 class="text-5xl font-display font-bold text-parchment tracking-tight mb-8">Understanding the Text</h2>
					<p class="text-2xl leading-relaxed text-parchment/70 font-body">
						Legislation can be dense, but the theology behind it is clear. This tool allows you to read the raw legal text on the left while walking through the biblical and moral reasoning on the right. We believe that <span class="text-parchment font-semibold border-b border-burgundy pb-1">bad laws are often the result of bad theology</span>.
					</p>
				</div>

				<!-- Section 1 -->
				<div use:observeSection={1} class="min-h-[70vh] flex flex-col justify-center transition-all duration-700 {activeSection === 1 ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'}">
					<div class="mb-8 flex items-center gap-4">
						<span class="bg-burgundy/10 text-burgundy border border-burgundy/30 px-4 py-1.5 rounded-sm text-xs font-ui font-bold uppercase tracking-widest">Preamble & Findings</span>
					</div>
					<h3 class="text-4xl md:text-5xl font-display font-bold text-parchment mb-8">Establishing the Moral Foundation</h3>
					<div class="text-xl text-parchment/80 mb-12 leading-relaxed font-body">
						<p>
							The bill's preamble establishes the moral and scientific foundation for the entire law: that human life begins at fertilization and deserves protection. This aligns with the biblical understanding of rulers as ministers of God for good (Romans 13) and answers the call of Proverbs 31:8-9 to "Speak up for those who cannot speak for themselves."
						</p>
					</div>
					<div class="bg-panel border-l-4 border-gold p-8 rounded-sm relative overflow-hidden shadow-xl">
						<p class="text-gold font-display text-3xl italic leading-relaxed mb-6 relative z-10">
							"Open your mouth, judge righteously, defend the rights of the poor and needy."
						</p>
						<cite class="text-gold-muted font-ui font-bold text-xs not-italic uppercase tracking-widest relative z-10">Proverbs 31:9</cite>
					</div>
				</div>

				<!-- Section 2 -->
				<div use:observeSection={2} class="min-h-[70vh] flex flex-col justify-center transition-all duration-700 {activeSection === 2 ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'}">
					<div class="mb-8 flex items-center gap-4">
						<span class="bg-burgundy/10 text-burgundy border border-burgundy/30 px-4 py-1.5 rounded-sm text-xs font-ui font-bold uppercase tracking-widest">Defining Personhood</span>
					</div>
					<h3 class="text-4xl md:text-5xl font-display font-bold text-parchment mb-8">The Imago Dei Argument</h3>
					<div class="text-xl text-parchment/80 mb-12 leading-relaxed font-body">
						<p>
							Science confirms unique human DNA at fertilization. Theology confirms the Image of God from the moment of conception. To define a pre-born human as anything less than a "person" is to deny both scientific reality and the Creator's mark on their humanity. Not viability. Not heartbeat. Fertilization.
						</p>
					</div>
					<div class="bg-panel border-l-4 border-gold p-8 rounded-sm relative overflow-hidden shadow-xl">
						<p class="text-gold font-display text-3xl italic leading-relaxed mb-6 relative z-10">
							"Before I formed you in the womb I knew you, and before you were born I consecrated you..."
						</p>
						<cite class="text-gold-muted font-ui font-bold text-xs not-italic uppercase tracking-widest relative z-10">Jeremiah 1:5</cite>
					</div>
				</div>

				<!-- Section 3 -->
				<div use:observeSection={3} class="min-h-[70vh] flex flex-col justify-center transition-all duration-700 {activeSection === 3 ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'}">
					<div class="mb-8 flex items-center gap-4">
						<span class="bg-burgundy/10 text-burgundy border border-burgundy/30 px-4 py-1.5 rounded-sm text-xs font-ui font-bold uppercase tracking-widest">Equal Protection</span>
					</div>
					<h3 class="text-4xl md:text-5xl font-display font-bold text-parchment mb-8">Equal Weights & Measures</h3>
					<div class="text-xl text-parchment/80 mb-12 leading-relaxed font-body space-y-6">
						<p>
							Partiality in judgment is an abomination to the Lord (Proverbs 20:10). If abortion is murder, the law must treat it as such. This section removes legal immunity and ensures that the same laws that protect born persons apply equally to the pre-born.
						</p>
						<p>
							We cannot have two standards of justice based on a victim's location. Current Georgia law contains provisions that immunize those who pressure or procure abortion. This bill repeals these. The mother's coercion defense remains.
						</p>
					</div>
					<div class="bg-panel border-l-4 border-gold p-8 rounded-sm relative overflow-hidden shadow-xl">
						<p class="text-gold font-display text-3xl italic leading-relaxed mb-6 relative z-10">
							"You shall not distort justice; you shall not be partial..."
						</p>
						<cite class="text-gold-muted font-ui font-bold text-xs not-italic uppercase tracking-widest relative z-10">Deuteronomy 16:19</cite>
					</div>
				</div>
				
				<!-- Section 4 -->
				<div use:observeSection={4} class="min-h-[70vh] flex flex-col justify-center transition-all duration-700 {activeSection === 4 ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'} pb-32">
					<div class="mb-8 flex items-center gap-4">
						<span class="bg-burgundy/10 text-burgundy border border-burgundy/30 px-4 py-1.5 rounded-sm text-xs font-ui font-bold uppercase tracking-widest">Interposition</span>
					</div>
					<h3 class="text-4xl md:text-5xl font-display font-bold text-parchment mb-8">Defying Unjust Rulings</h3>
					<div class="text-xl text-parchment/80 mb-12 leading-relaxed font-body">
						<p>
							The bill invokes Article I, Section I, Paragraph X of the Georgia Constitution. We are asserting that this state will not defer to unjust federal court opinions. Government exists to punish evil. If abortion is evil—and it is—then government must punish it.
						</p>
					</div>
				</div>
			</div>
		</article>
	</div>

	<!-- Comparison Section -->
	<section class="max-w-5xl mx-auto px-6 py-24">
		<div class="text-center mb-16">
			<span class="text-gold font-ui font-bold tracking-widest uppercase text-sm mb-4 block">The Difference</span>
			<h2 class="text-4xl md:text-5xl font-display font-bold text-parchment">Heartbeat Bill vs. Equal Protection</h2>
		</div>
		
		<div class="grid md:grid-cols-2 gap-8">
			<!-- Heartbeat -->
			<div class="bg-panel border border-charcoal p-10 rounded-sm shadow-xl">
				<h3 class="text-sm font-ui font-bold uppercase tracking-widest text-parchment-muted mb-8 text-center border-b border-charcoal pb-6">
					Current Law (Heartbeat)
				</h3>
				<ul class="space-y-8">
					{#each halfMeasures as item}
						<li class="flex items-start gap-5">
							<span class="text-burgundy text-2xl mt-1 shrink-0 font-bold">✕</span>
							<div>
								<div class="font-display font-bold text-parchment text-2xl mb-2">{item.item}</div>
								<div class="text-base font-body text-parchment/60 leading-relaxed">{item.desc}</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Equal Protection -->
			<div class="bg-void border-2 border-gold/30 p-10 rounded-sm shadow-2xl relative overflow-hidden">
				<div class="absolute top-0 left-0 w-full h-1.5 bg-gold"></div>
				<h3 class="text-sm font-ui font-bold uppercase tracking-widest text-gold mb-8 text-center border-b border-gold/20 pb-6">
					HB 441 / HB 496 (Equal Protection)
				</h3>
				<ul class="space-y-8">
					{#each equalProtection as item}
						<li class="flex items-start gap-5">
							<span class="text-gold text-2xl mt-1 shrink-0 font-bold">✓</span>
							<div>
								<div class="font-display font-bold text-parchment text-2xl mb-2">{item.item}</div>
								<div class="text-base font-body text-parchment/80 leading-relaxed">{item.desc}</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	<!-- Teaser & CTA -->
	<section class="border-t border-charcoal bg-panel py-32 relative overflow-hidden">
		<!-- Decorative background elements -->
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none opacity-5">
			<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-burgundy),transparent_70%)]"></div>
		</div>
		
		<div class="max-w-3xl mx-auto px-6 text-center relative z-10">
			
			<h2 class="text-4xl md:text-6xl font-display font-bold text-parchment mb-8 leading-tight">
				Find out why this bill didn't get a vote in 2026.
			</h2>
			
			<p class="text-xl font-body text-parchment/70 mb-12 leading-relaxed max-w-2xl mx-auto">
				Despite having 20+ co-sponsors and establishing the correct moral standard, the bill was killed in committee. The political reality requires a different kind of action.
			</p>
			
			<div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
				<a
					href="{base}/burns-accountability"
					class="btn btn-primary text-base px-10 py-4 w-full sm:w-auto shadow-[0_0_30px_rgba(114,47,55,0.4)]"
				>
					Read the Autopsy
				</a>
				<a
					href="{base}/join"
					class="btn btn-ghost text-base px-10 py-4 w-full sm:w-auto"
				>
					Join the Fight
				</a>
			</div>
		</div>
	</section>

</main>

{#if showModal}
	<ExegesisModal bind:showModal title={modalContent.title}>
		<p>This is placeholder content for the modal.</p>
	</ExegesisModal>
{/if}
>>>>>>> Stashed changes
