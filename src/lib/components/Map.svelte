<script lang="ts">
	import { onMount } from 'svelte';
	import type { Map } from 'leaflet';

	let mapElement: HTMLDivElement;
	let map: Map | undefined;
	let observer: IntersectionObserver;

	onMount(() => {
		// Use IntersectionObserver to lazy load Leaflet only when map is visible
		observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				observer.disconnect();
				loadMap();
			}
		});

		if (mapElement) {
			observer.observe(mapElement);
		}

		return () => {
			if (observer) observer.disconnect();
			if (map) map.remove();
		};
	});

	async function loadMap() {
		// Dynamic import of CSS and JS
		await import('leaflet/dist/leaflet.css');
		const L = await import('leaflet');

		if (!mapElement) return;

		const churchPinIcon = L.icon({
			iconUrl: '/images/church-pin.svg',
			iconSize: [38, 95], // size of the icon
			iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
			popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
			className: 'church-pin-icon'
		});

		// Center map on Hampton, GA church location
		map = L.map(mapElement, {
			zoomControl: false // Disable zoom control
		}).setView([33.3879, -84.2835], 12);

		L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			subdomains: 'abcd',
			maxZoom: 20
		}).addTo(map);

		// Add Hampton GA church pin
		const marker = L.marker([33.3879, -84.2835], { icon: churchPinIcon }).addTo(map);
		marker.bindPopup(`<b>3913 Jonesboro Rd Hampton, GA</b><br>Pastor Wes Fuller`);
	}
</script>

<div
	bind:this={mapElement}
	class="h-full w-full rounded-xl border border-white/10 z-0 bg-charcoal/50"
	data-testid="map-container"
>
	<!-- Placeholder while loading -->
	{#if !map}
		<div class="h-full w-full flex items-center justify-center text-bone/20">
			<span class="animate-pulse">Loading Map...</span>
		</div>
	{/if}
</div>

<style>
	:global(.church-pin-icon) {
		filter: invert(28%) sepia(93%) saturate(3166%) hue-rotate(348deg) brightness(93%) contrast(95%);
	}
</style>
