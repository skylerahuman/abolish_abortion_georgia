import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/bill-analysis.txt');
	const billText = await res.text();

	return {
		billText
	};
};
