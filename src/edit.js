import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<img
				className="avatar"
				src="http://curso-gutenberg.local/wp-content/uploads/2021/03/avatar_fellyph.jpg"
				alt={ __( 'Fellyph Cintra', 'meu-primeiro-block' ) }
				loading="lazy"
			/>
			<div className="content">
				<h3 className="title">
					{ __(
						'Curso de Criação de blocos Gutenberg',
						'meu-primeiro-block'
					) }
				</h3>
				<h4 className="sub-title">
					{ __( 'Por Fellyph Cintra', 'meu-primeiro-block' ) }
				</h4>
			</div>
		</div>
	);
}
