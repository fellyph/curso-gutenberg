/**
 * Registers the Review Item block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Register Review Item block
 * This is a child block that can only be used inside Review Card (After)
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
