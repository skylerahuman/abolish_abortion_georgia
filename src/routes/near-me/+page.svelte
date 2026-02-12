<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import type { Map as LeafletMap } from 'leaflet';
    // @ts-ignore
    import markerIcon from 'leaflet/dist/images/marker-icon.png';
    // @ts-ignore
    import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
    // @ts-ignore
    import markerShadow from 'leaflet/dist/images/marker-shadow.png';

	let L: any;
	let mapElement: HTMLDivElement;
	let map: LeafletMap;

	// District State
	let districtDigit1 = $state('0');
	let districtDigit2 = $state('0');
	let districtDigit3 = $state('1'); // Default to 001

    // Derived selectedDistrict from digits
    let selectedDistrict = $derived(`${districtDigit1}${districtDigit2}${districtDigit3}`);

	// District Lookup Modal State
	let showLookupModal = $state(false);
	let lookupZip = $state('');
	let lookupError = $state('');
	let lookupLoading = $state(false);
	let zipToDistrictMap: Record<string, string> | null = null;

	// Form State
	let showForm = $state(false);
	let formSubmitted = $state(false);
	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let phone = $state('');
	let homeChurch = $state('');
	let interests = $state<string[]>([]);

	// Random Churches Data
	const churchNamesFirst = ["Grace", "Faith", "Truth", "Sovereign", "Reformed", "Community", "Hope", "Victory", "Peace", "Redeemer", "Providence", "Trinity", "Cornerstone", "Living", "Heritage", "Calvary", "Emmanuel"];
	const churchNamesSecond = ["Baptist", "Bible", "Community", "Fellowship", "Chapel", "Tabernacle", "Church"];

    function generateRandomChurches(count: number) {
        const churches = [];
        // Approximate GA bounds
        const latMin = 30.5, latMax = 35.0;
        const lonMin = -85.5, lonMax = -81.0;

        for (let i = 0; i < count; i++) {
            const name = `${churchNamesFirst[Math.floor(Math.random() * churchNamesFirst.length)]} ${churchNamesSecond[Math.floor(Math.random() * churchNamesSecond.length)]} Church`;
            const lat = latMin + Math.random() * (latMax - latMin);
            const lng = lonMin + Math.random() * (lonMax - lonMin);
            churches.push({ name, lat, lng });
        }
        return churches;
    }

	onMount(async () => {
        // Load District from LocalStorage
        const savedDistrict = localStorage.getItem('userDistrict');
        if (savedDistrict && savedDistrict.length === 3) {
            districtDigit1 = savedDistrict[0];
            districtDigit2 = savedDistrict[1];
            districtDigit3 = savedDistrict[2];
        }

		L = await import('leaflet');

        // Fix Leaflet's default icon path issues with Vite
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: markerIcon2x,
            iconUrl: markerIcon,
            shadowUrl: markerShadow
        });

		map = L.map(mapElement).setView([32.986, -83.648], 7);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

        // Add random pins
        const churches = generateRandomChurches(75);
        churches.forEach(church => {
             const marker = L.marker([church.lat, church.lng]).addTo(map);
             marker.bindPopup(`<b>${church.name}</b><br>Equipping the saints.`);
        });
	});

	async function loadZipData() {
		if (zipToDistrictMap) return;
		lookupLoading = true;
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
		} catch (error) {
			lookupError = 'Could not load district data.';
		} finally {
			lookupLoading = false;
		}
	}

	async function handleZipLookup() {
        if (lookupZip.length < 5) {
            lookupError = "Please enter a valid 5-digit ZIP.";
            return;
        }
		await loadZipData();

		if (!zipToDistrictMap) {
			lookupError = 'District data is not loaded.';
			return;
		}

        lookupError = '';
		const foundDistrict = zipToDistrictMap[lookupZip];

		if (foundDistrict) {
            // Format to 3 digits (e.g. "1" -> "001")
            const padded = foundDistrict.padStart(3, '0');
            districtDigit1 = padded[0];
            districtDigit2 = padded[1];
            districtDigit3 = padded[2];

            localStorage.setItem('userDistrict', padded);
            showLookupModal = false;
		} else {
			lookupError = 'District not found for this ZIP code.';
		}
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
        // Log to null/void
		console.log("Form Submitted (Void)", {firstName, lastName, email, phone, selectedDistrict, homeChurch, interests});
		formSubmitted = true;
	}

    // Cycle digit logic
    function cycleDigit(current: string, direction: 'up' | 'down') {
        let val = parseInt(current);
        if (isNaN(val)) val = 0;
        if (direction === 'up') val = (val + 1) % 10;
        else val = (val - 1 + 10) % 10;
        return val.toString();
    }
</script>

<svelte:head>
	<title>Operation Gospel - Local Churches</title>
</svelte:head>

