<<<<<<< Updated upstream
<script lang="ts">
	import { page } from '$app/state';
	import { PagesWithHiddenNav, NavCategories, Routes } from '$lib/config/navigation';

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

			<!-- Sitemap Grid -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
				{#each NavCategories as category}
					<div>
						<h3 class="font-ui text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-6 pb-3 border-b border-charcoal">
							{category.name}
						</h3>
						<ul class="space-y-3">
							{#each category.links as link}
								<li>
									<a
										href={link.href}
										class="text-sm text-parchment-muted hover:text-gold transition-colors flex items-center gap-3 group"
									>
										<span class="w-1.5 h-1.5 bg-gold-muted rounded-full group-hover:bg-gold transition-colors"></span>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>

			<!-- Social Links and Contact -->
			<div class="border-t border-charcoal pt-10 mb-10">
				<div class="social-links flex justify-center gap-6 mb-6">
					<a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Follow on X" class="text-parchment-muted hover:text-gold transition-colors">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
					</a>
					<a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Follow on Facebook" class="text-parchment-muted hover:text-gold transition-colors">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
						</svg>
					</a>
					<a href="https://youtube.com" target="_blank" rel="noopener" aria-label="Subscribe on YouTube" class="text-parchment-muted hover:text-gold transition-colors">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
						</svg>
					</a>
					<a href="https://rumble.com" target="_blank" rel="noopener" aria-label="Follow on Rumble" class="text-parchment-muted hover:text-gold transition-colors">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 12.738l-2.25 1.312v-2.25l-1.406-.788v-1.312l1.406-.788v-1.5l2.25-1.312v1.5l1.594.788v1.312l-1.594.788v2.25z"/>
						</svg>
					</a>
				</div>
				<p class="text-center text-sm text-parchment-muted">
					Questions? Contact us at <a href="mailto:join@operationgospel.life" class="text-gold hover:text-gold-light transition-colors">join@operationgospel.life</a>
				</p>
			</div>

			<!-- Quick Actions -->
			<div class="border-t border-charcoal pt-10 mb-10">
				<div class="flex flex-wrap justify-center gap-x-6 gap-y-4">
					<a
						href={Routes.JOIN}
						class="btn btn-primary text-xs tracking-widest"
					>
						Join the Fight
					</a>
					<a
						href={Routes.BURNS_ACCOUNTABILITY}
						class="btn btn-secondary text-xs tracking-widest"
					>
						Hold Burns Accountable
					</a>
					<a
						href={Routes.SUPPORT}
						class="btn btn-ghost text-xs tracking-widest"
					>
						Support the Cause
					</a>
				</div>
			</div>

			<!-- Footer Info -->
			<div class="text-center pt-8 border-t border-charcoal">
				<div class="font-ui text-[10px] text-parchment-dark uppercase tracking-[0.2em] space-y-2 leading-relaxed">
					<p>Establishing Justice for the Pre-born in Georgia</p>
					<p>HB 441 was killed in committee by Speaker Jon Burns. The fight for accountability continues.</p>
					<p>&copy; {new Date().getFullYear()} Operation Gospel</p>
				</div>
			</div>
		</div>
	</footer>
{/if}
=======
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
>>>>>>> Stashed changes
