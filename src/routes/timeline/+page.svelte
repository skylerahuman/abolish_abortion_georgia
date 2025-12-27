<script lang="ts">
	let selectedFilter = $state('all');

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
			title: 'Rise of the Abolition Movement',
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
			year: 2024,
			month: 'Current',
			title: 'HB 441 on the Floor',
			category: 'hope',
			icon: 'scale-balanced',
			description: 'The current fight. HB 441 aims to remove the exceptions in Georgia code, treating the pre-born with the exact same legal status as the born. It is the plea for consistency and justice.',
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
			<h1 class="text-3xl font-bold text-center uppercase tracking-widest">The Historical Record</h1>
			<p class="text-center text-stone-600 mt-2 max-w-2xl">
				Trace the legal history from the judicial fiat of 1973 to the legislative battles of today.
			</p>
			
			<!-- Filters -->
			<div class="flex flex-wrap justify-center gap-2 mt-8">
				<button 
					onclick={() => selectedFilter = 'all'}
					class="px-6 py-2 rounded-full border-2 font-bold text-sm transition-all
						{selectedFilter === 'all' ? 'border-black bg-black text-white' : 'border-black text-black hover:bg-red-900 hover:text-white hover:border-red-900'}"
				>
					Full History
				</button>
				<button 
					onclick={() => selectedFilter = 'court'}
					class="px-6 py-2 rounded-full border-2 font-bold text-sm transition-all
						{selectedFilter === 'court' ? 'border-black bg-black text-white' : 'border-black text-black hover:bg-red-900 hover:text-white hover:border-red-900'}"
				>
					Court Rulings
				</button>
				<button 
					onclick={() => selectedFilter = 'legislation'}
					class="px-6 py-2 rounded-full border-2 font-bold text-sm transition-all
						{selectedFilter === 'legislation' ? 'border-black bg-black text-white' : 'border-black text-black hover:bg-red-900 hover:text-white hover:border-red-900'}"
				>
					Legislation
				</button>
				<button 
					onclick={() => selectedFilter = 'hope'}
					class="px-6 py-2 rounded-full border-2 font-bold text-sm transition-all
						{selectedFilter === 'hope' ? 'border-black bg-black text-white' : 'border-black text-black hover:bg-red-900 hover:text-white hover:border-red-900'}"
				>
					Abolition Milestones
				</button>
			</div>
		</div>

		<!-- Timeline Container -->
		<section class="timeline">
			{#each filteredEvents as event}
				{@const markerColor = event.impact === 'negative' ? 'text-black' : event.impact === 'positive' ? 'text-red-800' : 'text-stone-500'}
				{@const titleColor = event.impact === 'positive' ? 'text-red-900' : 'text-black'}
				
				<div class="timeline-item">
					<div class="timeline-marker {markerColor}">
						<span class="timeline-year">{event.year}</span>
					</div>
					<div class="timeline-content">
						<h3 class="{titleColor}">{event.title}</h3>
						<p class="timeline-date">{event.month} {event.year}</p>
						<p>{event.description}</p>
						{#if event.category === 'hope'}
							<div class="timeline-tag">
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
