<script lang="ts">
	import { slide } from 'svelte/transition';

	let openFaq = $state<number | null>(null);

	const faqs = [
		{
			question: 'What is "equal protection"?',
			answer:
				'Equal protection is the legal and moral principle that the laws protecting born people from homicide must also protect pre-born people. HB 441 was a bill introduced in the Georgia legislature to categorize abortion under existing homicide laws. It sought to give the same rights you receive as a born person to your unborn neighbor.',
			sources: [
				{
					text: 'Georgia General Assembly: HB 441',
					url: 'https://www.legis.ga.gov/legislation/64388'
				}
			]
		},
		{
			question: 'What would the law do?',
			answer:
				"HB 441 would have equated current legal penalties for the murder of a born child to the murder of an unborn child. The Fourteenth Amendment guarantees equal protection under the law to all persons. Abolitionists argue this constitutional protection must extend to pre-born humans, ensuring they receive the same justice as any other person.",
			sources: [
				{
					text: 'Georgia General Assembly: HB 441',
					url: 'https://www.legis.ga.gov/legislation/64388'
				},
				{
					text: 'U.S. Constitution: Fourteenth Amendment',
					url: 'https://www.archives.gov/milestone-documents/14th-amendment'
				}
			]
		},
		{
			question: 'Does the bill criminalize women?',
			answer:
				'The bill criminalizes the act of knowingly and willfully engaging in prenatal homicide. However, HB 441 includes a coercion defense for mothers. This recognizes that women can be pressured or forced into abortions. It does not provide blanket immunity. This ensures that those who willingly procure or perform abortions face justice.',
			sources: [
				{
					text: 'Georgia General Assembly: HB 441',
					url: 'https://www.legis.ga.gov/legislation/64388'
				}
			]
		},
		{
			question: 'What about cases of rape and incest?',
			answer:
				'The vast majority of abortions are voluntary. Research shows approximately 1% of abortions are due to rape and less than 0.5% are due to incest. Violating the body of another is exactly what happens during an abortion. No child should be killed for the crime of his or her father.',
			sources: [
				{
					text: 'Guttmacher Institute: Reasons U.S. Women Have Abortions',
					url: 'https://www.guttmacher.org/journals/psrh/2005/reasons-us-women-have-abortions-quantitative-and-qualitative-perspectives'
				}
			]
		},
		{
			question: 'What about "my body, my choice"?',
			answer:
				"The body inside of the woman is not her own body. A pre-born child has unique DNA, a distinct blood type, and a separate heartbeat. If abortion was about the mother's body, she would be the one who dies.",
			sources: [
				{
					text: 'MedlinePlus: Fetal Development',
					url: 'https://medlineplus.gov/ency/article/002398.htm'
				}
			]
		},
		{
			question: 'What about poverty or difficult life circumstances?',
			answer:
				'While financial hardship is a reality for many, economic difficulties do not justify the taking of a human life. Research shows that financial concerns are a leading reason women seek abortions. However, human rights belong to all people regardless of their socioeconomic status. The same standard of protection against violence must apply to both born and pre-born children.',
			sources: [
				{
					text: 'Guttmacher Institute: Reasons U.S. Women Have Abortions',
					url: 'https://www.guttmacher.org/journals/psrh/2005/reasons-us-women-have-abortions-quantitative-and-qualitative-perspectives'
				},
				{
					text: 'U.S. Constitution: Fourteenth Amendment',
					url: 'https://www.archives.gov/milestone-documents/14th-amendment'
				}
			]
		},
		{
			question: 'What about contraceptives?',
			answer:
				'An equal protection bill does not ban contraceptives used to prevent fertilization. It targets abortifacients. These are substances or devices used to knowingly and willfully cause the death of an already developing human being.',
			sources: [
				{
					text: 'Georgia General Assembly: HB 441',
					url: 'https://www.legis.ga.gov/legislation/64388'
				}
			]
		},
		{
			question: "Isn't a fetus only a cluster of cells?",
			answer:
				'All human life is made up of clusters of cells. The Latin word "fetus" translates to "little one" or "offspring." A unique human life with its own distinct DNA exists from the moment of fertilization.',
			sources: [
				{
					text: 'Merriam-Webster: Fetus',
					url: 'https://www.merriam-webster.com/dictionary/fetus'
				},
				{
					text: 'MedlinePlus: Fetal Development',
					url: 'https://medlineplus.gov/ency/article/002398.htm'
				}
			]
		},
		{
			question: 'What about ectopic pregnancies?',
			answer:
				"An ectopic pregnancy is a life-threatening medical emergency where the embryo implants outside the uterus. The embryo cannot survive. Treating an ectopic pregnancy to save the life of the mother is not an abortion. The intent of the medical procedure is to save the mother's life when the child cannot be saved, not to intentionally kill a developing child. Standard life-saving medical care is always protected.",
			sources: [
				{
					text: 'MedlinePlus: Ectopic Pregnancy',
					url: 'https://medlineplus.gov/ency/article/000895.htm'
				}
			]
		},
		{
			question: 'Could the bill punish women who have had miscarriages?',
			answer:
				'An equal protection bill does not apply to accidental or natural deaths. Existing Georgia law already includes a provision that prevents prosecution for miscarriages and accidental deaths.',
			sources: [
				{
					text: 'Georgia Code § 16-2-2',
					url: 'https://casetext.com/statute/code-of-georgia/title-16-crimes-and-offenses/chapter-2-criminal-liability/article-1-culpability/section-16-2-2-effect-of-misfortune-or-accident-on-guilt'
				}
			]
		},
		{
			question: 'What is the difference between Abolition and Pro-Life?',
			answer:
				'The pro-life establishment often supports compromises, such as heartbeat bills or regulations that dictate how and when a child can be killed. Abolitionists demand equal protection under the law for all pre-born children from the moment of fertilization without exception or compromise.',
			sources: [
				{
					text: 'Free the States: What is an Abolitionist?',
					url: 'https://freethestates.org/what-is-an-abolitionist/'
				}
			]
		},
		{
			question: 'Does this law affect IVF (In Vitro Fertilization)?',
			answer:
				'Equal protection requires that human embryos created through IVF receive the same legal protection as any other human being. While it does not ban IVF outright, it prohibits the intentional destruction or discarding of human embryos.',
			sources: [
				{
					text: 'Georgia General Assembly: HB 441',
					url: 'https://www.legis.ga.gov/legislation/64388'
				}
			]
		},
		{
			question: 'What about the life of the mother?',
			answer:
				'Standard medical care to save the life of the mother is not classified as abortion under equal protection laws. This includes treating an ectopic pregnancy or addressing a life-threatening complication. The intent is to save a life, not to intentionally end one.',
			sources: [
				{
					text: 'Georgia General Assembly: HB 441',
					url: 'https://www.legis.ga.gov/legislation/64388'
				}
			]
		},
		{
			question: 'Why target the state level instead of the federal level?',
			answer:
				'The federal courts do not write state homicide laws. States have the sovereign authority and duty to criminalize murder within their own borders. Abolitionists call on state legislators to fulfill their constitutional duty to provide equal protection. They must do this regardless of federal court opinions.',
			sources: [
				{
					text: 'U.S. Constitution: Tenth Amendment',
					url: 'https://www.archives.gov/founding-docs/bill-of-rights-transcript'
				}
			]
		},
		{
			question: "Aren't women the only people that can effectively talk about abortion?",
			answer:
				'Truth is objective and does not depend on the identity of the speaker. Dismissing an argument based on someone\'s gender is a logical fallacy known as the circumstantial ad hominem. The reality of what abortion is remains unchanged regardless of who is speaking. Every person has a moral and civic duty to advocate for the human rights of those who cannot speak for themselves.',
			sources: [
				{
					text: 'Purdue OWL: Logical Fallacies',
					url: 'https://owl.purdue.edu/owl/general_writing/academic_writing/logic_in_argumentative_writing/fallacies.html'
				},
				{
					text: 'Declaration of Independence',
					url: 'https://www.archives.gov/founding-docs/declaration-transcript'
				}
			]
		}
	];

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}
</script>

