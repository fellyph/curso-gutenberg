/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';
import Edit from './edit';
import save from './save';

/**
 * Block configuration object type definition.
 *
 * @typedef {Object} BlockConfig
 * @property {number}   apiVersion  - Block API version.
 * @property {string}   title       - Block display title.
 * @property {string}   description - Block description.
 * @property {string}   category    - Block category.
 * @property {string}   icon        - Block icon.
 * @property {Object}   supports    - Block support features.
 * @property {Function} edit        - Edit component.
 * @property {Function} save        - Save component.
 */

/**
 * Every block starts by registering a new block type definition.
 *
 * This block demonstrates the implementation of Gutenberg coding guidelines:
 * - Proper JSDoc documentation with type definitions
 * - BEM-inspired CSS class naming conventions
 * - ES6+ syntax and modern JavaScript patterns
 * - WordPress coding standards compliance
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'curso-gutenberg/meu-primeiro-block', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 * @see https://developer.wordpress.org/news/2021/06/29/blocks-in-an-iframed-template-editor/
	 */
	apiVersion: 3,

	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Meu Primeiro Block', 'meu-primeiro-block' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'Example block written with ESNext standard and JSX support – build step required.',
		'meu-primeiro-block'
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `text`, `media`, `design`, `widgets`, and `embed`.
	 */
	category: 'widgets',

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'smiley',

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
