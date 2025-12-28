<script lang="ts">
    import { base } from '$app/paths';
</script>

<svelte:head>
    <title>What is HB 441? | Abolish Abortion Georgia</title>
</svelte:head>

<div class="bg-stone-50 min-h-screen py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight mb-4">
                The Georgia Equal Protection Act
            </h1>
            <div class="h-1 w-24 bg-red-600 mx-auto"></div>
            <p class="mt-6 text-xl text-stone-600 max-w-2xl mx-auto">
                HB 441 is not just another pro-life regulation. It is a demand for justice.
            </p>
        </div>

        <!-- Core Concept -->
        <div class="bg-white rounded-lg shadow-xl overflow-hidden mb-12 border border-stone-200">
            <div class="p-8 md:p-12">
                <h2 class="text-2xl font-bold text-red-700 uppercase tracking-widest mb-6">The Core Doctrine</h2>
                <div class="prose prose-lg text-stone-700">
                    <p class="mb-4">
                        The <strong>Georgia Equal Protection Act (HB 441)</strong> seeks to do one simple thing: apply the existing laws against homicide to the unborn, without exception.
                    </p>
                    <p class="mb-4">
                        Under current Georgia law, if you kill a born person, it is murder. If you kill an unborn person, it is often treated as "healthcare" or a "choice," regulated by arbitrary timelines (heartbeat, 20 weeks, etc.).
                    </p>
                    <p>
                        HB 441 removes the loopholes. It asserts that from the moment of fertilization, a human being is a person made in the image of God, deserving of the exact same legal protection as you or I.
                    </p>
                </div>
            </div>
        </div>

        <!-- Comparison Grid -->
        <div class="grid md:grid-cols-2 gap-8 mb-16">
            <div class="bg-neutral-900 text-white p-8 rounded-lg border-l-4 border-red-600">
                <h3 class="text-xl font-bold uppercase tracking-widest mb-4 text-red-500">Regulation (Status Quo)</h3>
                <ul class="space-y-4 text-sm text-gray-300">
                    <li class="flex gap-3">
                        <span class="text-red-500 font-bold">✗</span>
                        <span><strong>Arbitrary Lines:</strong> Protects life only after a "heartbeat" is detected.</span>
                    </li>
                    <li class="flex gap-3">
                        <span class="text-red-500 font-bold">✗</span>
                        <span><strong>Discrimination:</strong> Allows killing based on age (pre-heartbeat) or method.</span>
                    </li>
                    <li class="flex gap-3">
                        <span class="text-red-500 font-bold">✗</span>
                        <span><strong>Immunity:</strong> Often grants immunity to those who solicit or perform the killing.</span>
                    </li>
                </ul>
            </div>
            
            <div class="bg-white p-8 rounded-lg shadow-lg border-l-4 border-green-600">
                <h3 class="text-xl font-bold uppercase tracking-widest mb-4 text-green-700">Abolition (HB 441)</h3>
                <ul class="space-y-4 text-sm text-stone-700">
                    <li class="flex gap-3">
                        <span class="text-green-600 font-bold">✓</span>
                        <span><strong>Total Protection:</strong> Protects life from the moment of fertilization.</span>
                    </li>
                    <li class="flex gap-3">
                        <span class="text-green-600 font-bold">✓</span>
                        <span><strong>Equal Justice:</strong> The penalty for killing a pre-born child is the same as killing a born child.</span>
                    </li>
                    <li class="flex gap-3">
                        <span class="text-green-600 font-bold">✓</span>
                        <span><strong>No Compromise:</strong> Rejects the idea that abortion is ever "healthcare."</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- CTA -->
        <div class="text-center">
            <h3 class="text-2xl font-bold text-neutral-900 mb-6">Does your Representative support Equal Protection?</h3>
            <a href="{base}/who-do-i-call" class="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-colors uppercase tracking-widest">
                Find Out & Take Action
            </a>
        </div>
    </div>
</div>
