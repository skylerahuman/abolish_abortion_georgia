import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
  it('renders the hero section with correct heading', () => {
    render(Page);
    expect(screen.getByText(/Georgia bears/i)).toBeInTheDocument();
    expect(screen.getByText(/bloodguilt/i)).toBeInTheDocument();
  });

  it('renders the call to action buttons', () => {
    render(Page);
    const joinButton = screen.getByRole('link', { name: /Join Us/i });
    expect(joinButton).toBeInTheDocument();

    const supportButton = screen.getByRole('link', { name: /Support/i });
    expect(supportButton).toBeInTheDocument();
  });
});
