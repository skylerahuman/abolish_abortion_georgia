from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Home Page
        print("Visiting Home Page...")
        page.goto("http://localhost:5174/")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/home.png")
        print("Home page screenshot saved.")

        # 2. Verify Timeline Page
        print("Visiting Timeline Page...")
        page.goto("http://localhost:5174/georgia-battle")
        page.wait_for_load_state("networkidle")
        # Scroll a bit to trigger observers
        page.evaluate("window.scrollTo(0, 500)")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/timeline.png")
        print("Timeline page screenshot saved.")

        # 3. Verify Join Page (Dynamic Import check)
        print("Visiting Join Page...")
        page.goto("http://localhost:5174/join")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/join.png")
        print("Join page screenshot saved.")

        # 4. Verify Support Page (No Alert check)
        # To check for no alert, we handle dialog event. If one pops up, we fail (or log it).
        print("Visiting Support Page...")

        dialog_triggered = False
        def handle_dialog(dialog):
            nonlocal dialog_triggered
            dialog_triggered = True
            print(f"Alert detected: {dialog.message}")
            dialog.dismiss()

        page.on("dialog", handle_dialog)

        page.goto("http://localhost:5174/support")
        page.wait_for_load_state("networkidle")

        if dialog_triggered:
            print("FAILURE: Alert was triggered on Support page!")
        else:
            print("SUCCESS: No alert triggered on Support page.")

        page.screenshot(path="verification/support.png")
        print("Support page screenshot saved.")

        browser.close()

if __name__ == "__main__":
    run()
