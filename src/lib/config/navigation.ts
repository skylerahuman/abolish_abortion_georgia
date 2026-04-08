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
	THE_STANDARD: `${base}/the-standard`,
	THE_CONFESSION: `${base}/the-confession`,
	THE_GATHERING: `${base}/the-gathering`,
	NEAR_ME: `${base}/near-me`,
	GET_INVOLVED: `${base}/get-involved`,
	WHO_ARE_YOU: `${base}/who-are-you`,
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
			{ label: 'Abolition Basics', href: Routes.ABOLITION_BASICS, description: 'Foundational principles of abolition' },
			{ label: 'Bill Analysis', href: Routes.BILL_ANALYSIS, description: 'Line-by-line breakdown of HB 441' },
			{ label: 'FAQs', href: Routes.FAQS, description: 'Common questions answered' },
			{ label: 'The Standard', href: Routes.THE_STANDARD, description: 'Our guiding principles' },
			{ label: 'The Confession', href: Routes.THE_CONFESSION, description: 'Statement of faith and purpose' }
		]
	},
	{
		name: 'Take Action',
		links: [
			{ label: 'Join the Fight', href: Routes.JOIN, description: 'Sign up to get involved' },
			{ label: 'Rep Calls', href: Routes.REP_CALLS, description: 'Contact your representatives' },
			{ label: 'Burns Accountability', href: Routes.BURNS_ACCOUNTABILITY, description: 'Hold leadership accountable' },
			{ label: 'Support', href: Routes.SUPPORT, description: 'Pray and give' },
			{ label: 'For Pastors', href: Routes.FOR_PASTORS, description: 'Resources for church leaders' }
		]
	},
	{
		name: 'About',
		links: [
			{ label: 'Georgia Battle', href: Routes.GEORGIA_BATTLE, description: 'The current legislative fight' },
			{ label: 'Timeline', href: Routes.TIMELINE, description: 'Historical record and campaign' },
			{ label: 'The Gathering', href: Routes.THE_GATHERING, description: 'Our community events' },
			{ label: 'About Us', href: Routes.ABOUT, description: 'Who we are' }
		]
	}
];

export const PrimaryNavItems = [
	{ href: Routes.HOME, label: 'Home' },
	{ href: Routes.GEORGIA_BATTLE, label: 'Timeline' },
	{ href: Routes.FAQS, label: 'FAQs' }
];
