/**
 * Aula 11 - InnerBlocks e Blocos Aninhados
 *
 * Este arquivo demonstra o uso de InnerBlocks para criar
 * blocos container com templates e blocos permitidos.
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';
import './editor.scss';

/**
 * Template inicial do Feature Box.
 * Define a estrutura padrão de blocos filhos.
 */
const TEMPLATE = [
	[
		'core/heading',
		{
			level: 3,
			placeholder: __( 'Título da Feature', 'curso-gutenberg' ),
		},
	],
	[
		'core/paragraph',
		{
			placeholder: __(
				'Descreva a feature aqui...',
				'curso-gutenberg'
			),
		},
	],
];

/**
 * Lista de blocos permitidos dentro do Feature Box.
 */
const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/image',
	'core/list',
	'core/buttons',
];

/**
 * Cores disponíveis para o painel de cores.
 */
const COLORS = [
	{ name: 'Cinza Claro', color: '#f8f9fa' },
	{ name: 'Branco', color: '#ffffff' },
	{ name: 'Azul Claro', color: '#e3f2fd' },
	{ name: 'Verde Claro', color: '#e8f5e9' },
	{ name: 'Amarelo Claro', color: '#fff8e1' },
];

const ICON_COLORS = [
	{ name: 'Azul', color: '#0073aa' },
	{ name: 'Verde', color: '#46b450' },
	{ name: 'Vermelho', color: '#dc3232' },
	{ name: 'Laranja', color: '#f56e28' },
	{ name: 'Roxo', color: '#826eb4' },
];

/**
 * Componente de edição do Feature Box.
 *
 * @param {Object}   props               - Propriedades do componente.
 * @param {Object}   props.attributes    - Atributos do bloco.
 * @param {Function} props.setAttributes - Função para atualizar atributos.
 * @return {JSX.Element} Componente de edição.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { backgroundColor, iconColor } = attributes;

	const blockProps = useBlockProps( {
		style: {
			backgroundColor,
			'--icon-color': iconColor,
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Configurações do Container', 'curso-gutenberg' ) }
				>
					<p>{ __( 'Cor de fundo', 'curso-gutenberg' ) }</p>
					<ColorPalette
						colors={ COLORS }
						value={ backgroundColor }
						onChange={ ( value ) =>
							setAttributes( { backgroundColor: value } )
						}
					/>

					<p>{ __( 'Cor do ícone (contexto)', 'curso-gutenberg' ) }</p>
					<ColorPalette
						colors={ ICON_COLORS }
						value={ iconColor }
						onChange={ ( value ) =>
							setAttributes( { iconColor: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{/*
				 * InnerBlocks com configurações:
				 *
				 * - template: Estrutura inicial de blocos
				 * - templateLock: false (livre), "all" (trava tudo), "insert" (permite mover)
				 * - allowedBlocks: Lista de blocos permitidos
				 * - orientation: "vertical" (padrão) ou "horizontal"
				 * - renderAppender: Componente para adicionar novos blocos
				 */}
				<InnerBlocks
					template={ TEMPLATE }
					templateLock={ false }
					allowedBlocks={ ALLOWED_BLOCKS }
					orientation="vertical"
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</div>
		</>
	);
}
