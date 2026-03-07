import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
  it('renders the hero section and features', () => {
    render(Page);

    // Check for the main hero heading
    expect(screen.getByText('bloodguilt')).toBeInTheDocument();

    // Check for the CTA buttons
    const joinUsLinks = screen.getAllByText('Join Us');
    expect(joinUsLinks.length).toBeGreaterThan(0);
    const supportLinks = screen.getAllByText('Support');
    expect(supportLinks.length).toBeGreaterThan(0);

    // Check for the focus sections
    expect(screen.getByText('Our Focus')).toBeInTheDocument();
    expect(screen.getByText('Legislative Discipleship')).toBeInTheDocument();
    expect(screen.getByText('Conflict Evangelism')).toBeInTheDocument();
    expect(screen.getByText('Church Mobilization')).toBeInTheDocument();
  });
});
