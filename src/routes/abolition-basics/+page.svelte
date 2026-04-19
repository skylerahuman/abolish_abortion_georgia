<script lang="ts">
	import { base } from '$app/paths';
	import { fade } from 'svelte/transition';

	let currentStepIndex = $state(0);

	const steps = [
		{
			id: 'the-five-tenets',
			title: 'The Five Tenets of Abolitionism',
			subtitle: 'The Foundation',
			content: `
				<p class="text-xl text-parchment/90 leading-relaxed mb-8 font-body font-medium">
					Christian abolitionism is not merely the "radical wing" of the pro-life movement. It is a distinct, biblically grounded paradigm built upon five non-negotiable tenets.
				</p>
				
				<div class="space-y-8 text-parchment/80 font-body">
					<div>
						<h4 class="text-xl font-display font-bold text-gold mb-2 flex items-center gap-2">
							<span class="text-burgundy text-sm">01.</span> Biblical
						</h4>
						<p class="leading-relaxed">
							The Word of God is our absolute standard for justice. We do not rely on secular philosophy, constitutional originalism, or scientific embryology as our primary foundation, though they agree with us. We rely on the authority of Scripture, which declares that God forms children in the womb and demands justice for the oppressed.
						</p>
					</div>

					<div>
						<h4 class="text-xl font-display font-bold text-gold mb-2 flex items-center gap-2">
							<span class="text-burgundy text-sm">02.</span> Providential
						</h4>
						<p class="leading-relaxed">
							We trust God's providence over pragmatic political calculations. The pro-life movement often asks, "What can we pass right now?" Abolitionists ask, "What does God require?" We believe that duty is ours, and results are God's. We will not compromise God's law to appease political establishments or federal courts.
						</p>
					</div>

					<div>
						<h4 class="text-xl font-display font-bold text-gold mb-2 flex items-center gap-2">
							<span class="text-burgundy text-sm">03.</span> Gospel-Centered
						</h4>
						<p class="leading-relaxed">
							Abortion is not merely a human rights violation or a healthcare debate; it is the sin of child sacrifice. Therefore, the ultimate answer to abortion is not just legislation, but the Gospel of Jesus Christ. We call abortion-minded parents to repentance and offer them the grace and forgiveness found only in Christ.
						</p>
					</div>

					<div>
						<h4 class="text-xl font-display font-bold text-gold mb-2 flex items-center gap-2">
							<span class="text-burgundy text-sm">04.</span> Body-Driven
						</h4>
						<p class="leading-relaxed">
							The fight against abortion belongs to the Church, not secular lobbying organizations. The Bride of Christ must rise up, preach the truth at the clinic doors, demand justice from the legislature, and provide for families in crisis. We cannot outsource our duty to defend the fatherless.
						</p>
					</div>

					<div>
						<h4 class="text-xl font-display font-bold text-gold mb-2 flex items-center gap-2">
							<span class="text-burgundy text-sm">05.</span> Immediate & Uncompromising
						</h4>
						<p class="leading-relaxed">
							We demand the immediate, total abolition of abortion without exception or compromise. We reject incremental bills that regulate how, when, or where a child may be murdered. Justice delayed is justice denied.
						</p>
					</div>
				</div>

				<div class="mt-10 pt-8 border-t border-charcoal">
					<p class="text-sm font-ui font-bold uppercase tracking-widest text-parchment-muted mb-3">The Paradigm Shift</p>
					<p class="text-gold font-display italic text-2xl leading-relaxed">
						"To the law and to the testimony! If they do not speak according to this word, they have no light of dawn."
					</p>
					<p class="text-xs font-ui font-bold uppercase tracking-widest text-gold-muted mt-3">Isaiah 8:20</p>
				</div>
			`
		},
		{
			id: 'the-failure-of-incrementalism',
			title: 'The Error of Incrementalism',
			subtitle: 'The Regulatory Approach',
			content: `
				<p class="text-xl text-parchment/90 leading-relaxed mb-8 font-body font-medium">
					For fifty years, the pro-life establishment has utilized an incremental, regulatory strategy. This approach treats abortion as healthcare to be restricted, rather than murder to be criminalized.
				</p>
				
				<div class="space-y-8 text-parchment/80 font-body">
					<div class="bg-void border border-charcoal p-6 rounded-sm">
						<h4 class="text-xl font-display font-bold text-burgundy mb-3">The Problem with Arbitrary Lines</h4>
						<p class="leading-relaxed mb-4">
							Heartbeat bills, 15-week bans, and pain-capable acts all share a fatal flaw: they establish arbitrary lines of human value. When a legislature passes a heartbeat bill, it is legally sanctioning the murder of children younger than six weeks. It codifies into law the premise that some humans are not persons.
						</p>
						<p class="leading-relaxed text-parchment-muted italic">
							God's law demands equal weights and measures. We cannot weigh the value of a 5-week-old child differently than a 7-week-old child.
						</p>
					</div>

					<div class="bg-void border border-charcoal p-6 rounded-sm">
						<h4 class="text-xl font-display font-bold text-burgundy mb-3">Judicial Supremacy</h4>
						<p class="leading-relaxed mb-4">
							The incremental strategy bows to the doctrine of Judicial Supremacy—the false belief that the Supreme Court is the sole arbiter of constitutionality. For decades, pro-life legislators refused to pass total abolition bills, claiming "the courts won't let us." 
						</p>
						<p class="leading-relaxed">
							Abolitionists reject this. The Constitution does not grant the federal judiciary the power to mandate child sacrifice. State magistrates have a sworn duty to interpose—to place themselves between the tyrant and the victim—and defy unjust federal edicts.
						</p>
					</div>
					
					<div class="bg-void border border-charcoal p-6 rounded-sm">
						<h4 class="text-xl font-display font-bold text-burgundy mb-3">Regulating Murder</h4>
						<p class="leading-relaxed">
							Pro-life laws often regulate the width of clinic hallways, require ultrasound viewings, or mandate waiting periods. If abortion is murder, regulating it is a moral absurdity. We would never pass a law requiring a 24-hour waiting period before a man can murder his wife. We must criminalize the act, not regulate its safety.
						</p>
					</div>
				</div>

				<div class="mt-10 pt-8 border-t border-charcoal">
					<p class="text-sm font-ui font-bold uppercase tracking-widest text-parchment-muted mb-3">The Result of Compromise</p>
					<p class="text-burgundy font-display text-3xl leading-tight">
						You cannot end child sacrifice by regulating how it is performed.
					</p>
				</div>
			`
		},
		{
			id: 'the-second-victim-myth',
			title: 'The "Second Victim" Myth',
			subtitle: 'Denying Moral Agency',
			content: `
				<p class="text-xl text-parchment/90 leading-relaxed mb-8 font-body font-medium">
					The most significant dividing line between the pro-life movement and Christian abolitionism is the treatment of the mother who willfully procures an abortion.
				</p>
				
				<div class="space-y-6 text-parchment/80 font-body">
					<p class="leading-relaxed">
						Major pro-life organizations universally hold to the "Second Victim" narrative. They argue that women who obtain abortions are victims of the abortion industry, society, or difficult circumstances, and therefore should <strong>never face criminal prosecution</strong>.
					</p>
					
					<p class="leading-relaxed">
						Because of this doctrine, every major pro-life law explicitly grants immunity to the mother. If a mother hires an abortionist to kill her child, the law treats the abortionist as a criminal, but the mother as a victim.
					</p>

					<div class="my-8 border-l-4 border-gold pl-6 py-2">
						<h4 class="text-2xl font-display font-bold text-parchment mb-4">Why This Fails:</h4>
						<ul class="space-y-4">
							<li><strong>It Denies Moral Agency:</strong> It treats women as infants incapable of understanding that killing a child is wrong. This is fundamentally condescending.</li>
							<li><strong>It Prevents Justice:</strong> Under current homicide laws, hiring a hitman to kill your spouse makes you guilty of murder. The same standard must apply to hiring an abortionist.</li>
							<li><strong>It Fuels the Industry:</strong> The abortion pill (mifepristone) now accounts for over 60% of abortions. The mother administers the pill to herself. If the mother has immunity, self-managed abortions are entirely legal and untouchable.</li>
						</ul>
					</div>

					<p class="leading-relaxed">
						Abolition bills maintain standard legal defenses (like coercion or duress) for women who are truly forced into abortions against their will. But we refuse to grant blanket immunity to those who willfully shed innocent blood. Equal protection requires equal accountability.
					</p>
				</div>
			`
		},
		{
			id: 'bloodguilt-and-the-magistrate',
			title: 'Bloodguilt & The Magistrate',
			subtitle: 'The Duty of the State',
			content: `
				<p class="text-xl text-parchment/90 leading-relaxed mb-8 font-body font-medium">
					Abortion is not merely a political debate; it is a profound theological crisis that brings divine judgment upon a nation.
				</p>
				
				<div class="space-y-8 text-parchment/80 font-body">
					<div>
						<h4 class="text-2xl font-display font-bold text-parchment mb-3">The Reality of Bloodguilt</h4>
						<p class="leading-relaxed mb-4">
							Scripture teaches that when innocent blood is shed and left unpunished by the state, the land itself incurs "bloodguilt" (Numbers 35:33). God does not ignore the cries of the slaughtered. When a society legally sanctions the murder of its most vulnerable citizens, it invites the righteous wrath of a holy God.
						</p>
					</div>

					<div>
						<h4 class="text-2xl font-display font-bold text-parchment mb-3">The Role of the Magistrate</h4>
						<p class="leading-relaxed mb-4">
							Romans 13 establishes that civil government is an institution ordained by God. The magistrate (the governor, the legislator, the judge) is "God's servant for your good" and "an avenger who carries out God's wrath on the wrongdoer."
						</p>
						<p class="leading-relaxed">
							When the state licenses abortion, it inverts its divine mandate. It becomes a terror to good conduct and a protector of evil. A legislator who votes to allow abortion at 6 weeks is failing in their God-ordained duty to punish evil and protect the innocent.
						</p>
					</div>

					<div class="bg-void border-l-4 border-burgundy p-8 rounded-sm mt-6">
						<p class="text-parchment font-display text-2xl italic leading-relaxed mb-4">
							"You shall not pollute the land in which you live, for blood pollutes the land, and no atonement can be made for the land for the blood that is shed in it, except by the blood of the one who shed it."
						</p>
						<p class="text-xs font-ui font-bold uppercase tracking-widest text-parchment-muted">Numbers 35:33</p>
					</div>
				</div>
			`
		},
		{
			id: 'the-gospel-mandate',
			title: 'The Gospel Mandate',
			subtitle: 'The Only True Hope',
			content: `
				<p class="text-xl text-parchment/90 leading-relaxed mb-8 font-body font-medium">
					Political solutions alone cannot heal our land. The ultimate answer to the depravity of child sacrifice is the transformative power of the Gospel.
				</p>
				
				<div class="space-y-6 text-parchment/80 font-body">
					<p class="leading-relaxed">
						We are fighting a spiritual battle against the cosmic powers over this present darkness. Abortion is the modern altar of Molech, demanding the sacrifice of children for the sake of convenience, autonomy, and prosperity.
					</p>
					
					<p class="leading-relaxed">
						While we demand that the state fulfill its duty to establish justice, we recognize that only the blood of Jesus Christ can wash away the stain of bloodguilt. 
					</p>

					<div class="grid md:grid-cols-2 gap-6 my-8">
						<div class="bg-panel border border-charcoal p-6 rounded-sm">
							<h4 class="text-lg font-ui font-bold uppercase tracking-widest text-gold mb-3">To the Culture</h4>
							<p class="text-base leading-relaxed">
								We must preach repentance. We must stand at the doors of the clinics, offering truth, pleading for the lives of the children, and providing tangible help and adoption alternatives to mothers in crisis.
							</p>
						</div>
						<div class="bg-panel border border-charcoal p-6 rounded-sm">
							<h4 class="text-lg font-ui font-bold uppercase tracking-widest text-gold mb-3">To the Post-Abortive</h4>
							<p class="text-base leading-relaxed">
								There is no sin too great for the cross of Christ. We offer the profound hope of the Gospel to mothers and fathers who have participated in abortion: Christ offers total forgiveness and a new heart.
							</p>
						</div>
					</div>

					<p class="leading-relaxed text-lg text-parchment/90 font-medium">
						This is why abolition is a Great Commission issue. The Church must lead this fight, armed with the law of God to expose the sin, and the Gospel of Christ to save the sinner.
					</p>
				</div>
			`
		}
	];
