/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Save component for Review Item
 *
 * Renders the block content on the frontend.
 * Note: Context is not available in the save function.
 * For dynamic context-based rendering, use a dynamic block with render.php
 *
 * @param {Object} props            Block props
 * @param {Object} props.attributes Block attributes
 * @return {Element} Element to render on the frontend.
 */
export default function save( { attributes } ) {
	const { itemTitle } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'review-item',
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="h4"
				className="review-item__title"
				value={ itemTitle }
			/>

			<div className="review-item__content">
				<p>Review item content goes here.</p>
			</div>
		</div>
	);
}
