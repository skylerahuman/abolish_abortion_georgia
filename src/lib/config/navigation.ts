import { base } from '$app/paths';

const B = base || '';

export const Routes = {
	HOME: `${B}/`,
	GEORGIA_BATTLE: `${B}/georgia-battle`,
	TIMELINE: `${B}/timeline`,
	FAQS: `${B}/faqs`,
	JOIN: `${B}/join`,
	SUPPORT: `${B}/support`,
	ABOUT: `${B}/about`,
	BILL_ANALYSIS: `${B}/bill-analysis`,
	BURNS_ACCOUNTABILITY: `${B}/burns-accountability`,
	REP_CALLS: `${B}/rep-calls`,
	GET_INVOLVED: `${B}/get-involved`,
	ABOLITION_BASICS: `${B}/abolition-basics`,
	FOR_PASTORS: `${B}/for-pastors`,
	RESPOND: `${B}/respond`,

	FILL_THE_STEPS: `${B}/fill-the-steps`,
	FEB_20_2026: `${B}/feb-20-2026`,
	TWO_20_2026: `${B}/2-20-2026`
} as const;

export const ExternalLinks = {
	DONORBOX: 'https://donorbox.org/regular-donations-15',
	PLURAL_POLICY: 'https://pluralpolicy.com/find-your-legislator/',
	LEGIS_GA: 'https://www.legis.ga.gov/legislation/64602',
	EMORY_DUNAHOO: 'https://www.emorydunahoo.com/',
	YOUTUBE: 'https://www.youtube.com/watch?v=k33epqzJIlM',
	EMAIL_JOIN: 'mailto:join@operationgospel.life',
	EMAIL_INFO: 'mailto:info@operationgospel.com'
} as const;

export const PagesWithHiddenNav: string[] = [
	`${B}/fill-the-steps`,
	`${B}/feb-20-2026`,
	`${B}/2-20-2026`
];

export interface NavCategory {
	name: string;
	links: Array<{ label: string; href: string; description?: string }>;
}

export const NavCategories: NavCategory[] = [
	{
		name: 'Learn',
		links: [
			{ label: 'Abolition Basics', href: Routes.ABOLITION_BASICS },
			{ label: 'Georgia Battle', href: Routes.GEORGIA_BATTLE },
			{ label: 'Hold Burns Accountable', href: Routes.BURNS_ACCOUNTABILITY },
			{ label: 'FAQs', href: Routes.FAQS },
			{ label: 'About Operation Gospel', href: Routes.ABOUT }
		]
	},
	{
		name: 'Take Action',
		links: [
			{ label: 'Join Us', href: Routes.JOIN },
			{ label: 'For Pastors', href: Routes.FOR_PASTORS },
			{ label: 'Call Your Rep', href: Routes.REP_CALLS },
			{ label: 'Support - Prayer', href: `${Routes.SUPPORT}#prayer` },
			{ label: 'Support - Donations', href: `${Routes.SUPPORT}#donations` }
		]
	}
];
