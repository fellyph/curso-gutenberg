/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Editor styles
 */
import './editor.scss';

/**
 * Edit component for Review Item
 *
 * This child block demonstrates:
 * - parent relationship (can only be inserted in review-card-after)
 * - usesContext to receive data from parent
 * - Displaying context values in the editor
 *
 * @param {Object}   props               Block props including context
 * @param {Object}   props.attributes    Block attributes
 * @param {Function} props.setAttributes Function to update attributes
 * @param {Object}   props.context       Block context from parent
 * @return {Element} Element to render in the editor.
 */
export default function Edit( { attributes, setAttributes, context } ) {
	const { itemTitle } = attributes;

	// Get context from parent block
	const cardId = context[ 'curso-gutenberg/cardId' ] || 'N/A';
	const reviewRating = context[ 'curso-gutenberg/reviewRating' ] || 0;

	const blockProps = useBlockProps( {
		className: 'review-item',
	} );

	return (
		<div { ...blockProps }>
			<div className="review-item__context-info">
				<small>
					{ __( 'Parent Card ID:', 'curso-gutenberg' ) } { cardId } |{ ' ' }
					{ __( 'Rating:', 'curso-gutenberg' ) } { reviewRating }/5
				</small>
			</div>

			<RichText
				tagName="h4"
				className="review-item__title"
				value={ itemTitle }
				onChange={ ( value ) => setAttributes( { itemTitle: value } ) }
				placeholder={ __( 'Review item title…', 'curso-gutenberg' ) }
			/>

			<div className="review-item__content">
				<p>
					{ __(
						'This is a child block that receives context from its parent. It can only be inserted inside a Review Card (After) block.',
						'curso-gutenberg'
					) }
				</p>
			</div>
		</div>
	);
}
