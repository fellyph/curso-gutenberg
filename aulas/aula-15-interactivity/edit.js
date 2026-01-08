/**
 * Aula 15 - WordPress Interactivity API
 *
 * Este arquivo demonstra o editor de um bloco que usa
 * a Interactivity API para interatividade no frontend.
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	Button,
} from '@wordpress/components';
import './editor.scss';

/**
 * Gera um ID único para um item FAQ.
 *
 * @return {string} ID único.
 */
const generateId = () => {
	return `faq-${ Date.now() }-${ Math.random().toString( 36 ).substr( 2, 9 ) }`;
};

/**
 * Componente de edição do FAQ Accordion.
 *
 * @param {Object}   props               - Propriedades do componente.
 * @param {Object}   props.attributes    - Atributos do bloco.
 * @param {Function} props.setAttributes - Função para atualizar atributos.
 * @return {JSX.Element} Componente de edição.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { allowMultiple, items } = attributes;

	const blockProps = useBlockProps();

	/**
	 * Atualiza um item específico do FAQ.
	 *
	 * @param {number} index - Índice do item.
	 * @param {string} field - Campo a ser atualizado.
	 * @param {string} value - Novo valor.
	 */
	const updateItem = ( index, field, value ) => {
		const newItems = [ ...items ];
		newItems[ index ] = {
			...newItems[ index ],
			[ field ]: value,
		};
		setAttributes( { items: newItems } );
	};

	/**
	 * Adiciona um novo item FAQ.
	 */
	const addItem = () => {
		const newItems = [
			...items,
			{
				id: generateId(),
				question: '',
				answer: '',
			},
		];
		setAttributes( { items: newItems } );
	};

	/**
	 * Remove um item FAQ.
	 *
	 * @param {number} index - Índice do item a remover.
	 */
	const removeItem = ( index ) => {
		const newItems = items.filter( ( _, i ) => i !== index );
		setAttributes( { items: newItems } );
	};

	/**
	 * Move um item para cima.
	 *
	 * @param {number} index - Índice do item.
	 */
	const moveItemUp = ( index ) => {
		if ( index === 0 ) {
			return;
		}
		const newItems = [ ...items ];
		[ newItems[ index - 1 ], newItems[ index ] ] = [
			newItems[ index ],
			newItems[ index - 1 ],
		];
		setAttributes( { items: newItems } );
	};

	/**
	 * Move um item para baixo.
	 *
	 * @param {number} index - Índice do item.
	 */
	const moveItemDown = ( index ) => {
		if ( index === items.length - 1 ) {
			return;
		}
		const newItems = [ ...items ];
		[ newItems[ index ], newItems[ index + 1 ] ] = [
			newItems[ index + 1 ],
			newItems[ index ],
		];
		setAttributes( { items: newItems } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Configurações do Accordion', 'curso-gutenberg' ) }
				>
					<ToggleControl
						label={ __( 'Permitir múltiplos abertos', 'curso-gutenberg' ) }
						help={
							allowMultiple
								? __( 'Vários itens podem estar abertos ao mesmo tempo.', 'curso-gutenberg' )
								: __( 'Apenas um item pode estar aberto por vez.', 'curso-gutenberg' )
						}
						checked={ allowMultiple }
						onChange={ ( value ) =>
							setAttributes( { allowMultiple: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wp-block-curso-gutenberg-faq-accordion__items">
					{ items.map( ( item, index ) => (
						<div
							key={ item.id }
							className="wp-block-curso-gutenberg-faq-accordion__item"
						>
							<div className="wp-block-curso-gutenberg-faq-accordion__item-controls">
								<Button
									icon="arrow-up-alt"
									label={ __( 'Mover para cima', 'curso-gutenberg' ) }
									onClick={ () => moveItemUp( index ) }
									disabled={ index === 0 }
								/>
								<Button
									icon="arrow-down-alt"
									label={ __( 'Mover para baixo', 'curso-gutenberg' ) }
									onClick={ () => moveItemDown( index ) }
									disabled={ index === items.length - 1 }
								/>
								<Button
									icon="trash"
									label={ __( 'Remover', 'curso-gutenberg' ) }
									onClick={ () => removeItem( index ) }
									isDestructive
								/>
							</div>

							<div className="wp-block-curso-gutenberg-faq-accordion__header">
								<RichText
									tagName="h3"
									value={ item.question }
									onChange={ ( value ) =>
										updateItem( index, 'question', value )
									}
									placeholder={ __(
										'Digite a pergunta...',
										'curso-gutenberg'
									) }
								/>
							</div>

							<div className="wp-block-curso-gutenberg-faq-accordion__content">
								<RichText
									tagName="div"
									value={ item.answer }
									onChange={ ( value ) =>
										updateItem( index, 'answer', value )
									}
									placeholder={ __(
										'Digite a resposta...',
										'curso-gutenberg'
									) }
								/>
							</div>
						</div>
					) ) }
				</div>

				<Button variant="secondary" onClick={ addItem }>
					{ __( '+ Adicionar Pergunta', 'curso-gutenberg' ) }
				</Button>
			</div>
		</>
	);
}
