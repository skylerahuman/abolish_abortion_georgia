<<<<<<< HEAD
import type { Church } from '$lib/types';

export const churchNamesFirst: string[] = [
	'Grace',
	'Faith',
	'Truth',
	'Sovereign',
	'Reformed',
	'Community',
	'Hope',
	'Victory',
	'Peace',
	'Redeemer',
	'Providence',
	'Trinity',
	'Cornerstone',
	'Living',
	'Heritage',
	'Calvary',
	'Emmanuel'
];
export const churchNamesSecond: string[] = [
	'Baptist',
	'Bible',
	'Community',
	'Fellowship',
	'Chapel',
	'Tabernacle',
	'Church'
];

export function generateRandomChurches(count: number): Church[] {
	const churches: Church[] = [];
	// Approximate GA bounds
	const latMin = 30.5,
		latMax = 35.0;
	const lonMin = -85.5,
		lonMax = -81.0;

	while (churches.length < count) {
		const name = `${churchNamesFirst[Math.floor(Math.random() * churchNamesFirst.length)]} ${churchNamesSecond[Math.floor(Math.random() * churchNamesSecond.length)]} Church`;
		const lat = latMin + Math.random() * (latMax - latMin);
		const lng = lonMin + Math.random() * (lonMax - lonMin);

		// Filter to avoid South Carolina (approximate diagonal exclusion)
		// As we go North (higher lat), the border moves West (lower lng/more negative).
		// Exclude if too far East for a given Latitude.

		// Lower SC / Savannah River area
		if (lat > 32.2 && lng > -81.3) continue;

		// Middle SC border
		if (lat > 33.0 && lng > -81.8) continue;

		// Upper SC border
		if (lat > 34.0 && lng > -82.8) continue;

		churches.push({ name, lat, lng });
	}
	return churches;
=======
export const churchNamesFirst = ["Grace", "Faith", "Truth", "Sovereign", "Reformed", "Community", "Hope", "Victory", "Peace", "Redeemer", "Providence", "Trinity", "Cornerstone", "Living", "Heritage", "Calvary", "Emmanuel"];
export const churchNamesSecond = ["Baptist", "Bible", "Community", "Fellowship", "Chapel", "Tabernacle", "Church"];

export function generateRandomChurches(count: number) {
    const churches = [];
    // Approximate GA bounds
    const latMin = 30.5, latMax = 35.0;
    const lonMin = -85.5, lonMax = -81.0;

    while (churches.length < count) {
        const name = `${churchNamesFirst[Math.floor(Math.random() * churchNamesFirst.length)]} ${churchNamesSecond[Math.floor(Math.random() * churchNamesSecond.length)]} Church`;
        const lat = latMin + Math.random() * (latMax - latMin);
        const lng = lonMin + Math.random() * (lonMax - lonMin);

        // Filter to avoid South Carolina (approximate diagonal exclusion)
        // As we go North (higher lat), the border moves West (lower lng/more negative).
        // Exclude if too far East for a given Latitude.

        // Lower SC / Savannah River area
        if (lat > 32.2 && lng > -81.3) continue;

        // Middle SC border
        if (lat > 33.0 && lng > -81.8) continue;

        // Upper SC border
        if (lat > 34.0 && lng > -82.8) continue;

        churches.push({ name, lat, lng });
    }
    return churches;
>>>>>>> Content-Changes-By-Skyler
}
