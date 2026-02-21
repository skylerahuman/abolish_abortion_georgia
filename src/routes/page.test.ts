import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
  it('renders the main sections', () => {
    render(Page);
    // Check for main headings/content to verify render
    expect(screen.getByText(/Georgia bears/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Focus/i)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(Page);
    const ctaContainer = screen.getByTestId('cta-container');
    expect(ctaContainer).toBeInTheDocument();
    expect(ctaContainer).toHaveClass('flex');
    expect(ctaContainer).toHaveClass('justify-start');

    // Check for links inside
    const links = screen.getAllByRole('link');
    const joinLink = links.find(l => l.getAttribute('href')?.includes('/join'));
    const supportLink = links.find(l => l.getAttribute('href')?.includes('/support'));

    expect(joinLink).toBeInTheDocument();
    expect(supportLink).toBeInTheDocument();
  });
});
