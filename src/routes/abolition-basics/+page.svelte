<script lang="ts">
	import { base } from '$app/paths';


	let currentStep = $state('what-is-abolitionism');

	const steps = [
		{
			id: 'what-is-abolitionism',
			title: 'What is Abolitionism?',
			content: `
				<p>Christian abolitionism is the application of God's law and the Gospel to the sin of child sacrifice, demanding equal protection for preborn image-bearers as for the born.</p>
				<p>It means:</p>
				<ul class="list-disc list-inside">
					<li>Equal protection under the 14th Amendment to the pre-born</li>
					<li>Criminalizing abortion as homicide with no arbitrary age limits</li>
					<li>No partiality based on location, age, or circumstances of conception</li>
					<li>Defining life from fertilization—not heartbeat, not viability</li>
				</ul>
				<p>Biblical foundation: Proverbs 24:11, Proverbs 31:8, James 2:1-9</p>
			`
		},
		{
			id: 'what-is-pro-lifism',
			title: 'What is Pro-Lifism?',
			content: `
				<p>The "pro-life" regulatory approach has dominated for 50 years:</p>
				<ul class="list-disc list-inside">
					<li>Arbitrary lines: Protects life only after heartbeat, 15 weeks, or viability</li>
					<li>Immunity: Often grants immunity to mothers or providers in certain cases</li>
					<li>Subservient: Bows to federal court opinions rather than challenging them</li>
					<li>Incremental: Seeks small victories rather than complete justice</li>
				</ul>
				<p>Result: Decades of legislation, yet abortion continues.</p>
			`
		},
		{
			id: 'why-equal-protection',
			title: 'Why Equal Protection?',
			content: `
				<p>God's law demands equal weights and measures (Leviticus 19:35-36, Proverbs 20:10).</p>
				<p>If a preborn child is made in the image of God—and Scripture is clear that they are—then we must apply the same legal protection given to born persons.</p>
				<p>Equal protection means:</p>
				<ul class="list-disc list-inside">
					<li>No exceptions for rape, incest, or "quality of life"</li>
					<li>The same homicide statutes that protect you protect your unborn neighbor</li>
					<li>Biblical consistency: "Open your mouth for the mute, for the rights of all who are destitute" (Proverbs 31:8-9)</li>
				</ul>
			`
		},
		{
			id: 'what-this-means-in-georgia',
			title: 'What This Means in Georgia',
			content: `
				<p>Georgia has a heartbeat bill. It saves some lives. But it inherently denies personhood to children younger than ~6 weeks, leaving them without protection.</p>
				<p>The Georgia Equal Protection Act (HB 441) removes exceptions and establishes full equal protection—treating the pre-born with the exact same legal status as the born.</p>
			`
		}
	];
</script>

<svelte:head>
	<title>Operation Gospel - Abolition Basics</title>
</svelte:head>

<div class="min-h-screen bg-charcoal text-bone px-6 py-16">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-12 relative">
			<h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 uppercase text-crimson">Abolition not Regulation</h1>
			<p class="text-lg text-bone/70">For five decades, the response to the greatest moral atrocity of our age has been incremental regulation. We tracked the pulse, we measured the weeks, but we failed to establish Justice. Abolition is different.</p>
			<button
				onclick={ () => {navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!');}}
				class="absolute top-0 right-0 text-bone/50 hover:text-bone transition-colors text-sm"
				aria-label="Share this page"
			>
				Share →
			</button>
		</div>

		<div class="flex flex-col md:flex-row gap-8">
			<div class="flex md:flex-col gap-4">
				{#each steps as step}
					<button
						onclick={() => currentStep = step.id}
						class="text-left p-4 rounded-lg transition-colors duration-200"
						class:bg-crimson={currentStep === step.id}
						class:hover:bg-panel={currentStep !== step.id}
					>
						<h3 class="font-bold {currentStep === step.id ? 'text-white' : 'text-bone'}">{step.title}</h3>
					</button>
				{/each}
			</div>

			<div class="flex-1 bg-panel p-8 rounded-lg text-bone/80">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html steps.find((step) => step.id === currentStep)?.content}
			</div>
		</div>

		<div class="text-center mt-12">
			<a href="{base}/georgia-battle" class="bg-crimson hover:bg-ember text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-crimson/20">
				View the Georgia Battle
			</a>
		</div>
	</div>
</div>
