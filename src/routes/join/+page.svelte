<script lang="ts">
    import JoinForm from '$lib/components/JoinForm.svelte';
    import Map from '$lib/components/Map.svelte';
    import PastorCTA from '$lib/components/PastorCTA.svelte';
</script>

<svelte:head>
    <title>Operation Gospel - Join the Fight</title>
</svelte:head>

<div class="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 p-2 items-stretch h-full">
    <!-- Left Column (Form) -->
    <div class="md:col-span-2 flex flex-col">
        <JoinForm />
    </div>
    <!-- Right Column (Map & CTA) -->
    <div class="md:col-span-3 flex flex-col gap-4">
        <div class="flex-1 min-h-[240px]">
            <Map />
        </div>
        <PastorCTA />
    </div>
</div>
