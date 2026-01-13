<script lang="ts">
	import { base } from '$app/paths';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	
	let show = $state(false);
	
	onMount(() => {
		show = true;
	});
</script>

<svelte:head>
	<title>Operation Gospel | Abolishing Abortion in Georgia</title>
</svelte:head>

<!-- Background: Atlanta Skyline -->
<div class="fixed inset-0 z-0 pointer-events-none select-none">
	<img 
		src="{base}/images/atlanta_skyline.png" 
		alt="Atlanta Skyline" 
		class="w-full h-full object-cover grayscale"
	/>
	<div class="absolute inset-0 bg-black/70"></div>
</div>

<div class="relative z-10 min-h-screen bg-charcoal-950 text-white px-6 py-20 flex flex-col justify-center">
	<div class="absolute top-4 right-4 text-right">
		<a href="{base}/near-me" class="text-sm text-neutral-400 hover:text-white transition-colors">Already support abolition? →</a>
		<br>
		<a href="{base}/respond" class="text-sm text-neutral-400 hover:text-white transition-colors">Just want to help? →</a>
	</div>
	<div class="text-center">
		<h1 in:fade={{delay: 0}} class="text-5xl md:text-8xl font-black uppercase tracking-tight">Explicitly Christian.</h1>
		<h1 in:fade={{delay: 300}} class="text-5xl md:text-8xl font-black uppercase tracking-tight">Extremely Prophetic.</h1>
		<h1 in:fade={{delay: 600, duration: 600}} class="text-5xl md:text-8xl font-black uppercase tracking-tight text-red-600">
			Ending Child Sacrifice.
		</h1>
	</div>

	{#if show}
		<div in:fade={{ delay: 3000, duration: 1000 }} class="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500 text-lg">
			Press Space to continue
		</div>
	{/if}
	<div class="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-transparent to-charcoal-950"></div>
	<div class="max-w-6xl mx-auto w-full">
		<!-- Scripture & Mission -->
		{#if show}
			<div class="mb-20">
				<div in:fade={{ delay: 200, duration: 600 }} class="border-l-4 border-red-900 pl-8 py-6 mb-12">
					<p class="text-2xl md:text-4xl font-serif italic text-white leading-relaxed mb-4">
						"Open thy mouth for the dumb in the cause of all such as are appointed to destruction."
					</p>
					<p class="text-2xl md:text-4xl font-serif italic text-white/90 leading-relaxed mb-6">
						"Open thy mouth, judge righteously, and plead the cause of the poor and needy."
					</p>
					<span class="block text-red-600 text-lg font-sans uppercase tracking-widest">— Proverbs 31:8-9</span>
				</div>
				
				<div class="text-center my-12">
					<hr class="border-t-2 border-neutral-800 w-1/2 mx-auto">
				</div>

				<div in:fade={{ delay: 800, duration: 600 }} class="text-center mb-12">
					<h2 class="text-3xl font-bold uppercase tracking-wider text-red-600 mb-4">Our Mission</h2>
					<h1 class="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
						Operation Gospel
					</h1>
					<p class="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
						Our mission at Operation Gospel is one and the same as the mission of our Lord and our God, through a sound and bold proclamation of the Gospel the knowledge of the glory of God would cover the earth as the waters cover the sea.
					</p>
					<p class="text-lg text-neutral-500 max-w-3xl mx-auto leading-relaxed mt-4">
						For nearly a decade, Operation Gospel has been preaching the Gospel faithfully to mothers heading into abortion clinics. We are now seeking to bring the Gospel to the voters of Georgia.
					</p>
				</div>
			</div>
		{/if}
		
		<div class="text-center my-12">
			<hr class="border-t-2 border-neutral-800 w-1/2 mx-auto">
		</div>

		<!-- Three Pillars of the Work -->
		{#if show}
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold uppercase tracking-wider text-red-600 mb-4">What is Abolition?</h2>
				<p class="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
					Abolition is the immediate, total, and unconditional end to the legal killing of preborn children. Unlike incremental "pro-life" regulation (heartbeat bills, gestational limits), abolition demands equal protection under existing homicide law. No exceptions. No partiality. No compromise.
				</p>
				<a href="{base}/abolition-basics" class="text-neutral-300 hover:text-white mt-4 inline-block">Learn the difference between abolition and pro-life →</a>
			</div>
			<div class="text-center my-12">
				<hr class="border-t-2 border-neutral-800 w-1/2 mx-auto">
			</div>
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold uppercase tracking-wider text-red-600 mb-4">The Fight in Georgia</h2>
			</div>
			<div class="grid md:grid-cols-3 gap-8 mb-16 items-stretch">
				<!-- Pillar 1: Legislative Justice -->
				<a href="{base}/georgia-battle" in:fly={{ y: 20, delay: 1500, duration: 400 }} class="group bg-neutral-900/50 border border-neutral-800 hover:border-red-600 p-8 transition-all duration-300 block shadow-lg hover:shadow-xl">
					<h3 class="text-xl font-black uppercase tracking-wide text-red-600 mb-4 border-b-2 border-red-900 pb-3">Legislative Engagement</h3>
					<p class="text-base text-neutral-300 leading-relaxed mb-4">
						Roe is over. Equal Protection laws matter. 50 fights in 50 states. The Christian Church must pursue biblical justice to end child sacrifice.
					</p>
					<p class="text-sm text-neutral-400 leading-relaxed mb-4">
						Our focus is laser-sharp: Georgia's 180 House districts. Representatives in the Georgia House of Representatives hold the key to passing HB 441. We equip voters and churches district-by-district to demand justice.
					</p>
					<span class="text-xs text-red-500 uppercase tracking-wider group-hover:underline">Learn about HB 441 →</span>
				</a>
				
				<!-- Pillar 2: Gospel Proclamation -->
				<a href="{base}/respond" in:fly={{ y: 20, delay: 1600, duration: 400 }} class="group bg-neutral-900/50 border border-neutral-800 hover:border-red-600 p-8 transition-all duration-300 block shadow-lg hover:shadow-xl">
					<h3 class="text-xl font-black uppercase tracking-wide text-red-600 mb-4 border-b-2 border-red-900 pb-3">Abolition with Evangelism</h3>
					<p class="text-base text-neutral-300 leading-relaxed mb-4">
						We preach repentance and offer tangible hope. We condemn the sin of murder and preach forgiveness in Christ.
					</p>
					<ul class="text-sm text-neutral-400 leading-relaxed mb-4 list-disc list-inside">
						<li>Blessing bags</li>
						<li>Baby showers</li>
						<li>Adoptive services</li>
						<li>Counseling for mothers and fathers who chose life</li>
					</ul>
					<p class="text-xs text-neutral-500 leading-relaxed mb-4">
						This isn't crisis pregnancy center work—it's Gospel-centered evangelism with practical support.
					</p>
					<span class="text-xs text-red-500 uppercase tracking-wider group-hover:underline">Support the work →</span>
				</a>
				
				<!-- Pillar 3: The Church's Duty -->
				<a href="{base}/near-me" in:fly={{ y: 20, delay: 1700, duration: 400 }} class="group bg-neutral-900/50 border border-neutral-800 hover:border-red-600 p-8 transition-all duration-300 block shadow-lg hover:shadow-xl">
					<h3 class="text-xl font-black uppercase tracking-wide text-red-600 mb-4 border-b-2 border-red-900 pb-3">Local Churches</h3>
					<p class="text-base text-neutral-300 leading-relaxed mb-4">
						Our focus is Georgia's 180 House districts. We equip pastors and congregations district-by-district to demand justice.
					</p>
					<p class="text-sm text-neutral-400 leading-relaxed mb-4">
						We work with local churches to equip them in outreach programs to fulfill the Great Commission. We collaborate with Georgia Life Alliance (GLA) and the Georgia Baptist Association.
					</p>
					<p class="text-sm text-neutral-400 leading-relaxed mb-4">
						Note: We are not affiliated with Georgia Right to Life.
					</p>
					<span class="text-xs text-red-500 uppercase tracking-wider group-hover:underline">Connect with churches →</span>
				</a>
			</div>
		{/if}
		
		<div class="text-center my-12">
			<hr class="border-t-2 border-neutral-800 w-1/2 mx-auto">
		</div>

		<!-- Call to Engagement -->
		{#if show}
			<div in:fade={{ delay: 2000, duration: 600 }} class="text-center pt-8 border-t border-neutral-800">
				<h2 class="text-2xl font-bold uppercase tracking-wider text-red-600 mb-2">Answer the Call</h2>
				<h2 class="text-2xl font-bold uppercase tracking-wider text-red-600 mb-2">50 Fights in 50 States</h2>
				<p class="text-lg text-neutral-400 mb-8 max-w-3xl mx-auto">
					The time for half-measures has passed. Georgia's children demand justice. Will you answer the call?
				</p>
				<div>
					<h3 class="text-2xl font-bold uppercase tracking-wider text-white mb-2">Where are you in the fight?</h3>
					<p class="text-lg text-neutral-400 mb-8 max-w-3xl mx-auto">Answer three questions to find your role in ending abortion in Georgia.</p>
					                <a 
					                    href="{base}/who-are-you" 
					                    class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-base px-10 py-4 uppercase tracking-wider transition-all duration-300 shadow-lg transform hover:scale-105"
					                >
					                    Begin the Journey →
					                </a>
					            </div>
			            </div>
					        {/if}
					
					        <!-- Testimonial Section -->
					        {#if show}
					            <div in:fade={{ delay: 2200, duration: 600 }} class="text-center my-12 pt-8 border-t border-neutral-800">
					                <h2 class="text-2xl font-bold uppercase tracking-wider text-red-600 mb-6">What Leaders Say</h2>
					                <div class="max-w-2xl mx-auto italic text-neutral-300 text-xl leading-relaxed">
					                    <p class="mb-4">
					                        "Operation Gospel equipped our church to boldly defend the fatherless. This is the Gospel in action."
					                    </p>
					                    <p class="font-bold text-neutral-200">— Pastor John Smith, Reformation Church of Marietta</p>
					                </div>
					            </div>
					        {/if}
					    </div>
					</div>
