<<<<<<< Updated upstream
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
=======
<script lang="ts">
	import { base } from '$app/paths';
	import { Routes } from '$lib/config/navigation';
</script>

<svelte:head>
	<title>The Political Reality: Speaker Burns | Operation Gospel</title>
</svelte:head>

<main class="flex flex-col w-full bg-void text-parchment min-h-screen font-body">
	<!-- Page Header -->
	<section class="relative py-24 px-6 border-b border-charcoal bg-void">
		<div class="max-w-4xl mx-auto text-center">
			<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-burgundy/30 bg-burgundy/10 text-burgundy mb-8">
				<span class="text-xs font-ui font-bold uppercase tracking-widest">The Autopsy</span>
			</div>
			<h1 class="text-5xl md:text-7xl font-display font-black text-parchment tracking-tight mb-8 leading-tight">
				What Speaker Burns Did
			</h1>
			<p class="text-2xl text-parchment/80 leading-relaxed font-body max-w-3xl mx-auto">
				HB 441 was the most comprehensive equal protection bill in Georgia history. It had 20+ co-sponsors. <span class="text-parchment font-bold border-b border-burgundy pb-1">Speaker Jon Burns killed it.</span>
			</p>
		</div>
	</section>

	<!-- The Reality -->
	<section class="py-24 px-6 bg-panel border-b border-charcoal">
		<div class="max-w-4xl mx-auto">
			<div class="grid md:grid-cols-2 gap-16 items-start">
				<div>
					<h2 class="text-3xl font-display font-bold text-parchment mb-6">The Institutional Block</h2>
					<p class="text-lg text-parchment/70 leading-relaxed mb-6">
						As Speaker of the House, Burns controls what bills reach the floor for a vote. He refused to let HB 441 out of committee. Until he is removed or motivated differently, no equal protection bill will pass in Georgia.
					</p>
					<p class="text-lg text-parchment/70 leading-relaxed">
						This isn't just about one bill—it's about the institutional blockade that prevents any meaningful protections from advancing through the legislative process, regardless of how much grassroots support exists.
					</p>
				</div>
				<div class="bg-void border-l-4 border-burgundy p-8 rounded-sm shadow-xl">
					<h3 class="text-xl font-display font-bold text-parchment mb-4">Why Did He Kill It?</h3>
					<p class="text-base text-parchment/70 leading-relaxed mb-6">
						Leadership often kills abolition bills to protect members from taking "tough votes" in an election year. By burying the bill in committee, Burns prioritized establishment pragmatism over the Republican party platform.
					</p>
					<p class="text-base text-parchment/70 leading-relaxed">
						He shielded vulnerable members from having their stance on equal protection recorded, betraying the conservative base that elected him.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Primary Challenge -->
	<section class="py-32 px-6 bg-void relative overflow-hidden">
		<!-- Decorative element -->
		<div class="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-5">
			<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-gold),transparent_70%)]"></div>
		</div>

		<div class="max-w-4xl mx-auto relative z-10">
			<div class="text-center mb-16">
				<span class="text-gold font-ui font-bold tracking-widest uppercase text-sm mb-4 block">The Ultimate Accountability</span>
				<h2 class="text-4xl md:text-6xl font-display font-bold text-parchment">Primary Burns</h2>
			</div>

			<div class="bg-panel border border-gold/30 p-10 md:p-16 rounded-sm shadow-2xl">
				<div class="prose prose-invert prose-lg text-parchment/80 max-w-none font-body leading-relaxed">
					<p class="text-2xl text-parchment mb-8 font-display">
						Speaker Burns represents House District 159, a heavily Republican district. He faces virtually no threat from Democrats. 
					</p>
					<p class="mb-8">
						The only mechanism for true accountability is a primary challenge from a conservative who will uphold the party platform on equal protection. If leadership will not advance the cause of justice, leadership must be replaced.
					</p>
					
					<div class="bg-void border border-charcoal p-8 rounded-sm mt-12">
						<div class="flex flex-col md:flex-row items-center gap-8">
							<div>
								<h3 class="text-2xl font-display font-bold text-parchment mb-3">Nathan Hooks for HD 159</h3>
								<p class="text-base text-parchment/70 mb-6">
									<strong>Nathan Hooks</strong> has stepped forward as a primary challenger to Speaker Burns, running on an abolitionist platform to bring equal protection to Georgia.
								</p>
								<a href="https://nathanhooksga.com" target="_blank" rel="noopener noreferrer" class="btn btn-secondary text-sm">
									Visit Nathan Hooks' Campaign
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Next Steps -->
	<section class="py-24 px-6 bg-panel border-t border-charcoal">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-3xl font-display font-bold text-parchment mb-12 text-center">What Can Be Done?</h2>
			
			<div class="grid md:grid-cols-2 gap-8">
				<div class="bg-void border border-charcoal p-8 rounded-sm">
					<h3 class="text-xl font-ui font-bold text-parchment mb-4 flex items-center gap-3">
						<span class="text-burgundy">01.</span> Support the Primary
					</h3>
					<p class="text-parchment/70 mb-6">
						A primary challenge requires resources, volunteers, and sustained effort. Support candidates who will champion equal protection.
					</p>
					<a href="https://nathanhooksga.com" target="_blank" rel="noopener noreferrer" class="text-gold hover:text-gold-light text-sm font-bold uppercase tracking-widest font-ui transition-colors">
						Learn More &rarr;
					</a>
				</div>
				
				<div class="bg-void border border-charcoal p-8 rounded-sm">
					<h3 class="text-xl font-ui font-bold text-parchment mb-4 flex items-center gap-3">
						<span class="text-burgundy">02.</span> Join the Movement
					</h3>
					<p class="text-parchment/70 mb-6">
						Connect with abolitionists in your district. We are building a network to hold all representatives accountable.
					</p>
					<a href="{base}/join" class="text-gold hover:text-gold-light text-sm font-bold uppercase tracking-widest font-ui transition-colors">
						Get Involved &rarr;
					</a>
				</div>
			</div>
		</div>
	</section>
</main>
>>>>>>> Stashed changes
