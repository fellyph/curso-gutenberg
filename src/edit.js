import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';
import { Avatar } from './shared/avatar/avatar';

export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<Avatar />
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
				<div>
					{ __(
						'Acompanhe as aulas no github:',
						'meu-primeiro-block'
					) }{ ' ' }
					<a href="#" className="link-repo">
						{ __( 'Clicando aqui', 'meu-primeiro-block' ) }
					</a>
				</div>
			</div>
		</div>
	);
}
