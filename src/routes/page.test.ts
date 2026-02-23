import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
	it('renders the hero section with key messaging', () => {
		render(Page);

		expect(screen.getByText(/Georgia bears/i)).toBeInTheDocument();
		expect(screen.getByText(/bloodguilt/i)).toBeInTheDocument();
		expect(screen.getByText(/for the sin of abortion/i)).toBeInTheDocument();
	});

	it('renders CTA buttons', () => {
		render(Page);

		const joinLink = screen.getByRole('link', { name: /Join Us/i });
		const supportLink = screen.getByRole('link', { name: /Support/i });

		expect(joinLink).toBeInTheDocument();
		expect(joinLink).toHaveAttribute('href', expect.stringContaining('/join'));

		expect(supportLink).toBeInTheDocument();
		expect(supportLink).toHaveAttribute('href', expect.stringContaining('/support'));
	});

	it('renders the "Our Focus" section', () => {
		render(Page);

		expect(screen.getByRole('heading', { name: /Our Focus/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /Legislative Discipleship/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /Conflict Evangelism/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /Church Mobilization/i })).toBeInTheDocument();
	});
});
