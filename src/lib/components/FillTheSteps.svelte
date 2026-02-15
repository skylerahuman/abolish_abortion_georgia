<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	onMount(() => {
		const footer = document.querySelector('footer');
		if (footer) footer.style.display = 'none';
		return () => {
			if (footer) footer.style.display = 'block';
		};
	});
</script>

<svelte:head>
	<title>Fill The Steps - Feb 20, 2026</title>
</svelte:head>

<!-- Desktop View: Uses the vh-based, proportional flex layout -->
<div class="hidden md:flex flex-1 bg-charcoal text-bone overflow-hidden flex-col p-[2vh] min-h-0">
	<!-- Header Section -->
	<header class="flex flex-row justify-between items-end mb-[2vh] gap-4 flex-shrink-0">
		<div class="flex flex-col">
			<h1
				class="text-[8vh] lg:text-[10vh] font-black uppercase tracking-tighter text-crimson leading-[0.8]"
			>
				20 FEB <span class="text-white">2026</span>
				<span class="text-white/20 ml-4 text-[4vh] lg:text-[6vh] font-black">HB 441</span>
			</h1>
			<p class="text-[1.5vh] lg:text-[2vh] font-bold text-gold tracking-[0.4em] uppercase mt-[1vh]">
				Make Our Presence Known At The Capitol
			</p>
		</div>
		<div class="flex gap-4 mb-[0.5vh]">
			<a
				href="{base}/"
				class="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-[1.2vh] font-black uppercase tracking-widest transition-colors"
			>
				Main Site
			</a>
			<a
				href="https://donorbox.org/regular-donations-15"
				target="_blank"
				class="px-8 py-3 bg-crimson hover:bg-ember text-white text-[1.2vh] font-black uppercase tracking-widest transition-colors shadow-2xl"
			>
				Donate Now
			</a>
		</div>
	</header>

	<!-- Main Grid -->
	<div class="flex-1 grid grid-cols-12 gap-[2vh] min-h-0">
		<!-- Column 1: The Call -->
		<div class="col-span-3 flex flex-col gap-[2vh] min-h-0">
			<section class="bg-panel/40 border border-white/10 p-[3vh] flex flex-col flex-1 min-h-0">
				<h2
					class="text-[2.5vh] font-black uppercase tracking-tight leading-tight mb-[2vh] text-white"
				>
					Press Conference
				</h2>
				<p class="text-[1.8vh] text-neutral-400 leading-relaxed mb-[2vh] font-serif italic">
					With <span class="text-white font-bold underline decoration-crimson underline-offset-4"
						>Jeff Durbin</span
					> and dozens of Georgia Pastors with one clear message:
				</p>
				<div class="bg-white/5 border-l-[0.5vh] border-crimson p-[2vh] mb-[2vh]">
					<p class="text-[2.2vh] font-black uppercase leading-tight tracking-tighter text-white">
						EQUAL JUSTICE UNDER THE LAW
					</p>
					<p class="text-[1.2vh] font-bold text-crimson mt-[0.5vh] tracking-[0.3em] uppercase">
						(NO MORE EXCEPTIONS)
					</p>
				</div>
				<div class="mt-auto">
					<p class="text-[3vh] font-black text-gold uppercase tracking-tighter italic leading-none">
						Will You Be There?
					</p>
					<p class="text-[1.5vh] font-bold text-neutral-300 uppercase tracking-[0.2em] mt-[0.5vh]">
						END ABORTION NOW
					</p>
				</div>
			</section>

			<section
				class="bg-panel/20 border border-white/5 p-[3vh] flex-1 overflow-y-auto custom-scrollbar min-h-0"
			>
				<h3 class="text-[1.2vh] font-black text-crimson tracking-[0.5em] uppercase mb-[2vh]">
					DO OUR REPS KNOW?
				</h3>
				<ul class="space-y-[1.5vh]">
					{#each ['Our Preborn Neighbors to Be Protected Under The Law', 'Unrighteous Abortion Exceptions Removed From The Law', 'Leaders Who Fear God More Than Man'] as item, i}
						<li class="flex items-start gap-[1.5vh]">
							<span class="text-gold font-bold text-[1.8vh] leading-none">0{i + 1}</span>
							<span class="text-[1.6vh] font-bold leading-tight">{item}</span>
						</li>
					{/each}
				</ul>
			</section>
		</div>

		<!-- Column 2: The Event -->
		<div class="col-span-4 flex flex-col gap-[2vh] min-h-0">
			<section
				class="bg-crimson p-[4vh] flex flex-col justify-center items-center text-center flex-1 shadow-2xl relative overflow-hidden"
			>
				<h2
					class="text-[2.5vh] font-black uppercase tracking-tight leading-none mb-[1.5vh] text-white underline decoration-white/40 underline-offset-8"
				>
					WE WILL LET THEM KNOW
				</h2>
				<p
					class="text-[1.2vh] font-bold uppercase tracking-[0.4em] mt-[2vh] mb-[1vh] text-white/90"
				>
					JOIN IN THE CAPITOL SOUTH WING
				</p>
				<p class="text-[5vh] lg:text-[6vh] font-black mb-[1vh] leading-none tracking-tighter">
					FRIDAY, FEB 20TH
				</p>
				<p class="text-[3.5vh] font-bold text-white/90">1:00 PM</p>
				<div class="h-px w-[10vh] bg-white/30 my-[3vh]"></div>
				<p
					class="text-[1.3vh] font-bold text-white/80 uppercase tracking-[0.2em] px-[2vh] leading-relaxed"
				>
					FILL THE CAPITOL STEPS AND HALLS WITH THE TRUTH OF GOD'S WORD
				</p>
				<div
					class="mt-[3vh] text-[1.5vh] font-bold bg-black/40 px-[3vh] py-[1.5vh] rounded-sm border border-white/20 tracking-wide"
				>
					206 Washington St SW, Atlanta, GA 30334
				</div>
			</section>

			<section
				class="bg-panel/40 border border-white/10 p-[4vh] flex flex-col justify-center min-h-0"
			>
				<h3
					class="text-[3.5vh] font-black uppercase tracking-tighter leading-none mb-[2vh] text-white"
				>
					FILL THE STEPS <br />
					<span class="text-gold block mt-[0.5vh]">(AND THE NATIONAL HEADLINES)</span>
				</h3>
				<p class="text-[1.8vh] text-neutral-400 font-serif italic leading-relaxed mb-[2vh]">
					That Georgia Will Be the First State to Fully Ban Child Sacrifice
				</p>
				<div class="pt-[2vh] border-t border-white/10 mt-auto">
					<p class="text-[1.2vh] font-black text-crimson tracking-[0.5em] uppercase mb-[1vh]">
						Isaiah 1:17
					</p>
					<p class="text-[2vh] font-serif italic text-white leading-tight">
						"Learn to do well; seek judgment, relieve the oppressed, judge the fatherless, plead for
						the widow."
					</p>
				</div>
			</section>
		</div>

		<!-- Column 3: Helpers -->
		<div class="col-span-5 flex flex-col gap-[2vh] min-h-0">
			<section class="bg-panel/30 border border-gold/20 p-[3vh] flex flex-col flex-shrink-0">
				<h3 class="text-[1.2vh] font-black text-gold tracking-[0.4em] uppercase mb-[2vh]">
					HOW TO GET THERE
				</h3>
				<div class="flex gap-[2vh]">
					<div class="flex-1 grid grid-cols-1 gap-[1vh]">
						{#each ['Park in Hackney or Grady Garages', 'Enter South Wing via Public Entrance', 'Make Your Way to the Press Stairs'] as step, i}
							<div class="bg-white/5 p-[1.5vh] border border-white/5 flex gap-[2vh] items-center">
								<span class="text-gold font-black text-[2vh]">{i + 1}</span>
								<span class="text-[1.3vh] font-bold uppercase tracking-widest text-neutral-200"
									>{step}</span
								>
							</div>
						{/each}
					</div>
					<div
						class="bg-crimson/10 p-[2vh] border border-crimson/30 flex flex-col justify-center items-center text-center w-1/3 shadow-inner"
					>
						<span
							class="text-[1.6vh] font-black uppercase text-white leading-tight tracking-tighter"
							>Speak for the Voiceless</span
						>
					</div>
				</div>
			</section>

			<section
				class="bg-panel/60 border border-white/10 p-[4vh] flex-1 overflow-y-auto custom-scrollbar flex flex-col min-h-0"
			>
				<div class="flex justify-between items-center mb-[2vh] border-b border-white/5 pb-[2vh]">
					<h3 class="text-[1.2vh] font-black text-white tracking-[0.4em] uppercase">
						MEET WITH YOUR REPRESENTATIVE
					</h3>
					<a
						href="https://pluralpolicy.com/find-your-legislator/"
						target="_blank"
						class="text-[1vh] bg-gold text-black px-[2vh] py-[1vh] font-black uppercase rounded-sm hover:bg-white transition-colors shadow-lg"
						>Find Your Legislator</a
					>
				</div>
				<div class="grid grid-cols-2 gap-[4vh] flex-1 min-h-0">
					<div class="text-[1.5vh] leading-relaxed space-y-[2vh] overflow-y-auto custom-scrollbar">
						<p class="text-neutral-400 font-serif italic">
							<strong class="text-white text-[1.8vh]">Arrive early</strong> to speak one-on-one.
						</p>
						<ol class="list-decimal list-inside space-y-[1.5vh] text-neutral-300 font-bold">
							<li>Go to House Chamber (3rd Floor).</li>
							<li>Fill out green sheet at desk.</li>
							<li>Write message about HB 441.</li>
							<li>Wait at the rope.</li>
						</ol>
					</div>
					<div
						class="bg-black/40 p-[3vh] border border-white/5 flex flex-col justify-center shadow-2xl"
					>
						<h4 class="text-[1.2vh] font-black text-crimson tracking-[0.3em] uppercase mb-[2vh]">
							What do I say?
						</h4>
						<p class="text-[1.6vh] font-serif leading-relaxed text-neutral-400 italic">
							"Simply express your support for the equal protection bill and its importance to you."
						</p>
					</div>
				</div>
			</section>
		</div>
	</div>

	<!-- Marginal Footer -->
	<footer
		class="bg-black/60 backdrop-blur-md border-t-[0.4vh] border-gold p-[2vh] mt-[2vh] flex-shrink-0"
	>
		<h4 class="text-[1.2vh] font-black text-gold tracking-[0.4em] uppercase mb-[1vh]">
			WHAT TO EXPECT
		</h4>
		<p class="text-[1.6vh] leading-relaxed text-neutral-300 font-serif">
			The main event will be a 1PM press conference on the steps in the South wing of our State
			Capitol. Our presence at the steps amplifies our voice. Be at the steps a few minutes early to
			get a sign and find your spot with hundreds of other families to stand in array, sing hymns,
			and hear pastors speak about the equal protection bill.
		</p>
	</footer>
</div>

<!-- Mobile View: Uses a scrolling, block-based layout -->
<div class="flex md:hidden flex-col bg-charcoal text-bone min-h-screen">
	<!-- Hero Section -->
	<section class="bg-black p-6 pt-12 border-b border-white/10">
		<h1
			class="text-6xl font-black uppercase tracking-tighter text-crimson leading-none mb-2 text-center"
		>
			20 FEB <span class="text-white">2026</span>
		</h1>
		<p class="text-xl font-bold text-center text-white/40 uppercase tracking-widest mb-6">
			HB 441 | Equal Protection
		</p>
		<div class="flex flex-col gap-3">
			<a
				href="https://donorbox.org/regular-donations-15"
				target="_blank"
				class="w-full py-4 bg-crimson text-white text-center font-black uppercase tracking-[0.2em] shadow-lg"
				>Donate Now</a
			>
			<a
				href="{base}/"
				class="w-full py-4 bg-white/5 text-center font-black uppercase tracking-[0.2em] border border-white/10"
				>Main Site</a
			>
		</div>
	</section>

	<div class="p-6 space-y-8 pb-24">
		<!-- Main Message -->
		<section class="space-y-4">
			<h2 class="text-2xl font-black uppercase text-white leading-tight">
				Make Our Presence Known
			</h2>
			<p class="text-lg text-neutral-400 font-serif italic">
				Press conference with Jeff Durbin and Georgia pastors.
			</p>
			<div class="bg-white/5 border-l-4 border-crimson p-5">
				<p class="text-xl font-black uppercase text-white">EQUAL JUSTICE UNDER THE LAW</p>
				<p class="text-xs font-bold text-crimson mt-1 tracking-widest">(NO MORE EXCEPTIONS)</p>
			</div>
			<p class="text-3xl font-black text-gold italic uppercase">Will You Be There?</p>
		</section>

		<!-- The Facts -->
		<section class="bg-panel/40 p-6 border border-white/10 space-y-4 text-center py-12">
			<h2
				class="text-xl font-black text-white uppercase tracking-tighter border-b border-white/10 pb-4"
			>
				WE WILL LET THEM KNOW
			</h2>
			<p class="text-[10px] font-bold text-crimson tracking-[0.3em] uppercase">
				SOUTH WING CAPITOL
			</p>
			<div class="space-y-1">
				<p class="text-3xl font-black uppercase">FRI, FEB 20TH</p>
				<p class="text-xl font-bold text-white/80">1:00 PM</p>
			</div>
			<div class="bg-black/40 p-3 text-xs font-bold text-neutral-400 border border-white/5">
				206 Washington St SW, Atlanta, GA 30334
			</div>
		</section>

		<!-- Headline Message -->
		<section class="space-y-4 py-8 border-y border-white/5">
			<h3 class="text-3xl font-black uppercase text-white tracking-tighter">
				FILL THE STEPS<br /><span class="text-gold">(AND THE HEADLINES)</span>
			</h3>
			<p class="text-neutral-400 font-serif italic">
				That Georgia will be the first state to fully ban child sacrifice.
			</p>
			<div class="space-y-2">
				<p class="text-xs font-black text-crimson tracking-widest">ISAIAH 1:17</p>
				<p class="text-xl font-serif italic text-white leading-snug">
					"Learn to do well; seek judgment, relieve the oppressed..."
				</p>
			</div>
		</section>

		<!-- Logistics -->
		<section class="space-y-6">
			<h3 class="text-xs font-black text-gold tracking-[0.3em] uppercase">HOW TO GET THERE</h3>
			<div class="space-y-3">
				{#each ['Park in Hackney or Grady Garages', 'Enter South Wing via Public', 'Go to the Press Stairs'] as step, i}
					<div class="bg-white/5 p-4 flex items-center gap-4 border border-white/5">
						<span class="text-gold font-black text-xl">{i + 1}</span>
						<span class="text-xs font-bold uppercase tracking-widest">{step}</span>
					</div>
				{/each}
			</div>
			<div class="bg-crimson p-6 text-center shadow-xl">
				<p class="text-lg font-black uppercase text-white tracking-tighter">
					Speak for the Voiceless
				</p>
			</div>
		</section>

		<!-- Reps -->
		<section class="bg-panel p-6 border border-white/10 space-y-6">
			<h3
				class="text-xs font-black text-white tracking-widest uppercase border-b border-white/10 pb-4"
			>
				MEET YOUR REPRESENTATIVE
			</h3>
			<div class="space-y-4">
				<p class="text-neutral-400 font-serif italic">
					Arrive early to find and speak one-on-one about <span class="text-white font-bold"
						>HB 441</span
					>.
				</p>
				<ol class="space-y-4 text-sm font-bold list-decimal list-inside text-neutral-200">
					<li>
						Identify your rep at <a
							href="https://pluralpolicy.com/find-your-legislator/"
							class="text-gold underline">pluralpolicy.com</a
						>
					</li>
					<li>Go to the House Chamber (3rd Floor)</li>
					<li>Fill out a green sheet at the desk</li>
					<li>Turn it in and wait at the rope</li>
				</ol>
			</div>
			<div class="bg-black/40 p-4 border border-white/5">
				<h4 class="text-[10px] font-black text-crimson tracking-widest uppercase mb-2">
					WHAT DO I SAY?
				</h4>
				<p class="text-sm font-serif italic">
					"Simply express your support for the equal protection bill and its importance to you."
				</p>
			</div>
		</section>

		<!-- Footer/Expectations -->
		<section class="bg-black/40 p-6 border-t-2 border-gold space-y-4">
			<h4 class="text-xs font-black text-gold tracking-widest uppercase">WHAT TO EXPECT</h4>
			<p class="text-sm font-serif leading-relaxed text-neutral-400">
				Be at the steps a few minutes early to find your spot with hundreds of other families to
				stand in array, sing hymns, and hear pastors and representatives speak. Bring your little
				ones!
			</p>
		</section>
	</div>
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 0.5vh;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.3);
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(212, 175, 55, 0.4);
		border-radius: 0.25vh;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: rgba(212, 175, 55, 0.6);
	}
</style>
