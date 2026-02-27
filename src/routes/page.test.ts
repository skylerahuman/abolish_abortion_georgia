import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Page from './+page.svelte';

describe('Home Page', () => {
  it('renders the Hero section with correct heading', () => {
    render(Page);

    // Check for the main heading text parts
    expect(screen.getByText(/Georgia bears/i)).toBeInTheDocument();
    expect(screen.getByText(/bloodguilt/i)).toBeInTheDocument();
    expect(screen.getByText(/for the sin of abortion/i)).toBeInTheDocument();

    // Check for the subheadings/lines
    expect(screen.getByText(/What can wash away that stain/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing but the/i)).toBeInTheDocument();

    // Use `getAllByText` if multiple elements contain "blood"
    const bloodElements = screen.getAllByText(/blood/i);
    expect(bloodElements.length).toBeGreaterThanOrEqual(1);

    // Use `getAllByText` if multiple elements contain "Jesus"
    const jesusElements = screen.getAllByText(/Jesus/i);
    expect(jesusElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders Call to Action buttons', () => {
    render(Page);

    const joinLinks = screen.getAllByRole('link', { name: /Join Us/i });
    expect(joinLinks.length).toBeGreaterThanOrEqual(1);
    expect(joinLinks[0]).toHaveAttribute('href', '/join');

    const supportLinks = screen.getAllByRole('link', { name: /Support/i });
    expect(supportLinks.length).toBeGreaterThanOrEqual(1);
    expect(supportLinks[0]).toHaveAttribute('href', '/support');
  });

  it('renders "Our Focus" section', () => {
    render(Page);

    expect(screen.getByRole('heading', { name: /Our Focus/i })).toBeInTheDocument();

    // Check for the focus cards headings
    expect(screen.getByRole('heading', { name: /Legislative Discipleship/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Conflict Evangelism/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Church Mobilization/i })).toBeInTheDocument();
  });
});
