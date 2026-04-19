<script lang="ts">
	import { page } from '$app/state';

	interface NavItem {
		label: string;
		href: string;
		description?: string;
	}

	interface Props {
		title: string;
		items: NavItem[];
	}

	let { title, items }: Props = $props();

	function isActive(href: string): boolean {
		return page.url.pathname === href || page.url.pathname === href + '/';
	}
</script>

<aside class="w-full md:w-64 flex-shrink-0">
	<div class="sticky top-24">
		<h3 class="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4 pb-2 border-b border-neutral-800">
			{title}
		</h3>
		<nav class="space-y-1">
			{#each items as item}
				<a
					href={item.href}
					class="block px-4 py-3 rounded text-sm transition-all duration-150
						{isActive(item.href)
						? 'bg-crimson/20 text-crimson border-l-2 border-crimson -ml-[2px]'
						: 'text-neutral-400 hover:text-paper hover:bg-neutral-800/50'}"
				>
					<span class="font-medium">{item.label}</span>
					{#if item.description}
						<span class="block text-xs text-neutral-500 mt-0.5">{item.description}</span>
					{/if}
				</a>
			{/each}
		</nav>
	</div>
</aside>
