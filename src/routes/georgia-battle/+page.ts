import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/hb441-clean.txt');
	const billText = await res.text();

	return {
		billText
	};
};