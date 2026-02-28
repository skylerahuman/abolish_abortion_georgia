import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
  it('renders the main content', () => {
    render(Page);
    expect(screen.getByText('Georgia bears')).toBeInTheDocument();
    expect(screen.getByText('bloodguilt')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(Page);
    expect(screen.getAllByRole('link', { name: 'Join Us' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Support' }).length).toBeGreaterThan(0);
  });
});
