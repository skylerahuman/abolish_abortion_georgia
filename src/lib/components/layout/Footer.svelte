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
							{#each category.links as link}
								<li>
									<a
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
