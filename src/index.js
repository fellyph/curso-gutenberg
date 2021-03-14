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
	title: __( 'Card do curso Gutenberg', 'meu-primeiro-block' ),
	description: __(
		'Bloco com informações do curso gutenberg',
		'meu-primeiro-block'
	),
	category: 'widgets',
	icon: 'smiley',
	supports: {
		html: false,
	},

	edit: Edit,
	save,
} );
