<script lang="ts">
	import { base } from '$app/paths';

	let donationAmount = $state('25');
	let customAmount = $state('');

	function handleDonate() {
		const amount = donationAmount === 'custom' ? customAmount : donationAmount;
		console.log(`Donation attempt: $${amount}`);
		window.open('https://donorbox.org/regular-donations-15', '_blank');
	}
</script>

<svelte:head>
	<title>Operation Gospel - Support</title>
</svelte:head>

<!-- Two-column layout that fits viewport perfectly -->
<div class="flex flex-col md:flex-row bg-charcoal text-bone min-h-[calc(100vh-4rem)]">
	<!-- Column 1: PRAY -->
	<section
		class="flex-1 px-6 py-8 md:px-10 md:py-8 bg-panel/20 border-b md:border-b-0 md:border-r border-white/10"
	>
		<div class="max-w-2xl mx-auto w-full">
			<h1
				class="text-3xl md:text-4xl font-black uppercase tracking-tighter text-crimson mb-4 leading-none"
			>
				Prayer: The Foundation
			</h1>

			<p
				class="text-gold font-serif italic text-base md:text-lg mb-5 border-l-2 border-crimson pl-3 py-1 leading-snug"
			>
				"With man this is impossible but with God all things are possible" <span
					class="whitespace-nowrap text-sm">— Matthew 19:26</span
				>
			</p>

			<p class="text-neutral-300 leading-relaxed mb-6 text-sm">
				Abolition is a spiritual battle. We cannot fight against principalities and powers with mere
				political strategy. Only the power of God and the conviction of the Holy Spirit will move
				the hearts of legislators, pastors, and voters to do what is right.
			</p>

			<div
				class="bg-panel/40 p-4 border border-white/5 rounded-sm shadow-2xl overflow-y-auto max-h-64"
			>
				<h2
					class="text-sm font-bold text-bone mb-3 uppercase tracking-widest border-b border-crimson/30 pb-2"
				>
					Active Prayer Requests
				</h2>
				<ul class="space-y-2.5">
					<li class="flex items-start">
						<span class="text-crimson mr-2 font-bold text-lg leading-none">▪</span>
						<span class="text-sm text-neutral-400 leading-relaxed"
							>For resources and workers to expand the work for equal protection into every part of
							Georgia.</span
						>
					</li>
					<li class="flex items-start">
						<span class="text-crimson mr-2 font-bold text-lg leading-none">▪</span>
						<span class="text-sm text-neutral-400 leading-relaxed"
							>For courage among Georgia legislators to sponsor the active bill of equal protection: <strong
								class="text-bone">HB441</strong
							>.</span
						>
					</li>
					<li class="flex items-start">
						<span class="text-crimson mr-2 font-bold text-lg leading-none">▪</span>
						<span class="text-sm text-neutral-400 leading-relaxed"
							>For Christians to turn away from apathy and entertainments to pursue justice for the
							oppressed.</span
						>
					</li>
					<li class="flex items-start">
						<span class="text-crimson mr-2 font-bold text-lg leading-none">▪</span>
						<span class="text-sm text-neutral-400 leading-relaxed"
							>For the repentance from bloodshed and salvation of mothers who have aborted their
							babies.</span
						>
					</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Column 2: GIVE -->
	<section class="flex-1 px-6 py-8 md:px-10 md:py-8">
		<div class="max-w-2xl mx-auto w-full">
			<h2
				class="text-3xl md:text-4xl font-black uppercase tracking-tighter text-gold mb-4 leading-none"
			>
				Give: The Means
			</h2>

			<p class="text-neutral-300 leading-relaxed mb-6 text-sm">
				If you have more to give for the Kingdom of Christ left over after generously supporting
				your own local church, consider how you can provide a portion of the practical means of
				achieving this task.
			</p>

			<div
				class="bg-panel p-6 border border-gold/20 rounded-sm shadow-2xl relative overflow-hidden"
			>
				<div class="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full -mr-8 -mt-8"></div>

				<div class="space-y-3">
					<div class="grid grid-cols-3 gap-3">
						<button
							type="button"
							class="border border-neutral-700 py-3 rounded-sm font-bold text-sm transition-all cursor-pointer {donationAmount ===
							'25'
								? 'bg-gold text-charcoal border-gold'
								: 'bg-charcoal text-neutral-400 hover:border-gold/50'}"
							aria-pressed={donationAmount === '25'}
							onclick={() => {
								donationAmount = '25';
								customAmount = '';
							}}
						>
							$25
						</button>
						<button
							type="button"
							class="border border-neutral-700 py-3 rounded-sm font-bold text-sm transition-all cursor-pointer {donationAmount ===
							'100'
								? 'bg-gold text-charcoal border-gold'
								: 'bg-charcoal text-neutral-400 hover:border-gold/50'}"
							aria-pressed={donationAmount === '100'}
							onclick={() => {
								donationAmount = '100';
								customAmount = '';
							}}
						>
							$100
						</button>
						<button
							type="button"
							class="border border-neutral-700 py-3 rounded-sm font-bold text-sm transition-all cursor-pointer {donationAmount ===
							'500'
								? 'bg-gold text-charcoal border-gold'
								: 'bg-gold/10 text-gold border-gold/30 hover:bg-gold/20'}"
							aria-pressed={donationAmount === '500'}
							onclick={() => {
								donationAmount = '500';
								customAmount = '';
							}}
						>
							$500
						</button>
					</div>

					<div class="relative">
						<span
							class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold text-sm"
							>$</span
						>
						<input
							type="number"
							placeholder="Custom Amount"
							aria-label="Custom Donation Amount"
							bind:value={customAmount}
							oninput={() => (donationAmount = 'custom')}
							class="w-full bg-charcoal border border-neutral-700 p-3 pl-8 text-sm text-white rounded-sm focus:border-gold outline-none transition-colors font-mono"
						/>
					</div>

					<button
						onclick={handleDonate}
						class="w-full bg-gold hover:bg-yellow-600 text-charcoal font-black uppercase tracking-widest py-4 text-sm rounded-sm transition-all duration-300 shadow-lg cursor-pointer"
					>
						Donate Securely
					</button>

					<p class="text-[10px] text-center text-neutral-500 leading-relaxed">
						Transactions are processed securely. <br />
						<a
							href="https://donorbox.org/regular-donations-15"
							target="_blank"
							class="text-gold/60 hover:text-gold underline decoration-1 underline-offset-2"
							>Click here to donate directly via Donorbox</a
						>
					</p>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	/* Custom scrollbar for column overflow if content slightly exceeds height */
	::-webkit-scrollbar {
		width: 4px;
	}
	::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.05);
	}
	::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: rgba(212, 175, 55, 0.3);
	}
</style>
