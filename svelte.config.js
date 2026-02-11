<<<<<<< HEAD
import adapter from '@sveltejs/adapter-auto';
=======
import adapter from '@sveltejs/adapter-static';
>>>>>>> Home-Page-Tweaks
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
<<<<<<< HEAD
		adapter: adapter()
	}
};

export default config;
=======
		// adapter-static for GitHub Pages
		adapter: adapter({
            pages: 'docs',
            assets: 'docs',
            fallback: '404.html',
            precompress: false,
            strict: true
        }),
        paths: {
            base: process.argv.includes('dev') ? '' : '/abolish_abortion_georgia'
        }
	}
};

export default config;
>>>>>>> Home-Page-Tweaks
