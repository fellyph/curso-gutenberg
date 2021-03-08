import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<div { ...useBlockProps.save() }>
			<img
				src="http://curso-gutenberg.local/wp-content/uploads/2021/03/avatar_fellyph.jpg"
				alt={ __( 'Fellyph Cintra', 'meu-primeiro-block' ) }
				loading="lazy"
				className="avatar"
			/>
			<div className="content">
				<h3 className="title">{ __( 'Curso de Criação de blocos Gutenberg', 'meu-primeiro-block' ) }</h3>
				<h4 className="sub-title">{ __( 'Por Fellyph Cintra', 'meu-primeiro-block' ) }</h4>
				<div>
					{ __( 'Acompanhe as aulas no github:', 'meu-primeiro-block' ) } <a href="https://github.com/fellyph/curso-gutenberg" className="link-repo">{ __( 'Clicando aqui', 'meu-primeiro-block' ) }</a>
				</div>
			</div>
		</div>
	);
}
