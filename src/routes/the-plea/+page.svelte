<script lang="ts">
	import { onMount } from 'svelte';
	import * as turf from '@turf/turf';
	import type { Map, Marker } from 'leaflet';
    import { findLegislatorByName, leadership } from '$lib/data/legislator_data';
    import type { Legislator, Stance } from '$lib/types';

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

    interface EnhancedLegislator extends Legislator {
        contactInfo?: ElectedOfficial; // Merged from the JSON data
    }

	interface DistrictLookupResult {
		zipCode: string;
		city: string;
		lat: number;
		lng: number;
		usHouseDistrictId: string;
		stateSenateDistrictId: string;
		stateHouseDistrictId: string;
        
        // The core advocacy targets
        targets: EnhancedLegislator[];
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
				fetch('/data/representatives.json'), // Keep using this for contact info for now
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
		}
	});

    function getLegislatorStanceColor(stance: Stance): string {
        switch (stance) {
            case 'sponsor': return 'bg-green-900 text-green-100 border-green-600';
            case 'supporter': return 'bg-blue-900 text-blue-100 border-blue-600';
            case 'target': return 'bg-red-900 text-red-100 border-red-600';
            case 'opposed': return 'bg-neutral-800 text-neutral-400 border-neutral-600';
            default: return 'bg-neutral-800 text-neutral-400 border-neutral-600';
        }
    }

    function enrichLegislator(basicInfo: ElectedOfficial, chamber: 'house' | 'senate', district: string): EnhancedLegislator {
        // Try to find in our enhanced static data
        const enhanced = findLegislatorByName(basicInfo.name);
        
        if (enhanced) {
            return {
                ...enhanced,
                contactInfo: basicInfo,
                // Ensure chamber/district match if coming from fuzzy lookup, or trust the static data
                chamber: enhanced.chamber, 
                district: enhanced.district
            };
        }

        // Fallback if not in our static "key players" list
        return {
            id: basicInfo.name.toLowerCase().replace(/ /g, '-'),
            name: basicInfo.name,
            chamber,
            district,
            party: basicInfo.party as 'R' | 'D' | 'I',
            stance: 'undecided',
            roles: [],
            committees: [],
            contactInfo: basicInfo
        };
    }

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
			
			const usHouseDistrictId = getDistrictIdFromCoordinate(point, usHouseGeoJSON);
			const stateSenateDistrictId = getDistrictIdFromCoordinate(point, stateSenateGeoJSON);
			const stateHouseDistrictId = getDistrictIdFromCoordinate(point, stateHouseGeoJSON);
			
			if (!usHouseDistrictId) {
				errorMessage = 'Could not determine congressional district for this ZIP code.';
				loading = false;
				return;
			}

			// Look up representatives from JSON data
			const usHouseRepInfo = electedOfficialsData.us_congress[usHouseDistrictId];
			const stateSenatorInfo = stateSenateDistrictId ? electedOfficialsData.state_senate[stateSenateDistrictId] : null;
			const stateHouseRepInfo = stateHouseDistrictId ? electedOfficialsData.state_house[stateHouseDistrictId] : null;

			// Find nearest point of contact
			const advocacyContact = advocacyContactsData[usHouseDistrictId]?.[0];

            // Build the Targets List
            const targets: EnhancedLegislator[] = [];

            // 1. Leadership (Always added)
            // We'll just add them as is, but maybe we want to fetch their contact info if available in the global list?
            // For now, use the static leadership data.
            leadership.forEach(leader => targets.push({ ...leader }));

            // 2. Local State House Rep
            if (stateHouseRepInfo) {
                const enrichedRep = enrichLegislator(stateHouseRepInfo, 'house', stateHouseDistrictId || 'N/A');
                // Label them as "Your Representative"
                enrichedRep.roles.unshift({ title: 'Your Representative', priority: 0 });
                targets.push(enrichedRep);
            }

            // 3. Local State Senator
            if (stateSenatorInfo) {
                const enrichedSen = enrichLegislator(stateSenatorInfo, 'senate', stateSenateDistrictId || 'N/A');
                enrichedSen.roles.unshift({ title: 'Your Senator', priority: 0 });
                targets.push(enrichedSen);
            }

			lookupResult = {
				zipCode: searchZipCode,
				city,
				lat,
				lng,
				usHouseDistrictId,
				stateSenateDistrictId: stateSenateDistrictId || 'N/A',
				stateHouseDistrictId: stateHouseDistrictId || 'N/A',
                targets,
				advocacyContact
			};

			// Update map
			renderMapMarkers(lat, lng, advocacyContact);
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

	function renderMapMarkers(lat: number, lng: number, advocacyContact: AdvocacyContact | null) {
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

		map.flyTo([lat, lng], 13);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			performDistrictLookup();
		}
	}
</script>

