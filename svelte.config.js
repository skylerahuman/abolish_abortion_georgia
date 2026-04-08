import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		paths: {
			base: ''
		},
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore missing images during build
				if (path.includes('/images/')) return;
				// Let other errors through
				throw new Error(message);
			}
		}
	}
};

export default config;
