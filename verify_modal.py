from playwright.sync_api import sync_playwright, expect

def verify_exegesis_modal():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use localhost:5173 as per memory
        page = browser.new_page()

        try:
            print("Navigating to /bill-analysis...")
            page.goto("http://localhost:5173/bill-analysis")

            # Wait for hydration/load
            page.wait_for_load_state("networkidle")

            print("Clicking 'Read Full Exegesis' button...")
            # Click the first one
            page.get_by_text("Read Full Exegesis").first.click()

            print("Waiting for modal...")
            # Expect dialog role
            modal = page.get_by_role("dialog")
            expect(modal).to_be_visible()

            # Check for aria-modal="true"
            expect(modal).to_have_attribute("aria-modal", "true")

            # Check for aria-labelledby
            expect(modal).to_have_attribute("aria-labelledby", "modal-title")

            # Check focus is inside modal (optional, harder to check in headless strictly, but we can try)
            # Actually, standard screenshot verification is what's asked.

            print("Taking screenshot...")
            page.screenshot(path="/app/verification_modal.png")

            print("Verification successful!")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="/app/verification_failure.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_exegesis_modal()
