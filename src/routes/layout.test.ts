import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import type { Snippet } from 'svelte';
import Layout from './+layout.svelte';

// Mock SvelteKit state/modules
vi.mock('$app/state', () => ({
	page: { url: { pathname: '/' } }
}));

vi.mock('$app/paths', () => ({
	base: ''
}));

// Helper to create valid snippet for testing
const createSnippet = (): Snippet<[]> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (() => {}) as any;
};

describe('Global Navigation', () => {
	it('displays the correct navigation labels', () => {
		render(Layout, { props: { children: createSnippet() } });

		// Nav items appear in footer
		expect(screen.getAllByText('Join the Fight').length).toBeGreaterThanOrEqual(1);
	});

	it('navigation links point to the correct routes', () => {
		render(Layout, { props: { children: createSnippet() } });

		const footer = screen.getByRole('contentinfo');
		const links = footer.querySelectorAll('a');

		// Check for expected routes in footer
		const hrefs = Array.from(links).map((l) => l.getAttribute('href'));
		expect(
			hrefs.some((h) => h?.includes('/georgia-battle') || h === '/georgia-battle')
		).toBeTruthy();
	});
});

describe('Footer Redesign', () => {
	it('displays the generic copyright text', () => {
		render(Layout, { props: { children: createSnippet() } });

		expect(
			screen.getByText(/Establishing Justice for the Pre-born in Georgia/i)
		).toBeInTheDocument();
	});

	it('displays simplified footer navigation links', () => {
		render(Layout, { props: { children: createSnippet() } });

		const footer = screen.getByRole('contentinfo');

		// Ensure headers like "Mobilize" are NOT present
		expect(screen.queryByText('Mobilize')).not.toBeInTheDocument();
		expect(screen.queryByText('Connect')).not.toBeInTheDocument();
		expect(screen.queryByText('Educate')).not.toBeInTheDocument();
	});
});
