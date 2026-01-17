from playwright.sync_api import sync_playwright

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Desktop View
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # Landing Page
        print("Navigating to Landing Page...")
        page.goto("http://localhost:3000")
        page.wait_for_timeout(2000) # Wait for animations/load
        page.screenshot(path="verification/landing_desktop.png")
        print("Captured landing_desktop.png")

        # Login Page
        print("Navigating to Login Page...")
        page.goto("http://localhost:3000/login")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/login_desktop.png")
        print("Captured login_desktop.png")

        # Register Page
        print("Navigating to Register Page...")
        page.goto("http://localhost:3000/register")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/register_desktop.png")
        print("Captured register_desktop.png")

        # Mobile View (Responsive Check)
        page_mobile = browser.new_page(viewport={'width': 375, 'height': 667}, user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1')

        # Landing Page Mobile
        print("Navigating to Landing Page (Mobile)...")
        page_mobile.goto("http://localhost:3000")
        page_mobile.wait_for_timeout(2000)
        page_mobile.screenshot(path="verification/landing_mobile.png")
        print("Captured landing_mobile.png")

        # Navbar Check (Mobile) - Assuming there is a hamburger menu or similar if responsive
        # But for now just the page layout is enough to verify responsiveness

        browser.close()

if __name__ == "__main__":
    verify_ui()
