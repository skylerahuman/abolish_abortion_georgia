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
    
    // Nav items appear in desktop, mobile, and footer
    expect(screen.getAllByText('Home').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Timeline').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('FAQs').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Join the Fight').length).toBeGreaterThanOrEqual(1);
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
  it('displays the generic copyright text', () => {
    render(Layout, { props: { children: () => {} } });
    
    expect(screen.getByText(/Establishing Justice for the Pre-born in Georgia/i)).toBeInTheDocument();
  });

  it('displays simplified footer navigation links', () => {
    render(Layout, { props: { children: () => {} } });
    
    const footer = screen.getByRole('contentinfo');
    
    // Ensure headers like "Mobilize" are NOT present
    expect(screen.queryByText('Mobilize')).not.toBeInTheDocument();
    expect(screen.queryByText('Connect')).not.toBeInTheDocument();
    expect(screen.queryByText('Educate')).not.toBeInTheDocument();
  });
});
