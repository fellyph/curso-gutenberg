/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save component for Review Card (Before)
 *
 * @return {Element} Element to render on the frontend.
 */
export default function save() {
	const blockProps = useBlockProps.save( {
		className: 'review-card-before',
	} );

	return (
		<div { ...blockProps }>
			<div className="review-card-before__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
