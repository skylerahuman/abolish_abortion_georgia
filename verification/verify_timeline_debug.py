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

        # Scroll to bottom
        print("Scrolling to bottom...")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

        # Wait a bit
        page.wait_for_timeout(1000)

        # Check intersection observer status
        # We can check if the inner content div exists
        inner_content = page.locator(".timeline-card .animate-fade-in-left")
        count = inner_content.count()
        print(f"Found {count} visible timeline cards (inner content).")

        if count == 0:
            print("DEBUG: IntersectionObserver might not be working.")
            # Let's try to inspect the DOM
            html = page.content()
            # print(html) # Too large

        # Take a screenshot
        screenshot_path = "verification/timeline_debug.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as p:
        run(p)
