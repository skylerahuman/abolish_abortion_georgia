<<<<<<< Updated upstream
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
			const startFade = heroHeight * 0.1;
			const endFade = heroHeight * 0.6;
			if (scrollY > startFade) {
				const progress = Math.min((scrollY - startFade) / (endFade - startFade), 1);
				backgroundOpacity = progress * 0.5;
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
				showTextPanel = true;
			} else {
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
		const updateDimensions = () => {
			isMobile = window.innerWidth <= 768;
			if (heroSection) {
				heroHeight = heroSection.offsetHeight;
			}
		};

		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = window.setTimeout(updateDimensions, 200);
		};

		// Scroll reveal observer
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		updateDimensions();
		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Observe scroll reveal elements
		setTimeout(() => {
			document.querySelectorAll('.scroll-reveal, .focus-card').forEach((el) => {
				observer.observe(el);
			});
		}, 100);

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
			observer.disconnect();
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
					rgba(10, 9, 8, 0.15),
					rgba(10, 9, 8, 0.5),
					rgba(10, 9, 8, 1)
				),
				url('/images/backdrop.png');
			background-position: center top;
			background-size: cover;
			background-repeat: no-repeat;
			will-change: transform;
		}

		@media (max-width: 1450px) {
			.home-bg::before {
				background-position: center 0%;
				background-size: cover;
			}
		}

		/* Cinematic fade-in animations - The Gavel timing */
		.fade-in-line {
			opacity: 0;
			animation: reveal-up 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
			will-change: transform, opacity;
		}

		.fade-in-line:nth-child(1) { animation-delay: 0s; }
		.fade-in-line:nth-child(2) { animation-delay: 600ms; }
		.fade-in-line:nth-child(3) { animation-delay: 1s; }
		.fade-in-line:nth-child(4) { animation-delay: 1.4s; }

		.fade-in-text {
			opacity: 0;
			animation: reveal-up 600ms cubic-bezier(0.16, 1, 0.3, 1) 2.4s forwards;
			will-change: transform, opacity;
		}

		.fade-in-buttons {
			opacity: 0;
			animation: reveal-up 600ms cubic-bezier(0.16, 1, 0.3, 1) 2.6s forwards;
		}

		.fade-in-scroll {
			opacity: 0;
			animation: reveal-fade 800ms ease-out 3.2s forwards;
		}

		.fade-in-carousel-icon {
			opacity: 0;
			animation: reveal-fade 800ms ease-out 2.8s forwards;
		}

		@keyframes reveal-up {
			from {
				opacity: 0;
				transform: translateY(30px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@keyframes reveal-fade {
			from { opacity: 0; }
			to { opacity: 1; }
		}

		/* Mobile carousel */
		@media (max-width: 768px) {
			.hero-carousel {
				display: flex;
				transition: transform 0.5s cubic-bezier(0.33, 1, 0.68, 1);
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

		/* Focus card animations */
		.focus-card {
			opacity: 0;
			transform: translateY(24px);
			transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1),
				transform 600ms cubic-bezier(0.16, 1, 0.3, 1),
				border-color 250ms ease,
				box-shadow 250ms ease;
		}

		.focus-card.is-visible {
			opacity: 1;
			transform: translateY(0);
		}

		.focus-card:hover {
			border-color: var(--color-gold-muted);
		}
	</style>
</svelte:head>

<div class="home-bg">
	<!-- Hero Section -->
	<section
		bind:this={heroSection}
		class="relative min-h-[90vh] md:min-h-[85vh] py-12 md:py-16 px-4 flex flex-col justify-center border-b border-charcoal overflow-hidden"
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
	>
		<!-- Mobile Carousel Wrapper -->
		<div
			class="hero-carousel {showTextPanel ? 'show-text' : ''} md:block md:w-auto! md:transform-none! relative z-10 w-full px-6 md:px-16 mt-auto"
		>
			<!-- Panel 1: Hero Content -->
			<div class="carousel-panel md:w-full!">
				<div class="w-full max-w-4xl text-left flex flex-col items-start">
					<h2
						class="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-parchment tracking-normal mb-12 space-y-2 md:space-y-3 leading-tight"
					>
						<div class="fade-in-line">
							Georgia bears <span class="text-burgundy">bloodguilt</span>
						</div>
						<div class="fade-in-line">for the sin of abortion.</div>
						<div class="fade-in-line italic opacity-90">What can wash away that stain?</div>
						<div class="fade-in-line">
							Nothing but the <span class="text-burgundy">blood</span> of
							<span class="text-gold font-semibold inline-block text-[1.2em]">Jesus</span>
						</div>
					</h2>

					<p
						class="hidden md:block text-left text-lg font-body text-parchment/90 mb-12 max-w-2xl leading-relaxed fade-in-text"
					>
						In the post-Roe era, we will not overcome the sin of abortion (which the Scriptures call
						child sacrifice) by "pro-life" gradualism. We must be pro-justice and pro-mercy, because
						our God and Lord, Jesus Christ, is perfectly just and merciful. We demand equal
						protection for the unborn, immediate and total abolition of abortion, and mobilization
						of the Church in Georgia to accomplish the Great Commission.
					</p>

					<!-- Call to Action Buttons -->
					<div class="flex justify-start gap-6 mt-4 fade-in-buttons">
						<a
							href="{base}/join"
							class="btn btn-primary text-sm tracking-widest"
						>
							Join Us
						</a>
						<a
							href="{base}/support"
							class="btn btn-secondary text-sm tracking-widest"
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
						<div class="inline-flex items-center gap-2 text-parchment/50 text-sm cursor-pointer justify-center font-ui">
							<span>Swipe for more</span>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</div>
					</button>
				</div>
			</div>

			<!-- Panel 2: Long Text - Mobile only -->
			<div class="carousel-panel md:hidden">
				<div class="w-full max-w-3xl mr-auto px-6">
					<h3 class="text-2xl font-display font-semibold text-parchment mb-6">Our Mission</h3>
					<p class="text-left text-base font-body text-parchment mb-8 leading-relaxed">
						In the post-Roe era, we will not overcome the sin of abortion (which the Scriptures call
						child sacrifice) by "pro-life" gradualism. We must be pro-justice and pro-mercy, because
						our God and Lord, Jesus Christ, is perfectly just and merciful. We demand equal
						protection for the unborn, immediate and total abolition of abortion, and mobilization
						of the Church in Georgia to accomplish the Great Commission.
					</p>

					<button class="text-center w-full" onclick={togglePanel} type="button">
						<div class="inline-flex items-center gap-2 text-parchment/50 text-sm cursor-pointer justify-center font-ui">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
							</svg>
							<span>Swipe back</span>
						</div>
					</button>
				</div>
			</div>
		</div>

		<!-- Scroll Down Indicator - Desktop only -->
		<div class="hidden md:block relative z-10 mt-auto mx-auto text-center text-parchment/40 cursor-pointer fade-in-scroll">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
			</svg>
		</div>
	</section>

	<!-- Our Focus Section -->
	<section
		class="relative z-10 py-16 md:py-32"
		style="background-color: rgba(10, 9, 8, {backgroundOpacity}); backdrop-filter: blur(4px);"
	>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Section Header -->
			<div class="text-center mb-20 scroll-reveal">
				<h2 class="font-display text-4xl md:text-5xl font-semibold text-parchment tracking-tight mb-6">
					Our Focus
				</h2>
				<div class="divider-ornate text-gold-muted max-w-xs mx-auto">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
						<path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
					</svg>
				</div>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				<!-- Legislative Discipleship -->
				<a
					href="{base}/georgia-battle"
					class="focus-card flex flex-col bg-panel border border-charcoal p-8 md:p-10 rounded-sm hover:shadow-lg"
				>
					<div>
						<div class="mb-6">
							<div class="inline-flex items-center justify-center w-14 h-14 rounded-sm bg-burgundy/20 text-burgundy group-hover:bg-burgundy/30 group-hover:text-burgundy-light transition-colors">
								<svg class="w-7 h-7" fill="currentColor" viewBox="-2 0 19 19" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.316 14.722a.477.477 0 0 1-.475.475H1.433a.477.477 0 0 1-.475-.475v-.863a.477.477 0 0 1 .475-.475h7.408a.476.476 0 0 1 .475.475zm-2.767-2.587a.552.552 0 0 1-.392-.163L2.96 8.776a.554.554 0 0 1 .784-.784L6.94 11.19a.554.554 0 0 1-.392.946zm7.33.992L9.435 8.682l1.085-1.084-3.173-3.173-2.97 2.97 3.173 3.172 1.102-1.101 4.445 4.445a.554.554 0 1 0 .784-.784zm-2.33-5.993a.552.552 0 0 1-.391-.162L7.96 3.775a.554.554 0 1 1 .784-.784l3.196 3.197a.554.554 0 0 1-.391.946z" />
								</svg>
							</div>
						</div>
						<h3 class="text-2xl font-display font-semibold text-parchment mb-4 group-hover:text-gold transition-colors">
							Legislative Discipleship
						</h3>
						<div class="space-y-4 text-parchment-muted text-base leading-relaxed font-body">
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
						<span class="btn btn-ghost text-xs tracking-wider">
							Study the Battle
						</span>
					</div>
				</a>

				<!-- Conflict Evangelism -->
				<a
					href="{base}/abolition-basics"
					class="focus-card flex flex-col bg-panel border border-charcoal p-8 md:p-10 rounded-sm hover:shadow-lg"
				>
					<div>
						<div class="mb-6">
							<div class="inline-flex items-center justify-center w-14 h-14 rounded-sm bg-burgundy/20 text-burgundy group-hover:bg-burgundy/30 group-hover:text-burgundy-light transition-colors">
								<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
									<path d="M5.979 10.974v5.021h7.041v11.99h5.042v-11.99h6.958v-5.021h-6.958v-6.958h-5.042v6.958h-7.041z"></path>
								</svg>
							</div>
						</div>
						<h3 class="text-2xl font-display font-semibold text-parchment mb-4 group-hover:text-gold transition-colors">
							Conflict Evangelism
						</h3>
						<div class="space-y-4 text-parchment-muted text-base leading-relaxed font-body">
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
						<span class="btn btn-ghost text-xs tracking-wider">
							Join the Cause
						</span>
					</div>
				</a>

				<!-- Church Mobilization -->
				<a
					href="{base}/join"
					class="focus-card flex flex-col bg-panel border border-charcoal p-8 md:p-10 rounded-sm hover:shadow-lg"
				>
					<div>
						<div class="mb-6">
							<div class="inline-flex items-center justify-center w-14 h-14 rounded-sm bg-burgundy/20 text-burgundy group-hover:bg-burgundy/30 group-hover:text-burgundy-light transition-colors">
								<svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V4H14C14.5523 4 15 4.44772 15 5C15 5.55228 14.5523 6 14 6H13V6.92805L21.007 11.6381C21.4831 11.9181 21.642 12.531 21.3619 13.007C21.0833 13.4807 20.475 13.6404 20 13.366V20C20 21.1046 19.1046 22 18 22H15H14H10H9H6C4.89543 22 4 21.1046 4 20V13.366C3.52498 13.6404 2.91671 13.4807 2.63807 13.007C2.35805 12.531 2.51695 11.9181 2.99298 11.6381L11 6.92806V6H10C9.44771 6 9 5.55228 9 5C9 4.44772 9.44771 4 10 4H11V3C11 2.44772 11.4477 2 12 2ZM11 20H13V17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17V20ZM15 20V17C15 15.3431 13.6569 14 12 14C10.3431 14 9 15.3431 9 17V20H6V12.1896L12 8.66018L18 12.1896V20H15Z" />
								</svg>
							</div>
						</div>
						<h3 class="text-2xl font-display font-semibold text-parchment mb-4 group-hover:text-gold transition-colors">
							Church Mobilization
						</h3>
						<div class="space-y-4 text-parchment-muted text-base leading-relaxed font-body">
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
						<span class="btn btn-ghost text-xs tracking-wider">
							Equip My Church
						</span>
					</div>
				</a>
			</div>
		</div>
	</section>
</div>
=======
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
			const startFade = heroHeight * 0.1;
			const endFade = heroHeight * 0.6;
			if (scrollY > startFade) {
				const progress = Math.min((scrollY - startFade) / (endFade - startFade), 1);
				backgroundOpacity = progress * 0.5;
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
				showTextPanel = true;
			} else {
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
		const updateDimensions = () => {
			isMobile = window.innerWidth <= 768;
			if (heroSection) {
				heroHeight = heroSection.offsetHeight;
			}
		};

		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = window.setTimeout(updateDimensions, 200);
		};

		// Scroll reveal observer
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		updateDimensions();
		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Observe scroll reveal elements
		setTimeout(() => {
			document.querySelectorAll('.scroll-reveal, .focus-card').forEach((el) => {
				observer.observe(el);
			});
		}, 100);

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
			observer.disconnect();
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
					rgba(10, 9, 8, 0.15),
					rgba(10, 9, 8, 0.5),
					rgba(10, 9, 8, 1)
				),
				url('/images/backdrop.png');
			background-position: center top;
			background-size: cover;
			background-repeat: no-repeat;
			will-change: transform;
		}

		@media (max-width: 1450px) {
			.home-bg::before {
				background-position: center 0%;
				background-size: cover;
			}
		}

		/* Cinematic fade-in animations - The Gavel timing */
		.fade-in-line {
			opacity: 0;
			animation: reveal-up 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
			will-change: transform, opacity;
		}

		.fade-in-line:nth-child(1) { animation-delay: 0s; }
		.fade-in-line:nth-child(2) { animation-delay: 600ms; }
		.fade-in-line:nth-child(3) { animation-delay: 1s; }
		.fade-in-line:nth-child(4) { animation-delay: 1.4s; }

		.fade-in-text {
			opacity: 0;
			animation: reveal-up 600ms cubic-bezier(0.16, 1, 0.3, 1) 2.4s forwards;
			will-change: transform, opacity;
		}

		.fade-in-buttons {
			opacity: 0;
			animation: reveal-up 600ms cubic-bezier(0.16, 1, 0.3, 1) 2.6s forwards;
		}

		.fade-in-scroll {
			opacity: 0;
			animation: reveal-fade 800ms ease-out 3.2s forwards;
		}

		.fade-in-carousel-icon {
			opacity: 0;
			animation: reveal-fade 800ms ease-out 2.8s forwards;
		}

		@keyframes reveal-up {
			from {
				opacity: 0;
				transform: translateY(30px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@keyframes reveal-fade {
			from { opacity: 0; }
			to { opacity: 1; }
		}

		/* Mobile carousel */
		@media (max-width: 768px) {
			.hero-carousel {
				display: flex;
				transition: transform 0.5s cubic-bezier(0.33, 1, 0.68, 1);
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

		/* Focus card animations */
		.focus-card {
			opacity: 0;
			transform: translateY(24px);
			transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1),
				transform 600ms cubic-bezier(0.16, 1, 0.3, 1),
				border-color 250ms ease,
				box-shadow 250ms ease;
		}

		.focus-card.is-visible {
			opacity: 1;
			transform: translateY(0);
		}

		.focus-card:hover {
			border-color: var(--color-gold-muted);
		}
	</style>
</svelte:head>

<div class="home-bg">
	<!-- Hero Section -->
	<section
		bind:this={heroSection}
		class="relative min-h-[90vh] md:min-h-[85vh] py-12 md:py-16 px-4 flex flex-col justify-center border-b border-charcoal overflow-hidden"
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
	>
		<!-- Mobile Carousel Wrapper -->
		<div
			class="hero-carousel {showTextPanel ? 'show-text' : ''} md:block md:w-auto! md:transform-none! relative z-10 w-full px-6 md:px-16 mt-auto"
		>
			<!-- Panel 1: Hero Content -->
			<div class="carousel-panel md:w-full!">
				<div class="w-full max-w-4xl text-left flex flex-col items-start">
					<h2
						class="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-parchment tracking-normal mb-12 space-y-2 md:space-y-3 leading-tight"
					>
						<div class="fade-in-line">
							Georgia bears <span class="text-burgundy">bloodguilt</span>
						</div>
						<div class="fade-in-line">for the sin of abortion.</div>
						<div class="fade-in-line italic opacity-90">What can wash away that stain?</div>
						<div class="fade-in-line">
							Nothing but the <span class="text-burgundy">blood</span> of
							<span class="text-gold font-semibold inline-block text-[1.2em]">Jesus</span>
						</div>
					</h2>

					<p
						class="hidden md:block text-left text-lg font-body text-parchment/90 mb-12 max-w-2xl leading-relaxed fade-in-text"
					>
						In the post-Roe era, we will not overcome the sin of abortion (which the Scriptures call
						child sacrifice) by "pro-life" gradualism. We must be pro-justice and pro-mercy, because
						our God and Lord, Jesus Christ, is perfectly just and merciful. We demand equal
						protection for the unborn, immediate and total abolition of abortion, and mobilization
						of the Church in Georgia to accomplish the Great Commission.
					</p>

					<!-- Call to Action Buttons -->
					<div class="flex justify-start gap-6 mt-4 fade-in-buttons">
						<a
							href="{base}/join"
							class="btn btn-primary text-sm tracking-widest"
						>
							Join Us
						</a>
						<a
							href="{base}/support"
							class="btn btn-secondary text-sm tracking-widest"
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
						<div class="inline-flex items-center gap-2 text-parchment/50 text-sm cursor-pointer justify-center font-ui">
							<span>Swipe for more</span>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</div>
					</button>
				</div>
			</div>

			<!-- Panel 2: Long Text - Mobile only -->
			<div class="carousel-panel md:hidden">
				<div class="w-full max-w-3xl mr-auto px-6">
					<h3 class="text-2xl font-display font-semibold text-parchment mb-6">Our Mission</h3>
					<p class="text-left text-base font-body text-parchment mb-8 leading-relaxed">
						In the post-Roe era, we will not overcome the sin of abortion (which the Scriptures call
						child sacrifice) by "pro-life" gradualism. We must be pro-justice and pro-mercy, because
						our God and Lord, Jesus Christ, is perfectly just and merciful. We demand equal
						protection for the unborn, immediate and total abolition of abortion, and mobilization
						of the Church in Georgia to accomplish the Great Commission.
					</p>

					<button class="text-center w-full" onclick={togglePanel} type="button">
						<div class="inline-flex items-center gap-2 text-parchment/50 text-sm cursor-pointer justify-center font-ui">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
							</svg>
							<span>Swipe back</span>
						</div>
					</button>
				</div>
			</div>
		</div>

		<!-- Scroll Down Indicator - Desktop only -->
		<div class="hidden md:block relative z-10 mt-auto mx-auto text-center text-parchment/40 cursor-pointer fade-in-scroll">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
			</svg>
		</div>
	</section>

	<!-- Our Focus Section -->
	<section
		class="relative z-10 py-16 md:py-32"
		style="background-color: rgba(10, 9, 8, {backgroundOpacity}); backdrop-filter: blur(4px);"
	>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Section Header -->
			<div class="text-center mb-20 scroll-reveal">
				<h2 class="font-display text-4xl md:text-5xl font-semibold text-parchment tracking-tight mb-6">
					Our Focus
				</h2>
				<div class="divider-ornate text-gold-muted max-w-xs mx-auto">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
						<path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
					</svg>
				</div>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				<!-- Legislative Discipleship -->
				<a
					href="{base}/georgia-battle"
					class="focus-card flex flex-col bg-panel border border-charcoal p-8 md:p-10 rounded-sm hover:shadow-lg"
				>
					<div>
						<div class="mb-6">
							<div class="inline-flex items-center justify-center w-14 h-14 rounded-sm bg-burgundy/20 text-burgundy group-hover:bg-burgundy/30 group-hover:text-burgundy-light transition-colors">
								<svg class="w-7 h-7" fill="currentColor" viewBox="-2 0 19 19" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.316 14.722a.477.477 0 0 1-.475.475H1.433a.477.477 0 0 1-.475-.475v-.863a.477.477 0 0 1 .475-.475h7.408a.476.476 0 0 1 .475.475zm-2.767-2.587a.552.552 0 0 1-.392-.163L2.96 8.776a.554.554 0 0 1 .784-.784L6.94 11.19a.554.554 0 0 1-.392.946zm7.33.992L9.435 8.682l1.085-1.084-3.173-3.173-2.97 2.97 3.173 3.172 1.102-1.101 4.445 4.445a.554.554 0 1 0 .784-.784zm-2.33-5.993a.552.552 0 0 1-.391-.162L7.96 3.775a.554.554 0 1 1 .784-.784l3.196 3.197a.554.554 0 0 1-.391.946z" />
								</svg>
							</div>
						</div>
						<h3 class="text-2xl font-display font-semibold text-parchment mb-4 group-hover:text-gold transition-colors">
							Legislative Discipleship
						</h3>
						<div class="space-y-4 text-parchment-muted text-base leading-relaxed font-body">
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
						<span class="btn btn-ghost text-xs tracking-wider">
							Study the Battle
						</span>
					</div>
				</a>

				<!-- Conflict Evangelism -->
				<a
					href="{base}/join"
					class="focus-card flex flex-col bg-panel border border-charcoal p-8 md:p-10 rounded-sm hover:shadow-lg"
				>
					<div>
						<div class="mb-6">
							<div class="inline-flex items-center justify-center w-14 h-14 rounded-sm bg-burgundy/20 text-burgundy group-hover:bg-burgundy/30 group-hover:text-burgundy-light transition-colors">
								<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
									<path d="M5.979 10.974v5.021h7.041v11.99h5.042v-11.99h6.958v-5.021h-6.958v-6.958h-5.042v6.958h-7.041z"></path>
								</svg>
							</div>
						</div>
						<h3 class="text-2xl font-display font-semibold text-parchment mb-4 group-hover:text-gold transition-colors">
							Conflict Evangelism
						</h3>
						<div class="space-y-4 text-parchment-muted text-base leading-relaxed font-body">
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
						<span class="btn btn-ghost text-xs tracking-wider">
							Join the Cause
						</span>
					</div>
				</a>

				<!-- Church Mobilization -->
				<a
					href="{base}/for-pastors"
					class="focus-card flex flex-col bg-panel border border-charcoal p-8 md:p-10 rounded-sm hover:shadow-lg"
				>
					<div>
						<div class="mb-6">
							<div class="inline-flex items-center justify-center w-14 h-14 rounded-sm bg-burgundy/20 text-burgundy group-hover:bg-burgundy/30 group-hover:text-burgundy-light transition-colors">
								<svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V4H14C14.5523 4 15 4.44772 15 5C15 5.55228 14.5523 6 14 6H13V6.92805L21.007 11.6381C21.4831 11.9181 21.642 12.531 21.3619 13.007C21.0833 13.4807 20.475 13.6404 20 13.366V20C20 21.1046 19.1046 22 18 22H15H14H10H9H6C4.89543 22 4 21.1046 4 20V13.366C3.52498 13.6404 2.91671 13.4807 2.63807 13.007C2.35805 12.531 2.51695 11.9181 2.99298 11.6381L11 6.92806V6H10C9.44771 6 9 5.55228 9 5C9 4.44772 9.44771 4 10 4H11V3C11 2.44772 11.4477 2 12 2ZM11 20H13V17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17V20ZM15 20V17C15 15.3431 13.6569 14 12 14C10.3431 14 9 15.3431 9 17V20H6V12.1896L12 8.66018L18 12.1896V20H15Z" />
								</svg>
							</div>
						</div>
						<h3 class="text-2xl font-display font-semibold text-parchment mb-4 group-hover:text-gold transition-colors">
							Church Mobilization
						</h3>
						<div class="space-y-4 text-parchment-muted text-base leading-relaxed font-body">
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
						<span class="btn btn-ghost text-xs tracking-wider">
							Equip My Church
						</span>
					</div>
				</a>
			</div>
		</div>
	</section>
</div>
>>>>>>> Stashed changes
