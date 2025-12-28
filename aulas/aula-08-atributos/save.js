/**
 * Aula 08 - Trabalhando com Atributos de Bloco
 *
 * Este arquivo demonstra como salvar os atributos no frontend.
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Componente de salvamento do bloco de citação.
 *
 * @param {Object} props            - Propriedades do componente.
 * @param {Object} props.attributes - Atributos do bloco.
 * @return {JSX.Element} Elemento a ser salvo.
 */
export default function Save( { attributes } ) {
	const { content, author, showBorder, borderColor, alignment } = attributes;

	const blockProps = useBlockProps.save( {
		className: `has-text-align-${ alignment }`,
		style: {
			borderLeftColor: showBorder ? borderColor : 'transparent',
			borderLeftWidth: showBorder ? '4px' : '0',
			borderLeftStyle: 'solid',
		},
	} );

	return (
		<blockquote { ...blockProps }>
			<RichText.Content tagName="p" value={ content } />
			{ author && <RichText.Content tagName="cite" value={ author } /> }
		</blockquote>
	);
}
