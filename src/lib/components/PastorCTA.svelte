<script lang="ts">
    // This is a presentation component, no logic needed here.
    // In a real app, you might have a store or context to dispatch an action.
    function handlePastorCtaClick() {
        // This is a placeholder. In a real app, you'd want to scroll to the form
        // and pre-select the "pastor/elder" interest.
        // This can be done via a shared store or by dispatching a custom event.
        const form = document.getElementById('join-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth' });
            // You would also need a way to communicate to the form to check the box.
        }
    }
</script>

<div class="bg-panel/80 backdrop-blur-sm border-l-4 border-crimson p-6 shadow-lg rounded-r-lg">
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
            <h2 class="text-xl font-serif font-bold text-bone uppercase tracking-wide mb-2">Are you a Pastor?</h2>
            <p class="text-bone/70 text-sm">Join our network of abolitionist churches. We provide resources, training, and support for your congregation.</p>
        </div>
        <button
            onclick={handlePastorCtaClick}
            class="bg-bone text-charcoal hover:bg-white font-bold px-6 py-3 rounded-md uppercase tracking-wider whitespace-nowrap text-sm transition-colors"
        >
            Add Your Church
        </button>
    </div>
</div>
