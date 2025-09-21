// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("WordPress Gutenberg Block Tests", () => {
	test("should load the WordPress admin page", async ({ page }) => {
		await page.goto("/wp-admin");

		// Check if we're on the login page or admin dashboard
		await expect(page).toHaveTitle(/WordPress|Log In/);
	});

	test("should be able to create a new post with blocks", async ({ page }) => {
		await page.goto("/wp-admin/post-new.php");

		// Wait for the Gutenberg editor to load
		await page.waitForSelector(".edit-post-visual-editor", { timeout: 10000 });

		// Check if the block editor is present
		await expect(page.locator(".edit-post-visual-editor")).toBeVisible();
	});

	test("should display the custom block in the block inserter", async ({
		page,
	}) => {
		await page.goto("/wp-admin/post-new.php");

		// Wait for the Gutenberg editor to load
		await page.waitForSelector(".edit-post-visual-editor", { timeout: 10000 });

		// Click the block inserter button
		await page.click('button[aria-label="Add block"]');

		// Look for our custom block in the inserter
		// Note: This test will need to be updated once the block is properly registered
		await expect(page.locator("text=Meu Primeiro Block")).toBeVisible();
	});
});
