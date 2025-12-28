/**
 * Aula 10 - Block Supports API
 *
 * Componente de salvamento.
 * useBlockProps.save() aplica automaticamente todos os estilos.
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Componente de salvamento.
 *
 * @param {Object} props            - Propriedades do componente.
 * @param {Object} props.attributes - Atributos do bloco.
 * @return {JSX.Element} Elemento a ser salvo.
 */
export default function Save( { attributes } ) {
	const { content } = attributes;

	/*
	 * useBlockProps.save() aplica automaticamente:
	 * - Classes CSS dos supports (has-background, has-text-color, etc.)
	 * - Estilos inline de cores, tipografia, espaçamentos
	 * - Classes de alinhamento
	 * - Âncora (id)
	 * - Classes personalizadas
	 */
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<RichText.Content tagName="p" value={ content } />
		</div>
	);
}
