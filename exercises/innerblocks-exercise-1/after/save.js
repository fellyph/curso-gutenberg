/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save component for Content Container (After InnerBlocks)
 * 
 * IMPORTANT: Always use InnerBlocks.Content (not InnerBlocks)
 * in the save function to render the saved nested blocks.
 *
 * @return {Element} Element to render on the frontend.
 */
export default function save() {
	const blockProps = useBlockProps.save( {
		className: 'content-container-after',
	} );

	return (
		<div { ...blockProps }>
			<div className="content-container-after__inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
