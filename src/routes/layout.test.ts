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
		// "Join the Fight" is in the desktop nav and mobile menu
		expect(screen.getAllByText('Join the Fight')).toHaveLength(1); // Desktop button
		expect(screen.getAllByText('FAQs')).toHaveLength(2);
	});

	it('navigation links point to the correct routes', () => {
		render(Layout, { props: { children: () => {} } });

		const homeLinks = screen.getAllByText('Home');
		expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/');
		expect(homeLinks[1].closest('a')).toHaveAttribute('href', '/');

		const timelineLinks = screen.getAllByText('Timeline');
		expect(timelineLinks[0].closest('a')).toHaveAttribute('href', '/georgia-battle');

		const joinLinks = screen.getAllByText('Join the Fight');
		expect(joinLinks[0].closest('a')).toHaveAttribute('href', '/join');
	});
});

describe('Footer Redesign', () => {
	it('displays copyright info', () => {
		render(Layout, { props: { children: () => {} } });

		expect(screen.getByText(/Establishing Justice for the Pre-born in Georgia/i)).toBeInTheDocument();
		expect(screen.getByText(/Abolition Georgia/i)).toBeInTheDocument();
	});

	it('displays simplified footer navigation links', () => {
		render(Layout, { props: { children: () => {} } });

		const footer = screen.getByRole('contentinfo');

		// Check for links
		expect(screen.getAllByText('Home')).toHaveLength(2); // One in nav, one in footer
		expect(screen.getAllByText('Timeline')).toHaveLength(2);
		expect(screen.getAllByText('FAQs')).toHaveLength(2);
	});
});
