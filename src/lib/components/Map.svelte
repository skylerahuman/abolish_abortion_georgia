<script lang="ts">
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
