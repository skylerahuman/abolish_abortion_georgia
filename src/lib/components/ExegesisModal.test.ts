import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { createRawSnippet } from 'svelte';
import ExegesisModal from './ExegesisModal.svelte';

// Mock svelte/transition to avoid waiting for animations
vi.mock('svelte/transition', async () => {
    const actual = await vi.importActual('svelte/transition');
    return {
        ...actual,
        fly: () => ({ duration: 0 })
    };
});

describe('ExegesisModal', () => {
    const originalAnimate = Element.prototype.animate;
    const originalScrollIntoView = Element.prototype.scrollIntoView;

    beforeAll(() => {
        // Polyfill Web Animations API for JSDOM
        Element.prototype.animate = vi.fn().mockImplementation(() => ({
            finished: Promise.resolve(),
            cancel: vi.fn(),
            play: vi.fn(),
            pause: vi.fn(),
            reverse: vi.fn(),
            onfinish: null
        }));

        // Mock scrollIntoView
        Element.prototype.scrollIntoView = vi.fn();
    });

    afterAll(() => {
        Element.prototype.animate = originalAnimate;
        Element.prototype.scrollIntoView = originalScrollIntoView;
    });

	it('should close when Escape key is pressed', async () => {
		// Mock snippet for children
		const childrenSnippet = createRawSnippet(() => ({
			render: () => '<p>Modal Content</p>'
		}));

		render(ExegesisModal, {
			props: {
				showModal: true,
				title: 'Test Modal',
				children: childrenSnippet
			}
		});

		// Check if modal is visible (using role="document" as implemented in component)
		expect(screen.getByRole('document')).toBeInTheDocument();

		// Simulate Escape key press
		await fireEvent.keyDown(window, { key: 'Escape' });

		// Check if modal is removed
        await waitFor(() => {
            expect(screen.queryByRole('document')).not.toBeInTheDocument();
        });
	});
});
