import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Layout from './+layout.svelte';

// Mock SvelteKit stores/modules
vi.mock('$app/stores', () => ({
  page: {
    subscribe: (fn: any) => {
      fn({ url: { pathname: '/' } });
      return () => {};
    }
  }
}));

vi.mock('$app/paths', () => ({
  base: ''
}));

describe('Global Navigation', () => {
  it('displays the correct navigation labels', () => {
    render(Layout, { props: { children: () => {} } });
    
    // Depending on mobile menu state, we might have 2 or 3 links (Desktop + Footer + Mobile)
    // The test renders it collapsed, so 2 links each (Desktop Nav + Footer)
    expect(screen.getAllByText('Home').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Timeline').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('FAQs').length).toBeGreaterThanOrEqual(2);
  });

  it('navigation links point to the correct routes', () => {
    render(Layout, { props: { children: () => {} } });
    
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/');

    const timelineLinks = screen.getAllByText('Timeline');
    expect(timelineLinks[0].closest('a')).toHaveAttribute('href', '/georgia-battle');
  });
});

describe('Footer', () => {
  it('displays copyright text in the footer', () => {
    render(Layout, { props: { children: () => {} } });
    
    // The footer has "Establishing Justice for the Pre-born in Georgia"
    expect(screen.getByText(/Establishing Justice for the Pre-born in Georgia/i)).toBeInTheDocument();
    expect(screen.getByText(/Abolition Georgia/i)).toBeInTheDocument();
  });

  it('displays simplified footer navigation links without headers', () => {
    render(Layout, { props: { children: () => {} } });
    
    const footer = screen.getByRole('contentinfo');
    
    expect(footer).toBeInTheDocument();

    // Ensure headers like "Mobilize" are NOT present
    expect(screen.queryByText('Mobilize')).not.toBeInTheDocument();
    expect(screen.queryByText('Connect')).not.toBeInTheDocument();
    expect(screen.queryByText('Educate')).not.toBeInTheDocument();
  });
});
