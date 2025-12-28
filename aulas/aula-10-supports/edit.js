/**
 * Aula 10 - Block Supports API
 *
 * Este arquivo demonstra como usar a Block Supports API
 * para adicionar controles nativos do WordPress sem código adicional.
 *
 * A maioria dos controles são configurados no block.json!
 * O código aqui é mínimo graças ao useBlockProps().
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';

/**
 * Componente de edição.
 *
 * Note como useBlockProps() aplica automaticamente todos os estilos
 * configurados via Block Supports (cores, tipografia, espaçamentos, bordas, etc.)
 *
 * @param {Object}   props               - Propriedades do componente.
 * @param {Object}   props.attributes    - Atributos do bloco.
 * @param {Function} props.setAttributes - Função para atualizar atributos.
 * @return {JSX.Element} Componente de edição.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { content } = attributes;

	/*
	 * useBlockProps() é a chave!
	 *
	 * Ele automaticamente:
	 * - Aplica classes CSS baseadas nos supports
	 * - Aplica estilos inline de cores, tipografia, etc.
	 * - Adiciona atributos de acessibilidade
	 * - Gerencia o estado de seleção do bloco
	 */
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<RichText
				tagName="p"
				value={ content }
				onChange={ ( value ) => setAttributes( { content: value } ) }
				placeholder={ __(
					'Digite seu texto aqui. Use a sidebar para personalizar cores, tipografia, espaçamentos e bordas!',
					'curso-gutenberg'
				) }
			/>
		</div>
	);
}

/*
 * ==========================================================================
 * REFERÊNCIA: Block Supports disponíveis
 * ==========================================================================
 *
 * COLOR (cores):
 * - background: Cor de fundo
 * - text: Cor do texto
 * - gradients: Gradientes
 * - link: Cor dos links
 * - heading: Cor dos headings
 * - button: Cor dos botões
 * - __experimentalDuotone: Filtros duotone para imagens
 *
 * TYPOGRAPHY (tipografia):
 * - fontSize: Tamanho da fonte
 * - lineHeight: Altura da linha
 * - __experimentalFontFamily: Família da fonte
 * - __experimentalFontWeight: Peso da fonte
 * - __experimentalFontStyle: Estilo (itálico, normal)
 * - __experimentalTextTransform: Transformação (maiúsculas, etc.)
 * - __experimentalTextDecoration: Decoração (sublinhado, etc.)
 * - __experimentalLetterSpacing: Espaçamento entre letras
 *
 * SPACING (espaçamentos):
 * - margin: Margens externas
 * - padding: Preenchimento interno
 * - blockGap: Espaço entre blocos filhos
 *
 * BORDER (bordas):
 * - color: Cor da borda
 * - radius: Raio (arredondamento)
 * - style: Estilo (solid, dashed, etc.)
 * - width: Largura da borda
 *
 * LAYOUT:
 * - align: Alinhamentos (left, center, right, wide, full)
 * - layout: Sistema de layout (flex, grid)
 *
 * OUTROS:
 * - anchor: Âncora HTML (id)
 * - className: Classe CSS padrão
 * - customClassName: Classe CSS personalizada
 * - html: Edição de HTML
 * - shadow: Sombras
 * - position: Posicionamento (sticky)
 *
 * ==========================================================================
 * __experimentalDefaultControls
 * ==========================================================================
 *
 * Define quais controles aparecem abertos por padrão na sidebar.
 * Sem isso, os controles ficam escondidos em "mais opções".
 *
 * Exemplo:
 * "color": {
 *   "background": true,
 *   "text": true,
 *   "__experimentalDefaultControls": {
 *     "background": true,  // Aparece aberto
 *     "text": true         // Aparece aberto
 *   }
 * }
 *
 * ==========================================================================
 */
