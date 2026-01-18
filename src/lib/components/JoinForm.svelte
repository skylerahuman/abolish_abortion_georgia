<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	// Component State
	let step = $state(1);

	// District State
	let district: string | null = $state(null);
	let zipCode = $state('');
	let isLoading = $state(false);
	let error = $state('');
	let showDistrict = $state(false);
	let notInGeorgia = $state(false);

	let zipToDistrictMap: Record<string, string> | null = null;

	// Form State
	let formSubmitted = $state(false);
	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let phone = $state('');
	let homeChurch = $state('');
	let interests = $state<string[]>([]);

	onMount(async () => {
		const savedDistrict = localStorage.getItem('userDistrict');
		if (savedDistrict) {
			district = savedDistrict;
			showDistrict = true;
		}
		await loadZipData();
	});

	async function loadZipData() {
		if (zipToDistrictMap) return;
		try {
			const response = await fetch(`${base}/data/zip_to_district.csv`);
			const csvText = await response.text();
			const lines = csvText.split('\n');
			const mapData: Record<string, string> = {};
			for (let i = 1; i < lines.length; i++) {
				const [zip, dist] = lines[i].split(',');
				if (zip && dist) {
					mapData[zip.trim()] = dist.trim();
				}
			}
			zipToDistrictMap = mapData;
		} catch (e) {
			error = 'Could not load district data.';
		}
	}

	async function handleZipLookup() {
		if (zipCode.length !== 5) {
			error = 'Please enter a valid 5-digit ZIP code.';
			return;
		}
		if (!zipToDistrictMap) {
			await loadZipData();
		}
		if (!zipToDistrictMap) {
			error = 'District data is not loaded.';
			return;
		}

		error = '';
		isLoading = true;

		// Scramble animation
		let scrambleInterval = setInterval(() => {
			district = Math.random().toString(36).substring(2, 5).toUpperCase();
		}, 50);

		setTimeout(() => {
			clearInterval(scrambleInterval);
			const foundDistrict = zipToDistrictMap![zipCode];
			if (foundDistrict) {
				const padded = foundDistrict.padStart(3, '0');
				district = padded;
				localStorage.setItem('userDistrict', padded);
				showDistrict = true;
			} else {
				district = null;
				error = 'District not found for this ZIP code.';
			}
			isLoading = false;
		}, 1000);
	}

	function resetDistrictFinder() {
		showDistrict = false;
		zipCode = '';
		district = null;
		error = '';
		localStorage.removeItem('userDistrict');
	}

	function toggleInterest(interest: string) {
		if (interests.includes(interest)) {
			interests = interests.filter((i) => i !== interest);
		} else {
			interests = [...interests, interest];
		}
	}

	function nextStep() {
		if (step < 3) {
			step++;
		}
	}

	function prevStep() {
		if (step > 1) {
			step--;
		}
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		console.log('Form Submitted (Void)', {
			firstName,
			lastName,
			email,
			phone,
			district,
			homeChurch,
			interests
		});
		formSubmitted = true;
	}
</script>

