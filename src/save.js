import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

import { Avatar } from './shared/avatar/avatar';

export default function save( { attributes } ) {
	return (
		<div { ...useBlockProps.save() }>
			<Avatar />
			<div className="content">
				<RichText.Content tagName="h3" className="title" value={ attributes.titulo } />
				<RichText.Content tagName="h4" className="sub-title" value={ attributes.subtitulo } />
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
