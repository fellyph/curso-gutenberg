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
 * Save component for the Meu Primeiro Block.
 *
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @function save
 * @return {Element} Element to render on the frontend.
 *
 * @example
 * // Usage in block registration
 * registerBlockType('curso-gutenberg/meu-primeiro-block', {
 *   save: save,
 * });
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 */
export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ __(
				'Meu Primeiro Block – hello from the saved content!',
				'meu-primeiro-block'
			) }
		</p>
	);
}
