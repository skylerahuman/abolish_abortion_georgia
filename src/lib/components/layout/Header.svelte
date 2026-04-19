<script lang="ts">
	import { page } from '$app/state';
	import { PagesWithHiddenNav } from '$lib/config/navigation';
	import { mobileMenuOpen } from '$lib/stores';
	import logo from '$lib/assets/logo_basic.png';

	const isHidden = PagesWithHiddenNav.includes(page.url.pathname);
	const showJoinCta = page.url.pathname !== '/' && page.url.pathname !== '/join';

	// Simple toggle function
	function toggleMenu() {
		let current = false;
		const unsub = mobileMenuOpen.subscribe(v => current = v);
		unsub();
		mobileMenuOpen.set(!current);
	}
</script>

{#if !isHidden}
	<header class="nav-container bg-void/95 backdrop-blur-md text-parchment sticky top-0 z-50 border-b border-charcoal">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16 md:h-20">
				<!-- Logo -->
				<a href="/" class="flex items-center gap-3 group">
					<img src={logo} alt="" class="h-10 w-auto" />
					<span class="font-display text-xl md:text-2xl font-semibold tracking-tight text-parchment group-hover:text-gold transition-colors">
						Operation Gospel
					</span>
				</a>

				<!-- Right side: Join CTA + Menu -->
				<div class="flex items-center gap-4 md:gap-6">
					{#if showJoinCta}
						<a
							href="/join"
							class="btn btn-primary hidden sm:inline-flex text-xs tracking-widest"
						>
							Join the Fight
						</a>
					{/if}

					<!-- Menu Button -->
					<button
						onclick={toggleMenu}
						class="text-parchment-muted hover:text-gold focus:outline-none p-2 transition-colors"
						aria-label="Toggle menu"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</header>
{/if}
