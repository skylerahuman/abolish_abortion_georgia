<script lang="ts">
	let openFaq = $state<number | null>(null);
	
	const faqs = [
		{
			question: 'What is "equal protection"?',
			answer: 'Today there is a bill stalled out in our Georgia legislation which would properly categorize abortion under existing homicide laws. It would give the same rights you receive as a born person to your unborn neighbor.\n\nGeorgia General Assembly – H.B. 441'
		},
		{
			question: 'What would the law do?',
			answer: 'The law would equate current legal penalties against the murder of a born child to an unborn child. If we truly believe that an unborn person is made in the image of God, then we need to be consistent with God\'s Word and the Constitution.\n\nSource: Foundation to Abolish Abortion'
		},
		{
			question: 'Does the bill criminalize women?',
			answer: 'No. The bill criminalizes the act of anyone knowingly and willfully engaging in prenatal homicide.\n\nSource: Foundation to Abolish Abortion'
		},
		{
			question: 'What about cases of rape and incest?',
			answer: 'The vast majority of abortions are voluntary, with less than 3% due to rape and incest. Thus, asking about rape and incest forces us to confront the reality that we object to violating another person\'s body. Violating the body of another is exactly what happens during an abortion and no child should be killed for the crime of the father.\n\nSource: 10 Pro-Life Arguments'
		},
		{
			question: 'What about "my body, my choice"?',
			answer: 'The body inside of the woman\'s body is not her body. If abortion was about the mother\'s body, then she would be the one that dies and not the baby!\n\nSource: 10 Pro-Life Arguments'
		},
		{
			question: 'What about the quality of life of the mother or child? Or poverty situations?',
			answer: 'Abortion advocates often appeal to dire situations to make their case in order to tug at the heart. This argument is absurd. Should mothers and fathers be allowed to simply kill their children if times are tough?\n\nSource: 10 Pro-Life Arguments'
		},
		{
			question: 'What about contraceptives?',
			answer: 'An equal protection bill does not ban contraceptives (i.e. drugs or devices to prevent fertilization). Instead, abortifacients are banned when used to knowingly and willfully cause the death of the child.\n\nSource: Foundation to Abolish Abortion'
		},
		{
			question: 'Isn\'t a fetus only a cluster of cells?',
			answer: 'All human life is made up clumps of cells. The Latin word "fetus" means "little one," referring to the relatively small size of the preborn baby. So, a baby is still a baby regardless of what we call them. It is biologically indisputable that a unique human life exists from the moment of fertilization.\n\nSource: 10 Pro-Life Arguments'
		},
		{
			question: 'What about ectopic pregnancies?',
			answer: 'The National Health Service webpage dedicated to ectopic pregnancy information states, "The baby cannot be saved in an ectopic pregnancy." Almost all medical groups and government medical bureaucracies echo this malicious falsehood. The medical literature confirms that misdiagnosing ectopic pregnancy is quite common, and even if the diagnosis is accurate, there is much evidence that the tubal-implanted embryo can naturally detach and reattach in a safer location.\n\nFor example, a 1982 article by Dr. J. F. Clark entitled "Embryo Transfer In Vivo" demonstrated that, in a tubal pregnancy, the rupture of the fallopian tube does not kill the preborn child. In many cases, the child will detach from the ruptured tube on his own and reattach on another surface in the pelvis or abdominal cavity. This has made it possible for a significant number of tubal pregnancies to result in live births.\n\nSource: Dr. Patrick Johnston, Celebrate Life Magazine'
		},
		{
			question: 'Aren\'t women the only people that can effectively talk about abortion?',
			answer: 'Truth is objective. This argument attempts to steer the conversation away from the horror of abortion by focusing on the speaker rather than the crime.\n\nSource: 10 Pro-Life Arguments'
		},
		{
			question: 'Could the bill punish women who have had miscarriages?',
			answer: 'An equal protection bill does not apply to accidental or natural deaths. Existing Georgia law also already has a provision that would prevent prosecution of miscarriages (§16-2-2, "Effect of misfortune or accident on guilt").\n\nSource: Foundation to Abolish Abortion'
		}
	];
	
	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}
</script>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<h1 class="text-4xl font-bold text-bone mb-4">Frequently Asked Questions</h1>
	<p class="text-bone/70 mb-12 text-lg">
		Find answers to common questions about equal protection and HB 441.
	</p>
	
	<div class="space-y-4">
		{#each faqs as faq, i}
			<div class="bg-panel rounded-lg shadow-md overflow-hidden border border-white/10">
				<button
					onclick={() => toggleFaq(i)}
					class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors duration-200"
				>
					<span class="text-lg font-semibold text-bone pr-4">
						{faq.question}
					</span>
					<svg
						class="w-6 h-6 text-crimson flex-shrink-0 transform transition-transform duration-200 {openFaq === i ? 'rotate-180' : ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
					</svg>
				</button>
				
				{#if openFaq === i}
					<div class="px-6 pb-4 text-bone/70 whitespace-pre-line">
						{faq.answer}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
