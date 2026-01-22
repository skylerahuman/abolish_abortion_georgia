<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import ExegesisModal from '$lib/components/ExegesisModal.svelte';

	let { data } = $props();

	let rawTextVisible = $state(true);
	let showModal = $state(false);
	let modalContent = $state({ title: '', content: '' });

	function openModal(title: string, content: string) {
		modalContent = { title, content };
		showModal = true;
	}
</script>

<svelte:head>
	<title>HB441 Line-by-Line Analysis</title>
</svelte:head>

<main class="flex flex-col w-full pt-20">
	<section
		class="relative py-16 px-6 border-b border-gold/10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-light/40 to-navy-dark"
	>
		<div class="max-w-7xl mx-auto">
			<div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
				<div class="md:max-w-2xl">
					<div
						class="inline-flex items-center gap-2 px-3 py-1 rounded border border-gold/30 {data.currentStatus.color} mb-6"
					>
						<span class="material-symbols-outlined text-[14px] filled">{data.currentStatus.icon}</span>
						<span class="text-xs font-bold uppercase tracking-widest">{data.currentStatus.name}</span>
					</div>
					<h1
						class="text-4xl md:text-6xl font-black text-white tracking-tight mb-3 text-shadow-sm font-serif"
					>
						A Line-By-Line Analysis of an Abolition Bill
					</h1>
					<p class="text-lg text-slate-400 max-w-xl leading-relaxed">
						HB 441: A consolidated theological and legal deconstruction of the Abolition of Abortion
						Act, contrasting statute with scripture.
					</p>
				</div>
				<div class="flex flex-col gap-4 text-left md:text-right min-w-[200px]">
					<div class="group">
						<div
							class="text-xs text-gold-dim uppercase tracking-wider font-bold mb-1 group-hover:text-gold transition-colors"
						>
							Bill Author
						</div>
						<a
							href="https://www.emorydunahoo.com/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-white font-display font-bold text-xl tracking-tight hover:underline"
						>
							Emory Dunahoo
						</a>
					</div>
					<div class="group">
						<div
							class="text-xs text-slate-600 uppercase tracking-wider font-bold mb-1 group-hover:text-slate-400 transition-colors"
						>
							Sponsors
						</div>
						<div
							class="text-slate-400 font-mono text-sm leading-relaxed border-l-2 border-slate-800 md:border-l-0 md:border-r-2 md:pr-3 pl-3 md:pl-0"
						>
							TBD
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<div class="flex flex-col lg:flex-row max-w-[1920px] mx-auto w-full min-h-screen">
		{#if rawTextVisible}
			<aside
				transition:slide={{ duration: 300, easing: cubicOut }}
				class="w-full lg:w-[45%] bg-navy-dark border-b lg:border-b-0 lg:border-r border-gold/10 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] flex flex-col z-20 shadow-[10px_0_30px_-10px_rgba(0,0,0,0.5)]"
			>
				<div class="p-4 lg:p-8 h-full flex flex-col">
					<div
						class="flex flex-col h-full bg-navy-dark rounded-xl border border-gold/20 shadow-2xl overflow-hidden relative group ring-1 ring-white/5"
					>
						<div
							class="bg-navy-deep px-4 py-3 flex items-center justify-between border-b border-white/5 select-none"
						>
							<div class="flex items-center gap-2">
								<button
									onclick={() => (rawTextVisible = false)}
									class="flex gap-2 group-hover:opacity-100 opacity-60 transition-opacity"
									aria-label="Collapse bill text view"
								>
									<div
										class="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-sm"
									></div>
									<div
										class="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-sm"
									></div>
									<div
										class="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-sm"
									></div>
								</button>
							</div>
							<div class="text-xs font-mono text-gold/70 flex items-center gap-2 opacity-80">
								<span class="material-symbols-outlined text-[14px]">terminal</span>
								source_hb441.txt
							</div>
							<div class="w-10"></div>
						</div>
						<div class="bg-[#0f1623] px-4 py-2 flex items-center gap-4 border-b border-white/5">
							<button
								class="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gold/10 text-xs font-mono text-slate-400 hover:text-gold transition-all"
							>
								<span class="material-symbols-outlined text-[16px]">visibility</span>
								Track Bill
							</button>
							<a
								href="/HB441.pdf"
								download
								class="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gold/10 text-xs font-mono text-slate-400 hover:text-gold transition-all"
							>
								<span class="material-symbols-outlined text-[16px]">download</span>
								Download Raw
							</a>
							<div class="ml-auto text-xs font-mono text-slate-600">Ln 1, Col 1</div>
						</div>
						<div class="flex-1 overflow-y-auto terminal-scroll p-6 lg:p-8 font-mono text-sm leading-loose bg-navy-dark">
							<pre class="whitespace-pre-wrap">{data.billText}</pre>
						</div>
					</div>
				</div>
			</aside>
		{/if}

		<article class:w-full={!rawTextVisible} class:lg:w-[55%]={rawTextVisible} class="relative z-10 bg-navy-dark overflow-hidden transition-all duration-300">
			{#if !rawTextVisible}
				<button
					onclick={() => (rawTextVisible = true)}
					class="fixed top-24 left-0 z-50 bg-navy-light p-2 rounded-r-lg border border-gold/20"
					aria-label="Expand bill text view"
				>
					<span class="material-symbols-outlined text-gold">menu_open</span>
				</button>
			{/if}
			<div class="relative z-10 max-w-3xl mx-auto px-8 py-12 lg:py-24 space-y-20">
                <div class="space-y-8">
                    <div class="flex items-center gap-3">
                        <div class="h-px w-8 bg-gold"></div>
                        <span class="text-gold font-mono text-sm tracking-wider uppercase">00. Introduction</span>
                    </div>
                    <h2 class="text-4xl font-bold text-white tracking-tight">Understanding the Text</h2>
                    <p class="text-xl leading-relaxed text-slate-400 font-light">
                        Legislation can be dense, but the theology behind it is clear. This tool allows you to read the raw legal text on the left while walking through the biblical and moral reasoning on the right. We believe that <span class="text-white font-medium border-b border-primary">bad laws are often the result of bad theology</span>.
                    </p>
                </div>
				<!-- Section 1 -->
				<div class="group relative">
					<div class="mb-8 flex items-center gap-4">
						<span class="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm">Preamble & Findings</span>
					</div>
					<h3 class="text-3xl md:text-4xl font-bold text-white mb-8">Establishing the Moral Foundation</h3>
					<div class="prose prose-invert prose-lg text-slate-400 mb-10 leading-relaxed">
						<p>
							The bill's preamble establishes the moral and scientific foundation for the entire law: that human life begins at fertilization and deserves protection. This aligns with the biblical understanding of rulers as ministers of God for good (Romans 13) and answers the call of Proverbs 31:8-9 to "Speak up for those who cannot speak for themselves."
						</p>
					</div>

					<div class="bg-navy-light/40 border-l-2 border-gold p-8 rounded-r-xl mb-10 relative overflow-hidden shadow-lg backdrop-blur-sm group/card">
                        <div class="absolute -top-4 -right-4 opacity-[0.03] group-hover/card:opacity-[0.05] transition-opacity duration-300">
                            <span class="material-symbols-outlined text-[150px] text-gold">auto_stories</span>
                        </div>
						<p class="text-gold font-serif text-2xl italic leading-relaxed mb-6">
							"Open your mouth, judge righteously, defend the rights of the poor and needy."
						</p>
						<cite class="text-gold-dim font-bold text-xs not-italic uppercase tracking-widest">Proverbs 31:9</cite>
					</div>
                    <button
                        onclick={() => openModal('Preamble Exegesis', 'This is where the detailed theological explanation for the preamble would go.')}
                        class="group/button flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest pl-1">
                        Read Full Exegesis
                        <span class="material-symbols-outlined text-lg group-hover/button:translate-y-1 transition-transform text-gold">expand_more</span>
                    </button>
				</div>

				<!-- Section 2 -->
				<div class="group relative">
					<div class="mb-8 flex items-center gap-4">
						<span class="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm">Defining Personhood</span>
					</div>
					<h3 class="text-3xl md:text-4xl font-bold text-white mb-8">The Imago Dei Argument</h3>
					<div class="prose prose-invert prose-lg text-slate-400 mb-10 leading-relaxed">
						<p>
							Science confirms unique human DNA at fertilization. Theology confirms the Image of God from the moment of conception. To define a pre-born human as anything less than a "person" is to deny both scientific reality and the Creator's mark on their humanity.
						</p>
					</div>
					<div class="bg-navy-light/40 border-l-2 border-gold p-8 rounded-r-xl mb-10 relative overflow-hidden shadow-lg backdrop-blur-sm group/card">
                        <div class="absolute -top-4 -right-4 opacity-[0.03] group-hover/card:opacity-[0.05] transition-opacity duration-300">
                            <span class="material-symbols-outlined text-[150px] text-gold">auto_stories</span>
                        </div>
						<p class="text-gold font-serif text-2xl italic leading-relaxed mb-6">
							"Before I formed you in the womb I knew you, and before you were born I consecrated you..."
						</p>
						<cite class="text-gold-dim font-bold text-xs not-italic uppercase tracking-widest">Jeremiah 1:5</cite>
					</div>
                    <button
                        onclick={() => openModal('Personhood Exegesis', 'This is where the detailed theological explanation for personhood would go.')}
                        class="group/button flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest pl-1">
                        Read Full Exegesis
                        <span class="material-symbols-outlined text-lg group-hover/button:translate-y-1 transition-transform text-gold">expand_more</span>
                    </button>
				</div>

				<!-- Section 3 -->
				<div class="group relative">
					<div class="mb-8 flex items-center gap-4">
						<span class="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm">Equal Protection</span>
					</div>
					<h3 class="text-3xl md:text-4xl font-bold text-white mb-8">Equal Weights & Measures</h3>
					<div class="prose prose-invert prose-lg text-slate-400 mb-10 leading-relaxed">
						<p>
							Partiality in judgment is an abomination to the Lord (Proverbs 20:10). If abortion is murder, the law must treat it as such. This section removes legal immunity and ensures that the same laws that protect born persons apply equally to the unborn. We cannot have two standards of justice based on a victim's location.
						</p>
					</div>
					<div class="bg-navy-light/40 border-l-2 border-gold p-8 rounded-r-xl mb-10 relative overflow-hidden shadow-lg backdrop-blur-sm group/card">
                        <div class="absolute -top-4 -right-4 opacity-[0.03] group-hover/card:opacity-[0.05] transition-opacity duration-300">
                            <span class="material-symbols-outlined text-[150px] text-gold">auto_stories</span>
                        </div>
						<p class="text-gold font-serif text-2xl italic leading-relaxed mb-6">
							"You shall not distort justice; you shall not be partial..."
						</p>
						<cite class="text-gold-dim font-bold text-xs not-italic uppercase tracking-widest">Deuteronomy 16:19</cite>
					</div>
                    <button
                        onclick={() => openModal('Equal Protection Exegesis', 'This is where the detailed theological explanation for equal protection would go.')}
                        class="group/button flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest pl-1">
                        Read Full Exegesis
                        <span class="material-symbols-outlined text-lg group-hover/button:translate-y-1 transition-transform text-gold">expand_more</span>
                    </button>
				</div>
                <div class="pt-16 pb-32 border-t border-gold/10">
                    <div class="text-center max-w-lg mx-auto">
                        <div class="w-20 h-20 bg-gradient-to-br from-navy-light to-navy-dark border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                            <span class="material-symbols-outlined text-4xl text-gold">campaign</span>
                        </div>
                        <h3 class="text-3xl font-bold text-white mb-4">Join the Movement</h3>
                        <p class="text-slate-400 mb-10 leading-relaxed">
                            This analysis is provided to equip the church. Help us continue this work and push this bill to the floor.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/join" class="bg-gold hover:bg-yellow-500 text-navy-dark font-bold py-3 px-8 rounded transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                                Contact Legislators
                            </a>
                            <a href="/support#donation" class="bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold py-3 px-8 rounded transition-all">
                                Donate
                            </a>
                        </div>
                    </div>
                </div>
			</div>
		</article>
	</div>
</main>

{#if showModal}
	<ExegesisModal bind:showModal title={modalContent.title}>
		<p>This is placeholder content for the modal.</p>
	</ExegesisModal>
{/if}