<div class="bg-panel/80 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-lg min-h-[500px]">
	<h2 class="text-3xl font-serif font-bold text-bone mb-4">Join the Fight</h2>

	<!-- Progress Bar -->
	{#if step > 1 && !formSubmitted}
		<div class="mb-4" role="region" aria-label="Form progress">
			<p class="text-sm text-bone/60 text-center" id="progress-label">Step {step} of 3</p>
			<div
				class="w-full bg-charcoal/50 rounded-full h-1.5 mt-1"
				role="progressbar"
				aria-labelledby="progress-label"
				aria-valuenow={step}
				aria-valuemin="1"
				aria-valuemax="3"
			>
				<div
					class="bg-crimson h-1.5 rounded-full transition-all duration-300"
					style="width: {((step - 1) / 2) * 100}%"
				></div>
			</div>
		</div>
	{/if}

	{#if !formSubmitted}
		<form onsubmit={handleSubmit} class="flex flex-col justify-between h-full">
			<!-- STEP 1: District Finder -->
			{#if step === 1}
				<div
					class="space-y-4"
					in:fly={{ x: -20, duration: 300, delay: 300 }}
					out:fly={{ x: -20, duration: 300 }}
				>
					<div class="mb-4">
						<div class="flex justify-between items-center mb-2">
							<label for="zip" class="block text-sm font-semibold text-bone/80"
								>Find Your Georgia House District</label
							>
						</div>
						<p class="text-sm text-bone/60 mb-4">
							Our primary objective is to pass a bill in the Georgia House. Please enter your ZIP code
							to identify your representative.
						</p>

						{#if !notInGeorgia}
							<div class="relative min-h-[76px]">
								{#if !showDistrict}
									<div>
										<div class="flex gap-2">
											<input
												type="text"
												id="zip"
												bind:value={zipCode}
												placeholder="Enter 5-digit ZIP Code"
												class="flex-1 bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:border-crimson outline-none transition-colors"
												maxlength="5"
												oninput={() => (error = '')}
											/>
											<button
												type="button"
												onclick={handleZipLookup}
												disabled={isLoading || zipCode.length !== 5}
												class="bg-crimson hover:bg-ember text-bone px-6 py-2 rounded-md font-bold uppercase disabled:opacity-50 transition-colors"
												aria-label={isLoading ? "Searching for district..." : "Find district"}
											>
												{#if isLoading}
													<div
														class="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"
														aria-hidden="true"
													></div>
												{:else}
													Find
												{/if}
											</button>
										</div>
										{#if error}
											<p class="text-ember text-sm mt-2">{error}</p>
										{/if}
									</div>
								{:else}
									<div
										class="text-center bg-charcoal/50 border border-white/10 rounded-md p-3"
									>
										<p class="text-sm text-bone/60">Your Georgia House District is:</p>
										<p class="text-3xl font-mono font-bold text-crimson tracking-widest">
											{district || 'N/A'}
										</p>
										<button
											type="button"
											onclick={resetDistrictFinder}
											class="text-xs text-bone/50 hover:text-ember transition-colors mt-1"
										>
											Not your district?
										</button>
									</div>
								{/if}
							</div>
						{/if}

						<label class="flex items-center gap-2 text-sm text-bone/60 cursor-pointer mt-4 p-3 bg-charcoal/40 border border-white/10 rounded-md hover:bg-charcoal/80 transition-colors">
							<input
								type="checkbox"
								bind:checked={notInGeorgia}
								class="w-5 h-5 bg-charcoal border-white/30 rounded text-crimson focus:ring-crimson/50"
							/>
							I'm not in Georgia, but I want to help.
						</label>
					</div>
					<div class="flex justify-end mt-6">
						<button
							type="button"
							onclick={nextStep}
							disabled={!district && !notInGeorgia}
							class="bg-crimson hover:bg-ember text-bone font-bold py-2 px-6 rounded-md uppercase tracking-wide transition-all disabled:opacity-30 disabled:cursor-not-allowed"
						>
							Next
						</button>
					</div>
				</div>
			{/if}

			<!-- STEP 2: Contact Info -->
			{#if step === 2}
				<div
					class="space-y-4"
					in:fly={{ x: 20, duration: 300, delay: 300 }}
					out:fly={{ x: 20, duration: 300 }}
				>
					<div
						class="border border-white/10 bg-charcoal/30 p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4"
					>
						<div>
							<label for="firstName" class="block text-sm font-semibold text-bone/80 mb-1"
								>First Name *</label
							>
							<input
								type="text"
								id="firstName"
								bind:value={firstName}
								required
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson transition-colors"
							/>
						</div>
						<div>
							<label for="lastName" class="block text-sm font-semibold text-bone/80 mb-1"
								>Last Name *</label
							>
							<input
								type="text"
								id="lastName"
								bind:value={lastName}
								required
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson transition-colors"
							/>
						</div>
						<div>
							<label for="email" class="block text-sm font-semibold text-bone/80 mb-1"
								>Email *</label
							>
							<input
								type="email"
								id="email"
								bind:value={email}
								required
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson transition-colors"
							/>
						</div>

						<div>
							<label for="phone" class="block text-sm font-semibold text-bone/80 mb-1"
								>Cell (Optional)</label
							>
							<input
								type="tel"
								id="phone"
								bind:value={phone}
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson transition-colors"
							/>
						</div>
					</div>

					<div class="flex justify-between mt-6">
						<button
							type="button"
							onclick={prevStep}
							class="bg-white/10 hover:bg-white/20 text-bone font-bold py-2 px-6 rounded-md uppercase tracking-wide transition-colors"
						>
							Back
						</button>
						<button
							type="button"
							onclick={nextStep}
							class="bg-crimson hover:bg-ember text-bone font-bold py-2 px-6 rounded-md uppercase tracking-wide transition-colors"
						>
							Next
						</button>
					</div>
				</div>
			{/if}

			<!-- STEP 3: Interests & Church -->
			{#if step === 3}
				<div
					class="space-y-4"
					in:fly={{ x: 20, duration: 300, delay: 300 }}
					out:fly={{ x: 20, duration: 300 }}
				>
					<div class="border border-white/10 bg-charcoal/30 p-4 rounded-md space-y-4">
						<div>
							<label for="homeChurch" class="block text-sm font-semibold text-bone/80 mb-1"
								>Home Church</label
							>
							<input
								type="text"
								id="homeChurch"
								bind:value={homeChurch}
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson transition-colors"
							/>
						</div>

						<div>
							<p class="text-sm font-semibold text-bone/80 mb-2">I'm interested in...</p>
							<div class="space-y-2">
								{#each [
									{ value: 'find-church', label: 'I want to find an abolitionist church' },
									{ value: 'help-bill', label: 'I want to help pass an abolition bill' },
									{ value: 'evangelism', label: 'I want to be involved with evangelistically' },
									{
										value: 'pastor-elder',
										label: "I'm a pastor/elder interested in abolitionism"
									},
									{ value: 'prayer', label: 'I want to support with prayer' }
								] as interest}
									<label
										class="flex items-center gap-3 cursor-pointer p-2 bg-charcoal/50 border border-transparent rounded-md hover:border-white/20 transition-colors"
									>
										<input
											type="checkbox"
											value={interest.value}
											checked={interests.includes(interest.value)}
											onchange={() => toggleInterest(interest.value)}
											class="w-4 h-4 bg-charcoal border-white/30 rounded text-crimson focus:ring-crimson/50"
										/>
										<span class="text-sm text-bone">{interest.label}</span>
									</label>
								{/each}
							</div>
						</div>
					</div>

					<div class="flex justify-between mt-6">
						<button
							type="button"
							onclick={prevStep}
							class="bg-white/10 hover:bg-white/20 text-bone font-bold py-2 px-6 rounded-md uppercase tracking-wide transition-colors"
						>
							Back
						</button>
						<button
							type="submit"
							class="w-1/2 bg-crimson hover:bg-ember text-bone font-bold py-2 rounded-md uppercase tracking-wide transition-colors shadow-lg hover:shadow-crimson/30"
						>
							Submit
						</button>
					</div>
				</div>
			{/if}
		</form>
	{:else}
		<div
			in:fly={{ y: 20, duration: 300, delay: 300 }}
			class="bg-green-900/20 border border-green-600 p-6 rounded-md text-center"
		>
			<p class="text-lg font-semibold text-green-400 mb-2">Thank you for joining the fight!</p>
			<p class="text-bone/80">Someone already engaged in your area will contact you soon.</p>
		</div>
	{/if}
</div>
