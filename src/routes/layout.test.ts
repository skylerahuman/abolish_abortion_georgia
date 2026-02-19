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
    
    expect(screen.getAllByText('Home')).toHaveLength(2);
    expect(screen.getAllByText('Timeline')).toHaveLength(2);
    // "Join the Fight" is in desktop nav. Mobile menu is hidden by default.
    expect(screen.getAllByText('Join the Fight')).toHaveLength(1);
    expect(screen.getAllByText('FAQs')).toHaveLength(2);
  });

  it('navigation links point to the correct routes', () => {
    render(Layout, { props: { children: () => {} } });
    
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/');
    expect(homeLinks[1].closest('a')).toHaveAttribute('href', '/');

    const timelineLinks = screen.getAllByText('Timeline');
    expect(timelineLinks[0].closest('a')).toHaveAttribute('href', '/georgia-battle');
    
    const joinLinks = screen.getAllByText('Join the Fight');
    expect(joinLinks[0].closest('a')).toHaveAttribute('href', '/join');
  });
});

describe('Footer Redesign', () => {
  it('displays simplified footer navigation links without headers', () => {
    render(Layout, { props: { children: () => {} } });
    
    // Check for links
    expect(screen.getAllByText('Home')).toHaveLength(2); // One in nav, one in footer
    expect(screen.getAllByText('Timeline')).toHaveLength(2);
    expect(screen.getAllByText('FAQs')).toHaveLength(2);

    // "Join the Fight" is NOT in the footer navigation loop

    // Ensure headers like "Mobilize" are NOT present
    expect(screen.queryByText('Mobilize')).not.toBeInTheDocument();
    expect(screen.queryByText('Connect')).not.toBeInTheDocument();
    expect(screen.queryByText('Educate')).not.toBeInTheDocument();
  });
});
