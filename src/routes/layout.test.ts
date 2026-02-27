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
    
    // Check for Home links (Desktop Nav + Footer)
    // Mobile menu is closed by default, so its links are not rendered.
    expect(screen.getAllByRole('link', { name: 'Home' })).toHaveLength(2);

    // Check for Timeline links (Desktop Nav + Footer)
    expect(screen.getAllByRole('link', { name: 'Timeline' })).toHaveLength(2);

    // Check for FAQs links (Desktop Nav + Footer)
    expect(screen.getAllByRole('link', { name: 'FAQs' })).toHaveLength(2);

    // Check for Join links (Desktop Nav)
    // Footer does NOT have "Join the Fight".
    // Mobile is closed.
    expect(screen.getAllByRole('link', { name: /Join the Fight/i })).toHaveLength(1);
  });

  it('navigation links point to the correct routes', () => {
    render(Layout, { props: { children: () => {} } });
    
    const homeLinks = screen.getAllByRole('link', { name: 'Home' });
    expect(homeLinks[0]).toHaveAttribute('href', '/');
    
    const timelineLinks = screen.getAllByRole('link', { name: 'Timeline' });
    expect(timelineLinks[0]).toHaveAttribute('href', '/georgia-battle');

    const faqsLinks = screen.getAllByRole('link', { name: 'FAQs' });
    expect(faqsLinks[0]).toHaveAttribute('href', '/faqs');

    const joinLinks = screen.getAllByRole('link', { name: /Join the Fight/i });
    expect(joinLinks[0]).toHaveAttribute('href', '/join');
  });
});

describe('Footer', () => {
  it('displays copyright information', () => {
    render(Layout, { props: { children: () => {} } });
    
    expect(screen.getByText(/Establishing Justice for the Pre-born in Georgia/i)).toBeInTheDocument();
    expect(screen.getByText(/Abolition Georgia/i)).toBeInTheDocument();
  });

  it('displays footer navigation links', () => {
    render(Layout, { props: { children: () => {} } });
    
    // Verify footer links exist (already verified by count above, but good for role check)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
