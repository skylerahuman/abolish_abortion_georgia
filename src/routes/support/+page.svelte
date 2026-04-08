<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Operation Gospel - Support</title>
</svelte:head>

<!-- Two-column layout that fits viewport perfectly -->
<div class="flex flex-col md:flex-row bg-charcoal text-bone h-screen overflow-hidden">
	<!-- Column 1: PRAY -->
	<section
		class="flex-1 px-6 py-8 md:px-10 md:py-8 bg-panel/20 border-b md:border-b-0 md:border-r border-white/10 flex flex-col"
	>
		<div class="max-w-2xl mx-auto w-full">
			<h1
				class="text-4xl md:text-5xl font-black uppercase tracking-tighter text-crimson mb-6 leading-none"
			>
				Prayer: The Foundation
			</h1>

			<p
				class="text-gold font-serif italic text-base md:text-lg mb-6 border-l-2 border-crimson pl-4 py-1 leading-snug"
			>
				"With man this is impossible but with God all things are possible" <span
					class="whitespace-nowrap text-sm">— Matthew 19:26</span
				>
			</p>

			<p class="text-neutral-300 leading-relaxed mb-8 text-sm md:text-base">
				Abolition is a spiritual battle. We cannot fight against principalities and powers with mere
				political strategy. Only the power of God and the conviction of the Holy Spirit will move
				the hearts of legislators, pastors, and voters to do what is right.
			</p>

			<div
				class="bg-panel/40 p-6 border border-white/5 rounded-sm shadow-2xl"
			>
				<h2
					class="text-sm font-bold text-bone mb-4 uppercase tracking-widest border-b border-crimson/30 pb-2"
				>
					Active Prayer Requests
				</h2>
				<ul class="space-y-4">
					<li class="flex items-start">
						<span class="text-crimson mr-3 font-bold text-lg leading-none">▪</span>
						<span class="text-sm md:text-base text-neutral-400 leading-relaxed"
							>For resources and workers to expand the work for equal protection into every part of
							Georgia.</span
						>
					</li>
					<li class="flex items-start">
						<span class="text-crimson mr-3 font-bold text-lg leading-none">▪</span>
						<span class="text-sm md:text-base text-neutral-400 leading-relaxed"
							>For courage among Georgia legislators to sponsor the active bill of equal protection: <strong
								class="text-bone">HB441</strong
							>.</span
						>
					</li>
					<li class="flex items-start">
						<span class="text-crimson mr-3 font-bold text-lg leading-none">▪</span>
						<span class="text-sm md:text-base text-neutral-400 leading-relaxed"
							>For Christians to turn away from apathy and entertainments to pursue justice for the
							oppressed.</span
						>
					</li>
					<li class="flex items-start">
						<span class="text-crimson mr-3 font-bold text-lg leading-none">▪</span>
						<span class="text-sm md:text-base text-neutral-400 leading-relaxed"
							>For the repentance from bloodshed and salvation of mothers who have aborted their
							babies.</span
						>
					</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Column 2: GIVE -->
	<section id="donation" class="flex-1 px-6 py-8 md:px-10 md:py-8 flex flex-col">
		<div class="max-w-2xl mx-auto w-full">
			<h2
				class="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gold mb-6 leading-none"
			>
				Give: The Means
			</h2>

			<p class="text-neutral-300 leading-relaxed mb-8 text-sm md:text-base">
				If you have more to give for the Kingdom of Christ left over after generously supporting
				your own local church, consider how you can provide a portion of the practical means of
				achieving this task.
			</p>

			<a
				href="https://donorbox.org/regular-donations-15"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-block w-full bg-gold hover:bg-yellow-600 text-charcoal font-black uppercase tracking-widest py-6 text-base rounded-sm transition-all duration-300 shadow-lg text-center"
			>
				Donate
			</a>
		</div>
	</section>
</div>

<style>
	/* Custom scrollbar for column overflow if content slightly exceeds height */
	::-webkit-scrollbar {
		width: 4px;
	}
	::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.05);
	}
	::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: rgba(212, 175, 55, 0.3);
	}
</style>
