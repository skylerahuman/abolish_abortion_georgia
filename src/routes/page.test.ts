import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
	it('renders the hero section with main title', () => {
		render(Page);
		// Check for key text in the hero section
		expect(screen.getByText(/Georgia bears/i)).toBeInTheDocument();
		expect(screen.getByText(/bloodguilt/i)).toBeInTheDocument();
		expect(screen.getByText(/for the sin of abortion/i)).toBeInTheDocument();
	});

	it('renders the main CTA buttons with correct links', () => {
		render(Page);

		const joinLink = screen.getByRole('link', { name: /Join Us/i });
		expect(joinLink).toBeInTheDocument();
		expect(joinLink).toHaveAttribute('href', '/join');

		const supportLink = screen.getByRole('link', { name: /Support/i });
		expect(supportLink).toBeInTheDocument();
		expect(supportLink).toHaveAttribute('href', '/support');
	});

	it('renders the "Our Focus" section', () => {
		render(Page);
		expect(screen.getByRole('heading', { name: /Our Focus/i })).toBeInTheDocument();

		// Check for the three focus cards
		expect(screen.getByRole('heading', { name: /Legislative Discipleship/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /Conflict Evangelism/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /Church Mobilization/i })).toBeInTheDocument();
	});

	it('renders mobile-specific elements', () => {
		render(Page);
		// Swipe button is rendered but might be hidden via CSS classes (md:hidden)
		// We just check presence in the DOM
		expect(screen.getByText(/Swipe for more/i)).toBeInTheDocument();
	});
});
