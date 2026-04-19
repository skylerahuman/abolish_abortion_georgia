import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
	it('renders the hero heading', () => {
		render(Page);
		expect(screen.getByText(/Georgia bears/i)).toBeInTheDocument();
		expect(screen.getByText(/bloodguilt/i)).toBeInTheDocument();
	});

	it('renders CTA buttons', () => {
		render(Page);
		expect(screen.getByRole('link', { name: /Join Us/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Support/i })).toBeInTheDocument();
	});
});
