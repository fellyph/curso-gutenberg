import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

import './editor.scss';
import { Avatar } from './shared/avatar/avatar';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div { ...useBlockProps() }>
			<Avatar />
			<div className="content">
				<RichText
					className="title"
					tagName="h3"
					value={ attributes.titulo }
					onChange={ ( novoTexto ) =>
						setAttributes( { titulo: novoTexto } )
					}
				/>

				<RichText
					className="sub-title"
					tagName="h4"
					value={ attributes.subtitulo }
					onChange={ ( novoTexto ) => {
						setAttributes( { subtitulo: novoTexto } );
					} }
				/>
				<p>
					{ __(
						'Assuntos:',
						'meu-primeiro-block'
					) }
				</p>
				<RichText
					className="assuntos"
					tagName="ul"
					multiline="li"
					value={ attributes.assuntos }
					onChange={ ( novoAssunto ) => {
						setAttributes( { assuntos: novoAssunto } );
					} }
					placeholder={ __( 'Adicione aqui um assunto', 'meu-primeiro-block' )  }
				/>
			</div>
			<footer className="footer">
				{ __(
					'Acompanhe as aulas no github:',
					'meu-primeiro-block'
				) }
				<a href="#" className="link-repo">
					{ __( 'Clicando aqui', 'meu-primeiro-block' ) }
				</a>
			</footer>
		</div>
	);
}
