<script lang="ts">
	import { page } from '$app/state';
	import { PagesWithHiddenNav } from '$lib/config/navigation';

	const isHidden = $derived(PagesWithHiddenNav.includes(page.url.pathname));
</script>

{#if !isHidden}
	<footer class="relative z-10 bg-void text-parchment-muted py-16 md:py-20 border-t border-charcoal">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Ornamental Divider -->
			<div class="mb-12">
				<div class="divider-ornate text-gold-muted">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
						<path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
					</svg>
				</div>
			</div>

			<!-- Footer Info -->
			<div class="text-center">
				<p class="text-center text-sm text-parchment-muted mb-6">
					Questions? Contact us at <a href="mailto:support@operationgospel.life" class="text-gold hover:text-gold-light transition-colors">support@operationgospel.life</a>
				</p>
				<div class="font-ui text-[10px] text-parchment-dark uppercase tracking-[0.2em] space-y-2 leading-relaxed">
					<p>Establishing Justice for the Pre-born in Georgia</p>
					<p>&copy; {new Date().getFullYear()} Operation Gospel</p>
				</div>
			</div>
		</div>
	</footer>
{/if}
