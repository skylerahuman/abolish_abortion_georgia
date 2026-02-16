<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	let heroSection: HTMLElement;
	let backgroundOpacity = $state(0);
	let showTextPanel = $state(false);
	let isMobile = $state(false);
	let touchStartX = 0;
	let touchEndX = 0;

	// Optimization variables
	let heroHeight = 0;
	let rafId: number;
	let resizeTimeout: number;

	function handleScroll() {
		if (rafId) return;

		rafId = requestAnimationFrame(() => {
			if (!heroSection) {
				rafId = 0;
				return;
			}

			const scrollY = window.scrollY;
			const startFade = heroHeight * 0.1; // Start fade slightly into the scroll
			const endFade = heroHeight * 0.6; // Fully faded by 60% of hero height
			if (scrollY > startFade) {
				const progress = Math.min((scrollY - startFade) / (endFade - startFade), 1);
				backgroundOpacity = progress * 0.5; // Max opacity 0.5
			} else {
				backgroundOpacity = 0;
			}
			rafId = 0;
		});
	}

	function handleTouchStart(e: TouchEvent) {
		if (!isMobile) return;
		touchStartX = e.touches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		if (!isMobile) return;
		touchEndX = e.changedTouches[0].clientX;
		handleSwipe();
	}

	function handleSwipe() {
		const swipeThreshold = 50;
		const diff = touchStartX - touchEndX;

		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0) {
				// Swipe left - show text
				showTextPanel = true;
			} else {
				// Swipe right - show hero
				showTextPanel = false;
			}
		}
	}

	function togglePanel() {
		if (isMobile) {
			showTextPanel = !showTextPanel;
		}
	}

	onMount(() => {
		// Check if mobile and update hero dimensions
		const updateDimensions = () => {
			isMobile = window.innerWidth <= 768;
			if (heroSection) {
				heroHeight = heroSection.offsetHeight;
			}
		};

		// Optimization: Debounce resize event
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = window.setTimeout(updateDimensions, 200);
		};

		updateDimensions();
		window.addEventListener('resize', handleResize);

		window.addEventListener('scroll', handleScroll, { passive: true });

		// A gentle nudge to encourage scrolling, kept for UX
		setTimeout(() => {
			const currentScroll = window.scrollY;
			if (currentScroll === 0) {
				window.scrollTo({ top: 1, behavior: 'smooth' });
			}
		}, 2500);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
			if (rafId) cancelAnimationFrame(rafId);
			if (resizeTimeout) clearTimeout(resizeTimeout);
		};
	});
</script>

