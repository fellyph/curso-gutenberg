import { registerBlockType } from '@wordpress/blocks';

import { __ } from '@wordpress/i18n';

import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

registerBlockType( 'create-block/meu-primeiro-block', {
	apiVersion: 2,
	title: __( 'Meu Primeiro Block', 'meu-primeiro-block' ),
	description: __(
		'Example block written with ESNext standard and JSX support – build step required.',
		'meu-primeiro-block'
	),
	category: 'widgets',
	icon: 'smiley',
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	edit: Edit,
	save,
} );
