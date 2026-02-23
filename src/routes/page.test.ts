import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
  it('centers CTA buttons on mobile', () => {
    render(Page);
    const ctaContainer = screen.getByTestId('cta-container');
    // Check for flex container classes that suggest mobile-friendly layout
    expect(ctaContainer).toHaveClass('flex');
    expect(ctaContainer).toHaveClass('justify-start');
    expect(ctaContainer).toHaveClass('gap-6');
  });
});
