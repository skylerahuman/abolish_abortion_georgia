<script lang="ts">
	import { page } from '$app/state';
	import { PagesWithHiddenNav, NavCategories, Routes } from '$lib/config/navigation';

	const isHidden = $derived(PagesWithHiddenNav.includes(page.url.pathname));
</script>

{#if !isHidden}
	<footer class="relative z-10 bg-black text-neutral-400 py-16 border-t border-neutral-900">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Sitemap Grid -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
				{#each NavCategories as category}
					<div>
						<h3 class="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 border-b border-neutral-800 pb-2">
							{category.name}
						</h3>
						<ul class="space-y-3">
			<div class="social-links">
				<a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Follow on X">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
					</svg>
				</a>
				<a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Follow on Facebook">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
					</svg>
				</a>
				<a href="https://youtube.com" target="_blank" rel="noopener" aria-label="Subscribe on YouTube">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
					</svg>
				</a>
				<a href="https://rumble.com" target="_blank" rel="noopener" aria-label="Follow on Rumble">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 12.738l-2.25 1.312v-2.25l-1.406-.788v-1.312l1.406-.788v-1.5l2.25-1.312v1.5l1.594.788v1.312l-1.594.788v2.25z"/>
					</svg>
				</a>
			</div>
			<p class="contact-line">
				Questions? Contact us at <a href="mailto:join@operationgospel.life">join@operationgospel.life</a>
			</p>
										href={link.href}
										class="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group"
									>
										<span class="w-1 h-1 bg-red-600 rounded-full group-hover:bg-red-500 transition-colors"></span>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>

			<!-- Quick Actions -->
			<div class="border-t border-neutral-900 pt-8 mb-8">
				<div class="flex flex-wrap justify-center gap-x-8 gap-y-4">
					<a
						href={Routes.JOIN}
						class="px-6 py-3 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-red-700 transition-colors"
					>
						Join the Fight
					</a>
					<a
						href={Routes.BURNS_ACCOUNTABILITY}
						class="px-6 py-3 border border-red-600 text-red-500 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-red-600 hover:text-white transition-colors"
					>
						Hold Burns Accountable
					</a>
					<a
						href={Routes.SUPPORT}
						class="px-6 py-3 bg-gold text-charcoal text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-yellow-500 transition-colors"
					>
						Support the Cause
					</a>
				</div>
			</div>

			<!-- Footer Info -->
			<div class="text-center pt-8 border-t border-neutral-900">
				<div class="text-[8px] text-neutral-600 uppercase font-bold tracking-[0.2em] space-y-2">
					<p>Establishing Justice for the Pre-born in Georgia</p>
					<p>HB 441 was killed in committee by Speaker Jon Burns. The fight for accountability continues.</p>
					<p>&copy; {new Date().getFullYear()} Operation Gospel</p>
				</div>
			</div>
		</div>
	</footer>
{/if}
