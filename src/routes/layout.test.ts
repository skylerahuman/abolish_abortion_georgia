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
    
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Timeline').length).toBeGreaterThan(0);
    expect(screen.getAllByText('FAQs').length).toBeGreaterThan(0);
  });

  it('navigation links point to the correct routes', () => {
    render(Layout, { props: { children: () => {} } });
    
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/');

    const timelineLinks = screen.getAllByText('Timeline');
    expect(timelineLinks[0].closest('a')).toHaveAttribute('href', '/georgia-battle');
  });
});

describe('Footer Redesign', () => {
  it('displays the copyright in the footer', () => {
    render(Layout, { props: { children: () => {} } });
    
    expect(screen.getByText(/Abolition Georgia/i)).toBeInTheDocument();
  });

  it('displays simplified footer navigation links without headers', () => {
    render(Layout, { props: { children: () => {} } });
    
    // Check for links
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Timeline').length).toBeGreaterThan(0);
    expect(screen.getAllByText('FAQs').length).toBeGreaterThan(0);

    // Ensure headers like "Mobilize" are NOT present (assuming they might have been there before or were planned to be removed)
    expect(screen.queryByText('Mobilize')).not.toBeInTheDocument();
    expect(screen.queryByText('Connect')).not.toBeInTheDocument();
    expect(screen.queryByText('Educate')).not.toBeInTheDocument();
  });
});
