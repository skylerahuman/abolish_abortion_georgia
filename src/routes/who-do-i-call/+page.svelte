<script lang="ts">
	import { onMount } from 'svelte';
	import * as turf from '@turf/turf';
	import type { Map, Marker, Layer, LatLngBounds } from 'leaflet';

	interface ElectedOfficial {
		name: string;
		party: string;
		phone: string;
		email: string;
		office_address: string;
	}

	interface AdvocacyContact {
		name: string;
		lat: number;
		lng: number;
		type: string;
		address: string;
	}

	interface DistrictLookupResult {
		zipCode: string;
		city: string;
		lat: number;
		lng: number;
		usHouseDistrictId: string;
		stateSenateDistrictId: string;
		stateHouseDistrictId: string;
		usHouseRep: ElectedOfficial;
		stateSenator: ElectedOfficial;
		stateHouseRep: ElectedOfficial;
		advocacyContact: AdvocacyContact;
	}

	let searchZipCode = $state('');
	let mapElement = $state<HTMLDivElement>();
	let map: Map | null = null;
	let L: any = null;
	let lookupResult = $state<DistrictLookupResult | null>(null);
	let errorMessage = $state('');
	let loading = $state(false);

	let electedOfficialsData: any = null;
	let advocacyContactsData: any = null;
	let usHouseGeoJSON: any = null;
	let stateSenateGeoJSON: any = null;
	let stateHouseGeoJSON: any = null;
	let stateBoundaryGeoJSON: any = null;

	let activeMapMarkers: Marker[] = [];

	// Fallback ZIP code coordinates for common Georgia ZIPs
	const zipCodeFallback: Record<string, { lat: number; lng: number; city: string }> = {
		'30309': { lat: 33.7847, lng: -84.3747, city: 'Atlanta' },
		'31419': { lat: 32.0298, lng: -81.1165, city: 'Savannah' },
		'31210': { lat: 32.8819, lng: -83.7102, city: 'Macon' },
		'30909': { lat: 33.4404, lng: -82.0702, city: 'Augusta' },
		'31907': { lat: 32.4754, lng: -84.9324, city: 'Columbus' },
		'30303': { lat: 33.7545, lng: -84.3903, city: 'Atlanta' },
		'30318': { lat: 33.7985, lng: -84.4255, city: 'Atlanta' },
		'30312': { lat: 33.7384, lng: -84.3716, city: 'Atlanta' },
		'31401': { lat: 32.0809, lng: -81.0912, city: 'Savannah' },
		'31405': { lat: 32.0176, lng: -81.1287, city: 'Savannah' }
	};

	onMount(async () => {
		// Load Leaflet
		L = (await import('leaflet')).default;

		// Load data files
		try {
			const [repsRes, pocRes, congressRes, senateRes, houseRes, boundaryRes] = await Promise.all([
				fetch('/data/representatives.json'),
				fetch('/data/points-of-contact.json'),
				fetch('/data/ga-congress.json'),
				fetch('/data/ga-state-senate.json'),
				fetch('/data/ga-state-house.json'),
				fetch('/data/ga-boundary.json')
			]);

			electedOfficialsData = await repsRes.json();
			advocacyContactsData = await pocRes.json();
			usHouseGeoJSON = await congressRes.json();
			stateSenateGeoJSON = await senateRes.json();
			stateHouseGeoJSON = await houseRes.json();
			stateBoundaryGeoJSON = await boundaryRes.json();
		} catch (error) {
			console.error('Error loading data:', error);
		}

		// Initialize map
		if (mapElement) {
			map = L.map(mapElement).setView([32.6781, -83.2238], 7);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			// Georgia boundary will be added when a search is performed
		}
	});

	async function performDistrictLookup() {
		if (!searchZipCode || searchZipCode.length !== 5) {
			errorMessage = 'Please enter a valid 5-digit ZIP code.';
			return;
		}

		loading = true;
		errorMessage = '';
		lookupResult = null;

		try {
			let geocodeData: any[] = [];
			let lat: number;
			let lng: number;
			let city: string = '';

			// Try primary geocoding approach
			try {
				const geocodeUrl = `https://nominatim.openstreetmap.org/search?postalcode=${searchZipCode}&country=US&state=Georgia&format=json&limit=1`;
				const geocodeRes = await fetch(geocodeUrl, {
					headers: {
						'User-Agent': 'AbolitionGeorgia/1.0'
					}
				});
				geocodeData = await geocodeRes.json();
			} catch (e) {
				console.warn('Primary geocoding failed:', e);
			}

			// Fallback: Try broader search with just ZIP code
			if (!geocodeData || geocodeData.length === 0) {
				try {
					const fallbackUrl = `https://nominatim.openstreetmap.org/search?q=${searchZipCode}+Georgia+USA&format=json&limit=1`;
					const fallbackRes = await fetch(fallbackUrl, {
						headers: {
							'User-Agent': 'AbolitionGeorgia/1.0'
						}
					});
					geocodeData = await fallbackRes.json();
				} catch (e) {
					console.warn('Fallback geocoding failed:', e);
				}
			}

			// Final fallback: Use hardcoded ZIP coordinates
			if (!geocodeData || geocodeData.length === 0) {
				if (zipCodeFallback[searchZipCode]) {
					const fallback = zipCodeFallback[searchZipCode];
					lat = fallback.lat;
					lng = fallback.lng;
					city = fallback.city;
				} else {
					errorMessage = 'Could not find this ZIP code in Georgia. Please try again.';
					loading = false;
					return;
				}
			} else {
				lat = parseFloat(geocodeData[0].lat);
				lng = parseFloat(geocodeData[0].lon);
				city = geocodeData[0].display_name.split(',')[0];
			}

			// Find districts using point-in-polygon
			const point = turf.point([lng, lat]);
			console.log('Looking up districts for point:', { lat, lng, point });

			const usHouseDistrictId = getDistrictIdFromCoordinate(point, usHouseGeoJSON);
			const stateSenateDistrictId = getDistrictIdFromCoordinate(point, stateSenateGeoJSON);
			const stateHouseDistrictId = getDistrictIdFromCoordinate(point, stateHouseGeoJSON);
			
			console.log('Found districts:', { usHouseDistrictId, stateSenateDistrictId, stateHouseDistrictId });

			if (!usHouseDistrictId) {
				errorMessage = 'Could not determine congressional district for this ZIP code.';
				loading = false;
				return;
			}

			// Look up representatives
			const usHouseRep = electedOfficialsData.us_congress[usHouseDistrictId];
			const stateSenator = stateSenateDistrictId ? electedOfficialsData.state_senate[stateSenateDistrictId] : null;
			const stateHouseRep = stateHouseDistrictId ? electedOfficialsData.state_house[stateHouseDistrictId] : null;

			// Find nearest point of contact
			const advocacyContact = advocacyContactsData[usHouseDistrictId]?.[0];

			lookupResult = {
				zipCode: searchZipCode,
				city,
				lat,
				lng,
				usHouseDistrictId,
				stateSenateDistrictId: stateSenateDistrictId || 'N/A',
				stateHouseDistrictId: stateHouseDistrictId || 'N/A',
				usHouseRep,
				stateSenator,
				stateHouseRep,
				advocacyContact
			};

			// Update map
			renderMapMarkers(lat, lng, usHouseDistrictId, stateSenateDistrictId, stateHouseDistrictId, advocacyContact);
		} catch (error) {
			console.error('Search error:', error);
			errorMessage = 'An error occurred while searching. Please try again.';
		} finally {
			loading = false;
		}
	}

	function getDistrictIdFromCoordinate(point: any, geoJSON: any): string | null {
		if (!geoJSON || !geoJSON.features) return null;

		for (const feature of geoJSON.features) {
			const polygon = turf.polygon(feature.geometry.coordinates);
			if (turf.booleanPointInPolygon(point, polygon)) {
				return feature.properties.district;
			}
		}
		return null;
	}

	function renderMapMarkers(lat: number, lng: number, usDistrictId: string, senateDistrictId: string | null, houseDistrictId: string | null, advocacyContact: AdvocacyContact | null) {
		if (!map || !L) return;

		// Clear previous markers
		activeMapMarkers.forEach(marker => marker.remove());
		activeMapMarkers = [];

		// Add user location marker
		const userIcon = L.divIcon({
			html: '<div style="background-color: #DC2626; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
			className: '',
			iconSize: [16, 16],
			iconAnchor: [8, 8]
		});
		const userMarker = L.marker([lat, lng], { icon: userIcon })
			.bindPopup('<strong>Your Location</strong>')
			.addTo(map);
		activeMapMarkers.push(userMarker);

		// Add point of contact marker
		if (advocacyContact) {
			const pocIcon = L.divIcon({
				html: '<div style="background-color: #8B2635; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
				className: '',
				iconSize: [14, 14],
				iconAnchor: [7, 7]
			});
			const pocMarker = L.marker([advocacyContact.lat, advocacyContact.lng], { icon: pocIcon })
				.bindPopup(`<strong>${advocacyContact.name}</strong><br/>${advocacyContact.type}`)
				.addTo(map);
			activeMapMarkers.push(pocMarker);
		}

		// Simply zoom to the user's location
		map.flyTo([lat, lng], 13);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			performDistrictLookup();
		}
	}
