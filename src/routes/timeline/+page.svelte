<script lang="ts">
	let selectedFilter = $state('campaign2026');

	const timelineEvents = [
		{
			year: 1973,
			month: 'Jan',
			title: 'Roe v. Wade',
			category: 'court',
			icon: 'gavel',
			description: "The Supreme Court invents a 'right to privacy' that encompasses the right to kill a child. This unconstitutional decree stripped personhood from the unborn, leading to decades of bloodshed.",
			impact: 'negative'
		},
		{
			year: 1973,
			month: 'Jan',
			title: 'Doe v. Bolton',
			category: 'court',
			icon: 'file-medical',
			description: "Released alongside Roe, this Georgia case defined 'health of the mother' so broadly (including familial, financial, and psychological factors) that it effectively allowed abortion on demand through all nine months.",
			impact: 'negative'
		},
		{
			year: 1992,
			month: 'Jun',
			title: 'Planned Parenthood v. Casey',
			category: 'court',
			icon: 'balance-scale',
			description: "The Court upheld the 'core holding' of Roe. While it allowed states to enact some regulations (waiting periods), it established the 'Undue Burden' standard, ensuring abortion remained protected.",
			impact: 'negative'
		},
		{
			year: 2003,
			month: 'Nov',
			title: 'Partial-Birth Abortion Ban',
			category: 'legislation',
			icon: 'ban',
			description: 'A pro-life regulatory victory that banned a specific, gruesome method of killing. However, abolitionists note that it simply directed abortionists to use other methods (like dismemberment) to achieve the same result legally.',
			impact: 'neutral'
		},
		{
			year: 2011,
			month: 'Various',
			title: 'Rise of the Abolition movement',
			category: 'hope',
			icon: 'fire',
			description: "Small groups of Christians began rejecting the 'Pro-Life Industry' strategy of incremental regulation. They began demanding immediate abolition and equal protection, planting the seeds for bills like HB 441.",
			impact: 'positive'
		},
		{
			year: 2019,
			month: 'May',
			title: "Georgia's 'Heartbeat' Bill (HB 481)",
			category: 'legislation',
			icon: 'heartbeat',
			description: 'Georgia bans abortion after a detectable heartbeat. While a step forward in saving some lives, it inherently denies personhood to those younger than ~6 weeks, leaving them without protection.',
			impact: 'neutral'
		},
		{
			year: 2022,
			month: 'Jun',
			title: 'Dobbs v. Jackson',
			category: 'court',
			icon: 'landmark',
			description: 'Roe v. Wade is overturned. The Constitution is correctly interpreted as not conferring a right to abortion. However, the Court failed to declare the unborn as persons, merely returning the issue to the states.',
			impact: 'mixed'
		},
		{
			year: 2023,
			month: 'Feb',
			title: 'The Georgia Equal Protection Act (HB 496)',
			category: 'hope',
			icon: 'scroll',
			description: 'A precursor to HB 441, this bill sought to defy judicial tyranny and establish justice. It faced stiff opposition not just from Democrats, but from establishment Republican leadership.',
			impact: 'positive'
		},
		{
			year: 2025,
			month: 'Q4',
			title: 'Pre-Session Campaign',
			category: 'campaign2026',
			icon: 'bullhorn',
			description: 'Mobilization phase. Securing additional sponsors, rolling out church education kits, and capturing early sign-on pledges from legislators.',
			impact: 'positive'
		},
		{
			year: 2026,
			month: 'Jan',
			title: 'Session Start: The Demand',
			category: 'campaign2026',
			icon: 'flag',
			description: 'Introduction/Refiling of the Equal Protection Act. The primary objective is to force a hearing in the House Judiciary Non-Civil Committee within the first 30-60 days.',
			impact: 'positive'
		},
		{
			year: 2026,
			month: 'Feb',
			title: 'Committee Phase',
			category: 'campaign2026',
			icon: 'users',
			description: 'Targeted pressure on the Judiciary Non-Civil Committee to hold hearings and vote. We track every member\'s stance in real-time.',
			impact: 'positive'
		},
		{
			year: 2026,
			month: 'Mar',
			title: 'Crossover Deadline',
			category: 'campaign2026',
			icon: 'hourglass-half',
			description: 'The critical deadline for the bill to pass the House and move to the Senate. This is the peak of the legislative battle.',
			impact: 'positive'
		},
		{
			year: 2026,
			month: 'Mar',
			title: 'Senate Judiciary Phase',
			category: 'campaign2026',
			icon: 'landmark',
			description: 'The battle moves to the Senate Judiciary Committee. Pressure focuses on ensuring the bill is not buried or gutted.',
			impact: 'positive'
		},
		{
			year: 2026,
			month: 'Apr',
			title: 'Final Push',
			category: 'campaign2026',
			icon: 'check-double',
			description: 'Floor votes in both chambers. Every legislator is on record. We demand Equal Protection without exception.',
			impact: 'positive'
		}
	];

	const filteredEvents = $derived(
		selectedFilter === 'all' 
			? timelineEvents 
			: timelineEvents.filter(e => e.category === selectedFilter)
	);
