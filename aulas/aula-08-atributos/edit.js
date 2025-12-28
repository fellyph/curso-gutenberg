/**
 * Aula 08 - Trabalhando com Atributos de Bloco
 *
 * Este arquivo demonstra como usar diferentes tipos de atributos
 * e sincronizar dados entre o editor e o frontend.
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	ColorPicker,
} from '@wordpress/components';
import './editor.scss';

/**
 * Componente de edição do bloco de citação.
 *
 * @param {Object}   props               - Propriedades do componente.
 * @param {Object}   props.attributes    - Atributos do bloco.
 * @param {Function} props.setAttributes - Função para atualizar atributos.
 * @return {JSX.Element} Componente de edição.
 */
export default function Edit( { attributes, setAttributes } ) {
	// Desestruturação dos atributos
	const { content, author, showBorder, borderColor, alignment } = attributes;

	// Props do bloco com estilos dinâmicos
	const blockProps = useBlockProps( {
		className: `has-text-align-${ alignment }`,
		style: {
			borderLeftColor: showBorder ? borderColor : 'transparent',
			borderLeftWidth: showBorder ? '4px' : '0',
			borderLeftStyle: 'solid',
		},
	} );

	return (
		<>
			{/* Controles na Sidebar */}
			<InspectorControls>
				<PanelBody
					title={ __( 'Configurações da Citação', 'curso-gutenberg' ) }
				>
					<ToggleControl
						label={ __( 'Mostrar borda', 'curso-gutenberg' ) }
						help={
							showBorder
								? __( 'Borda visível', 'curso-gutenberg' )
								: __( 'Borda oculta', 'curso-gutenberg' )
						}
						checked={ showBorder }
						onChange={ ( value ) =>
							setAttributes( { showBorder: value } )
						}
					/>
					{ showBorder && (
						<>
							<p>{ __( 'Cor da borda', 'curso-gutenberg' ) }</p>
							<ColorPicker
								color={ borderColor }
								onChange={ ( value ) =>
									setAttributes( { borderColor: value } )
								}
								enableAlpha
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			{/* Controles na Toolbar */}
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( value ) =>
						setAttributes( { alignment: value } )
					}
				/>
			</BlockControls>

			{/* Conteúdo do Bloco */}
			<blockquote { ...blockProps }>
				<RichText
					tagName="p"
					value={ content }
					onChange={ ( value ) =>
						setAttributes( { content: value } )
					}
					placeholder={ __(
						'Escreva sua citação aqui...',
						'curso-gutenberg'
					) }
				/>
				<RichText
					tagName="cite"
					value={ author }
					onChange={ ( value ) =>
						setAttributes( { author: value } )
					}
					placeholder={ __(
						'— Nome do autor',
						'curso-gutenberg'
					) }
				/>
			</blockquote>
		</>
	);
}
