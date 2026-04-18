<svelte:head>
	<title>Burns Accountability - HB 441 | Operation Gospel</title>
</svelte:head>

<script lang="ts">
	import { base } from '$app/paths';
	import BillTracker from '$lib/components/BillTracker.svelte';
	import SidebarNav from '$lib/components/SidebarNav.svelte';
	import { Routes } from '$lib/config/navigation';

	const billSteps = [
		{ id: 'INTRO', label: 'Introduced', date: 'Jan 2026', description: 'Filed in House' },
		{ id: 'SPONSOR', label: 'Co-Sponsors', date: 'Jan-Feb 2026', description: '20+ legislators signed on' },
		{ id: 'HEAR', label: 'Committee Hearing', date: 'Feb 2026', description: 'Public testimony heard' },
		{ id: 'VOTE', label: 'Committee Vote', date: 'Apr 2026', description: 'Killed by Speaker Burns' },
		{ id: 'FLOOR', label: 'Floor Vote', date: '—', description: 'Never reached' },
		{ id: 'LAW', label: 'Signed into Law', date: '—', description: 'Never signed' }
	];

	const actionNavItems = [
		{ label: 'Burns Accountability', href: Routes.BURNS_ACCOUNTABILITY },
		{ label: 'View Bill Analysis', href: Routes.BILL_ANALYSIS },
		{ label: 'Call Your Representative', href: Routes.REP_CALLS },
		{ label: 'Join the Movement', href: Routes.JOIN }
	];
</script>

<div class="min-h-screen bg-obsidian text-paper">
	<div class="max-w-7xl mx-auto px-4 py-12 md:py-16">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
			<!-- Sidebar -->
			<SidebarNav title="Action Center" items={actionNavItems} />

			<!-- Main Content -->
			<main class="lg:col-span-8 space-y-8">
				<!-- Page Header -->
				<header class="mb-8">
					<p class="mono text-xs text-neutral-500 uppercase tracking-widest mb-2">HB 441 Status</p>
					<h1 class="serif text-4xl md:text-5xl font-bold text-paper mb-4">
						What Speaker Burns Did
					</h1>
					<p class="text-lg text-neutral-400 max-w-2xl leading-relaxed">
						HB 441 was killed in committee. Here's what that means and what we're doing about it.
					</p>
				</header>

				<!-- Bill Tracker -->
				<BillTracker
					billNumber="HB 441"
					billTitle="Equal Protection for Preborn Children Act"
					sponsor="Rep. Bill Hoskins"
					currentStep={3}
					steps={billSteps}
					lastAction="Killed in Committee by Speaker Jon Burns"
					lastActionDate="April 2026"
				/>

				<!-- What Happened -->
				<section class="card">
					<h2 class="serif text-2xl font-bold mb-4">The Short Version</h2>
					<div class="space-y-4 text-neutral-300">
						<p>
							HB 441 was the most comprehensive equal protection bill for preborn children in Georgia history.
							It had 20+ co-sponsors and overwhelming constituent support across the state.
						</p>
						<p>
							Speaker Jon Burns refused to let it reach the floor for a vote. His reasoning, reportedly:
Speaker Jon Burns refused to let it reach the floor for a vote.
					</div>
				</section>

				<!-- What This Means -->
				<section class="card">
					<h2 class="serif text-2xl font-bold mb-4">What This Means</h2>
					<div class="space-y-4 text-neutral-300">
						<p>
							As Speaker of the House, Burns controls what bills reach the floor for a vote.
							Until he's removed or motivated differently, no equal protection bill will pass in Georgia.
						</p>
						<p>
							This isn't just about one bill—it's about the institutional block that prevents any
							meaningful protections from advancing through the legislative process.
						</p>
					</div>
				</section>

				<!-- Action Options -->
				<section>
					<h2 class="serif text-2xl font-bold mb-6">What Can Be Done</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<!-- Contact Burns -->
						<div class="card">
							<h3 class="font-semibold mb-3 flex items-center gap-2">
								<span class="text-crimson">1.</span> Contact Burns Directly
							</h3>
							<p class="text-sm text-neutral-400 mb-4">
								Let him hear from constituents who are paying attention.
							</p>
							<div class="space-y-2 text-sm mono mb-4">
								<p><span class="text-neutral-500">Phone:</span> (404) 656-5020</p>
								<p><span class="text-neutral-500">Email:</span> jon.burns@house.ga.gov</p>
							</div>
							<p class="text-xs text-neutral-500 italic">
								Be clear, be firm, be respectful—but make your voice heard.
							</p>
						</div>

						<!-- Call Your Rep -->
						<div class="card">
							<h3 class="font-semibold mb-3 flex items-center gap-2">
								<span class="text-crimson">2.</span> Pressure Other Republicans
							</h3>
							<p class="text-sm text-neutral-400 mb-4">
								If Burns won't lead, maybe others will push back. Call your representative.
							</p>
							<a href={Routes.REP_CALLS} class="btn btn-secondary text-sm">
								Get Call Scripts
							</a>
						</div>

						<!-- Primary Option -->
						<div class="card border-crimson/30">
							<h3 class="font-semibold mb-3 flex items-center gap-2">
								<span class="text-crimson">3.</span> Primary Burns (Long-term Option)
							</h3>
							<p class="text-sm text-neutral-400 mb-4">
								Some are exploring a primary challenge. This requires finding a candidate,
								building support, and sustained effort through the election cycle.
							</p>
							<p class="text-xs text-neutral-500">
								Interested? <a href={Routes.JOIN} class="link">Get in touch.</a>
							</p>
						</div>

						<!-- Support -->
						<div class="card">
							<h3 class="font-semibold mb-3 flex items-center gap-2">
								<span class="text-crimson">4.</span> Support the Movement
							</h3>
							<p class="text-sm text-neutral-400 mb-4">
								Whatever path we take, resources matter. Consider supporting organizations working on this issue.
							</p>
							<a href={Routes.SUPPORT} class="btn btn-ghost text-sm">
								Support the Cause
							</a>
						</div>
					</div>
				</section>

				<!-- Call Script -->
				<section class="bg-neutral-800/50 p-6 rounded border-l-2 border-crimson">
					<h3 class="font-semibold mb-3">Sample Script for Calling Burns</h3>
					<p class="text-neutral-300 text-sm leading-relaxed italic">
						"Speaker Burns, I'm calling as a constituent. I understand HB 441 was killed in committee.
						I believe protecting the right to life is a foundational Republican value. I want you to know
						that how you handle equal protection legislation matters to me—and I'll be watching closely
						to see if your actions match your party's platform."
					</p>
				</section>

				<!-- Bottom Navigation -->
				<div class="pt-8 border-t border-neutral-800 flex flex-wrap gap-4 text-sm">
					<a href={Routes.JOIN} class="link">Join the effort</a>
					<span class="text-neutral-600">|</span>
					<a href={Routes.TIMELINE} class="link">See the timeline</a>
					<span class="text-neutral-600">|</span>
					<a href={Routes.BILL_ANALYSIS} class="link">Read the bill</a>
				</div>
			</main>
		</div>
	</div>
</div>
