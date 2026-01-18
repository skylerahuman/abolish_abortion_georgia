<script lang="ts">
	import { base } from '$app/paths';
	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	
	type UserType = 'new' | 'prolife' | 'pastor' | 'abolitionist' | null;
	
	let selected = $state<UserType>(null);
	
	const cards = [
		{
			id: 'new' as const,
			title: "I'm new to Operation Gospel and abolitionism",
			audience: 'First-time visitors seeking to understand',
			primary: { text: 'Learn about HB 441', href: `${base}/georgia-battle` },
			secondary: { text: 'See the legislative battle', href: `${base}/georgia-battle` }
		},
		{
			id: 'prolife' as const,
			title: "I'm pro-life, but unfamiliar with equal protection",
			audience: 'Pro-life advocates seeking biblical justice',
			primary: { text: 'Understand equal protection', href: `${base}/georgia-battle` },
			secondary: { text: 'View Georgia\'s timeline', href: `${base}/georgia-battle` }
		},
		{
			id: 'pastor' as const,
			title: "I'm a pastor or church leader",
			audience: 'Shepherds called to defend the defenseless',
			primary: { text: 'See why your voice matters', href: `${base}/for-pastors` },
			secondary: { text: 'Connect with abolitionists', href: `${base}/join` }
		},
		{
			id: 'abolitionist' as const,
			title: "I already support HB 441",
			audience: 'Abolitionists ready to take action',
			primary: { text: 'Find allies in my district', href: `${base}/join` },
			secondary: { text: 'Take action now', href: `${base}/support` }
		}
	];
	
	function selectCard(type: UserType) {
		selected = type;
	}
	
	function getSelectedCard() {
		return cards.find(c => c.id === selected);
	}
</script>

<svelte:head>
	<title>Operation Gospel - Who Are You?</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-neutral-900 text-neutral-100 flex flex-col justify-center px-6 py-12">
	<div class="max-w-6xl mx-auto w-full">
		<!-- Title -->
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
				Where are you coming from today?
			</h1>
			<p class="text-lg text-neutral-400">
				Answer honestly. This will help guide you to what you need most.
			</p>
		</div>
		
		<!-- Four Cards -->
		<div class="grid md:grid-cols-2 gap-6 mb-12">
			{#each cards as card}
				<button
					onclick={() => selectCard(card.id)}
					class="group relative bg-neutral-900 border p-8 rounded-sm text-left transition-all duration-300 hover:scale-105 hover:shadow-xl
						{selected === card.id ? 'border-red-600 bg-neutral-800' : 'border-neutral-800 hover:border-neutral-700'}"
					aria-pressed={selected === card.id}
				>
					<h3 class="text-xl font-bold mb-3 text-neutral-100 group-hover:text-red-500 transition-colors">
						{card.title}
					</h3>
					<p class="text-sm text-neutral-400 leading-relaxed">
						{card.audience}
					</p>
					
					{#if selected === card.id}
						<div class="absolute top-4 right-4">
							<svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
							</svg>
						</div>
					{/if}
				</button>
			{/each}
		</div>
		
		<!-- Dynamic Response -->
		{#if selected}
			{@const card = getSelectedCard()}
			{#if card}
				<div in:fly={{ y: 20, duration: 400 }} class="bg-neutral-950 border border-neutral-800 p-8 rounded-sm">
					<div class="flex flex-col md:flex-row gap-4 items-center justify-center">
						<a 
							href={card.primary.href}
							class="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
						>
							{card.primary.text}
						</a>
						<a 
							href={card.secondary.href}
							class="w-full md:w-auto bg-transparent border-2 border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 font-semibold px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 text-center"
						>
							{card.secondary.text}
						</a>
					</div>
				</div>
			{/if}
		{/if}
	</div>
</div>
