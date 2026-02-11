export interface TimelineEvent {
	id: string;
	date: string;
	title: string;
	description: string;
	type: 'tragedy' | 'hope' | 'mixed';
	link?: string;
	linkText?: string;
}

export interface ContactForm {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	city: string;
	address: string;
	district: string | null;
	homeChurch: string;
	interests: string[];
}

export interface DistrictMap {
    [zip: string]: string;
}

export interface Church {
    name: string;
    lat: number;
    lng: number;
}
