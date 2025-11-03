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
 * Allowed blocks configuration
 * Only paragraph and image blocks can be inserted
 */
const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/image' ];

/**
 * Template configuration
 * Pre-fills the container with default blocks
 */
const TEMPLATE = [
	[
		'core/heading',
		{
			level: 2,
			placeholder: __( 'Enter your title here…', 'curso-gutenberg' ),
		},
	],
	[
		'core/paragraph',
		{
			placeholder: __(
				'Start writing your content here. You can add paragraphs and images.',
				'curso-gutenberg'
			),
		},
	],
	[ 'core/image', {} ],
	[
		'core/paragraph',
		{
			placeholder: __(
				'Add more content below the image…',
				'curso-gutenberg'
			),
		},
	],
];

/**
 * Edit component for Content Container (After InnerBlocks)
 *
 * This block uses InnerBlocks to allow users to add and customize content.
 * - allowedBlocks restricts insertable blocks to paragraph and image only
 * - template pre-fills with a structured layout
 * - templateLock can be set to "all" to prevent adding/removing blocks
 *
 * @return {Element} Element to render in the editor.
 */
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'content-container-after',
	} );

	return (
		<div { ...blockProps }>
			<div className="content-container-after__inner">
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					// Uncomment to lock the template structure
					// templateLock="all"
				/>
			</div>
		</div>
	);
}
