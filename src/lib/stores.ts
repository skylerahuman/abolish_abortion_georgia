import { writable } from 'svelte/store';

/**
 * Tracks the current step of the multi-step form.
 * 1: District Finder
 * 2: Contact Info
 * 3: Interests & Church
 */
export const formStep = writable(1);

/**
 * Tracks whether the mobile overlay menu is open.
 */
export const mobileMenuOpen = writable(false);

/**
 * Controls the support modal visibility.
 */
export const supportModalOpen = writable(false);

/**
 * Tracks which support modal type is open: 'prayer' | 'donate' | null
 */
export const supportModalType = writable<'prayer' | 'donate' | null>(null);
