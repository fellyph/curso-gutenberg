/**
 * Aula 09 - Componentes do Block Editor
 *
 * Este arquivo demonstra o uso dos principais componentes:
 * - RichText
 * - MediaUpload
 * - InspectorControls
 * - BlockControls
 * - ColorPicker / ColorPalette
 * - TextControl, SelectControl, etc.
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	BlockControls,
	URLInput,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
	ColorPalette,
	ToolbarGroup,
	ToolbarButton,
	Placeholder,
} from '@wordpress/components';
import './editor.scss';

/**
 * Cores padrão do WordPress para o ColorPalette.
 */
const COLORS = [
	{ name: 'Branco', color: '#ffffff' },
	{ name: 'Preto', color: '#000000' },
	{ name: 'Cinza Claro', color: '#f5f5f5' },
	{ name: 'Azul', color: '#0073aa' },
	{ name: 'Verde', color: '#46b450' },
	{ name: 'Vermelho', color: '#dc3232' },
];

/**
 * Componente de edição do Card Completo.
 *
 * @param {Object}   props               - Propriedades do componente.
 * @param {Object}   props.attributes    - Atributos do bloco.
 * @param {Function} props.setAttributes - Função para atualizar atributos.
 * @return {JSX.Element} Componente de edição.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		imageUrl,
		imageId,
		imageAlt,
		title,
		description,
		buttonText,
		buttonUrl,
		backgroundColor,
		textColor,
	} = attributes;

	const blockProps = useBlockProps( {
		style: {
			backgroundColor,
			color: textColor,
		},
	} );

	/**
	 * Handler para seleção de mídia.
	 *
	 * @param {Object} media - Objeto de mídia selecionado.
	 */
	const onSelectImage = ( media ) => {
		setAttributes( {
			imageUrl: media.url,
			imageId: media.id,
			imageAlt: media.alt || '',
		} );
	};

	/**
	 * Handler para remover imagem.
	 */
	const onRemoveImage = () => {
		setAttributes( {
			imageUrl: '',
			imageId: 0,
			imageAlt: '',
		} );
	};

	return (
		<>
			{/* ========== INSPECTOR CONTROLS (Sidebar) ========== */}
			<InspectorControls>
				{/* Painel de Cores */}
				<PanelBody
					title={ __( 'Cores', 'curso-gutenberg' ) }
					initialOpen={ true }
				>
					<p>{ __( 'Cor de fundo', 'curso-gutenberg' ) }</p>
					<ColorPalette
						colors={ COLORS }
						value={ backgroundColor }
						onChange={ ( value ) =>
							setAttributes( { backgroundColor: value } )
						}
					/>

					<p>{ __( 'Cor do texto', 'curso-gutenberg' ) }</p>
					<ColorPalette
						colors={ COLORS }
						value={ textColor }
						onChange={ ( value ) =>
							setAttributes( { textColor: value } )
						}
					/>
				</PanelBody>

				{/* Painel do Botão */}
				<PanelBody
					title={ __( 'Configurações do Botão', 'curso-gutenberg' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Texto do botão', 'curso-gutenberg' ) }
						value={ buttonText }
						onChange={ ( value ) =>
							setAttributes( { buttonText: value } )
						}
					/>
					<p>{ __( 'Link do botão', 'curso-gutenberg' ) }</p>
					<URLInput
						value={ buttonUrl }
						onChange={ ( value ) =>
							setAttributes( { buttonUrl: value } )
						}
					/>
				</PanelBody>

				{/* Painel da Imagem */}
				<PanelBody
					title={ __( 'Imagem', 'curso-gutenberg' ) }
					initialOpen={ false }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes={ [ 'image' ] }
							value={ imageId }
							render={ ( { open } ) => (
								<Button
									onClick={ open }
									variant="secondary"
									className="editor-media-placeholder__button"
								>
									{ imageUrl
										? __( 'Trocar imagem', 'curso-gutenberg' )
										: __( 'Selecionar imagem', 'curso-gutenberg' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ imageUrl && (
						<>
							<TextControl
								label={ __( 'Texto alternativo', 'curso-gutenberg' ) }
								value={ imageAlt }
								onChange={ ( value ) =>
									setAttributes( { imageAlt: value } )
								}
								help={ __(
									'Descreva a imagem para acessibilidade.',
									'curso-gutenberg'
								) }
							/>
							<Button
								onClick={ onRemoveImage }
								variant="link"
								isDestructive
							>
								{ __( 'Remover imagem', 'curso-gutenberg' ) }
							</Button>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			{/* ========== BLOCK CONTROLS (Toolbar) ========== */}
			<BlockControls>
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes={ [ 'image' ] }
							value={ imageId }
							render={ ( { open } ) => (
								<ToolbarButton
									icon="format-image"
									label={ __( 'Editar imagem', 'curso-gutenberg' ) }
									onClick={ open }
								/>
							) }
						/>
					</MediaUploadCheck>
				</ToolbarGroup>
			</BlockControls>

			{/* ========== CONTEÚDO DO BLOCO ========== */}
			<div { ...blockProps }>
				{/* Área da Imagem */}
				<div className="wp-block-curso-gutenberg-card-completo__image">
					{ imageUrl ? (
						<img src={ imageUrl } alt={ imageAlt } />
					) : (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectImage }
								allowedTypes={ [ 'image' ] }
								value={ imageId }
								render={ ( { open } ) => (
									<Placeholder
										icon="format-image"
										label={ __( 'Imagem do Card', 'curso-gutenberg' ) }
									>
										<Button
											onClick={ open }
											variant="primary"
										>
											{ __( 'Selecionar imagem', 'curso-gutenberg' ) }
										</Button>
									</Placeholder>
								) }
							/>
						</MediaUploadCheck>
					) }
				</div>

				{/* Área de Conteúdo */}
				<div className="wp-block-curso-gutenberg-card-completo__content">
					<RichText
						tagName="h3"
						value={ title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
						placeholder={ __( 'Título do card', 'curso-gutenberg' ) }
					/>
					<RichText
						tagName="p"
						value={ description }
						onChange={ ( value ) =>
							setAttributes( { description: value } )
						}
						placeholder={ __(
							'Descrição do card...',
							'curso-gutenberg'
						) }
					/>
					{ buttonText && (
						<a
							href={ buttonUrl }
							className="wp-block-curso-gutenberg-card-completo__button"
							onClick={ ( e ) => e.preventDefault() }
						>
							{ buttonText }
						</a>
					) }
				</div>
			</div>
		</>
	);
}