<svelte:head>
	<title>FAQs | Abolish Abortion Georgia</title>
	<meta name="description" content="Clear, fact-checked answers about equal protection, HB 441, and abolishing abortion in Georgia." />
</svelte:head>

<div class="min-h-[85vh] py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
	<!-- Background Elements for Grounding -->
	<div class="absolute inset-0 z-0 pointer-events-none opacity-20">
		<div class="absolute top-0 left-1/4 w-96 h-96 bg-burgundy/20 rounded-full blur-[120px]"></div>
		<div class="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px]"></div>
	</div>

	<div class="max-w-4xl mx-auto relative z-10">
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl font-display font-bold text-bone mb-6 tracking-tight">Frequently Asked Questions</h1>
			<p class="text-bone/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-body">
				Find clear, factual answers about equal protection, HB 441, and the fight to abolish abortion in Georgia.
			</p>
		</div>

		<div class="bg-panel rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
			{#each faqs as faq, i}
				<div class="border-b border-white/10 last:border-0 relative">
					<!-- Active state grounding border -->
					{#if openFaq === i}
						<div class="absolute left-0 top-0 bottom-0 w-1 bg-burgundy" transition:slide={{ axis: 'x', duration: 200 }}></div>
					{/if}

					<button
						onclick={() => toggleFaq(i)}
						class="w-full px-6 md:px-8 py-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors duration-200 focus:outline-none focus-visible:bg-white/5"
						aria-expanded={openFaq === i}
					>
						<span class="text-lg md:text-xl font-display font-semibold text-bone pr-6 leading-snug">
							{faq.question}
						</span>
						<div class="shrink-0 ml-2 text-gold transition-transform duration-300 {openFaq === i ? 'rotate-180' : ''}">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</button>

					{#if openFaq === i}
						<div transition:slide={{ duration: 300 }} class="px-6 md:px-8 pb-8">
							<div class="text-bone/80 whitespace-pre-line text-base md:text-lg leading-relaxed mb-6 pt-2 font-body">
								{faq.answer}
							</div>

							{#if faq.sources && faq.sources.length > 0}
								<div class="bg-void/60 rounded-lg p-5 border border-white/5 shadow-inner">
									<h4 class="text-xs font-ui font-semibold text-gold/80 uppercase tracking-wider mb-4 flex items-center gap-2">
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										Verified Sources
									</h4>
									<ul class="space-y-3">
										{#each faq.sources as source}
											<li>
												<a
													href={source.url}
													target="_blank"
													rel="noopener noreferrer"
													class="inline-flex items-start gap-2.5 text-sm font-ui text-bone/60 hover:text-gold transition-colors duration-200 group"
												>
													<svg class="w-4 h-4 mt-0.5 shrink-0 opacity-40 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
													</svg>
													<span class="underline decoration-white/20 underline-offset-4 group-hover:decoration-gold/50">{source.text}</span>
												</a>
											</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>