</script>

<svelte:head>
	<title>Abolition Basics | Operation Gospel</title>
</svelte:head>

<main class="flex flex-col w-full bg-void text-parchment min-h-screen font-body">
	<!-- Page Header -->
	<section class="relative py-24 px-6 border-b border-charcoal bg-void overflow-hidden">
		<!-- Subtle background texture -->
		<div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(var(--color-gold) 1px, transparent 1px); background-size: 40px 40px;"></div>
		
		<div class="max-w-4xl mx-auto text-center relative z-10">
			<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-burgundy/30 bg-burgundy/10 text-burgundy mb-8">
				<span class="text-xs font-ui font-bold uppercase tracking-widest">Movement Ideology</span>
			</div>
			<h1 class="text-5xl md:text-7xl font-display font-black text-parchment tracking-tight mb-8 leading-tight">
				Abolition, Not Regulation
			</h1>
			<p class="text-2xl text-parchment/80 leading-relaxed font-body max-w-3xl mx-auto">
				For fifty years, the response to the greatest moral atrocity of our age has been incremental regulation. We tracked the pulse, we measured the weeks, but we failed to establish Justice. <span class="text-parchment font-bold border-b border-burgundy pb-1">Abolition is different.</span>
			</p>
		</div>
	</section>

	<!-- Interactive Deck -->
	<section class="py-24 px-6 bg-panel border-b border-charcoal">
		<div class="max-w-7xl mx-auto">
			<div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
				
				<!-- Navigation Sidebar -->
				<div class="w-full lg:w-[30%] flex flex-col gap-3 shrink-0 lg:sticky lg:top-24 lg:h-fit">
					<div class="mb-6 px-2">
						<h3 class="text-sm font-ui font-bold uppercase tracking-widest text-parchment-muted">The Core Curriculum</h3>
					</div>
					{#each steps as step, i}
						<button
							onclick={() => currentStepIndex = i}
							class="text-left p-5 rounded-sm transition-all duration-300 border-l-4 group relative overflow-hidden {currentStepIndex === i ? 'bg-void border-gold shadow-lg' : 'bg-transparent border-charcoal hover:bg-panel-elevated hover:border-parchment/30'}"
						>
							{#if currentStepIndex === i}
								<div class="absolute inset-0 bg-[radial-gradient(circle_at_right,var(--color-gold),transparent_70%)] opacity-5 pointer-events-none"></div>
							{/if}
							<div class="relative z-10">
								<div class="text-xs font-ui font-bold uppercase tracking-widest mb-2 transition-colors duration-300 {currentStepIndex === i ? 'text-gold' : 'text-parchment-muted group-hover:text-parchment/70'}">
									0{i + 1}. {step.subtitle}
								</div>
								<h3 class="text-xl font-display font-bold transition-colors duration-300 {currentStepIndex === i ? 'text-parchment' : 'text-parchment/60 group-hover:text-parchment'}">
									{step.title}
								</h3>
							</div>
						</button>
					{/each}
				</div>

				<!-- Content Area -->
				<div class="w-full lg:w-[70%] min-h-[600px]">
					{#key currentStepIndex}
						<div 
							in:fade={{ duration: 400, delay: 100 }}
							class="bg-void border border-charcoal p-8 md:p-14 rounded-sm shadow-2xl h-full flex flex-col"
						>
							<div class="mb-10 border-b border-charcoal pb-8">
								<span class="text-gold font-ui font-bold uppercase tracking-widest text-sm mb-4 block">0{currentStepIndex + 1}. {steps[currentStepIndex].subtitle}</span>
								<h2 class="text-4xl md:text-5xl font-display font-bold text-parchment leading-tight">{steps[currentStepIndex].title}</h2>
							</div>
							
							<div class="flex-1">
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html steps[currentStepIndex].content}
							</div>
							
							<div class="mt-16 pt-8 border-t border-charcoal flex justify-between items-center bg-void">
								<button 
									onclick={() => {
										currentStepIndex = Math.max(0, currentStepIndex - 1);
										window.scrollTo({ top: 300, behavior: 'smooth' });
									}}
									class="text-xs font-ui font-bold uppercase tracking-widest text-parchment-muted hover:text-parchment transition-colors {currentStepIndex === 0 ? 'invisible' : ''}"
								>
									&larr; Previous Concept
								</button>
								
								{#if currentStepIndex < steps.length - 1}
									<button 
										onclick={() => {
											currentStepIndex = Math.min(steps.length - 1, currentStepIndex + 1);
											window.scrollTo({ top: 300, behavior: 'smooth' });
										}}
										class="text-xs font-ui font-bold uppercase tracking-widest text-gold hover:text-gold-light transition-colors flex items-center gap-2"
									>
										Next Concept &rarr;
									</button>
								{:else}
									<a 
										href="{base}/georgia-battle"
										class="btn btn-primary text-xs px-6 py-3"
									>
										Apply This to Georgia
									</a>
								{/if}
							</div>
						</div>
					{/key}
				</div>
				
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="py-32 px-6 bg-void text-center relative overflow-hidden">
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none opacity-5">
			<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-burgundy),transparent_70%)]"></div>
		</div>

		<div class="max-w-3xl mx-auto relative z-10">
			<h2 class="text-4xl md:text-5xl font-display font-bold text-parchment mb-8">Ready to take a stand?</h2>
			<p class="text-xl text-parchment/70 font-body mb-12 leading-relaxed">
				Understanding the difference between regulation and abolition is the first step. The next is action. See how these principles are being applied right now in the Georgia legislature.
			</p>
			<div class="flex flex-col sm:flex-row gap-6 justify-center">
				<a href="{base}/georgia-battle" class="btn btn-primary text-base px-10 py-4 shadow-[0_0_30px_rgba(114,47,55,0.4)]">
					The Georgia Battle
				</a>
				<a href="{base}/join" class="btn btn-ghost text-base px-10 py-4">
					Join the Movement
				</a>
			</div>
		</div>
	</section>
</main>
