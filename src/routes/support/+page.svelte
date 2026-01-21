<script lang="ts">
	import { base } from '$app/paths';

	let donationAmount = $state('25');
	let customAmount = $state('');

	function handleDonate() {
		const amount = donationAmount === 'custom' ? customAmount : donationAmount;
		console.log(`Donation attempt: $${amount}`);
		// Optimization 10: Remove blocking alert(), just redirect immediately.
		// Speed is a feature.
		window.open('https://donorbox.org/regular-donations-15', '_blank');
	}
</script>

<svelte:head>
	<title>Operation Gospel - Support</title>
</svelte:head>

<div class="min-h-screen bg-charcoal text-bone">
	<!-- Hero / Header -->
	<div class="max-w-4xl mx-auto px-6 py-16 text-center">
		<h1 class="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4 text-white">
			Support the Mission
		</h1>
		<p class="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
			We are fighting to abolish abortion in Georgia through the power of the Gospel. Pray and give.
		</p>
	</div>

	<!-- Part 1: Prayer Section -->
	<section class="border-t border-white/10 bg-panel/30 py-16 px-6">
		<div class="max-w-4xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold uppercase tracking-wide text-crimson mb-4">
					Prayer: The Foundation
				</h2>
				<p class="text-neutral-300 leading-relaxed max-w-3xl mx-auto">
					Abolition is a spiritual battle. We cannot fight against principalities and powers with mere political strategy. We need the favor of God and the conviction of the Holy Spirit to move the hearts of legislators, pastors, and voters.
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8 mb-12">
				<div class="bg-panel p-8 border border-white/5 rounded-sm shadow-xl">
					<h3 class="text-xl font-bold text-bone mb-4 border-b border-crimson/30 pb-2 uppercase tracking-wide">
						Active Prayer Requests
					</h3>
					<ul class="space-y-4 text-sm text-neutral-400">
						<li class="flex items-start">
							<span class="text-crimson mr-3 font-bold">▪</span>
							<span>For courage among Georgia legislators to sponsor equal protection bills.</span>
						</li>
						<li class="flex items-start">
							<span class="text-crimson mr-3 font-bold">▪</span>
							<span>For local pastors to repent of apathy and lead their flocks in biblical justice.</span>
						</li>
						<li class="flex items-start">
							<span class="text-crimson mr-3 font-bold">▪</span>
							<span>For the repentance and salvation of abortion mill workers and mothers.</span>
						</li>
						 <li class="flex items-start">
							<span class="text-crimson mr-3 font-bold">▪</span>
							<span>For resources and workers to expand our reach into every district.</span>
						</li>
					</ul>
				</div>

				<div class="bg-panel p-8 border border-white/5 rounded-sm flex flex-col justify-center text-center shadow-xl">
					<h3 class="text-xl font-bold text-bone mb-4 uppercase tracking-wide">
						Join the Prayer Team
					</h3>
					<p class="text-sm text-neutral-400 mb-8 leading-relaxed">
						Receive regular updates on how to pray specifically for the work of abolition in Georgia. Join our email list to stay informed.
					</p>
					<a href="{base}/join" class="inline-block w-full bg-crimson hover:bg-red-700 text-white font-black uppercase tracking-widest py-4 px-8 rounded-sm transition-all duration-300 shadow-lg hover:shadow-red-900/20">
						Join the Fight
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Part 2: Donation Section -->
	<section class="py-16 px-6 border-t border-white/10">
		<div class="max-w-4xl mx-auto">
			 <div class="text-center mb-12">
				<h2 class="text-3xl font-bold uppercase tracking-wide text-gold mb-4">
					Give
				</h2>
				<p class="text-neutral-300 leading-relaxed max-w-3xl mx-auto">
					Your financial partnership enables us to produce resources, train churches, and maintain a consistent presence at the darkest places in our state.
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-12 items-start">
				<!-- Impact Levels -->
				<div class="space-y-6">
					<h3 class="text-xl font-bold text-bone mb-6 uppercase tracking-wide border-l-4 border-gold pl-4">
						Your Impact
					</h3>

					<div class="group hover:bg-panel/50 p-4 rounded-sm transition-colors border border-transparent hover:border-white/5">
						<div class="text-gold font-bold text-lg mb-1">$25 / month</div>
						<p class="text-sm text-neutral-400">Supplies materials for one church training session, equipping believers to speak up for the pre-born.</p>
					</div>

					 <div class="group hover:bg-panel/50 p-4 rounded-sm transition-colors border border-transparent hover:border-white/5">
						<div class="text-gold font-bold text-lg mb-1">$100 / month</div>
						<p class="text-sm text-neutral-400">Funds one day of clinic evangelism, ensuring mothers hear the Gospel before making a life-altering decision.</p>
					</div>

					 <div class="group hover:bg-panel/50 p-4 rounded-sm transition-colors border border-transparent hover:border-white/5">
						<div class="text-gold font-bold text-lg mb-1">$500 / month</div>
						<p class="text-sm text-neutral-400">Supports the salary of a full-time evangelist to coordinate statewide efforts and ministry.</p>
					</div>
				</div>

				<!-- Donation Form (Dead End) -->
				<div class="bg-panel p-8 border border-gold/20 rounded-sm shadow-2xl relative overflow-hidden">
					<div class="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full -mr-10 -mt-10"></div>

					<h3 class="text-xl font-bold text-bone mb-6 uppercase tracking-wide text-center">
						Make a Donation
					</h3>

					<div class="space-y-4">
						<div class="grid grid-cols-3 gap-2">
							<button
								type="button"
								class="border border-neutral-700 py-3 rounded-sm font-bold text-sm transition-all cursor-pointer {donationAmount === '25' ? 'bg-gold text-charcoal border-gold' : 'bg-charcoal text-neutral-400 hover:border-gold/50'}"
								aria-pressed={donationAmount === '25'}
								onclick={() => { donationAmount = '25'; customAmount = ''; }}
							>
								$25
							</button>
							<button
								type="button"
								class="border border-neutral-700 py-3 rounded-sm font-bold text-sm transition-all cursor-pointer {donationAmount === '100' ? 'bg-gold text-charcoal border-gold' : 'bg-charcoal text-neutral-400 hover:border-gold/50'}"
								aria-pressed={donationAmount === '100'}
								onclick={() => { donationAmount = '100'; customAmount = ''; }}
							>
								$100
							</button>
							<button
								type="button"
								class="border border-neutral-700 py-3 rounded-sm font-bold text-sm transition-all cursor-pointer {donationAmount === '500' ? 'bg-gold text-charcoal border-gold' : 'bg-charcoal text-neutral-400 hover:border-gold/50'}"
								aria-pressed={donationAmount === '500'}
								onclick={() => { donationAmount = '500'; customAmount = ''; }}
							>
								$500
							</button>
						</div>

						<div class="relative">
							<span class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">$</span>
							<input
								type="number"
								placeholder="Custom Amount"
								aria-label="Custom Donation Amount"
								bind:value={customAmount}
								oninput={() => donationAmount = 'custom'}
								class="w-full bg-charcoal border border-neutral-700 p-4 pl-8 text-white rounded-sm focus:border-gold outline-none transition-colors"
							/>
						</div>

						<button
							onclick={handleDonate}
							class="w-full bg-gold hover:bg-yellow-600 text-charcoal font-black uppercase tracking-widest py-4 rounded-sm transition-all duration-300 mt-4 shadow-lg cursor-pointer"
						>
							Donate Securely
						</button>

						<p class="text-xs text-center text-neutral-600 mt-4">
							Transactions are processed securely. <br>
							<a href="https://donorbox.org/regular-donations-15" target="_blank" class="text-gold/70 hover:text-gold underline decoration-1 underline-offset-2">Click here to donate directly via Donorbox</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
