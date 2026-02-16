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
    expect(screen.getAllByText('FAQs')).toHaveLength(2);
    // "Join the Fight" is in desktop nav (1) + mobile menu (1) = 2.
    // Wait, the mobile menu is conditional on `mobileMenuOpen`.
    // Let's check the code:
    // The mobile menu button toggles `mobileMenuOpen`.
    // The "Join the Fight" button is present in the desktop nav.
    // There is also a "Join the Fight" link in the mobile menu IF it is open.

    // In the initial render (mobileMenuOpen = false):
    // Desktop: Home, Timeline, FAQs, Join the Fight (visible on md+)
    // Mobile Button: Visible on small screens
    // Mobile Menu: Hidden

    // Footer: Home, Timeline, FAQs
    // Footer does NOT have "Join the Fight" based on the loop: `{#each navItems as item}` where navItems only has Home, Timeline, FAQs.

    // So initially:
    // Home: 1 (Nav) + 1 (Footer) = 2
    // Timeline: 1 (Nav) + 1 (Footer) = 2
    // FAQs: 1 (Nav) + 1 (Footer) = 2
    // Join the Fight: 1 (Nav)

    expect(screen.getAllByText('Join the Fight')).toHaveLength(1);
  });

  it('navigation links point to the correct routes', () => {
    render(Layout, { props: { children: () => {} } });
    
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/');

    const timelineLinks = screen.getAllByText('Timeline');
    expect(timelineLinks[0].closest('a')).toHaveAttribute('href', '/georgia-battle');
    
    const joinLinks = screen.getAllByText('Join the Fight');
    expect(joinLinks[0].closest('a')).toHaveAttribute('href', '/join');
  });
});

describe('Footer Redesign', () => {
  it('displays the simplified footer navigation links without headers', () => {
    render(Layout, { props: { children: () => {} } });
    
    // Check for links
    expect(screen.getAllByText('Home')).toHaveLength(2);
    expect(screen.getAllByText('Timeline')).toHaveLength(2);
    expect(screen.getAllByText('FAQs')).toHaveLength(2);

    // "Join the Fight" is NOT in the footer based on previous analysis of navItems loop in footer
    // So still length 1 (from Nav)
    expect(screen.getAllByText('Join the Fight')).toHaveLength(1);

    // Ensure headers like "Mobilize" are NOT present
    expect(screen.queryByText('Mobilize')).not.toBeInTheDocument();
    expect(screen.queryByText('Connect')).not.toBeInTheDocument();
    expect(screen.queryByText('Educate')).not.toBeInTheDocument();
  });
});
