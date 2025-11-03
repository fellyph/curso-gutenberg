/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Editor styles
 */
import './editor.scss';

/**
 * Allowed blocks for review content
 */
const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/image',
	'core/list',
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
	[
		'core/paragraph',
		{
			placeholder: __(
				'Write your review here...',
				'curso-gutenberg'
			),
		},
	],
];

/**
 * Edit component for Review Card (Before advanced features)
 * 
 * This version uses basic InnerBlocks without:
 * - useInnerBlocksProps
 * - Block relationships
 * - Block context
 *
 * @return {Element} Element to render in the editor.
 */
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'review-card-before',
	} );

	return (
		<div { ...blockProps }>
			<div className="review-card-before__content">
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
				/>
			</div>
		</div>
	);
}
