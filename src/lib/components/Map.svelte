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