<div class="bg-black text-white min-h-screen py-12 font-sans selection:bg-red-900 selection:text-white">
    <div class="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Left Panel: Input and Results -->
        <div class="lg:w-1/3 space-y-8">
            <div>
                <h1 class="text-4xl font-black text-white mb-2 uppercase tracking-tight">The Plea</h1>
                <div class="h-1 w-20 bg-red-600 mb-4"></div>
                <p class="text-neutral-400">
                    Address the Magistrate. Enter your Georgia ZIP code to identify those who carry the sword in your district.
                </p>
            </div>

            <!-- Search Input -->
            <div class="bg-neutral-900/50 rounded-lg border border-neutral-800 p-6">
                <label for="zipcode" class="block text-sm font-bold text-neutral-300 mb-2 uppercase tracking-wide">
                    Enter ZIP Code
                </label>
                <div class="flex gap-2">
                    <input
                        type="text"
                        id="zipcode"
                        bind:value={searchZipCode}
                        onkeypress={handleKeyPress}
                        placeholder="e.g., 30309"
                        maxlength="5"
                        class="flex-1 px-4 py-3 rounded bg-neutral-950 border border-neutral-700 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors placeholder-neutral-700"
                    />
                    <button
                        onclick={performDistrictLookup}
                        disabled={loading}
                        class="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded uppercase tracking-wider transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? '...' : 'Find'}
                    </button>
                </div>
                {#if errorMessage}
                    <p class="mt-2 text-sm text-red-500">{errorMessage}</p>
                {/if}
            </div>

            <!-- Results -->
            {#if lookupResult}
                <div class="space-y-6 animate-fade-in">
                    <!-- Location Header -->
                    <div class="bg-neutral-900 border border-neutral-800 p-4 rounded flex justify-between items-center">
                        <div>
                            <h2 class="text-xs uppercase tracking-widest text-neutral-500 font-bold">Jurisdiction</h2>
                            <p class="font-bold text-lg text-white">{lookupResult.city}, GA {lookupResult.zipCode}</p>
                        </div>
                    </div>

                    <!-- Advocacy Targets List -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-bold text-white border-b border-neutral-800 pb-2 uppercase tracking-wide">Priority Targets</h3>
                        
                        {#each lookupResult.targets as target}
                            <div class="bg-neutral-900 rounded border-l-4 {target.stance === 'sponsor' ? 'border-green-600' : target.stance === 'target' ? 'border-red-600' : 'border-neutral-600'} overflow-hidden shadow-lg">
                                <div class="p-5">
                                    <div class="flex justify-between items-start mb-2">
                                        <div>
                                            {#each target.roles as role}
                                                <span class="inline-block bg-neutral-800 text-neutral-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded mb-1 mr-1">
                                                    {role.title}
                                                </span>
                                            {/each}
                                            <h4 class="text-xl font-bold text-white">{target.name}</h4>
                                            <p class="text-sm text-neutral-500">{target.chamber === 'house' ? 'State Representative' : 'State Senator'} • {target.party}</p>
                                        </div>
                                        <span class="px-3 py-1 rounded-full text-xs font-bold border {getLegislatorStanceColor(target.stance)} uppercase tracking-wider">
                                            {target.stance}
                                        </span>
                                    </div>
                                    
                                    {#if target.contactInfo}
                                        <div class="mt-4 space-y-1 text-sm text-neutral-400">
                                            <p class="flex items-center gap-2"><span class="text-neutral-600">Tel:</span> {target.contactInfo.phone}</p>
                                            <p class="flex items-center gap-2"><span class="text-neutral-600">Mail:</span> {target.contactInfo.email}</p>
                                        </div>
                                    {/if}

                                    <div class="mt-4 pt-4 border-t border-neutral-800 flex gap-2">
                                        <button class="flex-1 bg-white hover:bg-neutral-200 text-black py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors">
                                            Call Script
                                        </button>
                                        <button class="flex-1 border border-neutral-600 hover:bg-neutral-800 text-white py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors">
                                            Email
                                        </button>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>

                    {#if lookupResult.advocacyContact}
                        <div class="bg-neutral-900/50 rounded border border-neutral-800 p-6">
                            <h3 class="text-sm font-bold text-red-500 uppercase tracking-widest mb-2">Local Ally</h3>
                            <p class="font-bold text-white text-lg">{lookupResult.advocacyContact.name}</p>
                            <p class="text-sm text-neutral-400">{lookupResult.advocacyContact.type}</p>
                            <p class="text-sm text-neutral-400 mt-1">{lookupResult.advocacyContact.address}</p>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>

        <!-- Right Panel: Map -->
        <div class="lg:w-2/3">
            <div class="bg-neutral-900 rounded-lg border border-neutral-800 p-2 sticky top-24 shadow-2xl">
                <div bind:this={mapElement} class="w-full h-[600px] rounded bg-neutral-950"></div>
            </div>
        </div>
    </div>
</div>
