import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
  it('renders the hero section', () => {
    render(Page);
    // Check for hero content by text
    expect(screen.getByText(/Georgia bears/i)).toBeInTheDocument();
    expect(screen.getByText(/bloodguilt/i)).toBeInTheDocument();
    expect(screen.getByText(/for the sin of abortion/i)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(Page);
    const ctaContainer = screen.getByTestId('cta-container');
    expect(ctaContainer).toHaveClass('flex');
    expect(ctaContainer).toHaveClass('justify-start');
    expect(ctaContainer).toHaveClass('gap-6');

    // Check for the links
    const joinLink = screen.getByRole('link', { name: /Join Us/i });
    expect(joinLink).toHaveAttribute('href', '/join');

    const supportLink = screen.getByRole('link', { name: /Support/i });
    expect(supportLink).toHaveAttribute('href', '/support');
  });
});
