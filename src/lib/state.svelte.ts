import { type ContactForm } from '$lib/types';

class RegistrationState {
	step = $state(1);
	form = $state<ContactForm>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		district: null,
		homeChurch: '',
		interests: []
	});
	submitted = $state(false);

	nextStep() {
		if (this.step < 3) {
			this.step += 1;
		}
	}

	prevStep() {
		if (this.step > 1) {
			this.step -= 1;
		}
	}

	reset() {
		this.step = 1;
		this.submitted = false;
		this.form = {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			district: null,
			homeChurch: '',
			interests: []
		};
	}
}

export const registrationState = new RegistrationState();
