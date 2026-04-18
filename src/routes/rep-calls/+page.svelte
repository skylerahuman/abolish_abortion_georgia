<svelte:head>
	<title>Call Your Representatives - Operation Gospel</title>
</svelte:head>

<script lang="ts">
	import { Routes } from '$lib/config/navigation';
</script>

<div class="min-h-screen bg-charcoal text-bone px-6 py-16">
	<div class="max-w-4xl mx-auto">
		<div class="mb-12">
			<h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">
				Call Your Representatives
			</h1>
			<p class="text-lg text-bone/70 leading-relaxed">
				Phone calls are one of the most effective ways to contact your legislators. Use the scripts below to make your voice heard.
			</p>
		</div>

		<!-- Burns Call Script -->
		<section class="bg-panel border border-neutral-800 rounded p-8 mb-8">
			<h2 class="text-xl font-bold mb-4 text-crimson">Contact Speaker Burns</h2>
			<p class="text-sm text-bone/50 mb-4">The primary target for accountability calls.</p>

			<div class="space-y-4 mb-6">
				<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
					<span class="text-sm font-semibold text-bone/70 w-20">Phone:</span>
					<a href="tel:+14046565020" class="text-lg hover:text-crimson transition-colors">(404) 656-5020</a>
				</div>
				<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
					<span class="text-sm font-semibold text-bone/70 w-20">Email:</span>
					<a href="mailto:jon.burns@house.ga.gov" class="hover:text-crimson transition-colors">jon.burns@house.ga.gov</a>
				</div>
			</div>

			<div class="bg-neutral-800/50 p-6 rounded border-l-2 border-crimson">
				<h3 class="font-bold mb-3">Sample Script:</h3>
				<p class="text-bone/80 italic leading-relaxed">
					"Speaker Burns, I'm calling as a constituent. I understand HB 441 was killed in committee. I believe protecting the right to life is a foundational Republican value. I want you to know that how you handle equal protection legislation matters to me—and I'll be watching closely to see if your actions match your party's platform."
				</p>
			</div>
		</section>

		<!-- Your Rep -->
		<section class="bg-panel border border-neutral-800 rounded p-8 mb-8">
			<h2 class="text-xl font-bold mb-4">Call Your District Representative</h2>
			<p class="text-bone/70 mb-6">
				Find your representative and urge them to support equal protection legislation in the next session.
			</p>

			<div class="mb-6">
				<a
					href="https://pluralpolicy.com/find-your-legislator/"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 px-6 py-3 bg-crimson hover:bg-ember text-white font-bold rounded transition-colors"
				>
					Find Your Representative
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
					</svg>
				</a>
			</div>

			<div class="bg-neutral-800/50 p-6 rounded border-l-2 border-gold">
				<h3 class="font-bold mb-3">Sample Script:</h3>
				<p class="text-bone/80 italic leading-relaxed">
					"Hello, I'm calling as a constituent in District [X]. I understand HB 441 was killed in committee by leadership. I believe equal protection for the preborn is a pro-life, Republican value. I want to know where you stand on this issue and whether you'll support similar legislation when it comes up again."
				</p>
			</div>
		</section>

		<!-- Tips -->
		<section class="bg-panel border border-neutral-800 rounded p-8">
			<h2 class="text-xl font-bold mb-4">Tips for Effective Calls</h2>
			<ul class="space-y-3 text-bone/70">
				<li class="flex items-start gap-3">
					<span class="text-crimson mt-1">1.</span>
					<span><strong>Be polite but firm.</strong> You're a constituent, and they work for you.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-crimson mt-1">2.</span>
					<span><strong>Identify yourself</strong> and mention you're calling about equal protection/abortion.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-crimson mt-1">3.</span>
					<span><strong>Ask for their position.</strong> Don't just tell them how you feel—ask where they stand.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-crimson mt-1">4.</span>
					<span><strong>Leave your contact info</strong> if asked—name, address, phone number.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-crimson mt-1">5.</span>
					<span><strong>Follow up in writing.</strong> Send an email after your call to reinforce your message.</span>
				</li>
			</ul>
		</section>

		<div class="mt-8 text-center">
			<a href={Routes.BURNS_ACCOUNTABILITY} class="text-crimson hover:underline">Learn more about the accountability campaign →</a>
		</div>
	</div>
</div>
