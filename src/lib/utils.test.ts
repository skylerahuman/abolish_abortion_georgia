import { describe, it, expect } from 'vitest';
import { generateRandomChurches } from './utils';

describe('generateRandomChurches', () => {
    it('should generate the requested number of churches', () => {
        const count = 50;
        const churches = generateRandomChurches(count);
        expect(churches.length).toBe(count);
    });

    it('should generate churches with valid names', () => {
        const churches = generateRandomChurches(10);
        churches.forEach(church => {
            expect(church.name).toBeTruthy();
            expect(church.name).toMatch(/Church$/);
        });
    });

    it('should respect the South Carolina exclusion zone', () => {
        // Generate a large number to ensure coverage of the exclusion logic
        const churches = generateRandomChurches(1000);

        churches.forEach(church => {
            const { lat, lng } = church;

            // Lower SC / Savannah River area logic from utils.ts
            if (lat > 32.2 && lat <= 33.0) {
                 expect(lng).toBeLessThanOrEqual(-81.3);
            }

            // Middle SC border logic from utils.ts
            if (lat > 33.0 && lat <= 34.0) {
                expect(lng).toBeLessThanOrEqual(-81.8);
            }

            // Upper SC border logic from utils.ts
            if (lat > 34.0) {
                expect(lng).toBeLessThanOrEqual(-82.8);
            }
        });
    });
});
