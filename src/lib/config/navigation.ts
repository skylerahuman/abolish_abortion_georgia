import { base } from '$app/paths';

export const Routes = {
	HOME: `${base}/`,
	GEORGIA_BATTLE: `${base}/georgia-battle`,
	TIMELINE: `${base}/timeline`,
	FAQS: `${base}/faqs`,
	JOIN: `${base}/join`,
	SUPPORT: `${base}/support`,
	ABOUT: `${base}/about`,
	BILL_ANALYSIS: `${base}/bill-analysis`,
	BURNS_ACCOUNTABILITY: `${base}/burns-accountability`,
	REP_CALLS: `${base}/rep-calls`,
	NEAR_ME: `${base}/near-me`,
	GET_INVOLVED: `${base}/get-involved`,
	ABOLITION_BASICS: `${base}/abolition-basics`,
	FOR_PASTORS: `${base}/for-pastors`,
	RESPOND: `${base}/respond`,
	START: `${base}/start`,
	FILL_THE_STEPS: `${base}/fill-the-steps`,
	FEB_20_2026: `${base}/feb-20-2026`,
	TWO_20_2026: `${base}/2-20-2026`
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

export const PagesWithHiddenNav = [
	`${base}/fill-the-steps`,
	`${base}/feb-20-2026`,
	`${base}/2-20-2026`
] as const;

export interface NavCategory {
	name: string;
	links: Array<{ label: string; href: string; description?: string }>;
}

export const NavCategories: NavCategory[] = [
	{
		name: 'Learn',
		links: [
			{ label: 'Abolition Basics', href: Routes.ABOLITION_BASICS },
			{ label: 'HB 441 Analysis', href: Routes.BILL_ANALYSIS },
			{ label: 'FAQs', href: Routes.FAQS }
		]
	},
	{
		name: 'Take Action',
		links: [
			{ label: 'Burns Accountability', href: Routes.BURNS_ACCOUNTABILITY },
			{ label: 'Call Your Rep', href: Routes.REP_CALLS },
			{ label: 'Join the Fight', href: Routes.JOIN },
			{ label: 'Support Us', href: Routes.SUPPORT }
		]
	},
	{
		name: 'About',
		links: [
			{ label: 'About Us', href: Routes.ABOUT },
			{ label: 'For Pastors', href: Routes.FOR_PASTORS },
			{ label: 'Timeline', href: Routes.TIMELINE }
		]
	}
];
