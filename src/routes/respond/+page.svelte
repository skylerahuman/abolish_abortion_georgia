<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Operation Gospel - Pray. Fight. Give.</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-neutral-900 text-neutral-100 px-6 py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16 relative">
			<h1 class="text-4xl md:text-6xl font-extrabold tracking-tight uppercase mb-4">
				<span class="text-red-600">Pray.</span> <span class="text-neutral-100">Fight.</span> <span class="text-amber-500">Give.</span>
			</h1>
			<h2 class="text-xl md:text-2xl font-bold text-neutral-400 mb-6">
				50 Fights in 50 States – Georgia is Ours
			</h2>
			<p class="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
				For nearly a decade, Operation Gospel has been preaching the Gospel faithfully to mothers heading into abortion clinics. We are now seeking to bring the Gospel to the voters of Georgia.
			</p>
			<p class="text-base text-neutral-500 mt-4">
				You've seen the problem. You understand the solution. Now is the time to act.
			</p>
			<button
				onclick={ () => { navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!'); } }
				class="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors text-sm"
				aria-label="Share this page"
			>
				Share →
			</button>
		</div>
		
		<!-- Three CTA Cards -->
		<div class="grid md:grid-cols-3 gap-8 mb-16">
			<!-- PRAY -->
			<div class="bg-neutral-900 border border-neutral-800 hover:border-red-600 p-8 rounded-sm transition-all duration-300">
				<h3 class="text-2xl font-black uppercase tracking-wide text-red-600 mb-4 text-center border-b-2 border-red-900 pb-4">Pray</h3>
				<p class="text-sm text-neutral-400 leading-relaxed mb-6">
					<strong class="text-neutral-300 block mb-2">Pray for the Abolition of Abortion in Georgia</strong>
					Intercessory prayer is spiritual warfare. Pray for:
				</p>
				<ul class="text-sm text-neutral-400 space-y-2 mb-6 list-disc list-inside">
					<li>Georgia legislators to embrace HB 441</li>
					<li>Pastors and churches to boldly proclaim truth</li>
					<li>The salvation of mothers, fathers, and abortion workers</li>
					<li>Operation Gospel's ministry at abortion clinics</li>
					<li>Revival and repentance across Georgia</li>
				</ul>
			</div>
			
			<!-- FIGHT -->
			<div class="bg-neutral-900 border border-neutral-800 hover:border-amber-600 p-8 rounded-sm transition-all duration-300">
				<h3 class="text-2xl font-black uppercase tracking-wide text-amber-600 mb-4 text-center border-b-2 border-amber-900 pb-4">Fight</h3>
				<p class="text-sm text-neutral-400 leading-relaxed mb-6">
					<strong class="text-neutral-300 block mb-2">Fight for Equal Protection</strong>
					Take action today:
				</p>
				<ul class="text-sm text-neutral-400 space-y-2 mb-6 list-disc list-inside">
					<li>Call your State House Representative about HB 441</li>
					<li>Share Operation Gospel's resources with your church</li>
					<li>Watch "The Fatal Flaw" documentary</li>
					<li>Join or start an abolitionist society in your district</li>
					<li>Attend hearings and public comment sessions</li>
				</ul>
				<div class="space-y-2">
					<a
						href="https://www.youtube.com/watch?v=k33epqzJIlM"
						target="_blank"
						rel="noopener noreferrer"
						class="block w-full text-center bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded-sm text-sm transition-colors"
					>
						Watch The Fatal Flaw
					</a>
				</div>
				<div class="aspect-w-16 aspect-h-9 mt-4">
					<iframe
						src="https://www.youtube.com/embed/k33epqzJIlM"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						class="w-full h-full rounded-sm"
					></iframe>
				</div>
			</div>
			
			<!-- GIVE -->
			<div class="bg-neutral-900 border border-neutral-800 hover:border-green-600 p-8 rounded-sm transition-all duration-300">
				<h3 class="text-2xl font-black uppercase tracking-wide text-green-600 mb-4 text-center border-b-2 border-green-900 pb-4">Give</h3>
				<p class="text-sm text-neutral-400 leading-relaxed mb-6">
					<strong class="text-neutral-300 block mb-2">What Your Gift Supports</strong>
					Every dollar you give to Operation Gospel funds:
				</p>
				<ul class="text-sm text-neutral-400 space-y-2 mb-6 list-disc list-inside">
					<li>Full-time evangelists at Georgia abortion clinics</li>
					<li>Legislative engagement and HB 441 advocacy</li>
					<li>Church training and equipping events</li>
					<li>Educational materials and outreach resources</li>
				</ul>

				<div>
					<h4 class="text-lg font-bold text-center mb-4">Suggested Giving Levels</h4>
					<div class="space-y-2">
						<a href="https://give.cornerstone.cc/operationgospel" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-sm text-sm transition-colors">
							$25/month – Supplies materials for church training
						</a>
						<a href="https://give.cornerstone.cc/operationgospel" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-sm text-sm transition-colors">
							$100/month – Funds one day of clinic evangelism
						</a>
						<a href="https://give.cornerstone.cc/operationgospel" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-sm text-sm transition-colors">
							$500/month – Supports full-time evangelist salary
						</a>
						<a href="https://give.cornerstone.cc/operationgospel" target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-transparent border border-green-700 hover:bg-green-900/20 text-green-600 font-semibold py-2 px-4 rounded-sm text-sm transition-colors">
							Custom Amount
						</a>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Bottom Copy -->
		<div class="text-center max-w-2xl mx-auto mb-12">
			<p class="text-sm text-neutral-500 mb-2">
				For tax-deductible giving, you may donate through our fiscal sponsor.
			</p>
			<p class="text-sm text-neutral-500">
				For questions about giving or partnership, contact: <a href="mailto:info@operationgospel.com" class="text-red-500 hover:text-red-400 underline">info@operationgospel.com</a>
			</p>
		</div>
		
		<!-- Back Navigation -->
		<div class="flex flex-col md:flex-row gap-4 items-center justify-center">
			<a 
class="w-full md:w-auto bg-transparent border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 font-semibold px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 text-center"
			>
				Find People Near Me
			</a>
			<a 
				href="{base}/start"
				class="w-full md:w-auto bg-transparent border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 font-semibold px-10 py-4 rounded-sm uppercase tracking-wide transition-all duration-300 text-center"
			>
				Back to Start
			</a>
		</div>
	</div>
</div>