<!-- Modal -->
{#if showLookupModal}
<div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div class="bg-neutral-900 border border-neutral-700 p-8 rounded-sm max-w-md w-full shadow-2xl">
        <h2 class="text-2xl font-bold text-white mb-4 uppercase">Find Your District</h2>
        <p class="text-neutral-400 mb-6">Enter your ZIP code to find your Georgia House District.</p>

        <div class="flex gap-2 mb-4">
            <input
                type="text"
                bind:value={lookupZip}
                placeholder="ZIP Code"
                class="flex-1 bg-neutral-800 border border-neutral-600 text-white px-4 py-2 rounded-sm focus:border-red-600 outline-none"
                maxlength="5"
            />
            <button
                onclick={handleZipLookup}
                disabled={lookupLoading}
                class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-sm font-bold uppercase disabled:opacity-50"
            >
                {lookupLoading ? '...' : 'Find'}
            </button>
        </div>
        {#if lookupError}
            <p class="text-red-500 text-sm mb-4">{lookupError}</p>
        {/if}

        <button onclick={() => (showLookupModal = false)} class="text-neutral-500 hover:text-white text-sm underline">Close</button>
    </div>
</div>
{/if}

<div class="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-neutral-900 text-neutral-100 px-6 py-16">
	<div class="max-w-5xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 uppercase">
				Local Church Network
			</h1>
			<p class="text-lg text-neutral-400 max-w-3xl mx-auto">
				We work with local churches to equip them in outreach programs to fulfill the Great Commission.
			</p>
		</div>

		<div bind:this={mapElement} class="h-96 rounded-lg mb-12 border border-neutral-800 z-0"></div>
		
        <!-- Pastor CTA -->
        <div class="bg-neutral-900 border-l-4 border-red-600 p-8 mb-12 shadow-lg">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 class="text-2xl font-bold text-white uppercase tracking-wide mb-2">Are you a Pastor?</h2>
                    <p class="text-neutral-400">Join our network of abolitionist churches. We provide resources, training, and support for your congregation.</p>
                </div>
                <button
                    onclick={() => { showForm = true; interests = ['pastor-elder']; document.getElementById('join-form')?.scrollIntoView({behavior: 'smooth'}); }}
                    class="bg-white text-black hover:bg-neutral-200 font-bold px-8 py-3 rounded-sm uppercase tracking-wider whitespace-nowrap"
                >
                    Add Your Church
                </button>
            </div>
        </div>

		<!-- District Selector & Form Section -->
		<div class="bg-neutral-900 border border-neutral-800 p-8 rounded-sm mb-8" id="join-form">
			<div class="mb-8 text-center">
                 <h2 class="text-2xl font-bold uppercase tracking-wide mb-6">Join the Fight</h2>
                 <p class="text-neutral-400 mb-4">Enter your district to connect with abolitionists in your area.</p>

                 <!-- Custom District Input -->
                 <div class="flex flex-col items-center">
                     <div class="flex items-center gap-2 mb-2">
                        <!-- Digit 1 -->
                        <div class="flex flex-col items-center">
                            <button onclick={() => (districtDigit1 = cycleDigit(districtDigit1, 'up'))} class="text-neutral-500 hover:text-white mb-1">▲</button>
                            <input type="text" readonly value={districtDigit1} class="w-12 h-16 bg-black border border-neutral-700 text-3xl text-center font-mono rounded-sm text-red-500 focus:outline-none" />
                            <button onclick={() => (districtDigit1 = cycleDigit(districtDigit1, 'down'))} class="text-neutral-500 hover:text-white mt-1">▼</button>
                        </div>
                         <!-- Digit 2 -->
                        <div class="flex flex-col items-center">
                            <button onclick={() => (districtDigit2 = cycleDigit(districtDigit2, 'up'))} class="text-neutral-500 hover:text-white mb-1">▲</button>
                            <input type="text" readonly value={districtDigit2} class="w-12 h-16 bg-black border border-neutral-700 text-3xl text-center font-mono rounded-sm text-red-500 focus:outline-none" />
                            <button onclick={() => (districtDigit2 = cycleDigit(districtDigit2, 'down'))} class="text-neutral-500 hover:text-white mt-1">▼</button>
                        </div>
                         <!-- Digit 3 -->
                        <div class="flex flex-col items-center">
                            <button onclick={() => (districtDigit3 = cycleDigit(districtDigit3, 'up'))} class="text-neutral-500 hover:text-white mb-1">▲</button>
                            <input type="text" readonly value={districtDigit3} class="w-12 h-16 bg-black border border-neutral-700 text-3xl text-center font-mono rounded-sm text-red-500 focus:outline-none" />
                            <button onclick={() => (districtDigit3 = cycleDigit(districtDigit3, 'down'))} class="text-neutral-500 hover:text-white mt-1">▼</button>
                        </div>
                     </div>
                     <button onclick={() => (showLookupModal = true)} class="text-sm text-red-500 hover:text-red-400 underline uppercase tracking-wider font-bold">
                        Not sure your district? Find it &rarr;
                     </button>
                 </div>
            </div>

			<!-- Contact Form -->
			{#if !formSubmitted}
					<form onsubmit={handleSubmit} class="space-y-4 max-w-2xl mx-auto">
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
							Submit
						</button>
					</form>
			{/if}
			
			<!-- Form Submitted -->
			{#if formSubmitted}
				<div class="bg-green-900/20 border border-green-600 p-8 rounded-sm text-center">
					<p class="text-lg font-semibold text-green-400 mb-2">Thank you for joining the fight!</p>
					<p class="text-neutral-400">Someone already engaged in your area will contact you soon.</p>
				</div>
			{/if}
		</div>

	</div>
</div>
