/**
 * Registers the Review Card (After) block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Register Review Card block with advanced features
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
