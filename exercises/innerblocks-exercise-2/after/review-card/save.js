/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Save component for Review Card (After)
 *
 * Uses useInnerBlocksProps in save function for consistent markup.
 *
 * @param {Object} props            Block props
 * @param {Object} props.attributes Block attributes
 * @return {Element} Element to render on the frontend.
 */
export default function save( { attributes } ) {
	const { cardId, reviewRating } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'review-card-after',
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'review-card-after__content',
	} );

	// Render star rating display
	const renderStars = ( rating ) => {
		return '⭐'.repeat( rating );
	};

	return (
		<div { ...blockProps }>
			<div className="review-card-after__header">
				<span className="review-card-after__rating">
					{ renderStars( reviewRating ) }
				</span>
				<span className="review-card-after__id">
					Review #{ cardId }
				</span>
			</div>

			<div { ...innerBlocksProps } />

			<div className="review-card-after__footer">
				<small>✓ Verified Review</small>
			</div>
		</div>
	);
}
