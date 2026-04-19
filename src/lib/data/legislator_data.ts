import type { Legislator, Committee, Stance } from '../types';

// Helper to create basic legislator entry
const createRep = (
	name: string,
	district: string,
	party: 'R' | 'D',
	stance: Stance = 'undecided'
): Legislator => ({
	id: name.toLowerCase().replace(/ /g, '-'),
	name,
	chamber: 'house',
	district,
	party,
	stance,
	roles: [],
	committees: []
});

const createSen = (
	name: string,
	district: string,
	party: 'R' | 'D',
	stance: Stance = 'undecided'
): Legislator => ({
	id: name.toLowerCase().replace(/ /g, '-'),
	name,
	chamber: 'senate',
	district,
	party,
	stance,
	roles: [],
	committees: []
});

// --- Leadership ---
export const leadership: Legislator[] = [
	{
		...createRep('Jon Burns', '159', 'R', 'target'),
		roles: [{ title: 'Speaker of the House', priority: 1 }]
	},
	{
		...createSen('Burt Jones', 'LtGov', 'R', 'target'),
		roles: [{ title: 'Lieutenant Governor', priority: 1 }]
	}
];

// --- Sponsors & Allies (Tier 3) ---
export const sponsors: Legislator[] = [
	createRep('Emory Dunahoo', '31', 'R', 'sponsor'),
	createRep('Mike Cameron', '1', 'R', 'sponsor'),
	createRep('Charlice Byrd', '20', 'R', 'sponsor'),
	createRep('Danny Mathis', '149', 'R', 'sponsor'),
	createRep('Trey Kelley', '16', 'R', 'sponsor'),
	createRep('Martin Momtahan', '17', 'R', 'sponsor')
	// Add logic for ~21 others later
];

// --- House Judiciary Non-Civil Members (Tier 2) ---
// Chair: Tyler Paul Smith, VC: Deborah Silcox, Sec: Soo Hong
// Members: Ballinger, Byrd, Cooper, Crowe, Efstration, Gullett, Gunter, Holly, Kendrick, Leverett, Neal, Panitch, Roberts
export const houseJudiciaryNonCivilMembers: Legislator[] = [
	{
		...createRep('Tyler Paul Smith', '18', 'R', 'target'),
		roles: [{ title: 'Committee Chair', priority: 1 }]
	},
	{
		...createRep('Deborah Silcox', '53', 'R', 'target'),
		roles: [{ title: 'Vice Chair', priority: 2 }]
	},
	{ ...createRep('Soo Hong', '103', 'R', 'target'), roles: [{ title: 'Secretary', priority: 2 }] },
	createRep('Mandi Ballinger', '23', 'R', 'target'),
	// Charlice Byrd is already in sponsors, we need to merge roles if duplicate
	createRep('Sharon Cooper', '45', 'R', 'target'),
	createRep('Clint Crowe', '118', 'R', 'target'),
	createRep('Chuck Efstration', '104', 'R', 'target'),
	createRep('Joseph Gullett', '19', 'R', 'target'),
	createRep('Stan Gunter', '8', 'R', 'target'),
	createRep('Matt Holly', 'XXX', 'R', 'target'), // Need district
	createRep('Lane Kendrick', 'XXX', 'D', 'opposed'), // Assuming Dem based on typical patterns or Undecided. Keeping simplified for now.
	createRep('Rob Leverett', '123', 'R', 'target'),
	createRep('Representative Neal', 'XXX', 'D', 'opposed'),
	createRep('Esther Panitch', '51', 'D', 'opposed'),
	createRep('Representative Roberts', 'XXX', 'D', 'opposed')
];

// --- Senate Judiciary Members (Tier 2) ---
export const senateJudiciaryMembers: Legislator[] = [
	{
		...createSen('Brian Strickland', '17', 'R', 'target'),
		roles: [{ title: 'Committee Chair', priority: 1 }]
	}
	// Full list to be populated
];

// --- Central Data Registry ---
// This combines all defined legislators into a map for easy lookup by Name or ID
const allLegislators = [
	...leadership,
	...sponsors,
	...houseJudiciaryNonCivilMembers,
	...senateJudiciaryMembers
];

export const LegislatorRegistry: Record<string, Legislator> = {};

allLegislators.forEach((leg) => {
	// Basic deduplication logic
	if (LegislatorRegistry[leg.id]) {
		// Merge roles if exists
		LegislatorRegistry[leg.id].roles.push(...leg.roles);
		// Prioritize 'sponsor' stance over 'target'
		if (leg.stance === 'sponsor') {
			LegislatorRegistry[leg.id].stance = 'sponsor';
		}
	} else {
		LegislatorRegistry[leg.id] = leg;
	}
});

// Helper to look up by exact name (from GeoJSON data)
export function findLegislatorByName(name: string): Legislator | undefined {
	// Normalize name for comparison
	const searchId = name.toLowerCase().replace(/ /g, '-');

	// Direct ID match
	if (LegislatorRegistry[searchId]) return LegislatorRegistry[searchId];

	// Fuzzy/Partial match could go here
	return Object.values(LegislatorRegistry).find((l) => l.name.toLowerCase() === name.toLowerCase());
}
