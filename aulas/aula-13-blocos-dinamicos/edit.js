/**
 * Aula 13 - Blocos Dinâmicos com PHP
 *
 * Este arquivo demonstra como criar o editor para um bloco dinâmico
 * que busca dados do WordPress via REST API.
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	Spinner,
	Placeholder,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import './editor.scss';

/**
 * Componente de edição do bloco Últimos Posts.
 *
 * @param {Object}   props               - Propriedades do componente.
 * @param {Object}   props.attributes    - Atributos do bloco.
 * @param {Function} props.setAttributes - Função para atualizar atributos.
 * @return {JSX.Element} Componente de edição.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		numberOfPosts,
		categoryId,
		showExcerpt,
		showDate,
		showFeaturedImage,
		columns,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `has-${ columns }-columns`,
	} );

	// Buscar categorias para o SelectControl
	const categories = useSelect( ( select ) => {
		return select( coreStore ).getEntityRecords( 'taxonomy', 'category', {
			per_page: -1,
		} );
	}, [] );

	// Buscar posts com base nos atributos
	const posts = useSelect(
		( select ) => {
			const query = {
				per_page: numberOfPosts,
				_embed: true, // Incluir dados de mídia
			};

			if ( categoryId > 0 ) {
				query.categories = [ categoryId ];
			}

			return select( coreStore ).getEntityRecords(
				'postType',
				'post',
				query
			);
		},
		[ numberOfPosts, categoryId ]
	);

	// Preparar opções de categorias para o SelectControl
	const categoryOptions = [
		{ value: 0, label: __( 'Todas as categorias', 'curso-gutenberg' ) },
	];

	if ( categories ) {
		categories.forEach( ( cat ) => {
			categoryOptions.push( { value: cat.id, label: cat.name } );
		} );
	}

	/**
	 * Obtém a URL da imagem destacada de um post.
	 *
	 * @param {Object} post - Objeto do post.
	 * @return {string|null} URL da imagem ou null.
	 */
	const getFeaturedImageUrl = ( post ) => {
		if (
			post._embedded &&
			post._embedded[ 'wp:featuredmedia' ] &&
			post._embedded[ 'wp:featuredmedia' ][ 0 ]
		) {
			return post._embedded[ 'wp:featuredmedia' ][ 0 ].source_url;
		}
		return null;
	};

	/**
	 * Formata a data do post.
	 *
	 * @param {string} dateString - Data em formato ISO.
	 * @return {string} Data formatada.
	 */
	const formatDate = ( dateString ) => {
		const date = new Date( dateString );
		return date.toLocaleDateString( 'pt-BR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Configurações de Query', 'curso-gutenberg' ) }
				>
					<RangeControl
						label={ __( 'Número de posts', 'curso-gutenberg' ) }
						value={ numberOfPosts }
						onChange={ ( value ) =>
							setAttributes( { numberOfPosts: value } )
						}
						min={ 1 }
						max={ 12 }
					/>
					<SelectControl
						label={ __( 'Categoria', 'curso-gutenberg' ) }
						value={ categoryId }
						options={ categoryOptions }
						onChange={ ( value ) =>
							setAttributes( { categoryId: parseInt( value, 10 ) } )
						}
					/>
					<RangeControl
						label={ __( 'Colunas', 'curso-gutenberg' ) }
						value={ columns }
						onChange={ ( value ) =>
							setAttributes( { columns: value } )
						}
						min={ 1 }
						max={ 4 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Exibição', 'curso-gutenberg' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Mostrar imagem destacada', 'curso-gutenberg' ) }
						checked={ showFeaturedImage }
						onChange={ ( value ) =>
							setAttributes( { showFeaturedImage: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Mostrar data', 'curso-gutenberg' ) }
						checked={ showDate }
						onChange={ ( value ) =>
							setAttributes( { showDate: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Mostrar resumo', 'curso-gutenberg' ) }
						checked={ showExcerpt }
						onChange={ ( value ) =>
							setAttributes( { showExcerpt: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ ! posts && (
					<Placeholder icon="list-view" label={ __( 'Últimos Posts', 'curso-gutenberg' ) }>
						<Spinner />
					</Placeholder>
				) }

				{ posts && posts.length === 0 && (
					<Placeholder icon="list-view" label={ __( 'Últimos Posts', 'curso-gutenberg' ) }>
						<p>{ __( 'Nenhum post encontrado.', 'curso-gutenberg' ) }</p>
					</Placeholder>
				) }

				{ posts && posts.length > 0 && (
					<div className="wp-block-curso-gutenberg-ultimos-posts__grid">
						{ posts.map( ( post ) => (
							<article
								key={ post.id }
								className="wp-block-curso-gutenberg-ultimos-posts__item"
							>
								{ showFeaturedImage && getFeaturedImageUrl( post ) && (
									<div className="wp-block-curso-gutenberg-ultimos-posts__image">
										<img
											src={ getFeaturedImageUrl( post ) }
											alt={ post.title.rendered }
										/>
									</div>
								) }
								<div className="wp-block-curso-gutenberg-ultimos-posts__content">
									<h3
										className="wp-block-curso-gutenberg-ultimos-posts__title"
										dangerouslySetInnerHTML={ {
											__html: post.title.rendered,
										} }
									/>
									{ showDate && (
										<time className="wp-block-curso-gutenberg-ultimos-posts__date">
											{ formatDate( post.date ) }
										</time>
									) }
									{ showExcerpt && post.excerpt && (
										<div
											className="wp-block-curso-gutenberg-ultimos-posts__excerpt"
											dangerouslySetInnerHTML={ {
												__html: post.excerpt.rendered,
											} }
										/>
									) }
								</div>
							</article>
						) ) }
					</div>
				) }
			</div>
		</>
	);
}
