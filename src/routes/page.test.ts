import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Page from './+page.svelte';

vi.mock('$app/paths', () => ({
  base: ''
}));

describe('Home Page', () => {
  it('displays the CTA buttons', () => {
    render(Page);
    const ctaContainer = screen.getByTestId('cta-container');
    expect(ctaContainer).toBeInTheDocument();

    // Check that we have the Join Us and Support buttons
    expect(screen.getByText('Join Us')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('layout classes for CTA container', () => {
    render(Page);
    const ctaContainer = screen.getByTestId('cta-container');
    expect(ctaContainer).toHaveClass('flex');
    expect(ctaContainer).toHaveClass('justify-start');
    expect(ctaContainer).toHaveClass('gap-6');
    expect(ctaContainer).toHaveClass('mt-4');
  });
});