</script>

<div class="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Left Panel: Input and Results -->
	<div class="lg:w-1/3 space-y-6">
		<div>
			<h1 class="text-4xl font-bold text-charcoal-900 dark:text-cream-100 mb-4">Who Do I Call</h1>
			<p class="text-charcoal-700 dark:text-cream-200">
				Enter your Georgia ZIP code to find your representatives and the nearest advocacy contact.
			</p>
		</div>

		<!-- Search Input -->
		<div class="bg-cream-50 dark:bg-charcoal-800 rounded-lg shadow-lg p-6">
			<label for="zipcode" class="block text-sm font-medium text-charcoal-700 dark:text-cream-200 mb-2">
				Enter your Georgia ZIP code
			</label>
			<div class="flex gap-2">
				<input
					type="text"
					id="zipcode"
					bind:value={searchZipCode}
					onkeypress={handleKeyPress}
					placeholder="e.g., 30309"
					maxlength="5"
					class="flex-1 px-4 py-2 rounded-lg border border-charcoal-300 dark:border-charcoal-600 bg-white dark:bg-charcoal-900 text-charcoal-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-crimson-600"
				/>
				<button
					onclick={performDistrictLookup}
					disabled={loading}
					class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
				>
					{loading ? 'Searching...' : 'Find'}
				</button>
			</div>
			{#if errorMessage}
				<p class="mt-2 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
			{/if}
		</div>

		<!-- Results -->
		{#if lookupResult}
			<div class="bg-cream-50 dark:bg-charcoal-800 rounded-lg shadow-lg p-6 space-y-4">
				<div>
					<h2 class="text-xl font-semibold text-crimson-700 dark:text-crimson-500 mb-2">Your Location</h2>
					<p class="text-charcoal-700 dark:text-cream-200">{lookupResult.city}, GA {lookupResult.zipCode}</p>
				</div>

				<div class="border-t border-charcoal-200 dark:border-charcoal-700 pt-4">
					<h3 class="text-lg font-semibold text-crimson-700 dark:text-crimson-500 mb-2">U.S. House of Representatives</h3>
					<p class="text-sm text-charcoal-600 dark:text-cream-300 mb-1">District: {lookupResult.usHouseDistrictId}</p>
					{#if lookupResult.usHouseRep}
						<p class="font-medium text-charcoal-900 dark:text-cream-100">{lookupResult.usHouseRep.name} ({lookupResult.usHouseRep.party})</p>
						<p class="text-sm text-charcoal-700 dark:text-cream-200">{lookupResult.usHouseRep.phone}</p>
						<p class="text-sm text-charcoal-700 dark:text-cream-200">{lookupResult.usHouseRep.email}</p>
						<p class="text-xs text-charcoal-600 dark:text-cream-300 mt-1">{lookupResult.usHouseRep.office_address}</p>
					{/if}
				</div>

				{#if lookupResult.stateSenator}
					<div class="border-t border-charcoal-200 dark:border-charcoal-700 pt-4">
						<h3 class="text-lg font-semibold text-crimson-700 dark:text-crimson-500 mb-2">Georgia State Senate</h3>
						<p class="text-sm text-charcoal-600 dark:text-cream-300 mb-1">District: {lookupResult.stateSenateDistrictId}</p>
						<p class="font-medium text-charcoal-900 dark:text-cream-100">{lookupResult.stateSenator.name} ({lookupResult.stateSenator.party})</p>
						<p class="text-sm text-charcoal-700 dark:text-cream-200">{lookupResult.stateSenator.phone}</p>
						<p class="text-sm text-charcoal-700 dark:text-cream-200">{lookupResult.stateSenator.email}</p>
						<p class="text-xs text-charcoal-600 dark:text-cream-300 mt-1">{lookupResult.stateSenator.office_address}</p>
					</div>
				{/if}

				{#if lookupResult.stateHouseRep}
					<div class="border-t border-charcoal-200 dark:border-charcoal-700 pt-4">
						<h3 class="text-lg font-semibold text-crimson-700 dark:text-crimson-500 mb-2">Georgia State House</h3>
						<p class="text-sm text-charcoal-600 dark:text-cream-300 mb-1">District: {lookupResult.stateHouseDistrictId}</p>
						<p class="font-medium text-charcoal-900 dark:text-cream-100">{lookupResult.stateHouseRep.name} ({lookupResult.stateHouseRep.party})</p>
						<p class="text-sm text-charcoal-700 dark:text-cream-200">{lookupResult.stateHouseRep.phone}</p>
						<p class="text-sm text-charcoal-700 dark:text-cream-200">{lookupResult.stateHouseRep.email}</p>
						<p class="text-xs text-charcoal-600 dark:text-cream-300 mt-1">{lookupResult.stateHouseRep.office_address}</p>
					</div>
				{/if}

				{#if lookupResult.advocacyContact}
					<div class="border-t border-charcoal-200 dark:border-charcoal-700 pt-4">
						<h3 class="text-lg font-semibold text-crimson-700 dark:text-crimson-500 mb-2">Nearby Point of Contact</h3>
						<p class="font-medium text-charcoal-900 dark:text-cream-100">{lookupResult.advocacyContact.name}</p>
						<p class="text-sm text-charcoal-700 dark:text-cream-200">{lookupResult.advocacyContact.type}</p>
						<p class="text-sm text-charcoal-700 dark:text-cream-200">{lookupResult.advocacyContact.address}</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Right Panel: Map -->
	<div class="lg:w-2/3">
		<div class="bg-cream-50 dark:bg-charcoal-800 rounded-lg shadow-lg p-4">
			<div bind:this={mapElement} class="w-full h-[600px] rounded-lg"></div>
		</div>
	</div>
</div>
