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
	<title>Operation Gospel - Pray. Fight. Give.</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-neutral-900 text-neutral-100 px-6 py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-12 relative">
			<h1 class="text-4xl md:text-6xl font-extrabold tracking-tight uppercase mb-4">
				<span class="text-red-600">Pray.</span> <span class="text-red-600">Fight.</span> <span class="text-red-600">Give.</span>
			</h1>
			<h2 class="text-xl md:text-2xl font-bold text-neutral-400 mb-6">
				50 Fights in 50 States – Georgia is Ours
			</h2>
			<p class="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
				For nearly a decade, Operation Gospel has been preaching the Gospel faithfully to mothers heading into abortion clinics. We are now seeking to bring the Gospel to the voters of Georgia.
			</p>
			<p class="text-base text-neutral-500 mt-4">
				You've seen the problem. You understand the solution. Now is the time to act.
			</p>
		</div>

		<!-- Join Form Section -->
		<div class="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 p-8 rounded-sm mb-16 shadow-2xl relative overflow-hidden">
			<div class="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
			<h2 class="text-3xl font-bold text-white mb-2 text-center uppercase tracking-wide">Join the Movement</h2>
			<p class="text-neutral-400 text-center mb-8 text-sm">
				Join our prayer list and get connected with abolitionists in your area.
			</p>

			<div class="space-y-4">
				<div class="grid md:grid-cols-2 gap-4">
					<div>
						<label for="name" class="block text-xs font-bold uppercase text-neutral-500 mb-1">Name</label>
						<input id="name" type="text" bind:value={name} class="w-full bg-black border border-neutral-700 p-3 text-white rounded-sm focus:border-red-600 outline-none transition-colors" placeholder="Your Name" />
					</div>
					<div>
						<label for="email" class="block text-xs font-bold uppercase text-neutral-500 mb-1">Email</label>
						<input id="email" type="email" bind:value={email} class="w-full bg-black border border-neutral-700 p-3 text-white rounded-sm focus:border-red-600 outline-none transition-colors" placeholder="email@example.com" />
					</div>
				</div>

				<div class="grid md:grid-cols-2 gap-4">
					<div>
						<label for="phone" class="block text-xs font-bold uppercase text-neutral-500 mb-1">Phone (Optional)</label>
						<input id="phone" type="tel" bind:value={phone} class="w-full bg-black border border-neutral-700 p-3 text-white rounded-sm focus:border-red-600 outline-none transition-colors" placeholder="(555) 555-5555" />
					</div>
					<div>
						<label for="church" class="block text-xs font-bold uppercase text-neutral-500 mb-1">Church (Optional)</label>
						<input id="church" type="text" bind:value={church} class="w-full bg-black border border-neutral-700 p-3 text-white rounded-sm focus:border-red-600 outline-none transition-colors" placeholder="Your Church Name" />
					</div>
				</div>

				<div class="border-t border-neutral-800 pt-4 mt-4">
					 <label class="flex items-center space-x-2 mb-4 cursor-pointer">
						<input type="checkbox" bind:checked={isOutOfState} class="w-4 h-4 text-red-600 bg-black border-neutral-700 rounded focus:ring-red-500 focus:ring-2" />
						<span class="text-sm text-neutral-400">I live outside of Georgia</span>
					</label>

					{#if !isOutOfState}
						<div class="grid md:grid-cols-2 gap-4 items-end">
							<div>
								<label for="zip" class="block text-xs font-bold uppercase text-neutral-500 mb-1">Zip Code</label>
								<div class="flex">
									<input id="zip" type="text" bind:value={zipCode} class="w-full bg-black border border-neutral-700 p-3 text-white rounded-l-sm focus:border-red-600 outline-none transition-colors" placeholder="30303" maxlength="5" />
									<button onclick={handleDistrictLookup} class="bg-neutral-700 hover:bg-neutral-600 text-white px-4 rounded-r-sm font-bold text-xs uppercase transition-colors" disabled={lookupLoading}>
										{lookupLoading ? '...' : 'Find'}
									</button>
								</div>
								 {#if lookupError}
									<p class="text-red-500 text-xs mt-1">{lookupError}</p>
								{/if}
							</div>
							<div>
								<label for="district" class="block text-xs font-bold uppercase text-neutral-500 mb-1">GA House District</label>
								<input id="district" type="text" bind:value={district} readonly class="w-full bg-neutral-900 border border-neutral-800 p-3 text-neutral-400 rounded-sm cursor-not-allowed" placeholder="District will appear here" />
							</div>
						</div>
					{/if}
				</div>

				<button onclick={handleSubmit} class="w-full bg-red-700 hover:bg-red-800 text-white font-black uppercase tracking-widest py-4 rounded-sm transition-all duration-300 mt-6 shadow-lg hover:shadow-red-900/20">
					Join the Fight
				</button>
				<p class="text-xs text-center text-neutral-600 mt-4">
					Submitting will open your email client to send your information to us.
				</p>
			</div>
		</div>
		
		<!-- Three CTA Cards -->
		<div class="grid md:grid-cols-3 gap-8 mb-16">
			<!-- PRAY -->
			<div class="bg-neutral-900 border border-neutral-800 hover:border-red-600 p-8 rounded-sm transition-all duration-300">
				<h3 class="text-2xl font-black uppercase tracking-wide text-red-600 mb-4 text-center border-b-2 border-red-900 pb-4">Pray</h3>
				<p class="text-sm text-neutral-400 leading-relaxed mb-6">
					<strong class="text-neutral-300 block mb-2">Pray for the Abolition of Abortion in Georgia</strong>
					Intercessory prayer is spiritual warfare. Pray for:
				</p>
				<ul class="text-sm text-neutral-400 space-y-2 mb-6 list-disc list-inside">
					<li>Georgia legislators to embrace HB 441</li>
					<li>Pastors and churches to boldly proclaim truth</li>
					<li>The salvation of mothers, fathers, and abortion workers</li>
					<li>Operation Gospel's ministry at abortion clinics</li>
					<li>Revival and repentance across Georgia</li>
				</ul>
			</div>
			
			<!-- FIGHT -->
			<div class="bg-neutral-900 border border-neutral-800 hover:border-red-600 p-8 rounded-sm transition-all duration-300">
				<h3 class="text-2xl font-black uppercase tracking-wide text-red-600 mb-4 text-center border-b-2 border-red-900 pb-4">Fight</h3>
				<p class="text-sm text-neutral-400 leading-relaxed mb-6">
					<strong class="text-neutral-300 block mb-2">Fight for Equal Protection</strong>
					Take action today:
				</p>
				<div class="space-y-2">
					<a
						href="https://www.youtube.com/watch?v=k33epqzJIlM"
						target="_blank"
						rel="noopener noreferrer"
						class="block w-full text-center bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-sm text-sm transition-colors"
					>
						Watch The Fatal Flaw
					</a>
				</div>
				<div class="aspect-w-16 aspect-h-9 mt-4">
					<iframe
						title="The Fatal Flaw Documentary"
						src="https://www.youtube.com/embed/k33epqzJIlM"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						class="w-full h-full rounded-sm"
					></iframe>
				</div>
			</div>
			
			<!-- GIVE -->
			<div class="bg-neutral-900 border border-neutral-800 hover:border-red-600 p-8 rounded-sm transition-all duration-300">
				<h3 class="text-2xl font-black uppercase tracking-wide text-red-600 mb-4 text-center border-b-2 border-red-900 pb-4">Give</h3>
				<p class="text-sm text-neutral-400 leading-relaxed mb-6">
					<strong class="text-neutral-300 block mb-2">What Your Gift Supports</strong>
					Every dollar you give to Operation Gospel funds:
				</p>

				<div>
					<h4 class="text-lg font-bold text-center mb-4">Suggested Giving Levels</h4>
					<div class="space-y-2">
						<a href="https://donorbox.org/regular-donations-15" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-sm text-sm transition-colors">
							$25/month – Supplies materials for church training
						</a>
						<a href="https://donorbox.org/regular-donations-15" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-sm text-sm transition-colors">
							$100/month – Funds one day of clinic evangelism
						</a>
						<a href="https://donorbox.org/regular-donations-15" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-sm text-sm transition-colors">
							$500/month – Supports full-time evangelist salary
						</a>
						<a href="https://donorbox.org/regular-donations-15" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-transparent border border-red-700 hover:bg-red-900/20 text-red-600 font-semibold py-2 px-4 rounded-sm text-sm transition-colors">
							Custom Amount
						</a>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Bottom Copy -->
		<div class="text-center max-w-2xl mx-auto mb-12">
			<p class="text-sm text-neutral-500 mb-2">
				For tax-deductible giving, you may donate through our fiscal sponsor.
			</p>
			<p class="text-sm text-neutral-500">
				For questions about giving or partnership, contact: <a href="mailto:info@operationgospel.com" class="text-red-500 hover:text-red-400 underline">info@operationgospel.com</a>
			</p>
		</div>
		
		<!-- Back Navigation -->
		<div class="flex flex-col md:flex-row gap-4 items-center justify-center">
			<a 
				href="{base}/near-me"
				class="w-full md:w-auto bg-transparent border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 font-semibold px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 text-center"
			>
				Find People Near Me
			</a>
			<a 
				href="{base}/start"
				class="w-full md:w-auto bg-transparent border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 font-semibold px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 text-center"
			>
				Back to Start
			</a>
		</div>
	</div>
</div>
