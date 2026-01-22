<script lang="ts">
	import { sineIn } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import ExegesisModal from '$lib/components/ExegesisModal.svelte';

	let collapsed = $state(false);
	let showModal = $state(false);

	const billText = `
5

Automatic Zoom
25 LC 46 1024
House Bill 441
By: Representatives Dunahoo of the 31st , Cameron of the 1st , Byrd of the 20th , Mathis of the
133rd , Kelley of the 16th , and others
A BILL TO BE ENTITLED
AN ACT
To amend Title 16 of the Official Code of Georgia Annotated, relating to crimes and1
offenses, so as to provide for a coercion defense to a charge of murder for defendant mothers2
of unborn children; to provide a short title; to provide for a definition; to provide for3
construction; to provide for exceptions; to provide for concurrent prosecuting authority of4
the Attorney General and prosecuting attorneys in certain cases; to provide for applicability;5
to remove exceptions that allow for assault and battery on an unborn child; to amend Code6
Section 19-7-1 of the Official Code of Georgia Annotated, relating to in whom parental7
power lies, how such power lost, and recovery for homicide of a child or unborn child, so as8
to provide for the right to recovery for the life of a child beginning at the stage of9
fertilization; to provide for related matters; to provide for legislative findings and10
determinations; to repeal conflicting laws; and for other purposes.11
BE IT ENACTED BY THE GENERAL ASSEMBLY OF GEORGIA:12
SECTION 1.13
The General Assembly finds and determines that:14
(1) Article I, Section I, Paragraph I of the Georgia Constitution provides, "No person shall15
be deprived of life, liberty, or property except by due process of law.";16
H. B. 441
- 1 -
25 LC 46 1024
(2) Article I, Section I, Paragraph II of the Georgia Constitution provides, "Protection to17
person and property is the paramount duty of government and shall be impartial and18
complete. No person shall be denied the equal protection of the laws.";19
(3) The Fourteenth Amendment to the Constitution of the United States requires that "[n]o20
state...shall deny to any person within its jurisdiction the equal protection of the laws";21
(4) To fulfill such right to life and equal protection requirements, the lives of unborn22
persons in this state should be protected with the same criminal and civil laws protecting23
the lives of born persons by removing provisions that enable the commission of willful24
prenatal homicide and assault; and25
(5) Current provisions could be interpreted to allow a person to pressure a pregnant mother26
to abort her child, and such provisions should be removed.27
SECTION 2.28
Title 16 of the Official Code of Georgia Annotated, relating to crimes and offenses, is29
amended by revising Code Section 16-3-26, relating to coercion, as follows:30
"16-3-26.31
A person is not guilty of a crime, except murder, if the act upon which the supposed32
criminal liability is based is performed under such coercion that the person reasonably33
believes that performing the act is the only way to prevent his imminent death or great34
bodily injury.35
(a) A person is not guilty of a crime if the act upon which the supposed criminal liability36
is based is performed under such coercion that the person reasonably believes that the37
performance of the act is the only way to prevent his or her imminent death or great bodily38
injury.39
(b) The defense of coercion provided by subsection (a) of this Code section shall not apply40
to a charge of murder unless the victim is an unborn child and the defendant is the child's41
mother."42
H. B. 441
- 2 -
25 LC 46 1024
SECTION 3.43
Said title is further amended in Article 1 of Chapter 5, relating to homicide, by adding a new44
Code section to read as follows:45
"16-5-6.46
(a) This Code section shall be known and may be cited as the 'Georgia Prenatal Equal47
Protection Act.'48
(b) As used in this article, the term 'human being' includes a living human and an unborn49
child at every stage of development from fertilization until birth.50
(c) Enforcement pursuant to this Code section is subject to the same presumptions,51
defenses, justifications, laws of parties, immunities, and clemencies as would apply to the52
homicide of a person who had been born alive.53
(d) This chapter shall not apply to the unintentional injury or death of an unborn child54
when resulting from:55
(1) The undertaking of procedures to save the life of a mother when accompanied by56
reasonable steps, if available, to save the life of her unborn child; or57
(2) A spontaneous miscarriage.58
(e) Prosecuting attorneys and the Attorney General shall have concurrent authority to59
prosecute any criminal cases arising under the provisions of this Code section and to60
perform any necessary related duty. For purposes of investigating offenses or criminal61
cases arising under the provisions of this Code section, the Attorney General shall have the62
authority to employ peace officers.63
(f) This Code section prevails over other law to the extent of any conflict.64
(g) In accordance with Article I, Section I, Paragraph X of the Georgia Constitution,65
Article I, Section 9, Clause 3 of the Constitution of the United States, and Code66
Section 1-3-5, this Code section is prospective only and shall not apply to any act67
committed prior to the effective date of this Act."68
H. B. 441
- 3 -
25 LC 46 1024
SECTION 4.69
Said title is further amended by revising Code Section 16-5-28, relating to assault on an70
unborn child, as follows:71
"16-5-28.72
(a) For the purposes of this Code section, the term 'unborn child' means a member of the73
species homo sapiens at any stage of development who is carried in the womb.74
(b) A person commits the offense of assault of an unborn child when such person, without75
legal justification, attempts to inflict violent injury to an unborn child.76
(c) Any person convicted of the offense of assault of an unborn child shall be guilty of a77
misdemeanor.78
(d) Nothing in this Code section shall be construed to permit the prosecution of:79
(1) Any person for conduct relating to an abortion for which the consent of the pregnant80
woman, or person authorized by law to act on her behalf, has been obtained or for which81
such consent is implied by law;82
(2) Any person for any medical treatment of the pregnant woman or her unborn child;83
or84
(3) Any woman with respect to her unborn child."85
SECTION 5.86
Said title is further amended by revising Code Section 16-5-29, relating to battery of an87
unborn child, as follows:88
"16-5-29.89
(a) For the purposes of this Code section, the term 'unborn child' means a member of the90
species homo sapiens at any stage of development who is carried in the womb.91
(b) A person commits the offense of battery of an unborn child when such person, without92
legal justification, intentionally inflicts physical harm upon an unborn child.93
H. B. 441
- 4 -
25 LC 46 1024
(c) A person convicted of the offense of battery of an unborn child shall be guilty of a94
misdemeanor.95
(d) Nothing in this Code section shall be construed to permit the prosecution of:96
(1) Any person for conduct relating to an abortion for which the consent of the pregnant97
woman, or person authorized by law to act on her behalf, has been obtained or for which98
such consent is implied by law;99
(2) Any person for any medical treatment of the pregnant woman or her unborn child;100
or101
(3) Any woman with respect to her unborn child."102
SECTION 6.103
Code Section 19-7-1 of the Official Code of Georgia Annotated, relating to in whom parental104
power lies, how such power lost, and recovery for homicide of a child or unborn child, is105
amended by revising paragraph (1) of subsection (c) as follows:106
"(c)(1) In every case of the homicide of a child, minor or sui juris, there shall be some107
party entitled to recover the full value of the life of the child, either as provided in this108
Code section or as provided in Chapter 4 of Title 51. For the homicide of an unborn109
child, the right to recover for the full value of the life of such child shall begin at the point110
at which a detectable human heartbeat, as such term is defined in Code Section 1-2-1, is111
present fertilization."112
SECTION 7.113
All laws and parts of laws in conflict with this Act are repealed.114
H. B. 441
- 5 -
`;
</script>

