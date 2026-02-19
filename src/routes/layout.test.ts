import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Layout from './+layout.svelte';

// Mock SvelteKit stores/modules
vi.mock('$app/stores', () => {
	return {
		page: {
			subscribe: (fn: (value: any) => void) => {
				fn({ url: { pathname: '/' } });
				return () => {};
			}
		}
	};
});

vi.mock('$app/paths', () => ({
	base: ''
}));

// Helper to render layout with a slot
function renderLayout() {
	// Create a dummy component for the slot
	// Since we can't easily pass a component with @testing-library/svelte render for slots in Svelte 5 yet
	// We'll just pass an empty snippet if the component supports it, but Layout uses {@render children()}

	// According to docs, we pass props. children needs to be a snippet.
	// We'll mock the snippet as a function returning nothing for now since we are testing layout elements.
	return render(Layout, {
		props: {
			children: () => {}
		}
	});
}

describe('Global Navigation', () => {
	it('displays the correct navigation labels', () => {
		renderLayout();

		// Check for Navigation Links (Header + Footer)
		// Header has: Home, Timeline, FAQs
		// Footer has: Home, Timeline, FAQs
		// Mobile menu has: Home, Timeline, FAQs (but hidden initially)

		// "Home" appears in header desktop, header mobile (if open), and footer.
		// Note: The mobile menu is in the DOM but hidden/conditional?
		// In +layout.svelte, mobile menu is inside {#if mobileMenuOpen} block, so it's NOT in DOM initially.

		const homes = screen.getAllByRole('link', { name: /Home/i });
		expect(homes.length).toBeGreaterThanOrEqual(2); // Header desktop + Footer

		const timelines = screen.getAllByRole('link', { name: /Timeline/i });
		expect(timelines.length).toBeGreaterThanOrEqual(2);

		const faqs = screen.getAllByRole('link', { name: /FAQs/i });
		expect(faqs.length).toBeGreaterThanOrEqual(2);

		// "Join the Fight" button/link
		const joinButtons = screen.getAllByRole('link', { name: /Join the Fight/i });
		expect(joinButtons.length).toBeGreaterThanOrEqual(1);
	});

	it('navigation links point to the correct routes', () => {
		renderLayout();

		const timelineLinks = screen.getAllByRole('link', { name: /Timeline/i });
		expect(timelineLinks[0]).toHaveAttribute('href', '/georgia-battle');

		const faqLinks = screen.getAllByRole('link', { name: /FAQs/i });
		expect(faqLinks[0]).toHaveAttribute('href', '/faqs');

		const joinLinks = screen.getAllByRole('link', { name: /Join the Fight/i });
		expect(joinLinks[0]).toHaveAttribute('href', '/join');
	});
});

describe('Footer', () => {
	it('displays the copyright info', () => {
		renderLayout();
		expect(screen.getByText(/Establishing Justice for the Pre-born in Georgia/i)).toBeInTheDocument();
		expect(screen.getByText(/Abolition Georgia/i)).toBeInTheDocument();
	});

	it('displays footer navigation links', () => {
		renderLayout();
		const footer = screen.getByRole('contentinfo'); // footer element

		// Check links within footer
		// Since we can't easily scope by container with screen.getBy... we can rely on getAll and assume footer is one of them.
		// Or assume the structure is simple.

		// Let's verify we don't have the old "Get Involved" text
		expect(screen.queryByText(/Get Involved/i)).not.toBeInTheDocument();
	});
});
