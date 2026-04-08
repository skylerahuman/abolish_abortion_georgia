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

describe('Global Navigation', () => {
	it('displays the correct navigation labels', () => {
		// Svelte 5 requires Snippet type for children
		const mockChildren: Snippet<[]> = () => {};
		render(Layout, { props: { children: mockChildren } });

		// Nav items appear in footer
		expect(screen.getAllByText('Join the Fight').length).toBeGreaterThanOrEqual(1);
	});

	it('navigation links point to the correct routes', () => {
		const mockChildren: Snippet<[]> = () => {};
		render(Layout, { props: { children: mockChildren } });

		const footer = screen.getByRole('contentinfo');
		const links = footer.querySelectorAll('a');

		// Check for expected routes in footer
		const hrefs = Array.from(links).map((l) => l.getAttribute('href'));
		expect(hrefs.some((h) => h?.includes('/georgia-battle') || h === '/georgia-battle')).toBeTruthy();
	});
});

describe('Footer Redesign', () => {
	it('displays the generic copyright text', () => {
		const mockChildren: Snippet<[]> = () => {};
		render(Layout, { props: { children: mockChildren } });

		expect(screen.getByText(/Establishing Justice for the Pre-born in Georgia/i)).toBeInTheDocument();
	});

	it('displays simplified footer navigation links', () => {
		const mockChildren: Snippet<[]> = () => {};
		render(Layout, { props: { children: mockChildren } });

		const footer = screen.getByRole('contentinfo');

		// Ensure headers like "Mobilize" are NOT present
		expect(screen.queryByText('Mobilize')).not.toBeInTheDocument();
		expect(screen.queryByText('Connect')).not.toBeInTheDocument();
		expect(screen.queryByText('Educate')).not.toBeInTheDocument();
	});
});
