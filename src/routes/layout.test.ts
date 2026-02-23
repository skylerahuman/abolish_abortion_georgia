import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Layout from './+layout.svelte';

// Mock SvelteKit stores/modules
vi.mock('$app/stores', () => ({
	page: {
		subscribe: (fn: any) => {
			fn({ url: { pathname: '/' } });
			return () => {};
		}
	}
}));

vi.mock('$app/paths', () => ({
	base: ''
}));

describe('Global Navigation', () => {
	it('displays the correct navigation labels', () => {
		render(Layout, { props: { children: () => {} } });

		expect(screen.getAllByText('Home')).toHaveLength(2);
		expect(screen.getAllByText('Timeline')).toHaveLength(2);
		expect(screen.getAllByText('Get Involved')).toHaveLength(2);
		expect(screen.getAllByText('FAQs')).toHaveLength(2);
	});

	it('navigation links point to the correct routes', () => {
		render(Layout, { props: { children: () => {} } });

		const homeLinks = screen.getAllByText('Home');
		expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/');
		expect(homeLinks[1].closest('a')).toHaveAttribute('href', '/');

		const timelineLinks = screen.getAllByText('Timeline');
		expect(timelineLinks[0].closest('a')).toHaveAttribute('href', '/timeline');

		const involvedLinks = screen.getAllByText('Get Involved');
		expect(involvedLinks[0].closest('a')).toHaveAttribute('href', '/get-involved');
	});
});

describe('Footer Redesign', () => {
	it('displays the Proverbs 31 scripture in the footer', () => {
		render(Layout, { props: { children: () => {} } });

		// The specific translation from the hero text
		expect(
			screen.getByText(
				/Open thy mouth for the dumb in the cause of all such as are appointed to destruction/i
			)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				/Open thy mouth, judge righteously, and plead the cause of the poor and needy/i
			)
		).toBeInTheDocument();
	});

	it('displays simplified footer navigation links without headers', () => {
		render(Layout, { props: { children: () => {} } });

		const footer = screen.getByRole('contentinfo');

		// Check for links
		expect(screen.getAllByText('Home')).toHaveLength(2); // One in nav, one in footer
		expect(screen.getAllByText('Timeline')).toHaveLength(2);
		expect(screen.getAllByText('Get Involved')).toHaveLength(2);
		expect(screen.getAllByText('FAQs')).toHaveLength(2);

		// Ensure headers like "Mobilize" are NOT present (assuming they might have been there before or were planned to be removed)
		expect(screen.queryByText('Mobilize')).not.toBeInTheDocument();
		expect(screen.queryByText('Connect')).not.toBeInTheDocument();
		expect(screen.queryByText('Educate')).not.toBeInTheDocument();
	});
});
