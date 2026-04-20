import { neon } from '@neondatabase/serverless';
import { json } from '@sveltejs/kit';
import { DATABASE_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

const sql = neon(DATABASE_URL);

// Validate email format
function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Sanitize string input (basic XSS prevention)
function sanitize(str: string): string {
	return str.trim().slice(0, 500);
}

// Sanitize array input
function sanitizeArray(arr: string[]): string[] {
	return arr.filter((item) => /^[a-z0-9-]+$/.test(item)).slice(0, 10);
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		const { firstName, lastName, email, city, district, homeChurch, interests, phone, outOfState } = body;

		if (!firstName || !lastName || !email || !city) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		if (!isValidEmail(email)) {
			return json({ error: 'Invalid email format' }, { status: 400 });
		}

		const result = await sql`
			INSERT INTO volunteers (
				first_name,
				last_name,
				email,
				phone,
				city,
				state,
				district,
				home_church,
				interests,
				out_of_state
			) VALUES (
				${sanitize(firstName)},
				${sanitize(lastName)},
				${sanitize(email).toLowerCase()},
				${phone ? sanitize(phone) : null},
				${sanitize(city)},
				'GA',
				${district ? sanitize(district) : null},
				${homeChurch ? sanitize(homeChurch) : null},
				${interests ? sanitizeArray(interests) : []},
				${outOfState === true}
			)
			RETURNING id
		`;

		return json({ success: true, id: result[0].id }, { status: 201 });
	} catch (err) {
		console.error('Volunteer submission error:', err);
		return json({ error: 'Database error. Please try again.' }, { status: 500 });
	}
};
