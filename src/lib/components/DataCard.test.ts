import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import DataCard from './DataCard.svelte';

describe('DataCard', () => {
	it('renders the title and value', () => {
		render(DataCard, { title: 'Test Title', value: '100%' });
		expect(screen.getByText('Test Title')).toBeInTheDocument();
		expect(screen.getByText('100%')).toBeInTheDocument();
	});

	it('renders the description if provided', () => {
		render(DataCard, { title: 'Test Title', value: '100%', description: 'Test Description' });
		expect(screen.getByText('Test Description')).toBeInTheDocument();
	});
});
