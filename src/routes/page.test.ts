import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
  it('renders the layout container', () => {
    render(Page);
    // These test-ids should be present in the TwoColumnLayout component which is used in Page
    expect(screen.getByTestId('layout-container')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(Page);
    const ctaContainer = screen.getByTestId('cta-container');
    expect(ctaContainer).toBeInTheDocument();
    expect(ctaContainer).toHaveClass('flex');
  });
});
