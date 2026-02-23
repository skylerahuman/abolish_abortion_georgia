import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
	it('renders the layout container with left and right columns', () => {
		render(Page);
		// These test-ids should be present in the TwoColumnLayout component which is used in Page
		expect(screen.getByTestId('layout-container')).toBeInTheDocument();
		expect(screen.getByTestId('left-column')).toBeInTheDocument();
		expect(screen.getByTestId('right-column')).toBeInTheDocument();
	});

	it('centers CTA buttons on mobile', () => {
		render(Page);
		const ctaContainer = screen.getByTestId('cta-container');
		expect(ctaContainer).toHaveClass('flex-col');
		expect(ctaContainer).toHaveClass('items-center');
		expect(ctaContainer).toHaveClass('md:flex-row');
	});
});
