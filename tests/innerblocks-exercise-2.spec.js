/**
 * Tests for InnerBlocks Exercise 2 - Review Card with Block Relationships
 *
 * These tests verify the advanced InnerBlocks functionality including
 * useInnerBlocksProps, block relationships, and context.
 */

// @ts-check
const { test, expect } = require( '@playwright/test' );

test.describe( 'InnerBlocks Exercise 2 - Review Card', () => {
	test.beforeEach( async ( { page } ) => {
		// Navigate to new post page
		await page.goto( '/wp-admin/post-new.php' );

		// Wait for the Gutenberg editor to load
		await page.waitForSelector( '.edit-post-visual-editor', {
			timeout: 10000,
		} );
	} );

	test( 'should display Review Card (Before) in block inserter', async ( {
		page,
	} ) => {
		// Click the block inserter button
		await page.click( 'button[aria-label="Toggle block inserter"]' );

		// Search for the block
		await page.fill(
			'input[placeholder="Search"]',
			'Review Card (Before)'
		);

		// Verify the block appears in search results
		await expect(
			page.locator( 'text=Review Card (Before)' )
		).toBeVisible();
	} );

	test( 'should display Review Card (After) in block inserter', async ( {
		page,
	} ) => {
		// Click the block inserter button
		await page.click( 'button[aria-label="Toggle block inserter"]' );

		// Search for the block
		await page.fill( 'input[placeholder="Search"]', 'Review Card (After)' );

		// Verify the block appears in search results
		await expect(
			page.locator( 'text=Review Card (After)' )
		).toBeVisible();
	} );

	test( 'should insert Review Card (After) with custom header and footer', async ( {
		page,
	} ) => {
		// Click the block inserter button
		await page.click( 'button[aria-label="Toggle block inserter"]' );

		// Search and insert the block
		await page.fill( 'input[placeholder="Search"]', 'Review Card (After)' );
		await page.click( 'text=Review Card (After)' );

		// Wait for block to be inserted
		await page.waitForSelector( '.review-card-after' );

		// Verify custom header is present
		await expect(
			page.locator( '.review-card-after__header' )
		).toBeVisible();

		// Verify rating stars are displayed
		await expect(
			page.locator( '.review-card-after__rating' )
		).toBeVisible();

		// Verify custom footer is present
		await expect(
			page.locator( '.review-card-after__footer' )
		).toBeVisible();
		await expect( page.locator( 'text=Verified Review' ) ).toBeVisible();
	} );

	test( 'should display Review Item block in inserter', async ( {
		page,
	} ) => {
		// Click the block inserter button
		await page.click( 'button[aria-label="Toggle block inserter"]' );

		// Search for the Review Item block
		await page.fill( 'input[placeholder="Search"]', 'Review Item' );

		// The block should be visible in search
		await expect( page.locator( 'text=Review Item' ) ).toBeVisible();
	} );

	test( 'should insert Review Item inside Review Card with context', async ( {
		page,
	} ) => {
		// Insert Review Card (After)
		await page.click( 'button[aria-label="Toggle block inserter"]' );
		await page.fill( 'input[placeholder="Search"]', 'Review Card (After)' );
		await page.click( 'text=Review Card (After)' );

		await page.waitForSelector( '.review-card-after' );

		// The template should already include a Review Item
		// Verify it displays context information
		await expect(
			page.locator( '.review-item__context-info' )
		).toBeVisible();

		// Context should show parent card ID
		await expect( page.locator( 'text=Parent Card ID:' ) ).toBeVisible();

		// Context should show rating
		await expect( page.locator( 'text=Rating:' ) ).toBeVisible();
	} );

	test( 'should allow changing review rating in settings', async ( {
		page,
	} ) => {
		// Insert Review Card (After)
		await page.click( 'button[aria-label="Toggle block inserter"]' );
		await page.fill( 'input[placeholder="Search"]', 'Review Card (After)' );
		await page.click( 'text=Review Card (After)' );

		await page.waitForSelector( '.review-card-after' );

		// Click on the block to select it
		await page.click( '.review-card-after' );

		// Open the block settings sidebar if not already open
		const settingsButton = page.locator( 'button[aria-label="Settings"]' );
		if ( await settingsButton.isVisible() ) {
			await settingsButton.click();
		}

		// Look for the Review Settings panel
		// Note: This may require adjusting based on actual sidebar implementation
		await expect( page.locator( 'text=Review Settings' ) ).toBeVisible();
	} );

	test( 'should show InnerBlocks content area in Review Card', async ( {
		page,
	} ) => {
		// Insert Review Card (After)
		await page.click( 'button[aria-label="Toggle block inserter"]' );
		await page.fill( 'input[placeholder="Search"]', 'Review Card (After)' );
		await page.click( 'text=Review Card (After)' );

		await page.waitForSelector( '.review-card-after' );

		// Verify the content area (InnerBlocks) is present
		await expect(
			page.locator( '.review-card-after__content' )
		).toBeVisible();

		// Check that template blocks are present
		const innerBlocks = page.locator(
			'.review-card-after__content .wp-block'
		);
		const count = await innerBlocks.count();
		expect( count ).toBeGreaterThan( 0 );
	} );

	test( 'Review Card (Before) should not have custom header/footer', async ( {
		page,
	} ) => {
		// Insert Review Card (Before)
		await page.click( 'button[aria-label="Toggle block inserter"]' );
		await page.fill(
			'input[placeholder="Search"]',
			'Review Card (Before)'
		);
		await page.click( 'text=Review Card (Before)' );

		await page.waitForSelector( '.review-card-before' );

		// Verify no custom header
		const header = page.locator( '.review-card-before__header' );
		await expect( header ).not.toBeVisible();

		// Verify no custom footer
		const footer = page.locator( '.review-card-before__footer' );
		await expect( footer ).not.toBeVisible();
	} );
} );
