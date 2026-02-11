import { writable } from 'svelte/store';

/**
 * Tracks the current step of the multi-step form.
 * 1: District Finder
 * 2: Contact Info
 * 3: Interests & Church
 */
export const formStep = writable(1);
