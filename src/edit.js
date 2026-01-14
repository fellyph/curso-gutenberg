/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * Edit component for the Meu Primeiro Block.
 *
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @function Edit
 * @return {Element} Element to render in the block editor.
 *
 * @example
 * // Usage in block registration
 * registerBlockType('curso-gutenberg/meu-primeiro-block', {
 *   edit: Edit,
 * });
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 */
export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __(
				'Meu Primeiro Block – Olá Curso Gutenberg !!!',
				'meu-primeiro-block'
			) }
		</p>
	);
}
