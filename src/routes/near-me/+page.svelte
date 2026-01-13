<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import type { Map } from 'leaflet';

	let L: any;
	let mapElement: HTMLDivElement;
	let map: Map;

	let selectedDistrict = $state('');
	let churches = $state<any[]>([]);
	let individuals = $state<any[]>([]);
	let showForm = $state(false);
	
	// Form fields
	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let phone = $state('');
	let homeChurch = $state('');
	let interests = $state<string[]>([]);
	let formSubmitted = $state(false);
	
	let allChurches: any = {};
	let allIndividuals: any = {};
	
	onMount(async () => {
		L = await import('leaflet');

		map = L.map(mapElement).setView([32.986, -83.648], 7);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		// Load churches and individuals data
		const [churchesRes, individualsRes] = await Promise.all([
			fetch(`${base}/data/churches.json`),
			fetch(`${base}/data/individuals.json`)
		]);
		
		allChurches = await churchesRes.json();
		allIndividuals = await individualsRes.json();
	});
	
	function handleDistrictChange() {
		churches = allChurches[selectedDistrict] || [];
		individuals = allIndividuals[selectedDistrict] || [];
	}
	
	function toggleInterest(interest: string) {
		if (interests.includes(interest)) {
			interests = interests.filter(i => i !== interest);
		} else {
			interests = [...interests, interest];
		}
	}
	
	function handleSubmit(e: Event) {
		e.preventDefault();
		// Here you would integrate with Formspree/Netlify Forms
		console.log({firstName, lastName, email, phone, selectedDistrict, homeChurch, interests});
		formSubmitted = true;
	}
</script>

