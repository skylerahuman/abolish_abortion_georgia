import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/bill-analysis.txt');
		if (!response.ok) {
			throw new Error(`Failed to fetch bill text: ${response.statusText}`);
		}
		let billText = await response.text();

		// Clean up the text: remove scripture references and extra newlines
		billText = billText
			.replace(/\[\d+\]/g, '') // Remove numeric citations like [1], [2]
			.replace(/\n\s*\n/g, '\n\n') // Normalize multiple newlines to just two
			.trim();

		const billStatuses = [
			{ name: 'In Committee', color: 'bg-gold/5 text-gold', icon: 'circle' },
			{ name: 'On Floor', color: 'bg-blue-500/10 text-blue-400', icon: 'gavel' },
			{ name: 'Passed House', color: 'bg-green-500/10 text-green-400', icon: 'check_circle' },
			{ name: 'Passed Senate', color: 'bg-green-500/10 text-green-400', icon: 'check_circle' },
			{ name: 'To Governor', color: 'bg-purple-500/10 text-purple-400', icon: 'edit' },
			{ name: 'Signed into Law', color: 'bg-green-700/20 text-green-500', icon: 'verified' },
			{ name: 'Vetoed', color: 'bg-primary/10 text-primary', icon: 'cancel' }
		];

		return {
			billText,
			billStatuses,
			currentStatus: billStatuses[0]
		};
	} catch (error) {
		console.error('Error loading bill analysis data:', error);
		return {
			billText: 'Failed to load bill text. Please try again later.',
			billStatuses: [],
			currentStatus: { name: 'Error', color: 'bg-red-500/10 text-red-400', icon: 'error' }
		};
	}
};
