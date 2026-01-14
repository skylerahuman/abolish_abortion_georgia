<script lang="ts">
	import { base } from '$app/paths';
</script>

<!-- Hero Section -->
<section class="relative py-32 px-4 bg-neutral-950 border-b border-red-900/20 overflow-hidden">
	<!-- Background Image & Overlay -->
	<div class="absolute inset-0 z-0 select-none">
		<img
			src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop"
			alt="Sunrise over mountains"
			class="w-full h-full object-cover opacity-30"
		/>
		<div class="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/60 to-neutral-950"></div>
	</div>

	<div class="relative z-10 max-w-5xl mx-auto text-center">
		<h2 class="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight mb-8 drop-shadow-lg leading-tight">
			<span class="text-red-500 block mb-2 text-3xl md:text-4xl font-sans font-bold uppercase tracking-widest">Explicitly Christian</span>
			<span class="block text-neutral-100">Extremely Prophetic</span>
			<span class="block text-red-100/90 mt-2">Ending Child Sacrifice</span>
		</h2>
		<p class="text-lg md:text-xl text-neutral-300 leading-relaxed mb-12 max-w-3xl mx-auto font-light">
			For five decades, the response to the greatest moral atrocity of our age has been incremental regulation. 
			We tracked the pulse, we measured the weeks, but we failed to establish <strong class="text-white font-semibold">Justice</strong>.
			This timeline chronicles the journey from the darkness of <em>Roe</em> to the rising light of the <strong class="text-white font-semibold">Equal Protection</strong> movement.
		</p>

		<div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
			<div class="p-8 rounded-lg border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm text-left hover:border-red-500/30 transition-all duration-300 group">
				<h3 class="font-sans font-bold text-red-400 uppercase text-xs tracking-[0.2em] mb-3 group-hover:text-red-300 transition-colors">The Goal</h3>
				<p class="text-base text-neutral-300 leading-relaxed font-serif">To criminalize abortion as homicide, providing equal protection under the 14th Amendment to the pre-born.</p>
			</div>
			<div class="p-8 rounded-lg border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm text-left hover:border-neutral-600 transition-all duration-300 group">
				<h3 class="font-sans font-bold text-white uppercase text-xs tracking-[0.2em] mb-3 group-hover:text-neutral-200 transition-colors">The Hope</h3>
				<p class="text-base text-neutral-300 leading-relaxed font-serif">The Gospel of Jesus Christ, which commands us to rescue those being led away to death (Proverbs 24:11).</p>
			</div>
		</div>
	</div>
</section>

<!-- Our Mission Section -->
<section class="py-24 px-4 bg-white text-neutral-900 relative overflow-hidden">
    <!-- Subtle pattern or texture could go here -->
    <div class="max-w-4xl mx-auto text-center relative z-10">
        <h2 class="text-4xl font-serif font-bold text-neutral-900 tracking-tight mb-10">Our Mission</h2>
        <p class="text-xl md:text-2xl font-serif leading-relaxed text-neutral-700">
            Our mission at Operation Gospel is one and the same as the mission of our Lord and our God, through a sound and bold proclamation of the Gospel the knowledge of the glory of God would cover the earth as the waters cover the sea. We are committed to informing, equipping and encouraging the Church that she might once again become faithful and fulfill her duty and privilege as soldier pilgrims, to take dominion for King Jesus.
        </p>
    </div>
</section>

<!-- Ministry Focus Cards -->
<section class="py-24 bg-neutral-950 relative">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950 opacity-50"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 class="text-4xl font-serif font-bold text-white tracking-tight mb-16 text-center">Our Focus</h2>
        <div class="grid md:grid-cols-3 gap-8">

            <!-- Legislation Engagement -->
            <a href="{base}/timeline" class="block bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-xl hover:bg-neutral-900 hover:border-red-800/50 transition-all duration-300 group shadow-lg hover:shadow-red-900/10 hover:-translate-y-1">
                <div class="mb-6 inline-block p-3 rounded-lg bg-red-900/20 text-red-500 group-hover:bg-red-900/30 group-hover:text-red-400 transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                </div>
                <h3 class="text-2xl font-serif font-bold text-white mb-4 group-hover:text-red-400 transition-colors">Legislation Engagement</h3>
                <div class="space-y-4 text-neutral-400 text-base leading-relaxed font-sans">
                    <p class="font-medium text-neutral-200">Roe is over. Equal Protection Laws Matter.</p>
                    <p>The Christian Church must pursue biblical justice to put an end to child sacrifice.</p>
                </div>
                <div class="mt-8 flex items-center text-red-500 text-xs font-bold uppercase tracking-widest">
                    <span class="group-hover:mr-2 transition-all">Learn More</span>
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
            </a>

            <!-- Abolition with Evangelism -->
            <a href="{base}/abolition-basics" class="block bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-xl hover:bg-neutral-900 hover:border-red-800/50 transition-all duration-300 group shadow-lg hover:shadow-red-900/10 hover:-translate-y-1">
                 <div class="mb-6 inline-block p-3 rounded-lg bg-red-900/20 text-red-500 group-hover:bg-red-900/30 group-hover:text-red-400 transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                </div>
                <h3 class="text-2xl font-serif font-bold text-white mb-4 group-hover:text-red-400 transition-colors">Abolition with Evangelism</h3>
                <div class="space-y-4 text-neutral-400 text-base leading-relaxed font-sans">
                    <p>Through partnerships with two full-time evangelists, we are taking the Gospel to child sacrifice centers across GA.</p>
                    <p>We not only condemn the sin of murder, we preach forgiveness in Christ. We also provide blessing bags, baby showers, adoptive services, and counseling for mothers and fathers who chose life.</p>
                </div>
                 <div class="mt-8 flex items-center text-red-500 text-xs font-bold uppercase tracking-widest">
                    <span class="group-hover:mr-2 transition-all">Learn More</span>
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
            </a>

            <!-- Local Churches -->
            <a href="{base}/near-me" class="block bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-xl hover:bg-neutral-900 hover:border-red-800/50 transition-all duration-300 group shadow-lg hover:shadow-red-900/10 hover:-translate-y-1">
                 <div class="mb-6 inline-block p-3 rounded-lg bg-red-900/20 text-red-500 group-hover:bg-red-900/30 group-hover:text-red-400 transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h3 class="text-2xl font-serif font-bold text-white mb-4 group-hover:text-red-400 transition-colors">Local Churches</h3>
                <div class="space-y-4 text-neutral-400 text-base leading-relaxed font-sans">
                    <p>We work with local churches to equip them in similar outreach programs to fulfill the Great Commission.</p>
                </div>
                 <div class="mt-8 flex items-center text-red-500 text-xs font-bold uppercase tracking-widest">
                    <span class="group-hover:mr-2 transition-all">Join the Network</span>
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
            </a>

        </div>
    </div>
</section>