<svelte:head>
	<title>Operation Gospel - Abolish Abortion Georgia</title>
	<style>
		.home-bg {
			position: relative;
			isolation: isolate;
		}

		/* Optimization: Use fixed pseudo-element instead of background-attachment: fixed for better mobile performance */
		.home-bg::before {
			content: '';
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			background-image: linear-gradient(
					to bottom,
					rgba(2, 6, 23, 0.1),
					rgba(2, 6, 23, 0.4),
					rgba(2, 6, 23, 1)
				),
				url('/images/backdrop.png');
			background-position: center top;
			background-size: cover;
			background-repeat: no-repeat;
			will-change: transform;
		}

		/* Fix background positioning on smaller screens */
		@media (max-width: 1450px) {
			.home-bg::before {
				background-position: center 0%;
				background-size: cover;
			}
		}

		/* Cinematic fade-in animations - all screens */
		.fade-in-line {
			opacity: 0;
			animation: fadeInCinematic 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
			will-change: transform, opacity;
		}

		/* Four lines at 0.6s intervals, 1s duration each */
		.fade-in-line:nth-child(1) {
			animation-delay: 0s;
		}
		.fade-in-line:nth-child(2) {
			animation-delay: 0.6s;
		}
		.fade-in-line:nth-child(3) {
			animation-delay: 1s;
		}
		.fade-in-line:nth-child(4) {
			animation-delay: 1.4s;
		}

		/* Desktop paragraph - starts at 2.4s */
		.fade-in-text {
			opacity: 0;
			animation: fadeInCinematic 0.5s cubic-bezier(0.16, 1, 0.3, 1) 2.4s forwards;
			will-change: transform, opacity;
		}

		/* Buttons start at 2.6s */
		.fade-in-buttons {
			opacity: 0;
			animation: fadeInCinematic 0.5s cubic-bezier(0.16, 1, 0.3, 1) 2.6s forwards;
		}

		.fade-in-scroll {
			opacity: 0;
			animation: fadeInBounce 0.8s ease-out 3.2s forwards;
		}

		.fade-in-carousel-icon {
			opacity: 0;
			animation: fadeInBounce 0.8s ease-out 2.8s forwards;
		}

		@keyframes fadeInCinematic {
			from {
				opacity: 0;
				transform: translateY(30px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@keyframes fadeInBounce {
			0% {
				opacity: 0;
				transform: translateY(-10px);
			}
			50% {
				opacity: 1;
				transform: translateY(5px);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}

		/* Mobile carousel */
		@media (max-width: 768px) {
			.hero-carousel {
				display: flex;
				transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
				width: 200%;
			}

			.hero-carousel.show-text {
				transform: translateX(-50%);
			}

			.carousel-panel {
				width: 50%;
				flex-shrink: 0;
			}
		}
	</style>
</svelte:head>

<div class="home-bg" data-testid="layout-container">
	<!-- Hero Section -->
	<section
		bind:this={heroSection}
		class="relative min-h-[90vh] md:min-h-[85vh] py-12 md:py-16 px-4 flex flex-col justify-center border-b border-crimson/20 overflow-hidden"
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
	>
		<!-- Mobile Carousel Wrapper -->
		<div
			class="hero-carousel {showTextPanel
				? 'show-text'
				: ''} md:block md:w-auto! md:transform-none! relative z-10 w-full px-6 md:px-16 mt-auto"
			data-testid="left-column"
		>
			<!-- Panel 1: Hero Content -->
			<div class="carousel-panel md:w-full!">
				<div class="w-full max-w-4xl text-left flex flex-col items-start">
					<h2
						class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-bone tracking-normal mb-12 drop-shadow-xl space-y-2 md:space-y-3 leading-tight"
					>
						<div class="fade-in-line">
							Georgia bears <span class="text-crimson">bloodguilt</span>
						</div>
						<div class="fade-in-line">for the sin of abortion.</div>
						<div class="fade-in-line italic opacity-90">What can wash away that stain?</div>
						<div class="fade-in-line">
							Nothing but the <span class="text-crimson">blood</span> of
							<span class="text-gold font-medium inline-block text-[1.2em]">Jesus</span>.
						</div>
					</h2>

					<!-- Hide long text on mobile, show on desktop with fade-in -->
					<p
						class="hidden md:block text-left text-lg font-sans text-bone/90 mb-12 max-w-2xl drop-shadow-lg fade-in-text leading-relaxed"
						data-testid="right-column"
					>
						In the post-Roe era, we will not overcome the sin of abortion (which the Scriptures call
						child sacrifice) by "pro-life" gradualism. We must be pro-justice and pro-mercy, because
						our God and Lord, Jesus Christ, is perfectly just and merciful. We demand equal
						protection for the unborn, immediate and total abolition of abortion, and mobilization
						of the Church in Georgia to accomplish the Great Commission.
					</p>

					<!-- Call to Action Buttons -->
					<div
						class="flex justify-start gap-6 mt-4 fade-in-buttons"
						data-testid="cta-container"
					>
						<a
							href="{base}/join"
							class="px-10 py-4 bg-crimson text-bone font-bold rounded-lg hover:bg-ember transition-all duration-300 shadow-xl hover:shadow-crimson/40 hover:-translate-y-0.5 active:translate-y-0"
						>
							Join Us
						</a>
						<a
							href="{base}/support"
							class="px-10 py-4 border-2 border-crimson text-bone font-bold rounded-lg hover:bg-crimson/10 transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:translate-y-0"
						>
							Support
						</a>
					</div>

					<!-- Swipe Indicator - Mobile only -->
					<button
						class="md:hidden mt-8 text-center fade-in-carousel-icon w-full"
						onclick={togglePanel}
						type="button"
					>
						<div
							class="inline-flex items-center gap-2 text-bone/50 text-sm cursor-pointer justify-center"
						>
							<span>Swipe for more</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 animate-pulse"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</button>
				</div>
			</div>

			<!-- Panel 2: Long Text - Mobile only -->
			<div class="carousel-panel md:hidden">
				<div class="w-full max-w-3xl mr-auto px-6">
					<h3 class="text-2xl font-serif font-bold text-bone mb-6">Our Mission</h3>
					<p class="text-left text-base font-sans text-bone mb-8 drop-shadow-lg leading-relaxed">
						In the post-Roe era, we will not overcome the sin of abortion (which the Scriptures call
						child sacrifice) by "pro-life" gradualism. We must be pro-justice and pro-mercy, because
						our God and Lord, Jesus Christ, is perfectly just and merciful. We demand equal
						protection for the unborn, immediate and total abolition of abortion, and mobilization
						of the Church in Georgia to accomplish the Great Commission.
					</p>

					<!-- Back Indicator -->
					<button class="text-center w-full" onclick={togglePanel} type="button">
						<div
							class="inline-flex items-center gap-2 text-bone/50 text-sm cursor-pointer justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
							<span>Swipe back</span>
						</div>
					</button>
				</div>
			</div>
		</div>

		<!-- Scroll Down Indicator - Desktop only -->
		<div
			class="hidden md:block relative z-10 mt-auto mx-auto text-center text-bone/50 cursor-pointer fade-in-scroll"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M19 9l-7 7-7-7"
				/>
			</svg>
		</div>
	</section>

	<!-- Our Focus Section -->
	<section
		class="relative z-10 py-16 md:py-32 sm:md:py-40"
		style="background-color: rgba(2, 6, 23, {backgroundOpacity}); backdrop-filter: blur(4px);"
	>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 class="text-4xl font-serif font-bold text-bone tracking-tight mb-20 text-center">
				Our Focus
			</h2>
			<div class="grid md:grid-cols-3 gap-8">
				<!-- Legislative Discipleship -->
				<a
					href="{base}/georgia-battle"
					class="flex flex-col bg-panel/80 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-panel hover:border-crimson/50 transition-all duration-300 group shadow-lg hover:shadow-crimson/10 hover:-translate-y-1"
				>
					<div>
						<div
							class="mb-6 inline-block p-3 rounded-lg bg-crimson/20 text-crimson group-hover:bg-crimson/30 group-hover:text-ember transition-colors"
						>
							<svg
								class="w-8 h-8"
								fill="currentColor"
								viewBox="-2 0 19 19"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.316 14.722a.477.477 0 0 1-.475.475H1.433a.477.477 0 0 1-.475-.475v-.863a.477.477 0 0 1 .475-.475h7.408a.476.476 0 0 1 .475.475zm-2.767-2.587a.552.552 0 0 1-.392-.163L2.96 8.776a.554.554 0 0 1 .784-.784L6.94 11.19a.554.554 0 0 1-.392.946zm7.33.992L9.435 8.682l1.085-1.084-3.173-3.173-2.97 2.97 3.173 3.172 1.102-1.101 4.445 4.445a.554.554 0 1 0 .784-.784zm-2.33-5.993a.552.552 0 0 1-.391-.162L7.96 3.775a.554.554 0 1 1 .784-.784l3.196 3.197a.554.554 0 0 1-.391.946z"
								/>
							</svg>
						</div>
						<h3
							class="text-2xl font-serif font-bold text-bone mb-4 group-hover:text-ember transition-colors"
						>
							Legislative Discipleship
						</h3>
						<div class="space-y-4 text-bone/70 text-base leading-relaxed font-sans">
							<p>
								The unborn in Georgia need churches, pastors, citizens, and the magistrate to be
								discipled in God's standard of justice until our laws call abortion what God says it
								is: murder and child sacrifice.
							</p>
							<p>
								Walk through line-by-line analysis of an abolition bill, learn the principles of
								abolition, and how to disciple and press your representatives with clear, Biblical
								standards.
							</p>
						</div>
					</div>
					<div class="mt-auto pt-8 text-center">
						<div
							class="inline-block px-6 py-3 rounded-lg bg-teal/80 text-bone font-semibold hover:bg-linear-to-r from-teal to-cyan-600 transition-all duration-300 shadow-lg"
						>
							Study the Battle
						</div>
					</div>
				</a>

				<!-- Conflict Evangelism -->
				<a
					href="{base}/abolition-basics"
					class="flex flex-col bg-panel/80 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-panel hover:border-crimson/50 transition-all duration-300 group shadow-lg hover:shadow-crimson/10 hover:-translate-y-1"
				>
					<div>
						<div
							class="mb-6 inline-block p-3 rounded-lg bg-crimson/20 text-crimson group-hover:bg-crimson/30 group-hover:text-ember transition-colors"
						>
							<svg
								class="w-8 h-8"
								fill="currentColor"
								viewBox="0 0 32 32"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5.979 10.974v5.021h7.041v11.99h5.042v-11.99h6.958v-5.021h-6.958v-6.958h-5.042v6.958h-7.041z"
								></path>
							</svg>
						</div>
						<h3
							class="text-2xl font-serif font-bold text-bone mb-4 group-hover:text-ember transition-colors"
						>
							Conflict Evangelism
						</h3>
						<div class="space-y-4 text-bone/70 text-base leading-relaxed font-sans">
							<p>
								Christians must bring both the Gospel and resistance to the place where the sin of
								child sacrifice occurs—the hearts of pregnant mothers. We must be proactive in
								proclaiming the law of God, that the grace of God might be witnessed all the more.
							</p>
							<p>
								Praying, donating, or joining helps further the cause in Georgia by providing
								mothers and fathers who choose life with blessing bags, baby showers, adoptive
								services and counseling.
							</p>
						</div>
					</div>
					<div class="mt-auto pt-8 text-center">
						<div
							class="inline-block px-6 py-3 rounded-lg bg-teal/80 text-bone font-semibold hover:bg-linear-to-r from-teal to-cyan-600 transition-all duration-300 shadow-lg"
						>
							Join the Cause
						</div>
					</div>
				</a>

				<!-- Church Mobilization -->
				<a
					href="{base}/join"
					class="flex flex-col bg-panel/80 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-panel hover:border-crimson/50 transition-all duration-300 group shadow-lg hover:shadow-crimson/10 hover:-translate-y-1"
				>
					<div>
						<div
							class="mb-6 inline-block p-3 rounded-lg bg-crimson/20 text-crimson group-hover:bg-crimson/30 group-hover:text-ember transition-colors"
						>
							<svg
								class="w-8 h-8"
								viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M12 2C12.5523 2 13 2.44772 13 3V4H14C14.5523 4 15 4.44772 15 5C15 5.55228 14.5523 6 14 6H13V6.92805L21.007 11.6381C21.4831 11.9181 21.642 12.531 21.3619 13.007C21.0833 13.4807 20.475 13.6404 20 13.366V20C20 21.1046 19.1046 22 18 22H15H14H10H9H6C4.89543 22 4 21.1046 4 20V13.366C3.52498 13.6404 2.91671 13.4807 2.63807 13.007C2.35805 12.531 2.51695 11.9181 2.99298 11.6381L11 6.92806V6H10C9.44771 6 9 5.55228 9 5C9 4.44772 9.44771 4 10 4H11V3C11 2.44772 11.4477 2 12 2ZM11 20H13V17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17V20ZM15 20V17C15 15.3431 13.6569 14 12 14C10.3431 14 9 15.3431 9 17V20H6V12.1896L12 8.66018L18 12.1896V20H15Z"
								/>
							</svg>
						</div>
						<h3
							class="text-2xl font-serif font-bold text-bone mb-4 group-hover:text-ember transition-colors"
						>
							Church Mobilization
						</h3>
						<div class="space-y-4 text-bone/70 text-base leading-relaxed font-sans">
							<p>
								Every church in Georgia has the opportunity to stand against abortion by preaching,
								discipling, and organizing to protect their preborn neighbors.
							</p>
							<p>
								Access church kits, pastoral resources, and practical steps to start or strengthen
								your churches ministry under the oversight of your divinely appointed leaders.
							</p>
							<p>
								Additionally, find other churches working hard to end child sacrifice in your area.
							</p>
						</div>
					</div>
					<div class="mt-auto pt-8 text-center">
						<div
							class="inline-block px-6 py-3 rounded-lg bg-teal/80 text-bone font-semibold hover:bg-linear-to-r from-teal to-cyan-600 transition-all duration-300 shadow-lg"
						>
							Equip My Church
						</div>
					</div>
				</a>
			</div>
		</div>
	</section>
</div>