</script>

<div class="py-10 bg-stone-50">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center mb-12">
			<div class="h-1 w-20 bg-red-900 mb-4"></div>
			<h1 class="text-3xl font-bold text-center uppercase tracking-widest text-black">The Historical Record</h1>
			<p class="text-center text-stone-600 mt-2 max-w-2xl">
				Trace the legal history from the judicial fiat of 1973 to the legislative battles of today.
			</p>
			
			<!-- Filters -->
			<div class="flex flex-wrap justify-center gap-2 mt-8">
				<button 
					onclick={() => (selectedFilter = 'campaign2026')}
					class="px-6 py-2 rounded-full border-2 font-bold text-sm transition-all
						{selectedFilter === 'campaign2026' ? 'border-red-600 bg-red-600 text-white' : 'border-red-600 text-red-600 hover:bg-red-50'}"
				>
					2026 Campaign
				</button>
				<button 
					onclick={() => (selectedFilter = 'all')}
					class="px-6 py-2 rounded-full border-2 font-bold text-sm transition-all
						{selectedFilter === 'all' ? 'border-black bg-black text-white' : 'border-black text-black hover:bg-red-900 hover:text-white hover:border-red-900'}"
				>
					Full History
				</button>
				<button 
					onclick={() => (selectedFilter = 'court')}
					class="px-6 py-2 rounded-full border-2 font-bold text-sm transition-all
						{selectedFilter === 'court' ? 'border-black bg-black text-white' : 'border-black text-black hover:bg-red-900 hover:text-white hover:border-red-900'}"
				>
					Court Rulings
				</button>
				<button 
					onclick={() => (selectedFilter = 'legislation')}
					class="px-6 py-2 rounded-full border-2 font-bold text-sm transition-all
						{selectedFilter === 'legislation' ? 'border-black bg-black text-white' : 'border-black text-black hover:bg-red-900 hover:text-white hover:border-red-900'}"
				>
					Legislation
				</button>
				<button 
					onclick={() => (selectedFilter = 'hope')}
					class="px-6 py-2 rounded-full border-2 font-bold text-sm transition-all
						{selectedFilter === 'hope' ? 'border-black bg-black text-white' : 'border-black text-black hover:bg-red-900 hover:text-white hover:border-red-900'}"
				>
					Milestones
				</button>
			</div>
		</div>

		<!-- Timeline Container -->
		<section class="timeline">
			{#each filteredEvents as event}
				{@const markerColor = event.category === 'campaign2026' ? 'text-red-600 border-red-600' : event.impact === 'negative' ? 'text-black' : event.impact === 'positive' ? 'text-red-800' : 'text-stone-500'}
				{@const titleColor = event.category === 'campaign2026' ? 'text-red-600' : event.impact === 'positive' ? 'text-red-900' : 'text-black'}
				{@const isFuture = event.category === 'campaign2026'}
				
				<div class="timeline-item">
					<div class="timeline-marker {markerColor} {isFuture ? 'animate-pulse' : ''}">
						<span class="timeline-year">{event.year}</span>
					</div>
					<div class="timeline-content {isFuture ? 'border-l-4 border-red-600 bg-white shadow-lg p-4 rounded' : ''}">
						<h3 class="{titleColor} {isFuture ? 'text-xl uppercase' : ''}">{event.title}</h3>
						<p class="timeline-date font-bold text-stone-500">{event.month} {event.year}</p>
						<p class="text-stone-700">{event.description}</p>
						{#if event.category === 'hope'}
							<div class="timeline-tag flex items-center gap-1 mt-2 text-red-800 font-bold text-xs uppercase">
								<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
									<path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"/>
								</svg>
								Gospel Hope
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</section>
	</div>
</div>

<style>
	.timeline {
		position: relative;
		padding: 2rem 0;
	}
	.timeline::before {
		content: '';
		position: absolute;
		left: 2rem;
		top: 0;
		bottom: 0;
		width: 2px;
		background: #e5e7eb;
	}
	.timeline-item {
		position: relative;
		margin-bottom: 3rem;
		padding-left: 5rem;
	}
	.timeline-marker {
		position: absolute;
		left: 0.5rem;
		width: 3rem;
		height: 3rem;
		background: white;
		border: 2px solid currentColor;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}
	.timeline-year {
		font-size: 0.75rem;
		font-weight: 800;
	}
	.timeline-content h3 {
		font-weight: 800;
		margin-bottom: 0.25rem;
	}
	.timeline-date {
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
	}
</style>
