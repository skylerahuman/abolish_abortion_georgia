import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
  it('renders the main content sections', () => {
    render(Page);

    // Verify key sections are present
    expect(screen.getByText(/Georgia bears/i)).toBeInTheDocument();
    expect(screen.getByText(/bloodguilt/i)).toBeInTheDocument();

    // Check for CTA links instead of layout containers that might not exist in the new design
    const joinLink = screen.getByRole('link', { name: /join us/i });
    expect(joinLink).toBeInTheDocument();
    expect(joinLink).toHaveAttribute('href', '/join');

    const supportLink = screen.getByRole('link', { name: /support/i });
    expect(supportLink).toBeInTheDocument();
    expect(supportLink).toHaveAttribute('href', '/support');
  });
});
