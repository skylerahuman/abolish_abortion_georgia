<svelte:head>
	<title>Operation Gospel - About Us</title>
</svelte:head>

<div class="min-h-screen bg-[#0C1626] text-bone px-6 py-20 lg:py-32">
	<div class="max-w-4xl mx-auto">
		<!-- Hero Section -->
		<div class="text-center mb-20">
			<h1 class="text-4xl md:text-6xl font-serif font-bold tracking-tight uppercase mb-6">
				About <span class="text-crimson">Operation Gospel</span>
			</h1>
			<div
				class="flex flex-wrap justify-center gap-4 text-sm md:text-base font-bold tracking-[0.2em] uppercase text-bone/60"
			>
				<span>Explicitly Christian</span>
				<span class="hidden md:inline">•</span>
				<span>Extremely Prophetic</span>
				<span class="hidden md:inline">•</span>
				<span>Ending Child Sacrifice</span>
			</div>
		</div>

		<!-- Main Content -->
		<div class="space-y-16">
			<!-- Our Mission -->
			<section class="relative">
				<div class="absolute -left-6 top-0 bottom-0 w-1 bg-crimson opacity-50"></div>
				<h2
					class="text-2xl md:text-3xl font-serif font-bold uppercase tracking-wider mb-6 text-bone"
				>
					Our Mission
				</h2>
				<p class="text-lg md:text-xl leading-relaxed text-bone/80 font-serif italic">
					"Our mission at Operation Gospel is one and the same as the mission of our Lord and our
					God, through a sound and bold proclamation of the Gospel the knowledge of the glory of God
					would cover the earth as the waters cover the sea. We are committed to informing,
					equipping and encouraging the Church that she might once again become faithful and fulfill
					her duty and privilege as soldier pilgrims, to take dominion for King Jesus."
				</p>
			</section>
		</div>
	</div>
</div>

<style>
	section {
		animation: fadeIn 0.8s ease-out forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			translate: 0 20px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}
</style>
