import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Page from './+page.svelte';

// Mock $app/paths so links render correctly
vi.mock('$app/paths', () => ({
  base: ''
}));

describe('Home Page', () => {
  it('renders the main sections', () => {
    render(Page);
    // The new design uses a hero carousel with text fading in.
    // It doesn't seem to use TwoColumnLayout anymore based on the HTML structure I saw in the logs (home-bg, section, hero-carousel).
    // Let's test for the presence of key text instead of layout structure that might have changed.
    expect(screen.getByText(/Georgia bears/i)).toBeInTheDocument();
    expect(screen.getByText(/bloodguilt/i)).toBeInTheDocument();
    expect(screen.getByText(/for the sin of abortion/i)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(Page);
    // The logs showed two links: "Join Us" and "Support"
    const joinLink = screen.getByRole('link', { name: /Join Us/i });
    expect(joinLink).toBeInTheDocument();
    expect(joinLink).toHaveAttribute('href', '/join');

    const supportLink = screen.getByRole('link', { name: /Support/i });
    expect(supportLink).toBeInTheDocument();
    expect(supportLink).toHaveAttribute('href', '/support');
  });
});
