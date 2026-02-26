import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Page from './+page.svelte';

// Mock $app/paths
vi.mock('$app/paths', () => ({
  base: ''
}));

describe('Home Page', () => {
  it('renders the hero section with main heading', () => {
    render(Page);
    expect(screen.getByText(/Georgia bears/i)).toBeInTheDocument();
    expect(screen.getByText(/bloodguilt/i)).toBeInTheDocument();
    expect(screen.getByText(/for the sin of abortion/i)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(Page);
    const joinButton = screen.getByRole('link', { name: /Join Us/i });
    const supportButton = screen.getByRole('link', { name: /Support/i });

    expect(joinButton).toBeInTheDocument();
    expect(supportButton).toBeInTheDocument();
    expect(joinButton).toHaveAttribute('href', '/join');
    expect(supportButton).toHaveAttribute('href', '/support');
  });

  it('renders "Our Focus" section', () => {
    render(Page);
    expect(screen.getByText('Our Focus')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Legislative Discipleship' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Conflict Evangelism' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Church Mobilization' })).toBeInTheDocument();
  });
});
