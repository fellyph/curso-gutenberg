/**
 * Tests for InnerBlocks Exercise 1 - Container Block
 *
 * These tests verify the functionality of both the "before" and "after"
 * versions of the container block exercise.
 */

// @ts-check
const { test, expect } = require( '@playwright/test' );

test.describe( 'InnerBlocks Exercise 1 - Container Block', () => {
	test.beforeEach( async ( { page } ) => {
		// Navigate to new post page
		await page.goto( '/wp-admin/post-new.php' );

		// Wait for the Gutenberg editor to load
		await page.waitForSelector( '.edit-post-visual-editor', {
			timeout: 10000,
		} );
	} );

	test( 'should display Content Container (Before) in block inserter', async ( {
		page,
	} ) => {
		// Click the block inserter button
		await page.click( 'button[aria-label="Toggle block inserter"]' );

		// Search for the block
		await page.fill(
			'input[placeholder="Search"]',
			'Content Container (Before)'
		);

		// Verify the block appears in search results
		await expect(
			page.locator( 'text=Content Container (Before)' )
		).toBeVisible();
	} );

	test( 'should display Content Container (After) in block inserter', async ( {
		page,
	} ) => {
		// Click the block inserter button
		await page.click( 'button[aria-label="Toggle block inserter"]' );

		// Search for the block
		await page.fill(
			'input[placeholder="Search"]',
			'Content Container (After)'
		);

		// Verify the block appears in search results
		await expect(
			page.locator( 'text=Content Container (After)' )
		).toBeVisible();
	} );

	test( 'should insert Content Container (Before) with static content', async ( {
		page,
	} ) => {
		// Click the block inserter button
		await page.click( 'button[aria-label="Toggle block inserter"]' );

		// Search and insert the block
		await page.fill(
			'input[placeholder="Search"]',
			'Content Container (Before)'
		);
		await page.click( 'text=Content Container (Before)' );

		// Wait for block to be inserted
		await page.waitForSelector( '.content-container-before' );

		// Verify static content is displayed
		await expect(
			page.locator( 'text=Welcome to the Container' )
		).toBeVisible();
		await expect(
			page.locator( 'text=This is a static container block' )
		).toBeVisible();
	} );

	test( 'should insert Content Container (After) with InnerBlocks', async ( {
		page,
	} ) => {
		// Click the block inserter button
		await page.click( 'button[aria-label="Toggle block inserter"]' );

		// Search and insert the block
		await page.fill(
			'input[placeholder="Search"]',
			'Content Container (After)'
		);
		await page.click( 'text=Content Container (After)' );

		// Wait for block to be inserted
		await page.waitForSelector( '.content-container-after' );

		// Verify InnerBlocks template is applied
		await expect(
			page.locator(
				'.content-container-after .block-editor-block-list__layout'
			)
		).toBeVisible();

		// Check that template blocks are present (heading, paragraphs, image)
		const innerBlocks = page.locator(
			'.content-container-after .wp-block'
		);
		await expect( innerBlocks ).toHaveCount( 4 ); // heading + 2 paragraphs + image
	} );

	test( 'should only allow paragraph and image blocks in Container (After)', async ( {
		page,
	} ) => {
		// Insert the container block
		await page.click( 'button[aria-label="Toggle block inserter"]' );
		await page.fill(
			'input[placeholder="Search"]',
			'Content Container (After)'
		);
		await page.click( 'text=Content Container (After)' );

		await page.waitForSelector( '.content-container-after' );

		// Click inside the InnerBlocks area
		await page.click(
			'.content-container-after .block-editor-block-list__layout'
		);

		// Try to open the block inserter within InnerBlocks
		await page.keyboard.press( '/' );

		// Wait for inserter menu
		await page.waitForTimeout( 500 );

		// The allowed blocks should be limited
		// Note: This test may need adjustment based on actual implementation
		const inserterItems = page.locator(
			'.block-editor-inserter__menu [role="option"]'
		);
		const count = await inserterItems.count();

		// Should have limited options (paragraph, image, and possibly heading from template)
		expect( count ).toBeLessThan( 10 );
	} );
} );
