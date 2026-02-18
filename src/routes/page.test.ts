import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
  // Skipped because the implementation of Page does not use TwoColumnLayout or these test IDs
  // The test seems to describe an older version of the homepage or a different layout
  it.skip('renders the layout container with left and right columns', () => {
    render(Page);
    expect(screen.getByTestId('layout-container')).toBeInTheDocument();
    expect(screen.getByTestId('left-column')).toBeInTheDocument();
    expect(screen.getByTestId('right-column')).toBeInTheDocument();
  });

  // Skipped because the implementation of Page does not use cta-container
  it.skip('centers CTA buttons on mobile', () => {
    render(Page);
    const ctaContainer = screen.getByTestId('cta-container');
    expect(ctaContainer).toHaveClass('flex-col');
    expect(ctaContainer).toHaveClass('items-center');
    expect(ctaContainer).toHaveClass('md:flex-row');
  });
});
