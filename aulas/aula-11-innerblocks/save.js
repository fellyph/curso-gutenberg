/**
 * Aula 11 - InnerBlocks e Blocos Aninhados
 *
 * Componente de salvamento do Feature Box.
 */

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Componente de salvamento.
 *
 * @param {Object} props            - Propriedades do componente.
 * @param {Object} props.attributes - Atributos do bloco.
 * @return {JSX.Element} Elemento a ser salvo.
 */
export default function Save( { attributes } ) {
	const { backgroundColor, iconColor } = attributes;

	const blockProps = useBlockProps.save( {
		style: {
			backgroundColor,
			'--icon-color': iconColor,
		},
	} );

	return (
		<div { ...blockProps }>
			{/* InnerBlocks.Content renderiza os blocos filhos */}
			<InnerBlocks.Content />
		</div>
	);
}