<svelte:head>
	<title>Operation Gospel - Who's Near Me?</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-neutral-900 text-neutral-100 px-6 py-16">
	<div class="max-w-5xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 uppercase">
				Who's in the Fight Near Me?
			</h1>
			<p class="text-lg text-neutral-400 max-w-3xl mx-auto">
				You are not alone. Abolitionist churches and committed individuals are already working in Georgia House districts across the state.
			</p>
			<p class="text-base text-neutral-500 mt-2">
				These are people already involved in the fight near you.
			</p>
		</div>

		<div bind:this={mapElement} class="h-96 rounded-lg mb-8"></div>
		
		<!-- District Selector -->
		<div class="bg-neutral-900 border border-neutral-800 p-8 rounded-sm mb-8">
			<label for="district" class="block text-lg font-semibold mb-3">
				Which Georgia House district are you in?
			</label>
			<select 
				id="district"
				bind:value={selectedDistrict}
				onchange={handleDistrictChange}
				class="w-full bg-neutral-800 border border-neutral-700 text-neutral-100 px-4 py-3 rounded-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
			>
				<option value="">Select your district...</option>
				{#each Array.from({length: 180}, (_, i) => i + 1) as district}
					<option value={district.toString()}>District {district}</option>
				{/each}
			</select>
			<p class="text-sm text-neutral-500 mt-2">
				Don't know your district? <a href="https://www.house.ga.gov/Representatives/en-US/FindYourRep.aspx" target="_blank" rel="noopener noreferrer" class="text-red-500 hover:text-red-400 underline">Find it here</a>
			</p>
		</div>
		
		<!-- Results -->
		{#if selectedDistrict}
			<div class="space-y-8 mb-12">
				<!-- Churches -->
				{#if churches.length > 0}
					<div>
						<h2 class="text-2xl font-bold mb-4 text-red-600 uppercase tracking-wide">
							Abolitionist Churches
						</h2>
						<div class="space-y-4">
							{#each churches as church}
								<div class="bg-neutral-900 border border-neutral-800 p-6 rounded-sm">
									<h3 class="text-xl font-bold text-neutral-100 mb-2">{church.name}</h3>
									<p class="text-sm text-neutral-500 mb-2">📍 {church.city}, GA – District {church.district}</p>
									<p class="text-sm text-neutral-400 mb-2"><strong>Pastor:</strong> {church.pastor}</p>
									<p class="text-sm text-neutral-400 mb-3">{church.description}</p>
									<a href="mailto:{church.contact}" class="text-red-500 hover:text-red-400 text-sm font-semibold">Contact</a>
								</div>
							{/each}
						</div>
					</div>
				{/if}
				
				<!-- Individuals -->
				{#if individuals.length > 0}
					<div>
						<h2 class="text-2xl font-bold mb-4 text-red-600 uppercase tracking-wide">
							Abolitionist Contacts
						</h2>
						<div class="space-y-4">
							{#each individuals as individual}
								<div class="bg-neutral-900 border border-neutral-800 p-6 rounded-sm">
									<h3 class="text-xl font-bold text-neutral-100 mb-2">{individual.name}</h3>
									<p class="text-sm text-neutral-500 mb-2">📍 {individual.city}, GA – District {individual.district}</p>
									<p class="text-sm text-neutral-400 mb-2"><strong>{individual.title}</strong></p>
									<p class="text-sm text-neutral-400 mb-3">{individual.description}</p>
									<a href="mailto:{individual.contact}" class="text-red-500 hover:text-red-400 text-sm font-semibold">Contact</a>
								</div>
							{/each}
						</div>
					</div>
				{/if}
				
				{#if churches.length === 0 && individuals.length === 0}
					<div class="bg-neutral-900 border border-neutral-800 p-8 rounded-sm text-center">
						<p class="text-neutral-400 mb-4">No contacts found for District {selectedDistrict} yet.</p>
						<p class="text-neutral-500 text-sm">Be the first to join the fight in your district!</p>
					</div>
				{/if}
				
				<!-- Collaborations Note -->
				<div class="bg-neutral-950 border border-neutral-800 p-6 rounded-sm text-sm text-neutral-400">
					<p class="mb-2">We collaborate with Georgia Life Alliance (GLA) and the Georgia Baptist Association.</p>
					<p><strong>Note:</strong> We are not affiliated with Georgia Right to Life.</p>
				</div>
			</div>
			
			<!-- Join the Fight Button -->
			{#if !showForm && !formSubmitted}
				<div class="text-center mb-8">
					<button 
						onclick={() => showForm = true}
						class="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg"
					>
						Join the Fight in Your District
					</button>
				</div>
			{/if}
			
			<!-- Contact Form -->
			{#if showForm && !formSubmitted}
				<div class="bg-neutral-900 border border-red-600 p-8 rounded-sm">
					<h2 class="text-2xl font-bold uppercase tracking-wide mb-6">Join the Fight in Your District</h2>
					<form onsubmit={handleSubmit} class="space-y-4">
						<div class="grid md:grid-cols-2 gap-4">
							<div>
								<label for="firstName" class="block text-sm font-semibold mb-2">First Name *</label>
								<input 
									type="text" 
									id="firstName" 
									bind:value={firstName}
									required
									class="w-full bg-neutral-800 border border-neutral-700 text-neutral-100 px-4 py-2 rounded-sm focus:outline-none focus:border-red-600"
								/>
							</div>
							<div>
								<label for="lastName" class="block text-sm font-semibold mb-2">Last Name *</label>
								<input 
									type="text" 
									id="lastName" 
									bind:value={lastName}
									required
									class="w-full bg-neutral-800 border border-neutral-700 text-neutral-100 px-4 py-2 rounded-sm focus:outline-none focus:border-red-600"
								/>
							</div>
						</div>
						
						<div class="grid md:grid-cols-2 gap-4">
							<div>
								<label for="email" class="block text-sm font-semibold mb-2">Email *</label>
								<input 
									type="email" 
									id="email" 
									bind:value={email}
									required
									class="w-full bg-neutral-800 border border-neutral-700 text-neutral-100 px-4 py-2 rounded-sm focus:outline-none focus:border-red-600"
								/>
							</div>
							<div>
								<label for="phone" class="block text-sm font-semibold mb-2">Cell *</label>
								<input 
									type="tel" 
									id="phone" 
									bind:value={phone}
									required
									class="w-full bg-neutral-800 border border-neutral-700 text-neutral-100 px-4 py-2 rounded-sm focus:outline-none focus:border-red-600"
								/>
							</div>
						</div>
						
						<div>
							<label for="homeChurch" class="block text-sm font-semibold mb-2">Home Church</label>
							<input 
								type="text" 
								id="homeChurch" 
								bind:value={homeChurch}
								class="w-full bg-neutral-800 border border-neutral-700 text-neutral-100 px-4 py-2 rounded-sm focus:outline-none focus:border-red-600"
							/>
						</div>
						
						<div>
							<p class="text-sm font-semibold mb-3">Interests (select all that apply):</p>
							<div class="space-y-2">
								<label class="flex items-center gap-2 cursor-pointer">
									<input 
										type="checkbox" 
										value="find-church"
										checked={interests.includes('find-church')}
										onchange={() => toggleInterest('find-church')}
										class="w-4 h-4"
									/>
									<span class="text-sm text-neutral-300">I want to find an abolitionist church</span>
								</label>
								<label class="flex items-center gap-2 cursor-pointer">
									<input 
										type="checkbox" 
										value="help-hb441"
										checked={interests.includes('help-hb441')}
										onchange={() => toggleInterest('help-hb441')}
										class="w-4 h-4"
									/>
									<span class="text-sm text-neutral-300">I want to help pass HB 441</span>
								</label>
								<label class="flex items-center gap-2 cursor-pointer">
									<input 
										type="checkbox" 
										value="pastor-elder"
										checked={interests.includes('pastor-elder')}
										onchange={() => toggleInterest('pastor-elder')}
										class="w-4 h-4"
									/>
									<span class="text-sm text-neutral-300">I'm a pastor/elder interested in abolitionism</span>
								</label>
								<label class="flex items-center gap-2 cursor-pointer">
									<input 
										type="checkbox" 
										value="prayer-giving"
										checked={interests.includes('prayer-giving')}
										onchange={() => toggleInterest('prayer-giving')}
										class="w-4 h-4"
									/>
									<span class="text-sm text-neutral-300">I want to support with prayer and giving</span>
								</label>
							</div>
						</div>
						
						<button 
							type="submit"
							class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-sm uppercase tracking-wide transition-colors"
						>
							Join the Fight
						</button>
					</form>
				</div>
			{/if}
			
			<!-- Form Submitted -->
			{#if formSubmitted}
				<div class="bg-green-900/20 border border-green-600 p-8 rounded-sm text-center">
					<p class="text-lg font-semibold text-green-400 mb-2">Thank you for joining the fight!</p>
					<p class="text-neutral-400">Someone already engaged in your area will contact you soon.</p>
				</div>
			{/if}
		{/if}
		
		<!-- CTAs -->
		<div class="flex flex-col md:flex-row gap-4 items-center justify-center mt-12">
			<a 
				href="{base}/respond"
				class="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
			>
				Pray. Fight. Give.
			</a>
			<a 
				href="{base}/georgia-battle"
				class="w-full md:w-auto bg-transparent border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 font-semibold px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 text-center"
			>
				Learn About HB 441
			</a>
		</div>
	</div>
</div>
