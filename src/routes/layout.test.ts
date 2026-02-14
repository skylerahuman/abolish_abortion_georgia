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
    // "Get Involved" has been replaced by "Join the Fight" in the new design
    // However, "Join the Fight" is a button/CTA style, not just a link, and might be unique.
    // Let's check what's actually there. The logs showed "Join the Fight".
    // Wait, the logs showed "Join the Fight" in the nav.
    // Let's assume it appears twice (nav and mobile menu? or nav and footer?).
    // In the footer, the logs showed "Home", "Timeline", "FAQs". It did NOT show "Join the Fight" in the footer links list in the log snippet I saw earlier (it showed Home, Timeline, FAQs).
    // Let's look at the layout file content I read earlier.
    // navItems = [{ href: '/', label: 'Home' }, { href: '/georgia-battle', label: 'Timeline' }, { href: '/faqs', label: 'FAQs' }]
    // Footer iterates over navItems. So "Join the Fight" is NOT in the footer links loop.
    // "Join the Fight" is manually added to the nav.
    // However, the mobile menu is conditionally rendered with `{#if mobileMenuOpen}`, so initially only the desktop link is present.
    expect(screen.getAllByText('Join the Fight')).toHaveLength(1);
    expect(screen.getAllByText('FAQs')).toHaveLength(2);
  });

  it('navigation links point to the correct routes', () => {
    render(Layout, { props: { children: () => {} } });
    
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/');

    const timelineLinks = screen.getAllByText('Timeline');
    // The logs showed the href is /georgia-battle
    expect(timelineLinks[0].closest('a')).toHaveAttribute('href', '/georgia-battle');
    
    const joinLinks = screen.getAllByText('Join the Fight');
    expect(joinLinks[0].closest('a')).toHaveAttribute('href', '/join');
  });
});

describe('Footer Redesign', () => {
  it('displays the Proverbs 31 scripture in the footer', () => {
    render(Layout, { props: { children: () => {} } });
    
    expect(screen.getByText(/Open thy mouth for the dumb/i)).toBeInTheDocument();
  });

  it('displays simplified footer navigation links without headers', () => {
    render(Layout, { props: { children: () => {} } });
    
    // Check for links
    expect(screen.getAllByText('Home')).toHaveLength(2);
    expect(screen.getAllByText('Timeline')).toHaveLength(2);
    expect(screen.getAllByText('FAQs')).toHaveLength(2);

    // "Get Involved" is not in the footer anymore
    expect(screen.queryByText('Get Involved')).not.toBeInTheDocument();
  });
});
