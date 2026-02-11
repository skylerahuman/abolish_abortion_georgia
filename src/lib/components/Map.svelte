<script lang="ts">
	import { onMount } from 'svelte';
	import type { Map } from 'leaflet';

	let mapElement: HTMLDivElement;
	let map: Map | undefined;

	onMount(() => {
		let observer: IntersectionObserver;

		async function initMap() {
			// Optimization: Lazy load Leaflet and CSS only when visible
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

		observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				initMap();
				observer.disconnect();
			}
		});

		if (mapElement) {
			observer.observe(mapElement);
		}

		return () => {
			observer.disconnect();
			if (map) {
				map.remove();
			}
		};
	});
</script>

<div
	bind:this={mapElement}
	data-testid="map-container"
	class="z-0 h-full w-full rounded-xl border border-white/10 shadow-inner"
></div>

<style>
	:global(.church-pin-icon) {
		filter: invert(28%) sepia(93%) saturate(3166%) hue-rotate(348deg) brightness(93%) contrast(95%);
	}

	/* Fast solution to drop the flag while maintaining legal attribution */
	:global(.leaflet-attribution-flag) {
		display: none !important;
	}

	:global(.leaflet-control-attribution) {
		background: rgba(2, 6, 23, 0.7) !important;
		color: rgba(234, 224, 213, 0.4) !important;
		font-size: 9px !important;
		backdrop-filter: blur(4px);
		border-top-left-radius: 4px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	:global(.leaflet-control-attribution a) {
		color: rgba(234, 224, 213, 0.6) !important;
	}
</style>
