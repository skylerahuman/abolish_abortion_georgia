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
    
    // Header (Desktop) + Footer = 2 instances (Mobile menu is closed by default)
    expect(screen.getAllByText('Home')).toHaveLength(2);
    expect(screen.getAllByText('Timeline')).toHaveLength(2);
    expect(screen.getAllByText('FAQs')).toHaveLength(2);
  });

  it('navigation links point to the correct routes', () => {
    render(Layout, { props: { children: () => {} } });
    
    const homeLinks = screen.getAllByText('Home');
    homeLinks.forEach(link => {
        expect(link.closest('a')).toHaveAttribute('href', '/');
    });

    const timelineLinks = screen.getAllByText('Timeline');
    timelineLinks.forEach(link => {
        expect(link.closest('a')).toHaveAttribute('href', '/georgia-battle');
    });
  });
});

describe('Footer Redesign', () => {
  it('displays simplified footer navigation links', () => {
    render(Layout, { props: { children: () => {} } });
    
    const footer = screen.getByRole('contentinfo');
    
    // Verify footer exists
    expect(footer).toBeInTheDocument();

    // Verify links exist within the footer specifically
    // We use within() to scope searches to the footer
    const { getByText } = require('@testing-library/dom');
    expect(getByText(footer, 'Home')).toBeInTheDocument();
    expect(getByText(footer, 'Timeline')).toBeInTheDocument();
    expect(getByText(footer, 'FAQs')).toBeInTheDocument();
  });
});
