/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Editor styles
 */
import './editor.scss';

/**
 * Edit component for Content Container (Before InnerBlocks)
 * 
 * This is a static block with hardcoded content.
 * Users cannot customize the content inside the container.
 *
 * @return {Element} Element to render in the editor.
 */
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'content-container-before',
	} );

	return (
		<div { ...blockProps }>
			<div className="content-container-before__inner">
				<h2>{ __( 'Welcome to the Container', 'curso-gutenberg' ) }</h2>
				<p>
					{ __(
						'This is a static container block. The content is hardcoded and cannot be edited by users.',
						'curso-gutenberg'
					) }
				</p>
				<div className="content-container-before__image-placeholder">
					<span>{ __( '🖼️ Image Placeholder', 'curso-gutenberg' ) }</span>
				</div>
				<p>
					{ __(
						'In the "after" version, we will transform this into a dynamic container using InnerBlocks.',
						'curso-gutenberg'
					) }
				</p>
			</div>
		</div>
	);
}
