<script lang="ts">
	import JoinForm from '$lib/components/JoinForm.svelte';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Operation Gospel - Join the Fight</title>
</svelte:head>

<div class="flex-1 grid grid-cols-1 md:grid-cols-5 gap-6 p-6 md:p-8 items-stretch h-full">
	<!-- Left Column (Form) -->
	<div class="md:col-span-2 flex flex-col">
		<JoinForm />
	</div>

	<!-- Right Column (placeholder for future church network) -->
	<div class="md:col-span-3 flex flex-col gap-6">
		<!-- Pastor CTA -->
		<div class="bg-panel/80 backdrop-blur-sm border-l-4 border-crimson p-6 shadow-lg rounded-r-lg">
			<div class="flex flex-col md:flex-row items-center justify-between gap-4">
				<div>
					<h2 class="text-xl font-serif font-bold text-bone uppercase tracking-wide mb-2">Are you a Pastor?</h2>
					<p class="text-bone/70 text-sm">We provide resources, training, and support for church leaders.</p>
				</div>
				<a
					href="{base}/for-pastors"
					class="bg-bone text-charcoal hover:bg-white font-bold px-6 py-3 rounded-md uppercase tracking-wider whitespace-nowrap text-sm transition-colors"
				>
					For Pastors
				</a>
			</div>
		</div>

		<!-- Church Network Placeholder -->
		<div class="flex-1 min-h-[400px] bg-panel/50 border border-white/10 rounded-lg flex items-center justify-center">
			<div class="text-center p-8">
				<h3 class="text-xl font-serif font-bold text-bone mb-2">Church Network Coming Soon</h3>
				<p class="text-bone/60 text-sm max-w-md">
					We're building a directory of abolitionist churches across Georgia. Check back soon to find faithful congregations in your area.
				</p>
			</div>
		</div>
	</div>
</div>
