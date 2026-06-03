from playwright.sync_api import sync_playwright
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # Landing Page
        page.goto("http://localhost:3000")
        page.wait_for_load_state("domcontentloaded")
        time.sleep(3)
        page.screenshot(path="verification/current_landing_desktop.png", full_page=True)

        # Login Page
        page.goto("http://localhost:3000/login")
        page.wait_for_load_state("domcontentloaded")
        time.sleep(2)
        page.screenshot(path="verification/current_login_desktop.png")

        # Register Page
        page.goto("http://localhost:3000/register")
        page.wait_for_load_state("domcontentloaded")
        time.sleep(2)
        page.screenshot(path="verification/current_register_desktop.png")

        browser.close()
        print("Screenshots captured.")

if __name__ == "__main__":
    if not os.path.exists("verification"):
        os.makedirs("verification")
    run()
