<<<<<<< Updated upstream
<script lang="ts">
	// Placeholder: We are moving to a static map approach as requested.
	// Replace the src with your actual Georgia map image.
	const mapImageUrl = '/images/map-placeholder.jpg'; 
</script>

<div class="relative w-full h-[400px] rounded-xl border border-white/10 overflow-hidden z-0">
	<img src={mapImageUrl} alt="Map of Georgia" class="w-full h-full object-cover" />
	
	<!-- Pins will be added here with absolute positioning -->
	<button 
		class="absolute top-[40%] left-[50%] w-8 h-8 bg-crimson rounded-full cursor-pointer hover:bg-gold transition-colors"
		aria-label="View church info"
		onclick={() => alert('Church info coming soon!')}
	></button>
</div>
=======
<script lang="ts">
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

	// Random Churches Data
	const churchNamesFirst = [
		'Grace',
		'Faith',
		'Truth',
		'Sovereign',
		'Reformed',
		'Community',
		'Hope',
		'Victory',
		'Peace',
		'Redeemer',
		'Providence',
		'Trinity',
		'Cornerstone',
		'Living',
		'Heritage',
		'Calvary',
		'Emmanuel'
	];
	const churchNamesSecond = [
		'Baptist',
		'Bible',
		'Community',
		'Fellowship',
		'Chapel',
		'Tabernacle',
		'Church'
	];

	function generateRandomChurches(count: number) {
		const churches = [];
		// Approximate GA bounds
		const latMin = 30.5,
			latMax = 35.0;
		const lonMin = -85.5,
			lonMax = -81.0;

		for (let i = 0; i < count; i++) {
			const name = `${churchNamesFirst[Math.floor(Math.random() * churchNamesFirst.length)]} ${
				churchNamesSecond[Math.floor(Math.random() * churchNamesSecond.length)]
			} Church`;
			const lat = latMin + Math.random() * (latMax - latMin);
			const lng = lonMin + Math.random() * (lonMax - lonMin);
			churches.push({ name, lat, lng });
		}
		return churches;
	}

	onMount(async () => {
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

		// Hide Leaflet default zoom control buttons
		document.querySelectorAll('.leaflet-control-zoom a').forEach(el => {
			(el as HTMLElement).style.display = 'none';
		});

		// Hide Leaflet logo/attribution
		document.querySelectorAll('.leaflet-control-attribution, .leaflet-bottom.leaflet-right').forEach(el => {
			(el as HTMLElement).style.display = 'none';
		});

		// Add random pins
		const churches = generateRandomChurches(50);
		churches.forEach((church) => {
			const marker = L.marker([church.lat, church.lng]).addTo(map);
			marker.bindPopup(`<b>${church.name}</b><br>Equipping the saints.`);
		});
	});
</script>

<div bind:this={mapElement} class="w-full h-full rounded-xl z-0"></div>
>>>>>>> Stashed changes
