<script lang="ts">
    import { base } from '$app/paths';
</script>

<svelte:head>
    <title>The Standard | Abolition Georgia</title>
</svelte:head>

<div class="bg-black text-white min-h-screen py-12 font-sans selection:bg-red-900 selection:text-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
                The Standard of Justice
            </h1>
            <div class="h-1 w-24 bg-red-600 mx-auto"></div>
            <p class="mt-6 text-xl text-neutral-400 max-w-2xl mx-auto">
                HB 441 applies existing Georgia homicide law to the unborn. No exceptions, no arbitrary timelines.
            </p>
        </div>

        <!-- Core Concept -->
        <div class="bg-neutral-900/50 rounded-lg border border-neutral-800 mb-12">
            <div class="p-8 md:p-12">
                <h2 class="text-2xl font-bold text-red-600 uppercase tracking-widest mb-6">What HB 441 Does</h2>
                <div class="prose prose-invert prose-lg text-neutral-300">
                    <p class="mb-4">
                        Current Georgia law: If you kill a born person, it is murder. Kill an unborn person? Often treated as a legal non-event.
                    </p>
                    <p class="mb-4">
                        HB 441 removes that distinction. It asserts that from fertilization, a human being exists and deserves the same legal protection as any other person.
                    </p>
                    <p>
                        This is not new law. It is the application of existing law to a class of persons currently excluded.
                    </p>
                </div>
            </div>
        </div>

        <!-- Comparison Grid -->
        <div class="grid md:grid-cols-2 gap-8 mb-16">
            <div class="bg-neutral-950 p-8 rounded-lg border-l-4 border-red-900">
                <h3 class="text-xl font-bold uppercase tracking-widest mb-4 text-red-700">Current Law (Heartbeat)</h3>
                <ul class="space-y-4 text-sm text-neutral-400">
                    <li class="flex gap-3">
                        <span class="text-red-700 font-bold">X</span>
                        <span>Protects only after a "heartbeat" is detected.</span>
                    </li>
                    <li class="flex gap-3">
                        <span class="text-red-700 font-bold">X</span>
                        <span>Allows killing based on age or circumstances.</span>
                    </li>
                    <li class="flex gap-3">
                        <span class="text-red-700 font-bold">X</span>
                        <span>Grants immunity to those who perform abortions.</span>
                    </li>
                </ul>
            </div>

            <div class="bg-neutral-900 p-8 rounded-lg border-l-4 border-green-800">
                <h3 class="text-xl font-bold uppercase tracking-widest mb-4 text-green-600">HB 441 (Equal Protection)</h3>
                <ul class="space-y-4 text-sm text-neutral-300">
                    <li class="flex gap-3">
                        <span class="text-green-600 font-bold">V</span>
                        <span>Protects from the moment of fertilization.</span>
                    </li>
                    <li class="flex gap-3">
                        <span class="text-green-600 font-bold">V</span>
                        <span>The penalty for killing a preborn child matches the penalty for killing a born child.</span>
                    </li>
                    <li class="flex gap-3">
                        <span class="text-green-600 font-bold">V</span>
                        <span>No exceptions based on circumstances of conception.</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- CTA -->
        <div class="text-center">
            <h3 class="text-2xl font-bold text-white mb-6">Does your Representative support equal protection?</h3>
            <a href="{base}/get-involved" class="text-red-500 font-bold uppercase tracking-widest text-sm border-b border-red-900 hover:text-red-400 hover:border-red-500 transition-all pb-1">
                Find Your Rep &rarr;
            </a>
        </div>
    </div>
</div>
