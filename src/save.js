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
				<RichText.Content
					className="subject-list"
					tagName="ul"
					multiline="li"
					value={ attributes.assuntos }
				/>
				<div>
				</div>
				<footer className="footer">
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
				</footer>
			</div>
		</div>
	);
}
