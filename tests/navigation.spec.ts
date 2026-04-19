<<<<<<< Updated upstream
import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
	test.describe('Overlay Menu Navigation', () => {
		test('should open overlay menu on mobile and display navigation links', async ({ page }) => {
			// Set mobile viewport
			await page.setViewportSize({ width: 375, height: 667 });

			// Navigate to homepage
			await page.goto('/');

			// Click hamburger menu button to open overlay
			const menuButton = page.getByRole('button', { name: /menu/i });
			await expect(menuButton).toBeVisible();
			await menuButton.click();

			// Wait for overlay to appear
			await expect(page.getByText('Learn')).toBeVisible({ timeout: 5000 });
			await expect(page.getByText('Take Action')).toBeVisible();
			await expect(page.getByText('About')).toBeVisible();
		});

		test('should display all Learn category links', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Open menu
			await page.getByRole('button', { name: /menu/i }).click();
			await expect(page.getByText('Learn')).toBeVisible({ timeout: 5000 });

			// Check Learn category links
			await expect(page.getByRole('link', { name: 'Abolition Basics' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Georgia Battle' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'HB 441 Analysis' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'FAQs' })).toBeVisible();
		});

		test('should display all Take Action category links', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Open menu
			await page.getByRole('button', { name: /menu/i }).click();
			await expect(page.getByText('Take Action')).toBeVisible({ timeout: 5000 });

			// Check Take Action category links
			await expect(page.getByRole('link', { name: 'Burns Accountability' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Call Your Rep' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Near Me' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Join the Fight' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Support Us' })).toBeVisible();
		});

		test('should display all About category links', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Open menu
			await page.getByRole('button', { name: /menu/i }).click();
			await expect(page.getByText('About')).toBeVisible({ timeout: 5000 });

			// Check About category links
			await expect(page.getByRole('link', { name: 'About Us' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'For Pastors' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Get Involved' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Timeline' })).toBeVisible();
		});

		test('should close menu and navigate when clicking a link', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Open menu
			await page.getByRole('button', { name: /menu/i }).click();
			await expect(page.getByText('Learn')).toBeVisible({ timeout: 5000 });

			// Click a link
			await page.getByRole('link', { name: 'FAQs' }).click();

			// Menu should close and page should navigate
			await expect(page).toHaveURL(/faqs/);
		});

		test('should have working CTA buttons in overlay', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Open menu
			await page.getByRole('button', { name: /menu/i }).click();
			await expect(page.getByText('Learn')).toBeVisible({ timeout: 5000 });

			// Click Join the Fight CTA
			await page.getByRole('link', { name: 'Join the Fight' }).first().click();
			await expect(page).toHaveURL(/join/);
		});
	});

	test.describe('Sidebar Navigation', () => {
		test('should display sidebar on burns accountability page', async ({ page }) => {
			await page.goto('/burns-accountability');
			await expect(page.getByText('Action Center')).toBeVisible();
		});

		test('should have correct sidebar links on burns accountability page', async ({ page }) => {
			await page.goto('/burns-accountability');

			// Check sidebar links
			await expect(page.getByRole('link', { name: 'Burns Accountability' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'View Bill Analysis' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Call Your Representative' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Join the Movement' })).toBeVisible();
		});

		test('should navigate when clicking sidebar links', async ({ page }) => {
			await page.goto('/burns-accountability');

			// Click Call Your Representative link
			await page.getByRole('link', { name: 'Call Your Representative' }).click();
			await expect(page).toHaveURL(/rep-calls/);
		});
	});

	test.describe('Footer Navigation', () => {
		test('should display footer with navigation links', async ({ page }) => {
			await page.goto('/');

			// Check footer categories are visible
			await expect(page.getByText('Learn').first()).toBeVisible();
			await expect(page.getByText('Take Action').first()).toBeVisible();
			await expect(page.getByText('About').first()).toBeVisible();
		});

		test('should navigate when clicking footer links', async ({ page }) => {
			await page.goto('/');

			// Click FAQ in footer
			await page.getByRole('link', { name: 'FAQs' }).last().click();
			await expect(page).toHaveURL(/faqs/);
		});
	});

	test.describe('Cross-Page Navigation', () => {
		test('should navigate from burns accountability to rep calls', async ({ page }) => {
			await page.goto('/burns-accountability');
			await page.getByRole('link', { name: 'Call Your Representative' }).click();
			await expect(page).toHaveURL(/rep-calls/);
		});

		test('should navigate from rep calls to burns accountability', async ({ page }) => {
			await page.goto('/rep-calls');
			await page.getByRole('link', { name: 'Learn more about the accountability campaign' }).click();
			await expect(page).toHaveURL(/burns-accountability/);
		});

		test('should have no console errors during navigation', async ({ page }) => {
			const consoleErrors: string[] = [];
			page.on('console', (msg) => {
				if (msg.type() === 'error') {
					consoleErrors.push(msg.text());
				}
			});

			// Navigate through several pages
			await page.goto('/');
			await page.getByRole('link', { name: 'FAQs' }).last().click();
			await expect(page).toHaveURL(/faqs/);

			await page.getByRole('button', { name: /menu/i }).click();
			await expect(page.getByText('Learn')).toBeVisible({ timeout: 5000 });
			await page.getByRole('link', { name: 'Join the Fight' }).first().click();
			await expect(page).toHaveURL(/join/);

			// Filter out known non-critical errors
			const criticalErrors = consoleErrors.filter(
				(err) => !err.includes('favicon') && !err.includes('DevTools')
			);
			expect(criticalErrors).toHaveLength(0);
		});
	});

	test.describe('Active Link Highlighting', () => {
		test('should highlight active link in overlay menu', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/faqs');

			// Open menu
			await page.getByRole('button', { name: /menu/i }).click();
			await expect(page.getByText('Learn')).toBeVisible({ timeout: 5000 });

			// FAQs link should have active styling (contains 'bg-red' or similar)
			const faqLink = page.getByRole('link', { name: 'FAQs' });
			await expect(faqLink).toBeVisible();
			const linkClasses = await faqLink.getAttribute('class');
			expect(linkClasses).toMatch(/red|bg-red|crimson/i);
		});
	});
});
=======
import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
	test.describe('Overlay Menu Navigation', () => {
		test('should open overlay menu on mobile and display navigation links', async ({ page }) => {
			// Set mobile viewport
			await page.setViewportSize({ width: 375, height: 667 });

			// Navigate to homepage
			await page.goto('/');

			// Click hamburger menu button to open overlay
			const menuButton = page.getByRole('button', { name: /menu/i });
			await expect(menuButton).toBeVisible();
			await menuButton.click();

			// Wait for overlay to appear
			await expect(page.getByText('Learn')).toBeVisible({ timeout: 5000 });
			await expect(page.getByText('Take Action')).toBeVisible();
			await expect(page.getByText('About')).toBeVisible();
		});

		test('should display all Learn category links', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Open menu
			await page.getByRole('button', { name: /menu/i }).click();
			await expect(page.getByText('Learn')).toBeVisible({ timeout: 5000 });

			// Check Learn category links
			await expect(page.getByRole('link', { name: 'Abolition Basics' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Georgia Battle' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'HB 441 Analysis' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'FAQs' })).toBeVisible();
		});

		test('should display all Take Action category links', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Open menu
			await page.getByRole('button', { name: /menu/i }).click();
			await expect(page.getByText('Take Action')).toBeVisible({ timeout: 5000 });

			// Check Take Action category links
			await expect(page.getByRole('link', { name: 'Burns Accountability' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Call Your Rep' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Near Me' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Join the Fight' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Support Us' })).toBeVisible();
		});

		test('should display all About category links', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Open menu
			await page.getByRole('button', { name: /menu/i }).click();
			await expect(page.getByText('About')).toBeVisible({ timeout: 5000 });

			// Check About category links
			await expect(page.getByRole('link', { name: 'About Us' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'For Pastors' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Get Involved' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Timeline' })).toBeVisible();
		});

		test('should close menu and navigate when clicking a link', async ({ page }) => {
			// Capture ALL console logs including errors
			const consoleLogs: string[] = [];
			page.on('console', (msg) => {
				consoleLogs.push(`${msg.type()}: ${msg.text()}`);
			});
			page.on('pageerror', (err) => {
				consoleLogs.push(`PAGE ERROR: ${err.message}`);
			});

			// Capture all uncaught errors
			page.on('crash', () => {
				consoleLogs.push('PAGE CRASHED');
			});

			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Log all console output
			console.log('Initial console logs:', consoleLogs);
			consoleLogs.length = 0; // Clear

			// Check if Svelte components are hydrated
			const bodyContent = await page.evaluate(() => document.body.innerHTML.substring(0, 500));
			console.log('Body content start:', bodyContent);

			// Check if the button has onclick handler
			const buttonInfo = await page.evaluate(() => {
				const btn =
					document.querySelector('[aria-label="Open menu"]') ||
					document.querySelector('[aria-label="Close menu"]');
				if (!btn) return 'No button found';
				return {
					tagName: btn.tagName,
					onclick: btn.getAttribute('onclick'),
					outerHTML: btn.outerHTML.substring(0, 200),
					listeners: Object.keys(btn).filter((k) => k.startsWith('on'))
				};
			});
			console.log('Button info:', JSON.stringify(buttonInfo, null, 2));

			// Open menu - try both methods
			const menuButton = page.getByRole('button', { name: /menu/i });
			console.log('Found menu button:', await menuButton.isVisible());

			// Try clicking via JS to bypass any event issues
			await page.evaluate(() => {
				const btn =
					document.querySelector('[aria-label="Open menu"]') ||
					document.querySelector('[aria-label="Close menu"]');
				if (btn) {
					console.log('Found button via evaluate, dispatching click');
					btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
				} else {
					console.log('No button found via evaluate');
				}
			});

			// Also try regular click
			await menuButton.click({ force: true });
			await page.waitForTimeout(1000);

			// Log console output after click
			console.log('Console logs after click:', consoleLogs);

			await expect(page.getByText('Learn')).toBeVisible({ timeout: 5000 });

			// Click a link
			await page.getByRole('link', { name: 'FAQs' }).click();

			// Menu should close and page should navigate
			await expect(page).toHaveURL(/faqs/);
		});

		test('should have working CTA buttons in overlay', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Open menu
			await page.getByRole('button', { name: /menu/i }).click();
			await expect(page.getByText('Learn')).toBeVisible({ timeout: 5000 });

			// Click Join the Fight CTA
			await page.getByRole('link', { name: 'Join the Fight' }).first().click();
			await expect(page).toHaveURL(/join/);
		});
	});

	test.describe('Sidebar Navigation', () => {
		test('should display sidebar on burns accountability page', async ({ page }) => {
			await page.goto('/burns-accountability');
			await expect(page.getByText('Action Center')).toBeVisible();
		});

		test('should have correct sidebar links on burns accountability page', async ({ page }) => {
			await page.goto('/burns-accountability');

			// Check sidebar links
			await expect(page.getByRole('link', { name: 'Burns Accountability' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'View Bill Analysis' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Call Your Representative' })).toBeVisible();
			await expect(page.getByRole('link', { name: 'Join the Movement' })).toBeVisible();
		});

		test('should navigate when clicking sidebar links', async ({ page }) => {
			await page.goto('/burns-accountability');

			// Click Call Your Representative link
			await page.getByRole('link', { name: 'Call Your Representative' }).click();
			await expect(page).toHaveURL(/rep-calls/);
		});
	});

	test.describe('Footer Navigation', () => {
		test('should display footer with navigation links', async ({ page }) => {
			await page.goto('/');

			// Check footer categories are visible
			await expect(page.getByText('Learn').first()).toBeVisible();
			await expect(page.getByText('Take Action').first()).toBeVisible();
			await expect(page.getByText('About').first()).toBeVisible();
		});

		test('should navigate when clicking footer links', async ({ page }) => {
			await page.goto('/');

			// Click FAQ in footer
			await page.getByRole('link', { name: 'FAQs' }).last().click();
			await expect(page).toHaveURL(/faqs/);
		});
	});

	test.describe('Cross-Page Navigation', () => {
		test('should navigate from burns accountability to rep calls', async ({ page }) => {
			await page.goto('/burns-accountability');
			await page.getByRole('link', { name: 'Call Your Representative' }).click();
			await expect(page).toHaveURL(/rep-calls/);
		});

		test('should navigate from rep calls to burns accountability', async ({ page }) => {
			await page.goto('/rep-calls');
			await page
				.getByRole('link', { name: 'Learn more about the accountability campaign' })
				.click();
			await expect(page).toHaveURL(/burns-accountability/);
		});

		test('should have no console errors during navigation', async ({ page }) => {
			const consoleErrors: string[] = [];
			page.on('console', (msg) => {
				if (msg.type() === 'error') {
					consoleErrors.push(msg.text());
				}
			});

			// Navigate through several pages
			await page.goto('/');
			await page.getByRole('link', { name: 'FAQs' }).last().click();
			await expect(page).toHaveURL(/faqs/);

			await page.getByRole('button', { name: /menu/i }).click();
			await expect(page.getByText('Learn')).toBeVisible({ timeout: 5000 });
			await page.getByRole('link', { name: 'Join the Fight' }).first().click();
			await expect(page).toHaveURL(/join/);

			// Filter out known non-critical errors
			const criticalErrors = consoleErrors.filter(
				(err) => !err.includes('favicon') && !err.includes('DevTools')
			);
			expect(criticalErrors).toHaveLength(0);
		});
	});

	test.describe('Active Link Highlighting', () => {
		test('should highlight active link in overlay menu', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/faqs');

			// Open menu
			await page.getByRole('button', { name: /menu/i }).click();
			await expect(page.getByText('Learn')).toBeVisible({ timeout: 5000 });

			// FAQs link should have active styling (contains 'bg-red' or similar)
			const faqLink = page.getByRole('link', { name: 'FAQs' });
			await expect(faqLink).toBeVisible();
			const linkClasses = await faqLink.getAttribute('class');
			expect(linkClasses).toMatch(/red|bg-red|crimson/i);
		});
	});
});
>>>>>>> Stashed changes
