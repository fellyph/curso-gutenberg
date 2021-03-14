import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

import './editor.scss';
import { Avatar } from './shared/avatar/avatar';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div { ...useBlockProps() }>
			<Avatar />
			<div className="content">
				<h3 className="title">
					{ attributes.titulo } - { attributes.ano }
				</h3>
				<RichText
					className="sub-title"
					tagName="h4"
					value={ attributes.subtitulo }
					onChange={ ( novoTexto ) => {
						setAttributes( { subtitulo: novoTexto } )
					}}
				/>

				<RichText
					className="sub-title"
					tagName="h4"
					value={ attributes.subtitulo }
					onChange={ ( novoTexto ) => {
						setAttributes( { subtitulo: novoTexto } )
					}}
				/>
				<div>
					{ __(
						'Acompanhe as aulas no github:',
						'meu-primeiro-block'
					) }
					<a href="#" className="link-repo">
						{ __( 'Clicando aqui', 'meu-primeiro-block' ) }
					</a>
				</div>
			</div>
		</div>
	);
}
