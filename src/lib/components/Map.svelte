<script lang="ts">
<<<<<<< HEAD
	import { onMount } from 'svelte';
	// Optimization: Moved CSS import to dynamic import inside onMount
	import type { Map } from 'leaflet';

	let mapElement: HTMLDivElement;
	// Optimization: Allow map to be undefined for easier cleanup checks
	let map: Map | undefined;

	onMount(() => {
		let observer: IntersectionObserver;

		const initMap = async () => {
			// Optimization: Dynamic imports for CSS and Leaflet
			// This saves ~150KB of JS/CSS on initial load for mobile users who might not scroll down
			await import('leaflet/dist/leaflet.css');
			const L = await import('leaflet');

			// Check if component is still mounted
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
		};

		if (mapElement) {
			observer = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					initMap();
					observer.disconnect();
				}
			});
			observer.observe(mapElement);
		}

		return () => {
			if (map) {
				map.remove();
			}
			if (observer) {
				observer.disconnect();
			}
		};
	});
</script>

<div bind:this={mapElement} class="h-full w-full rounded-xl border border-white/10 z-0" data-testid="map-container"></div>

<style>
	:global(.church-pin-icon) {
		filter: invert(28%) sepia(93%) saturate(3166%) hue-rotate(348deg) brightness(93%) contrast(95%);
	}
</style>
=======
	import { generateRandomChurches } from '$lib/utils';
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import type { Map } from 'leaflet';
    // @ts-ignore
    import markerIcon from 'leaflet/dist/images/marker-icon.png';
    // @ts-ignore
    import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
    // @ts-ignore
    import markerShadow from 'leaflet/dist/images/marker-shadow.png';

	let L: any;
	let mapElement: HTMLDivElement;
	let map: Map;

	onMount(async () => {
		L = await import('leaflet');

        const churchPinIcon = L.icon({
            iconUrl: '/images/church-pin.svg',
            iconSize: [38, 95], // size of the icon
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
            className: 'church-pin-icon'
        });

		map = L.map(mapElement, {
            zoomControl: false // Disable zoom control
        }).setView([32.9605, -83.1132], 8);

		L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
	        maxZoom: 20
		}).addTo(map);

        // Add random pins
        const churches = generateRandomChurches(75);
        churches.forEach(church => {
             const marker = L.marker([church.lat, church.lng], {icon: churchPinIcon}).addTo(map);
             marker.bindPopup(`<b>${church.name}</b><br>Equipping the saints.`);
        });
	});
</script>

<div bind:this={mapElement} class="h-full w-full rounded-xl border border-white/10 z-0"></div>
>>>>>>> Moving-Changes-Stashed
