from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    try:
        # Navigate to the timeline page
        print("Navigating to /georgia-battle...")
        page.goto("http://localhost:5173/georgia-battle")

        # Wait for network idle to ensure everything loaded
        page.wait_for_load_state("networkidle")

        # Check if timeline cards are present
        cards = page.locator(".timeline-card")
        count = cards.count()
        print(f"Found {count} timeline cards.")

        if count == 0:
            print("ERROR: No timeline cards found!")
            page.screenshot(path="verification/error.png")
            return

        # Scroll to trigger intersection observer
        print("Scrolling to trigger animations...")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

        # Wait for animations to complete
        page.wait_for_timeout(2000)

        # Take a screenshot
        screenshot_path = "verification/timeline.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as p:
        run(p)
