<?php
/**
 * Plugin Name:     Meu Primeiro Bloco
 * Description:     Bloco criado no curso de WordPress do Fellyph Cintra.
 * Version:         0.1.0
 * Author:          Fellyph
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     meu-primeiro-block
 * Domain Path:     /languages
 *
 * @package         curso-gutenberg
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Load plugin textdomain for translations.
 */
function curso_gutenberg_load_textdomain() {
    load_plugin_textdomain(
        'meu-primeiro-block',
        false,
        dirname( plugin_basename( __FILE__ ) ) . '/languages'
    );
}
add_action( 'plugins_loaded', 'curso_gutenberg_load_textdomain' );

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function curso_gutenberg_meu_primeiro_block_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			__( 'You need to run `npm start` or `npm run build` for the "curso-gutenberg/meu-primeiro-block" block first.', 'meu-primeiro-block' )
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'curso-gutenberg-meu-primeiro-block-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	// Set script translations with path to languages directory
	wp_set_script_translations(
		'curso-gutenberg-meu-primeiro-block-block-editor',
		'meu-primeiro-block',
		plugin_dir_path( __FILE__ ) . 'languages'
	);

	$editor_css = 'build/index.css';
	wp_register_style(
		'curso-gutenberg-meu-primeiro-block-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'curso-gutenberg-meu-primeiro-block-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type(
		'curso-gutenberg/meu-primeiro-block',
		array(
			'editor_script' => 'curso-gutenberg-meu-primeiro-block-block-editor',
			'editor_style'  => 'curso-gutenberg-meu-primeiro-block-block-editor',
			'style'         => 'curso-gutenberg-meu-primeiro-block-block',
		)
	);
}
add_action( 'init', 'curso_gutenberg_meu_primeiro_block_block_init' );
