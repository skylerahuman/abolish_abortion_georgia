<script lang="ts">
	import { page } from '$app/state';
	import { fade, fly } from 'svelte/transition';
	import { NavCategories, Routes } from '$lib/config/navigation';

	interface Props {
		open: boolean;
		onClose: () => void;
	}

	let { open, onClose }: Props = $props();

	function isActive(href: string) {
		return page.url.pathname === href;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			onClose();
		}
	}

	function handleLinkClick() {
		// Small delay to let navigation start before closing
		setTimeout(onClose, 50);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-[100] bg-void/98 backdrop-blur-md"
		transition:fade={{ duration: 200 }}
		onclick={onClose}
		onkeydown={(e) => e.key === 'Enter' && onClose()}
		role="button"
		tabindex="-1"
		aria-label="Close menu"
	></div>

	<!-- Overlay Menu -->
	<div
		class="fixed inset-0 z-[101] overflow-y-auto"
		transition:fly={{ y: -20, duration: 300 }}
	>
		<div class="min-h-screen flex flex-col">
			<!-- Header Bar -->
			<div class="bg-void border-b border-charcoal px-4 py-5">
				<div class="max-w-7xl mx-auto flex justify-between items-center">
					<span class="font-ui text-xs font-semibold uppercase tracking-[0.15em] text-gold">
						Menu
					</span>
					<button
						onclick={onClose}
						class="text-parchment-muted hover:text-gold transition-colors p-2"
						aria-label="Close menu"
					>
						<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Navigation Content -->
			<div class="flex-1 bg-panel px-4 py-12 md:py-16">
				<div class="max-w-7xl mx-auto">
					<div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
						{#each NavCategories as category}
							<div>
								<h3 class="font-ui text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-8 pb-4 border-b border-charcoal">
									{category.name}
								</h3>
								<ul class="space-y-1">
									{#each category.links as link}
										<li>
											<a
												href={link.href}
												onclick={handleLinkClick}
												class="block py-4 px-3 transition-all duration-200 rounded-sm
													{isActive(link.href)
													? 'bg-burgundy/20 text-gold border-l-2 border-gold -ml-px'
													: 'text-parchment-muted hover:text-parchment hover:bg-charcoal/50 border-l-2 border-transparent -ml-px'}"
											>
												<span class="text-base font-ui font-medium">{link.label}</span>
												{#if link.description}
													<span class="block text-xs text-parchment-dark mt-1 font-ui">{link.description}</span>
												{/if}
											</a>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>

					<!-- Call to Actions -->
					<div class="mt-16 pt-10 border-t border-charcoal">
						<div class="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href={Routes.JOIN}
								onclick={handleLinkClick}
								class="btn btn-primary text-sm tracking-widest text-center"
							>
								Join the Fight
							</a>
							<a
								href={Routes.BURNS_ACCOUNTABILITY}
								onclick={handleLinkClick}
								class="btn btn-secondary text-sm tracking-widest text-center"
							>
								Hold Burns Accountable
							</a>
						</div>
					</div>

					<!-- Bottom Message -->
					<div class="mt-20 text-center">
						<p class="text-parchment-dark text-sm font-display italic">
							"The fight for abolition continues."
						</p>
						<p class="text-parchment-dark/60 text-xs mt-3 font-ui uppercase tracking-wider">
							HB 441 was killed in committee. We demand accountability.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
