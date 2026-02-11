import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
<<<<<<< HEAD
=======
import path from 'path';
>>>>>>> Home-Page-Tweaks

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
<<<<<<< HEAD
		globals: true,
		environment: 'jsdom',
		setupFiles: ['tests/setup.ts']
	},
	resolve: {
		conditions: ['browser']
	}
});
=======
		environment: 'jsdom',
		setupFiles: ['./src/test-setup.ts']
	},
	resolve: {
		conditions: ['browser', 'development']
	}
});
>>>>>>> Home-Page-Tweaks
