<script lang="ts">
	import { base } from '$app/paths';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let church = $state('');
	let zipCode = $state('');
	let district = $state('');
	let isOutOfState = $state(false);
	let lookupLoading = $state(false);
	let lookupError = $state('');

	let zipToDistrictMap: Record<string, string> | null = null;

	async function loadZipData() {
		if (zipToDistrictMap) return;
		try {
			const response = await fetch('/data/zip_to_district.csv');
			const csvText = await response.text();
			const lines = csvText.split('\n');
			const map: Record<string, string> = {};
			for (let i = 1; i < lines.length; i++) {
				const [zip, dist] = lines[i].split(',');
				if (zip && dist) {
					map[zip.trim()] = dist.trim();
				}
			}
			zipToDistrictMap = map;
		} catch (error) {
			lookupError = 'Could not load district data.';
		}
	}

	async function handleDistrictLookup() {
		if (isOutOfState) return;
		if (!zipCode || zipCode.length !== 5) {
			lookupError = 'Enter a valid 5-digit ZIP';
			return;
		}
		lookupLoading = true;
		lookupError = '';

		await loadZipData();

		if (!zipToDistrictMap) {
			lookupError = 'District data not loaded.';
			lookupLoading = false;
			return;
		}

		const foundDistrict = zipToDistrictMap[zipCode];
		if (foundDistrict) {
			district = foundDistrict;
		} else {
			lookupError = 'District not found. Are you in Georgia?';
		}

		lookupLoading = false;
	}

	function handleSubmit() {
		const subject = "I want to join the fight for Abolition in Georgia";
		const body = `Name: ${name}
Email: ${email}
Phone: ${phone}
Church: ${church}
Location: ${isOutOfState ? 'Out of State' : `GA District ${district} (Zip: ${zipCode})`}

I want to be involved with Operation Gospel.`;

		window.location.href = `mailto:info@operationgospel.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	}
</script>

<svelte:head>
	<title>Operation Gospel - Take Action</title>
</svelte:head>

<div class="min-h-screen bg-void text-parchment px-6 py-16 md:py-24">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16 relative">
			<h1 class="font-display text-4xl md:text-6xl font-bold tracking-tight uppercase mb-6">
				Take Action
			</h1>
			<h2 class="text-xl md:text-2xl font-display font-semibold text-parchment-muted mb-6">
				Three ways to get involved
			</h2>
			<p class="text-lg text-parchment-muted max-w-3xl mx-auto leading-relaxed">
				Whether you want to pray, give, or advocate directly, there's a place for you. Choose what fits.
			</p>

			<!-- Ornamental divider -->
			<div class="divider-ornate text-gold-muted max-w-xs mx-auto mt-12">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
					<path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
				</svg>
			</div>
		</div>

		<!-- Join Form Section -->
		<div class="max-w-3xl mx-auto bg-panel border border-charcoal p-8 md:p-12 rounded-sm shadow-xl relative overflow-hidden">
			<!-- Left accent bar -->
			<div class="absolute top-0 left-0 w-1 h-full bg-burgundy"></div>

			<h2 class="font-display text-3xl font-semibold text-parchment mb-2 text-center uppercase tracking-wide">Join Our Email List</h2>
			<p class="text-parchment-muted text-center mb-10 text-sm font-ui">
				Get updates and opportunities to take action.
			</p>

			<div class="space-y-6">
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<label for="name" class="block font-ui text-xs font-semibold uppercase tracking-wider text-gold mb-2">Name</label>
						<input id="name" type="text" bind:value={name} class="w-full bg-charcoal border border-charcoal p-4 text-parchment rounded-sm focus:border-gold focus:outline-none transition-colors font-ui" placeholder="Your Name" />
					</div>
					<div>
						<label for="email" class="block font-ui text-xs font-semibold uppercase tracking-wider text-gold mb-2">Email</label>
						<input id="email" type="email" bind:value={email} class="w-full bg-charcoal border border-charcoal p-4 text-parchment rounded-sm focus:border-gold focus:outline-none transition-colors font-ui" placeholder="email@example.com" />
					</div>
				</div>

				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<label for="phone" class="block font-ui text-xs font-semibold uppercase tracking-wider text-gold mb-2">Phone (Optional)</label>
						<input id="phone" type="tel" bind:value={phone} class="w-full bg-charcoal border border-charcoal p-4 text-parchment rounded-sm focus:border-gold focus:outline-none transition-colors font-ui" placeholder="(555) 555-5555" />
					</div>
					<div>
						<label for="church" class="block font-ui text-xs font-semibold uppercase tracking-wider text-gold mb-2">Church (Optional)</label>
						<input id="church" type="text" bind:value={church} class="w-full bg-charcoal border border-charcoal p-4 text-parchment rounded-sm focus:border-gold focus:outline-none transition-colors font-ui" placeholder="Your Church Name" />
					</div>
				</div>

				<div class="border-t border-charcoal pt-6 mt-6">
					<label class="flex items-center space-x-3 mb-6 cursor-pointer group">
						<input type="checkbox" bind:checked={isOutOfState} class="w-4 h-4 text-burgundy bg-charcoal border-charcoal rounded focus:ring-gold focus:ring-2" />
						<span class="text-sm text-parchment-muted font-ui group-hover:text-parchment transition-colors">I live outside of Georgia</span>
					</label>

					{#if !isOutOfState}
						<div class="grid md:grid-cols-2 gap-6 items-end">
							<div>
								<label for="zip" class="block font-ui text-xs font-semibold uppercase tracking-wider text-gold mb-2">Zip Code</label>
								<div class="flex">
									<input id="zip" type="text" bind:value={zipCode} class="w-full bg-charcoal border border-charcoal p-4 text-parchment rounded-l-sm focus:border-gold focus:outline-none transition-colors font-mono" placeholder="30303" maxlength="5" />
									<button onclick={handleDistrictLookup} class="bg-burgundy hover:bg-burgundy-dark text-parchment px-6 font-ui font-semibold text-sm uppercase tracking-wider rounded-r-sm transition-colors" disabled={lookupLoading}>
										{lookupLoading ? '...' : 'Find'}
									</button>
								</div>
								{#if lookupError}
									<p class="text-burgundy text-xs mt-2 font-ui">{lookupError}</p>
								{/if}
							</div>
							<div>
								<label for="district" class="block font-ui text-xs font-semibold uppercase tracking-wider text-gold mb-2">GA House District</label>
								<input id="district" type="text" bind:value={district} readonly class="w-full bg-panel-elevated border border-charcoal p-4 text-parchment-dark rounded-sm cursor-not-allowed font-mono" placeholder="District will appear here" />
							</div>
						</div>
					{/if}
				</div>

				<button onclick={handleSubmit} class="w-full bg-burgundy hover:bg-burgundy-dark text-parchment font-ui font-semibold uppercase tracking-widest py-4 rounded-sm transition-all duration-300 mt-8 shadow-lg hover:shadow-burgundy/20">
					Sign Up
				</button>
				<p class="text-xs text-center text-parchment-dark mt-4 font-ui">
					Submitting will open your email client to send your information to us.
				</p>
			</div>
		</div>

		<!-- Three CTA Cards -->
		<div class="grid md:grid-cols-3 gap-8 mt-16">
			<!-- PRAY -->
			<div class="bg-panel border border-charcoal hover:border-gold-muted p-8 md:p-10 rounded-sm transition-all duration-300">
				<h3 class="font-display text-2xl font-semibold uppercase tracking-wide text-burgundy mb-6 text-center pb-4 border-b-2 border-burgundy/30">
					Pray
				</h3>
				<p class="text-sm text-parchment-muted leading-relaxed mb-6 font-body">
					<strong class="text-parchment block mb-2">Prayer Requests</strong>
					Intercessory prayer is part of the work. Pray for:
				</p>
				<ul class="text-sm text-parchment-muted space-y-2 mb-6 list-disc list-inside font-body">
					<li>Georgia legislators to support equal protection</li>
					<li>Pastors and churches to take up this cause</li>
					<li>The salvation of mothers, fathers, and abortion workers</li>
					<li>Operation Gospel's ongoing ministry</li>
					<li>Revival and repentance across Georgia</li>
				</ul>
			</div>

			<!-- ADVOCATE -->
			<div class="bg-panel border border-charcoal hover:border-gold-muted p-8 md:p-10 rounded-sm transition-all duration-300">
				<h3 class="font-display text-2xl font-semibold uppercase tracking-wide text-burgundy mb-6 text-center pb-4 border-b-2 border-burgundy/30">
					Advocate
				</h3>
				<p class="text-sm text-parchment-muted leading-relaxed mb-6 font-body">
					<strong class="text-parchment block mb-2">Contact Your Representatives</strong>
					Phone calls are one of the most effective ways to reach legislators. Scripts and contact info:
				</p>
				<div class="space-y-3">
					<a
						href="{base}/rep-calls"
						class="block w-full text-center bg-burgundy hover:bg-burgundy-dark text-parchment font-ui font-semibold py-3 px-4 rounded-sm text-sm transition-colors"
					>
						Call Your Representative
					</a>
					<a
						href="{base}/burns-accountability"
						class="block w-full text-center bg-burgundy hover:bg-burgundy-dark text-parchment font-ui font-semibold py-3 px-4 rounded-sm text-sm transition-colors"
					>
						Hold Speaker Burns Accountable
					</a>
				</div>
				<p class="text-sm text-parchment-muted leading-relaxed mt-4">
					<a href="{base}/get-involved" class="text-gold hover:text-gold-light">Find your district representative →</a>
				</p>
			</div>

			<!-- GIVE -->
			<div class="bg-panel border border-charcoal hover:border-gold-muted p-8 md:p-10 rounded-sm transition-all duration-300">
				<h3 class="font-display text-2xl font-semibold uppercase tracking-wide text-burgundy mb-6 text-center pb-4 border-b-2 border-burgundy/30">
					Give
				</h3>
				<p class="text-sm text-parchment-muted leading-relaxed mb-6 font-body">
					<strong class="text-parchment block mb-2">Support the Work</strong>
					Every dollar funds:
				</p>

				<div>
					<h4 class="font-display text-lg font-semibold text-parchment text-center mb-4">Suggested Levels</h4>
					<div class="space-y-3">
						<a href="https://donorbox.org/regular-donations-15" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-burgundy hover:bg-burgundy-dark text-parchment font-ui font-semibold py-3 px-4 rounded-sm text-sm transition-colors">
							$25/month — Church training materials
						</a>
						<a href="https://donorbox.org/regular-donations-15" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-burgundy hover:bg-burgundy-dark text-parchment font-ui font-semibold py-3 px-4 rounded-sm text-sm transition-colors">
							$100/month — One day of clinic evangelism
						</a>
						<a href="https://donorbox.org/regular-donations-15" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-burgundy hover:bg-burgundy-dark text-parchment font-ui font-semibold py-3 px-4 rounded-sm text-sm transition-colors">
							$500/month — Full-time evangelist support
						</a>
						<a href="https://donorbox.org/regular-donations-15" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-transparent border border-burgundy hover:bg-burgundy/20 text-burgundy font-ui font-semibold py-2 px-4 rounded-sm text-sm transition-colors">
							Custom Amount
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Documentary Section -->
		<div class="mt-16 max-w-3xl mx-auto">
			<h3 class="font-display text-2xl font-semibold text-parchment mb-6 text-center">Watch: The Fatal Flaw</h3>
			<p class="text-parchment-muted text-center mb-6">
				This documentary explains why traditional pro-life strategies have failed and what abolition looks like.
			</p>
			<div class="aspect-video rounded-sm overflow-hidden">
				<iframe
					title="The Fatal Flaw Documentary"
					src="https://www.youtube-nocookie.com/embed/k33epqzJIlM"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
					class="w-full h-full"
				></iframe>
			</div>
		</div>

		<!-- Bottom Copy -->
		<div class="text-center max-w-2xl mx-auto mt-16">
			<p class="text-sm text-parchment-dark mb-2 font-body">
				For tax-deductible giving, you may donate through our fiscal sponsor.
			</p>
			<p class="text-sm text-parchment-dark font-body">
				Questions? Email <a href="mailto:info@operationgospel.com" class="text-gold hover:text-gold-light">info@operationgospel.com</a>
			</p>
		</div>

		<!-- Back Navigation -->
		<div class="flex flex-col md:flex-row gap-4 items-center justify-center mt-16">
			<a
				href="{base}/join"
				class="w-full md:w-auto bg-transparent border border-charcoal hover:border-gold-muted text-parchment-muted hover:text-parchment font-ui font-semibold px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 text-center"
			>
				Join the Network
			</a>
			<a
				href="{base}/"
				class="w-full md:w-auto bg-transparent border border-charcoal hover:border-gold-muted text-parchment-muted hover:text-parchment font-ui font-semibold px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 text-center"
			>
				Back to Home
			</a>
		</div>
	</div>
</div>
