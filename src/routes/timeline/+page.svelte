<script lang="ts">
	const timelineEvents = [
		{
			year: 1973,
			month: 'Jan',
			title: 'Roe v. Wade',
			category: 'court',
			icon: 'gavel',
			description: "The Supreme Court invents a 'right to privacy' that encompasses the right to kill a child. This unconstitutional decree stripped personhood from the unborn, leading to decades of bloodshed.",
			impact: 'negative'
		}
	];
</script>

<div class="py-10 bg-charcoal text-bone">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center mb-12">
			<div class="h-1 w-20 bg-crimson mb-4"></div>
			<h1 class="text-3xl font-bold text-center uppercase tracking-widest text-bone">The Historical Record</h1>
			<p class="text-center text-bone/70 mt-2 max-w-2xl">
				The beginning of the end of justice in America.
			</p>
		</div>

		<!-- Timeline Container -->
		<section class="timeline">
			{#each timelineEvents as event}
				{@const markerColor = event.impact === 'negative' ? 'text-crimson' : event.impact === 'positive' ? 'text-gold' : 'text-bone/50'}
				{@const titleColor = event.impact === 'positive' ? 'text-gold' : 'text-crimson'}
				
				<div class="timeline-item">
					<div class="timeline-marker {markerColor}">
						<span class="timeline-year">{event.year}</span>
					</div>
					<div class="timeline-content">
						<h3 class="{titleColor}">{event.title}</h3>
						<p class="timeline-date">{event.month} {event.year}</p>
						<p class="text-bone/80">{event.description}</p>
					</div>
				</div>
			{/each}
		</section>
	</div>
</div>
