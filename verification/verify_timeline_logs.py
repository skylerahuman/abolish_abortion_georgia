from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Capture console logs
    page.on("console", lambda msg: print(f"BROWSER: {msg.text}"))

    try:
        # Navigate to the timeline page
        print("Navigating to /georgia-battle...")
        page.goto("http://localhost:5173/georgia-battle")

        # Wait for network idle to ensure everything loaded
        page.wait_for_load_state("networkidle")

        # Scroll to each card specifically
        cards = page.locator(".timeline-card")
        count = cards.count()
        print(f"Scrolling to {count} cards...")

        for i in range(count):
            print(f"Scrolling to card {i}")
            cards.nth(i).scroll_into_view_if_needed()
            page.wait_for_timeout(500)

        # Wait a bit more for animations
        page.wait_for_timeout(1000)

        # Check intersection observer status
        # We can check if the inner content div exists
        inner_content = page.locator(".timeline-card .animate-fade-in-left")
        visible_count = inner_content.count()
        print(f"Found {visible_count} visible timeline cards (inner content).")

        if visible_count == 0:
            print("DEBUG: IntersectionObserver might not be working.")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as p:
        run(p)
