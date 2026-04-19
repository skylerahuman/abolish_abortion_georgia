import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import TwoColumnLayout from './TwoColumnLayout.svelte';

describe('TwoColumnLayout', () => {
	it('renders the left and right columns', () => {
		render(TwoColumnLayout);
		const leftCol = screen.getByTestId('left-column');
		const rightCol = screen.getByTestId('right-column');
		expect(leftCol).toBeInTheDocument();
		expect(rightCol).toBeInTheDocument();
	});

	it('applies the correct grid classes for desktop', () => {
		render(TwoColumnLayout);
		const container = screen.getByTestId('layout-container');
		expect(container).toHaveClass('grid');
		expect(container).toHaveClass('md:grid-cols-[2fr_1fr]');
	});

	it('renders the right column as a horizontal scroll carousel on mobile', () => {
		render(TwoColumnLayout);
		const rightCol = screen.getByTestId('right-column');
		expect(rightCol).toHaveClass('flex');
		expect(rightCol).toHaveClass('overflow-x-auto');
		expect(rightCol).toHaveClass('snap-x');
		expect(rightCol).toHaveClass('md:block'); // Reverts to block on desktop
	});
});
