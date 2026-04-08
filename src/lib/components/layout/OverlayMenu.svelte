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
		onClose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md"
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
			<div class="bg-black border-b border-neutral-900 px-4 py-4">
				<div class="max-w-7xl mx-auto flex justify-between items-center">
					<span class="text-xs font-bold uppercase tracking-widest text-neutral-500">
						Menu
					</span>
					<button
						onclick={onClose}
						class="text-white hover:text-red-500 transition-colors p-2"
						aria-label="Close menu"
					>
						<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Navigation Content -->
			<div class="flex-1 bg-[#0C1626] px-4 py-12">
				<div class="max-w-7xl mx-auto">
					<div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
						{#each NavCategories as category}
							<div>
								<h3 class="text-sm font-bold uppercase tracking-widest text-red-500 mb-6 border-b border-neutral-800 pb-3">
									{category.name}
								</h3>
								<ul class="space-y-1">
									{#each category.links as link}
										<li>
											<a
												href={link.href}
												onclick={handleLinkClick}
												class="block py-3 px-2 rounded transition-all duration-200
													{isActive(link.href)
													? 'bg-red-600/20 text-red-400 border-l-2 border-red-600'
													: 'text-neutral-300 hover:text-white hover:bg-neutral-800/50 border-l-2 border-transparent'}"
											>
												<span class="text-base font-semibold">{link.label}</span>
												{#if link.description}
													<span class="block text-xs text-neutral-500 mt-0.5">{link.description}</span>
												{/if}
											</a>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>

					<!-- Call to Actions -->
					<div class="mt-16 pt-8 border-t border-neutral-800">
						<div class="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href={Routes.JOIN}
								onclick={handleLinkClick}
								class="px-8 py-4 bg-red-600 text-white text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-red-700 transition-colors text-center"
							>
								Join the Fight
							</a>
							<a
								href={Routes.BURNS_ACCOUNTABILITY}
								onclick={handleLinkClick}
								class="px-8 py-4 border border-red-600 text-red-500 text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-red-600 hover:text-white transition-colors text-center"
							>
								Hold Burns Accountable
							</a>
						</div>
					</div>

					<!-- Bottom Message -->
					<div class="mt-16 text-center">
						<p class="text-neutral-600 text-sm">
							The fight for abolition continues.
						</p>
						<p class="text-neutral-700 text-xs mt-2">
							HB 441 was killed in committee. We demand accountability.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