<ExegesisModal bind:showModal />

<section
	class="relative py-16 px-6 border-b border-gold/10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-light/40 to-navy-dark"
>
	<div class="max-w-7xl mx-auto">
		<div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
			<div class="md:max-w-2xl">
				<div
					class="inline-flex items-center gap-2 px-3 py-1 rounded border border-gold/30 bg-gold/5 mb-6"
				>
					<span class="material-symbols-outlined text-[14px] text-gold filled">circle</span>
					<span class="text-xs font-bold uppercase tracking-widest text-gold">In Committee</span>
				</div>
				<h1 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-3 text-shadow-sm font-serif">
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
						class="text-white font-display font-bold text-xl tracking-tight"
						>Emory Dunahoo</a
					>
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
	{#if !collapsed}
		<aside
			class="w-full lg:w-[45%] bg-navy-dark border-b lg:border-b-0 lg:border-r border-gold/10 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] flex flex-col z-20 shadow-[10px_0_30px_-10px_rgba(0,0,0,0.5)]"
			transition:slide={{ duration: 300, easing: sineIn }}
		>
			<div class="p-4 lg:p-8 h-full flex flex-col">
				<div
					class="flex flex-col h-full bg-navy-dark rounded-xl border border-gold/20 shadow-2xl overflow-hidden relative group ring-1 ring-white/5"
				>
					<div
						class="bg-navy-deep px-4 py-3 flex items-center justify-between border-b border-white/5 select-none"
					>
						<div class="flex items-center gap-2">
							<div class="flex gap-2 group-hover:opacity-100 opacity-60 transition-opacity">
								<div
									class="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-sm"
								></div>
								<div
									class="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-sm"
								></div>
								<div
									class="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-sm"
								></div>
							</div>
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
							class="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gold/10 text-xs font-mono text-slate-400 hover:text-gold transition-all"
						>
							<span class="material-symbols-outlined text-[16px]">download</span>
							Download Raw
						</a>
						<div class="ml-auto text-xs font-mono text-slate-600">Ln 1, Col 1</div>
					</div>
					<div
						class="flex-1 overflow-y-auto terminal-scroll p-6 lg:p-8 font-mono text-sm leading-loose bg-navy-dark"
					>
						<pre class="whitespace-pre-wrap">{billText}</pre>
					</div>
				</div>
			</div>
		</aside>
	{/if}
	<article
		class="relative z-10 bg-navy-dark overflow-hidden"
		class:w-full={collapsed}
		class:lg:w-[55%]={!collapsed}
	>
		<button
			on:click={() => (collapsed = !collapsed)}
			class="absolute top-4 left-4 z-50 bg-gold/20 text-gold p-2 rounded-full"
		>
			<span class="material-symbols-outlined">{collapsed ? 'menu_open' : 'menu'}</span>
		</button>
		<div class="relative z-10 max-w-3xl mx-auto px-8 py-12 lg:py-24 space-y-32">
			<div class="space-y-8">
				<div class="flex items-center gap-3">
					<div class="h-px w-8 bg-gold"></div>
					<span class="text-gold font-mono text-sm tracking-wider uppercase">00. Introduction</span>
				</div>
				<h2 class="text-4xl font-bold text-white tracking-tight">Understanding the Text</h2>
				<p class="text-xl leading-relaxed text-slate-400 font-light">
					Legislation can be dense, but the theology behind it is clear. This tool allows you to
					read the raw legal text on the left while walking through the biblical and moral reasoning
					on the right. We believe that <span
						class="text-white font-medium border-b border-primary">bad laws are often the result of bad theology</span
					>.
				</p>
			</div>
			<div class="group relative">
				<div
					class="absolute -left-10 top-2 bottom-0 w-px bg-gradient-to-b from-primary via-primary/20 to-transparent hidden lg:block"
				></div>
				<div
					class="absolute -left-[43px] top-2 w-2 h-2 rounded-full bg-primary hidden lg:block shadow-[0_0_10px_rgba(218,16,50,0.8)]"
				></div>
				<div class="mb-8 flex items-center gap-4">
					<span
						class="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm"
						>Sec. 2 Findings</span
					>
					<span class="text-slate-500 text-sm font-mono flex items-center gap-2">
						<span class="material-symbols-outlined text-sm">fingerprint</span>
						Imago Dei
					</span>
				</div>
				<h3 class="text-3xl md:text-4xl font-bold text-white mb-8">A Ministry of Mercy</h3>
				<div class="prose prose-invert prose-lg text-slate-400 mb-10 leading-relaxed">
					<p>
						The bill begins by establishing the scientific and theological reality of life. This isn't
						just a legal "finding"; it is an acknowledgment of the Creator's work. When the state
						acknowledges that life begins at conception, it aligns itself with the biological reality
						that a unique human DNA is formed at that moment.
					</p>
					<p>
						More importantly, it recognizes the <strong class="text-white">Image of God</strong>. To
						destroy this life is not merely a medical procedure; it is an assault on God's
						image-bearers.
					</p>
				</div>
				<div
					class="bg-navy-light/40 border-l-2 border-gold p-8 rounded-r-xl mb-10 relative overflow-hidden shadow-lg backdrop-blur-sm"
				>
					<div class="relative z-10">
						<p class="text-gold font-serif text-2xl italic leading-relaxed mb-6">
							"For you formed my inward parts; you knitted me together in my mother's womb. I praise
							you, for I am fearfully and wonderfully made."
						</p>
						<div class="flex items-center gap-3">
							<div class="h-px w-6 bg-gold-dim"></div>
							<cite class="text-gold-dim font-bold text-xs not-italic uppercase tracking-widest"
								>Psalm 139:13-14</cite
							>
						</div>
					</div>
					<div class="absolute -top-4 -right-4 opacity-[0.03]">
						<span class="material-symbols-outlined text-[150px] text-gold">auto_stories</span>
					</div>
				</div>
				<button
					class="group flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest pl-1"
					on:click={() => (showModal = true)}
				>
					Read Full Exegesis
					<span class="material-symbols-outlined text-lg group-hover:translate-y-1 transition-transform text-gold"
						>expand_more</span
					>
				</button>
			</div>
			<div class="group relative">
				<div
					class="absolute -left-10 top-2 bottom-0 w-px bg-gradient-to-b from-gold via-gold/20 to-transparent hidden lg:block"
				></div>
				<div
					class="absolute -left-[43px] top-2 w-2 h-2 rounded-full bg-gold hidden lg:block shadow-[0_0_10px_rgba(212,175,55,0.8)]"
				></div>
				<div class="mb-8 flex items-center gap-4">
					<span
						class="bg-white/5 text-gray-300 border border-white/10 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider"
						>Sec. 4 Equal Protection</span
					>
					<span class="text-slate-500 text-sm font-mono flex items-center gap-2">
						<span class="material-symbols-outlined text-sm">balance</span>
						Biblical Justice
					</span>
				</div>
				<h3 class="text-3xl md:text-4xl font-bold text-white mb-8">The Incarnational Argument</h3>
				<div class="prose prose-invert prose-lg text-slate-400 mb-10 leading-relaxed">
					<p>
						Section 4 is controversial because it removes the "exceptions" that allow for
						partiality. Theologically, this is known as the doctrine of <strong class="text-white"
							>Equal Protection</strong
						>. If an unborn child is a human person (as established in Section 2), then the law
						must treat the taking of that life with the same gravity as any other homicide.
					</p>
					<p>
						We argue that showing partiality in judgment—having different laws for different classes
						of victims—is an abomination to the Lord.
					</p>
				</div>
				<div
					class="bg-navy-light/40 border-l-2 border-gold p-8 rounded-r-xl mb-10 relative overflow-hidden shadow-lg backdrop-blur-sm"
				>
					<div class="relative z-10">
						<p class="text-gold font-serif text-2xl italic leading-relaxed mb-6">
							"You shall have the same rule for the sojourner and for the native, for I am the Lord
							your God."
						</p>
						<div class="flex items-center gap-3">
							<div class="h-px w-6 bg-gold-dim"></div>
							<cite class="text-gold-dim font-bold text-xs not-italic uppercase tracking-widest"
								>Leviticus 24:22</cite
							>
						</div>
					</div>
				</div>
				<div class="bg-black/40 p-6 rounded-lg border border-white/5 mb-8 backdrop-blur-sm">
					<h5 class="text-white font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
						<span class="material-symbols-outlined text-gold text-base">warning</span>
						Common Objection
					</h5>
					<p class="text-base text-slate-400 italic mb-2">"But shouldn't we be incremental?"</p>
					<p class="text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-2">
						The bill rejects incrementalism because justice delayed is justice denied. We do not
						regulate murder; we abolish it.
					</p>
				</div>
				<button
					class="group flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest pl-1"
					on:click={() => (showModal = true)}
				>
					Read Full Exegesis
					<span class="material-symbols-outlined text-lg group-hover:translate-y-1 transition-transform text-gold"
						>expand_more</span
					>
				</button>
			</div>
			<div class="pt-16 pb-32 border-t border-gold/10">
				<div class="text-center max-w-lg mx-auto">
					<div
						class="w-20 h-20 bg-gradient-to-br from-navy-light to-navy-dark border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
					>
						<span class="material-symbols-outlined text-4xl text-gold">campaign</span>
					</div>
					<h3 class="text-3xl font-bold text-white mb-4">Join the Movement</h3>
					<p class="text-slate-400 mb-10 leading-relaxed">
						This analysis is provided to equip the church. Help us continue this work and push this
						bill to the floor.
					</p>
					<div class="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="/join"
							class="bg-gold hover:bg-yellow-500 text-navy-dark font-bold py-3 px-8 rounded transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
						>
							Contact Legislators
						</a>
						<a
							href="/support#donation"
							class="bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold py-3 px-8 rounded transition-all"
						>
							Donate
						</a>
					</div>
				</div>
			</div>
		</div>
	</article>
</div>
