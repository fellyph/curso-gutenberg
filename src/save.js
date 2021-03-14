import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import { Avatar } from './shared/avatar/avatar';

export default function save( props ) {
	return (
		<div { ...useBlockProps.save() }>
			<Avatar />
			<div className="content">
				<h3 className="title">
					{ props.attributes.titulo } - { props.attributes.ano }
				</h3>
				<h4 className="sub-title">
					{ __( 'Por Fellyph Cintra', 'meu-primeiro-block' ) }
				</h4>
				<div>
					{ __(
						'Acompanhe as aulas no github:',
						'meu-primeiro-block'
					) }{ ' ' }
					<a
						href="https://github.com/fellyph/curso-gutenberg"
						className="link-repo"
					>
						{ __( 'Clicando aqui', 'meu-primeiro-block' ) }
					</a>
				</div>
			</div>
		</div>
	);
}
