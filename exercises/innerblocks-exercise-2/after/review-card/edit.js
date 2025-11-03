/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Editor styles
 */
import './editor.scss';

/**
 * Allowed blocks - includes our custom review-item block
 */
const ALLOWED_BLOCKS = [
	'curso-gutenberg/review-item',
	'core/heading',
	'core/paragraph',
	'core/image',
];

/**
 * Template for review card
 */
const TEMPLATE = [
	[
		'core/heading',
		{
			level: 3,
			placeholder: __( 'Review Title', 'curso-gutenberg' ),
		},
	],
	[ 'core/image', {} ],
	[ 'curso-gutenberg/review-item', {} ],
];

/**
 * Edit component for Review Card (After - with advanced features)
 * 
 * This version demonstrates:
 * - useInnerBlocksProps for better markup control
 * - providesContext to share data with child blocks
 * - Custom header and footer alongside InnerBlocks
 * - Inspector controls for card settings
 *
 * @param {Object} props Block props
 * @return {Element} Element to render in the editor.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { cardId, reviewRating } = attributes;

	// Generate a card ID if one doesn't exist
	useEffect( () => {
		if ( ! cardId ) {
			setAttributes( {
				cardId: `review-${ clientId.substr( 0, 8 ) }`,
			} );
		}
	}, [ cardId, clientId, setAttributes ] );

	const blockProps = useBlockProps( {
		className: 'review-card-after',
	} );

	// useInnerBlocksProps gives us more control over the InnerBlocks area
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'review-card-after__content',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
		}
	);

	// Render star rating display
	const renderStars = ( rating ) => {
		return '⭐'.repeat( rating );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Review Settings', 'curso-gutenberg' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Card ID', 'curso-gutenberg' ) }
						value={ cardId }
						onChange={ ( value ) =>
							setAttributes( { cardId: value } )
						}
						help={ __(
							'Unique identifier for this review card',
							'curso-gutenberg'
						) }
					/>
					<RangeControl
						label={ __( 'Review Rating', 'curso-gutenberg' ) }
						value={ reviewRating }
						onChange={ ( value ) =>
							setAttributes( { reviewRating: value } )
						}
						min={ 1 }
						max={ 5 }
						help={ __(
							'Rating shared with child blocks via context',
							'curso-gutenberg'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{/* Custom header with rating */ }
				<div className="review-card-after__header">
					<span className="review-card-after__rating">
						{ renderStars( reviewRating ) }
					</span>
					<span className="review-card-after__id">
						{ __( 'Review', 'curso-gutenberg' ) } #{ cardId }
					</span>
				</div>

				{/* InnerBlocks area using useInnerBlocksProps */ }
				<div { ...innerBlocksProps } />

				{/* Custom footer */ }
				<div className="review-card-after__footer">
					<small>
						{ __(
							'✓ Verified Review',
							'curso-gutenberg'
						) }
					</small>
				</div>
			</div>
		</>
	);
}
