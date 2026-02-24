import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
  it('centers CTA buttons on mobile', () => {
    render(Page);
    const ctaContainer = screen.getByTestId('cta-container');
    expect(ctaContainer).toHaveClass('flex-col');
    expect(ctaContainer).toHaveClass('items-center');
    expect(ctaContainer).toHaveClass('md:flex-row');
  });
});
