<script lang="ts">
<<<<<<< HEAD
	import { onMount, tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import { registrationState } from '$lib/state.svelte';

	// District Finder Interaction State
	let zipCode = $state('');
	let isLoading = $state(false);
	let isSubmitting = $state(false);
	let error = $state('');
	let showDistrict = $state(false);
	let notInGeorgia = $state(false);
	let scrambleInterval: number; // Track interval for cleanup

	// Focus Management References
	let resultContainer = $state<HTMLElement>();
	let firstNameInput = $state<HTMLElement>();
	let homeChurchInput = $state<HTMLElement>();
	let step2Error = $state('');

	onMount(() => {
		// If the app state shows submitted, reset it for a fresh mount (e.g. navigation back to page)
		if (registrationState.submitted) {
			registrationState.reset();
		}

		const savedDistrict = localStorage.getItem('userDistrict');
		if (savedDistrict) {
			registrationState.form.district = savedDistrict;
			showDistrict = true;
		}

		// Optimization 9: Cleanup interval on unmount to prevent memory leaks
		return () => {
			if (scrambleInterval) clearInterval(scrambleInterval);
		};
	});

	function handleZipInput(e: Event) {
		const input = e.target as HTMLInputElement;
		// Only allow numbers
		zipCode = input.value.replace(/\D/g, '').slice(0, 5);
		error = '';
		if (zipCode.length === 5) {
			handleZipLookup();
=======
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
>>>>>>> Moving-Changes-Stashed
		}
	}

	async function handleZipLookup() {
		if (zipCode.length !== 5) {
<<<<<<< HEAD
			error = 'Enter a 5-digit ZIP code.';
			return;
		}

		if (isLoading) return;
=======
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
>>>>>>> Moving-Changes-Stashed

		error = '';
		isLoading = true;

		// Scramble animation
<<<<<<< HEAD
		scrambleInterval = window.setInterval(() => {
			registrationState.form.district = Math.random().toString(36).substring(2, 5).toUpperCase();
		}, 50);

		try {
			const { zipToDistrict } = await import('$lib/data/zip_to_district');

			clearInterval(scrambleInterval);
			const foundDistrict = zipToDistrict[zipCode];

			if (foundDistrict) {
				const padded = foundDistrict.padStart(3, '0');
				registrationState.form.district = padded;
				localStorage.setItem('userDistrict', padded);
				showDistrict = true;
				await tick();
				resultContainer?.focus();
			} else {
				registrationState.form.district = null;
				error = 'Georgia district not found.';
			}
		} catch (e) {
			clearInterval(scrambleInterval);
			error = 'Error loading district data.';
			console.error(e);
		} finally {
			isLoading = false;
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (showDistrict || notInGeorgia) {
				registrationState.nextStep();
			} else if (zipCode.length === 5) {
				handleZipLookup();
			}
		}
=======
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
>>>>>>> Moving-Changes-Stashed
	}

	function resetDistrictFinder() {
		showDistrict = false;
		zipCode = '';
<<<<<<< HEAD
		registrationState.form.district = null;
=======
		district = null;
>>>>>>> Moving-Changes-Stashed
		error = '';
		localStorage.removeItem('userDistrict');
	}

	function toggleInterest(interest: string) {
<<<<<<< HEAD
		if (registrationState.form.interests.includes(interest)) {
			registrationState.form.interests = registrationState.form.interests.filter(
				(i) => i !== interest
			);
		} else {
			registrationState.form.interests = [...registrationState.form.interests, interest];
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		// Simulate network request
		await new Promise((resolve) => setTimeout(resolve, 1500));
		console.log('Form Submitted (Void)', $state.snapshot(registrationState.form));

		// Optimization: Clear local persistence on successful submission
		// to allow immediate second entries for other people/districts
		localStorage.removeItem('userDistrict');

		registrationState.submitted = true;
		isSubmitting = false;
	}

	function handleAddAnother() {
		registrationState.reset();
		showDistrict = false;
		zipCode = '';
		error = '';
	}

	async function handleNextStep() {
		if (registrationState.step === 1) {
			registrationState.nextStep();
			await tick();
			firstNameInput?.focus();
		} else if (registrationState.step === 2) {
			if (
				!registrationState.form.firstName.trim() ||
				!registrationState.form.lastName.trim() ||
				!registrationState.form.email.trim()
			) {
				step2Error = 'Please fill in all required fields.';
				return;
			}
			step2Error = '';
			registrationState.nextStep();
			await tick();
			homeChurchInput?.focus();
		}
	}
</script>

<div
	class="bg-panel/80 backdrop-blur-sm border border-white/10 p-8 rounded-xl shadow-lg h-full flex flex-col"
>
	<h2 class="text-3xl font-serif font-bold text-bone mb-6">Join the Fight</h2>

	<!-- Progress Bar -->
	{#if registrationState.step > 1 && !registrationState.submitted}
		<div class="mb-6">
			<p id="progress-label" class="text-sm text-bone/60 text-center">
				Step {registrationState.step} of 3
			</p>
			<div
				role="progressbar"
				aria-labelledby="progress-label"
				aria-valuenow={((registrationState.step - 1) / 2) * 100}
				aria-valuemin="0"
				aria-valuemax="100"
				class="w-full bg-charcoal/50 rounded-full h-1.5 mt-1"
			>
				<div
					class="bg-crimson h-1.5 rounded-full transition-all duration-300"
					style="width: {((registrationState.step - 1) / 2) * 100}%"
=======
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
		<div class="mb-4">
			<p class="text-sm text-bone/60 text-center">Step {step} of 3</p>
			<div class="w-full bg-charcoal/50 rounded-full h-1.5 mt-1">
				<div
					class="bg-crimson h-1.5 rounded-full transition-all duration-300"
					style="width: {((step - 1) / 2) * 100}%"
>>>>>>> Moving-Changes-Stashed
				></div>
			</div>
		</div>
	{/if}

<<<<<<< HEAD
	{#if !registrationState.submitted}
		<form onsubmit={handleSubmit} class="flex flex-col flex-1">
			<!-- STEP 1: District Finder -->
			{#if registrationState.step === 1}
				<div
					class="flex-1 flex flex-col justify-between"
					in:fly={{ x: -20, duration: 300, delay: 300 }}
					out:fly={{ x: -20, duration: 300 }}
				>
					<div class="space-y-6">
=======
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
>>>>>>> Moving-Changes-Stashed
						<div class="flex justify-between items-center mb-2">
							<label for="zip" class="block text-sm font-semibold text-bone/80"
								>Find Your Georgia House District</label
							>
						</div>
						<p class="text-sm text-bone/60 mb-4">
<<<<<<< HEAD
							Our primary objective is to pass a bill in the Georgia House. Please enter your ZIP
							code to identify your representative.
						</p>

						{#if !notInGeorgia}
<<<<<<< HEAD
							<div class="space-y-4">
								<div class="flex gap-2">
									<input
										type="text"
										id="zip"
										bind:value={zipCode}
										inputmode="numeric"
										pattern="[0-9]*"
										placeholder="Enter 5-digit ZIP Code"
										class="flex-1 bg-charcoal border {showDistrict
											? 'border-green-500/50'
											: 'border-white/20'} text-bone px-4 py-2 rounded-md focus:border-crimson outline-none transition-all font-mono"
										maxlength="5"
										oninput={handleZipInput}
										onkeydown={handleKeyDown}
										disabled={isLoading}
									/>
									{#if !showDistrict}
										<button
											type="button"
											onclick={handleZipLookup}
											disabled={isLoading || zipCode.length !== 5}
											class="bg-crimson hover:bg-ember text-bone px-6 py-2 rounded-md font-bold uppercase disabled:opacity-50 transition-colors"
											aria-label={isLoading ? 'Searching for district...' : 'Find district'}
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
									{/if}
								</div>
								{#if error}
									<p role="alert" class="text-ember text-xs mt-1">{error}</p>
								{/if}

								{#if showDistrict}
=======
=======
							Our primary objective is to pass a bill in the Georgia House. Please enter your ZIP code
							to identify your representative.
						</p>

						{#if !notInGeorgia}
>>>>>>> Moving-Changes-Stashed
							<div class="relative min-h-[76px]">
								{#if !showDistrict}
									<div>
										<div class="flex gap-2">
											<input
												type="text"
												id="zip"
												bind:value={zipCode}
												placeholder="Enter 5-digit ZIP Code"
<<<<<<< HEAD
												class="flex-1 bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:border-crimson outline-none focus-visible:ring-2 focus-visible:ring-crimson/50 transition-colors"
=======
												class="flex-1 bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:border-crimson outline-none transition-colors"
>>>>>>> Moving-Changes-Stashed
												maxlength="5"
												oninput={() => (error = '')}
											/>
											<button
												type="button"
												onclick={handleZipLookup}
												disabled={isLoading || zipCode.length !== 5}
<<<<<<< HEAD
												class="bg-crimson hover:bg-ember text-bone px-6 py-2 rounded-md font-bold uppercase disabled:opacity-50 transition-colors focus-visible:ring-2 focus-visible:ring-crimson/50 outline-none"
												aria-label={isLoading ? "Searching for district..." : "Find district"}
=======
												class="bg-crimson hover:bg-ember text-bone px-6 py-2 rounded-md font-bold uppercase disabled:opacity-50 transition-colors"
>>>>>>> Moving-Changes-Stashed
											>
												{#if isLoading}
													<div
														class="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"
<<<<<<< HEAD
														aria-hidden="true"
=======
>>>>>>> Moving-Changes-Stashed
													></div>
												{:else}
													Find
												{/if}
											</button>
										</div>
										{#if error}
<<<<<<< HEAD
											<p role="alert" class="text-ember text-sm mt-2">{error}</p>
										{/if}
									</div>
								{:else}
>>>>>>> origin/palette/join-form-loading-ux-14478805327420284073
									<div
										bind:this={resultContainer}
										tabindex="-1"
										class="text-center bg-green-900/10 border border-green-500/20 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-crimson/50"
									>
										<p class="text-xs text-bone/60 uppercase tracking-widest mb-1">
											Found District
										</p>
										<p class="text-4xl font-mono font-bold text-green-400 tracking-widest mb-2">
											{registrationState.form.district || 'N/A'}
=======
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
>>>>>>> Moving-Changes-Stashed
										</p>
										<button
											type="button"
											onclick={resetDistrictFinder}
<<<<<<< HEAD
											class="text-xs text-bone/40 hover:text-ember underline underline-offset-4 transition-colors"
										>
											Use a different ZIP?
=======
											class="text-xs text-bone/50 hover:text-ember transition-colors mt-1"
										>
											Not your district?
>>>>>>> Moving-Changes-Stashed
										</button>
									</div>
								{/if}
							</div>
						{/if}

<<<<<<< HEAD
						<label
							class="flex items-center gap-2 text-sm text-bone/60 cursor-pointer p-3 bg-charcoal/40 border border-white/10 rounded-md hover:bg-charcoal/80 transition-colors"
						>
							<input
								type="checkbox"
								bind:checked={notInGeorgia}
								class="w-5 h-5 bg-charcoal border-white/30 rounded text-crimson focus:ring-crimson/50 focus-visible:ring-2 focus-visible:ring-crimson/50 outline-none"
=======
						<label class="flex items-center gap-2 text-sm text-bone/60 cursor-pointer mt-4 p-3 bg-charcoal/40 border border-white/10 rounded-md hover:bg-charcoal/80 transition-colors">
							<input
								type="checkbox"
								bind:checked={notInGeorgia}
								class="w-5 h-5 bg-charcoal border-white/30 rounded text-crimson focus:ring-crimson/50"
>>>>>>> Moving-Changes-Stashed
							/>
							I'm not in Georgia, but I want to help.
						</label>
					</div>
<<<<<<< HEAD
					<div class="flex justify-end">
						<button
							type="button"
							onclick={handleNextStep}
							disabled={!registrationState.form.district && !notInGeorgia}
							class="bg-crimson hover:bg-ember text-bone font-bold py-2 px-6 rounded-md uppercase tracking-wide transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-crimson/50 outline-none"
=======
					<div class="flex justify-end mt-6">
						<button
							type="button"
							onclick={nextStep}
							disabled={!district && !notInGeorgia}
							class="bg-crimson hover:bg-ember text-bone font-bold py-2 px-6 rounded-md uppercase tracking-wide transition-all disabled:opacity-30 disabled:cursor-not-allowed"
>>>>>>> Moving-Changes-Stashed
						>
							Next
						</button>
					</div>
				</div>
			{/if}

			<!-- STEP 2: Contact Info -->
<<<<<<< HEAD
			{#if registrationState.step === 2}
				<div
					class="flex-1 flex flex-col justify-between"
=======
			{#if step === 2}
				<div
					class="space-y-4"
>>>>>>> Moving-Changes-Stashed
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
<<<<<<< HEAD
								bind:this={firstNameInput}
								bind:value={registrationState.form.firstName}
								required
								aria-invalid={!!step2Error}
								aria-describedby={step2Error ? 'step2-error' : undefined}
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson focus-visible:ring-2 focus-visible:ring-crimson/50 transition-colors"
								oninput={() => (step2Error = '')}
=======
								bind:value={firstName}
								required
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson transition-colors"
>>>>>>> Moving-Changes-Stashed
							/>
						</div>
						<div>
							<label for="lastName" class="block text-sm font-semibold text-bone/80 mb-1"
								>Last Name *</label
							>
							<input
								type="text"
								id="lastName"
<<<<<<< HEAD
								bind:value={registrationState.form.lastName}
								required
								aria-invalid={!!step2Error}
								aria-describedby={step2Error ? 'step2-error' : undefined}
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson focus-visible:ring-2 focus-visible:ring-crimson/50 transition-colors"
								oninput={() => (step2Error = '')}
=======
								bind:value={lastName}
								required
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson transition-colors"
>>>>>>> Moving-Changes-Stashed
							/>
						</div>
						<div>
							<label for="email" class="block text-sm font-semibold text-bone/80 mb-1"
								>Email *</label
							>
							<input
								type="email"
								id="email"
<<<<<<< HEAD
								bind:value={registrationState.form.email}
								required
								aria-invalid={!!step2Error}
								aria-describedby={step2Error ? 'step2-error' : undefined}
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson focus-visible:ring-2 focus-visible:ring-crimson/50 transition-colors"
								oninput={() => (step2Error = '')}
							/>
						</div>

						<div>
							<label for="address" class="block text-sm font-semibold text-bone/80 mb-1"
								>Physical Address *</label
							>
							<input
								type="text"
								id="address"
								bind:value={registrationState.form.address}
								required
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson transition-colors"
							/>
						</div>

						<div>
							<label for="city" class="block text-sm font-semibold text-bone/80 mb-1">City *</label>
							<input
								type="text"
								id="city"
								bind:value={registrationState.form.city}
=======
								bind:value={email}
>>>>>>> Moving-Changes-Stashed
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
<<<<<<< HEAD
								bind:value={registrationState.form.phone}
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson focus-visible:ring-2 focus-visible:ring-crimson/50 transition-colors"
=======
								bind:value={phone}
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson transition-colors"
>>>>>>> Moving-Changes-Stashed
							/>
						</div>
					</div>

<<<<<<< HEAD
					<div class="flex flex-col">
						{#if step2Error}
							<p id="step2-error" role="alert" class="text-ember text-sm mb-2 text-right">{step2Error}</p>
						{/if}
						<div class="flex justify-between">
							<button
								type="button"
								onclick={() => registrationState.prevStep()}
								class="bg-white/10 hover:bg-white/20 text-bone font-bold py-2 px-6 rounded-md uppercase tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-crimson/50 outline-none"
							>
								Back
							</button>
							<button
								type="button"
								onclick={handleNextStep}
								class="bg-crimson hover:bg-ember text-bone font-bold py-2 px-6 rounded-md uppercase tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-crimson/50 outline-none"
							>
								Next
							</button>
						</div>
=======
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
>>>>>>> Moving-Changes-Stashed
					</div>
				</div>
			{/if}

			<!-- STEP 3: Interests & Church -->
<<<<<<< HEAD
			{#if registrationState.step === 3}
				<div
					class="flex-1 flex flex-col justify-between"
=======
			{#if step === 3}
				<div
					class="space-y-4"
>>>>>>> Moving-Changes-Stashed
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
<<<<<<< HEAD
								bind:this={homeChurchInput}
								bind:value={registrationState.form.homeChurch}
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson focus-visible:ring-2 focus-visible:ring-crimson/50 transition-colors"
=======
								bind:value={homeChurch}
								class="w-full bg-charcoal border border-white/20 text-bone px-4 py-2 rounded-md focus:outline-none focus:border-crimson transition-colors"
>>>>>>> Moving-Changes-Stashed
							/>
						</div>

						<div>
							<p class="text-sm font-semibold text-bone/80 mb-2">I'm interested in...</p>
							<div class="space-y-2">
<<<<<<< HEAD
								{#each [{ value: 'find-church', label: 'I want to find an abolitionist church' }, { value: 'help-bill', label: 'I want to help pass an abolition bill' }, { value: 'evangelism', label: 'I want to be involved with evangelistically' }, { value: 'pastor-elder', label: "I'm a pastor/elder interested in abolitionism" }, { value: 'prayer', label: 'I want to support with prayer' }] as interest}
=======
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
>>>>>>> Moving-Changes-Stashed
									<label
										class="flex items-center gap-3 cursor-pointer p-2 bg-charcoal/50 border border-transparent rounded-md hover:border-white/20 transition-colors"
									>
										<input
											type="checkbox"
											value={interest.value}
<<<<<<< HEAD
											checked={registrationState.form.interests.includes(interest.value)}
											onchange={() => toggleInterest(interest.value)}
											class="w-4 h-4 bg-charcoal border-white/30 rounded text-crimson focus:ring-crimson/50 focus-visible:ring-2 focus-visible:ring-crimson/50 outline-none"
=======
											checked={interests.includes(interest.value)}
											onchange={() => toggleInterest(interest.value)}
											class="w-4 h-4 bg-charcoal border-white/30 rounded text-crimson focus:ring-crimson/50"
>>>>>>> Moving-Changes-Stashed
										/>
										<span class="text-sm text-bone">{interest.label}</span>
									</label>
								{/each}
							</div>
						</div>
					</div>

<<<<<<< HEAD
					<div class="flex justify-between">
						<button
							type="button"
							onclick={() => registrationState.prevStep()}
							class="bg-white/10 hover:bg-white/20 text-bone font-bold py-2 px-6 rounded-md uppercase tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-crimson/50 outline-none"
=======
					<div class="flex justify-between mt-6">
						<button
							type="button"
							onclick={prevStep}
							class="bg-white/10 hover:bg-white/20 text-bone font-bold py-2 px-6 rounded-md uppercase tracking-wide transition-colors"
>>>>>>> Moving-Changes-Stashed
						>
							Back
						</button>
						<button
							type="submit"
<<<<<<< HEAD
							disabled={isSubmitting}
							class="w-1/2 bg-crimson hover:bg-ember text-bone font-bold py-2 rounded-md uppercase tracking-wide transition-colors shadow-lg hover:shadow-crimson/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-crimson/50 outline-none"
						>
							{#if isSubmitting}
								<div
									class="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"
									aria-hidden="true"
								></div>
								<span>Sending...</span>
							{:else}
								Submit
							{/if}
=======
							class="w-1/2 bg-crimson hover:bg-ember text-bone font-bold py-2 rounded-md uppercase tracking-wide transition-colors shadow-lg hover:shadow-crimson/30"
						>
							Submit
>>>>>>> Moving-Changes-Stashed
						</button>
					</div>
				</div>
			{/if}
		</form>
	{:else}
		<div
			in:fly={{ y: 20, duration: 300, delay: 300 }}
<<<<<<< HEAD
			class="bg-green-900/20 border border-green-600 p-8 rounded-md text-center flex flex-col items-center gap-6"
		>
			<div>
				<p class="text-xl font-bold text-green-400 mb-2">Thank you for joining the fight!</p>
				<p class="text-bone/80">Someone already engaged in your area will contact you soon.</p>
			</div>

			<button
				type="button"
				onclick={handleAddAnother}
				class="bg-white/10 hover:bg-white/20 text-bone px-6 py-2 rounded-md font-bold uppercase tracking-wider transition-colors text-sm"
			>
				Submit Another Entry
			</button>
=======
			class="bg-green-900/20 border border-green-600 p-6 rounded-md text-center"
		>
			<p class="text-lg font-semibold text-green-400 mb-2">Thank you for joining the fight!</p>
			<p class="text-bone/80">Someone already engaged in your area will contact you soon.</p>
>>>>>>> Moving-Changes-Stashed
		</div>
	{/if}
</div>
