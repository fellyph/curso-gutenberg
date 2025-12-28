<?php
/**
 * Aula 13 - Blocos Dinâmicos com PHP
 *
 * Este arquivo é responsável por renderizar o bloco no frontend.
 * Ele é chamado automaticamente pelo WordPress quando o bloco é exibido.
 *
 * Variáveis disponíveis:
 * - $attributes (array): Os atributos do bloco definidos no block.json
 * - $content (string): O conteúdo do bloco (vazio para blocos dinâmicos)
 * - $block (WP_Block): A instância do bloco
 *
 * @package curso-gutenberg
 */

// Obtém os atributos com valores padrão
$number_of_posts     = $attributes['numberOfPosts'] ?? 3;
$category_id         = $attributes['categoryId'] ?? 0;
$show_excerpt        = $attributes['showExcerpt'] ?? true;
$show_date           = $attributes['showDate'] ?? true;
$show_featured_image = $attributes['showFeaturedImage'] ?? true;
$columns             = $attributes['columns'] ?? 3;

// Configura a query
$query_args = array(
	'post_type'      => 'post',
	'post_status'    => 'publish',
	'posts_per_page' => $number_of_posts,
	'orderby'        => 'date',
	'order'          => 'DESC',
);

// Adiciona filtro de categoria se especificado
if ( $category_id > 0 ) {
	$query_args['cat'] = $category_id;
}

// Executa a query
$posts_query = new WP_Query( $query_args );

// Se não houver posts, exibe mensagem
if ( ! $posts_query->have_posts() ) {
	?>
	<div <?php echo get_block_wrapper_attributes(); ?>>
		<p><?php esc_html_e( 'Nenhum post encontrado.', 'curso-gutenberg' ); ?></p>
	</div>
	<?php
	return;
}

// Classe CSS baseada no número de colunas
$wrapper_class = 'has-' . $columns . '-columns';
?>

<div <?php echo get_block_wrapper_attributes( array( 'class' => $wrapper_class ) ); ?>>
	<div class="wp-block-curso-gutenberg-ultimos-posts__grid">
		<?php
		while ( $posts_query->have_posts() ) :
			$posts_query->the_post();
			?>
			<article class="wp-block-curso-gutenberg-ultimos-posts__item">
				<?php if ( $show_featured_image && has_post_thumbnail() ) : ?>
					<div class="wp-block-curso-gutenberg-ultimos-posts__image">
						<a href="<?php the_permalink(); ?>">
							<?php
							the_post_thumbnail(
								'medium',
								array(
									'alt'     => esc_attr( get_the_title() ),
									'loading' => 'lazy',
								)
							);
							?>
						</a>
					</div>
				<?php endif; ?>

				<div class="wp-block-curso-gutenberg-ultimos-posts__content">
					<h3 class="wp-block-curso-gutenberg-ultimos-posts__title">
						<a href="<?php the_permalink(); ?>">
							<?php the_title(); ?>
						</a>
					</h3>

					<?php if ( $show_date ) : ?>
						<time
							class="wp-block-curso-gutenberg-ultimos-posts__date"
							datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"
						>
							<?php echo esc_html( get_the_date() ); ?>
						</time>
					<?php endif; ?>

					<?php if ( $show_excerpt ) : ?>
						<div class="wp-block-curso-gutenberg-ultimos-posts__excerpt">
							<?php the_excerpt(); ?>
						</div>
					<?php endif; ?>
				</div>
			</article>
			<?php
		endwhile;

		// Restaura o post original
		wp_reset_postdata();
		?>
	</div>
</div>
