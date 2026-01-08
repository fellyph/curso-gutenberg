<?php
/**
 * Aula 15 - WordPress Interactivity API
 *
 * Template de renderização do bloco FAQ Accordion.
 * Usa diretivas da Interactivity API para adicionar interatividade.
 *
 * Diretivas disponíveis:
 * - data-wp-interactive: Define o namespace da store
 * - data-wp-context: Define o contexto local do elemento
 * - data-wp-on--[evento]: Adiciona event handlers
 * - data-wp-bind--[atributo]: Binding reativo de atributos
 * - data-wp-class--[classe]: Toggle reativo de classes CSS
 * - data-wp-text: Binding reativo de texto
 * - data-wp-watch: Observa mudanças e executa callback
 *
 * @package curso-gutenberg
 */

// Obtém os atributos
$allow_multiple = $attributes['allowMultiple'] ?? false;
$items          = $attributes['items'] ?? array();

// Se não houver items, não renderiza nada
if ( empty( $items ) ) {
	return;
}

// Contexto inicial para o container
$container_context = array(
	'allowMultiple' => $allow_multiple,
);

// Gera um ID único para o bloco
$block_id = wp_unique_id( 'faq-accordion-' );
?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="curso-gutenberg/faq-accordion"
	data-wp-context="<?php echo esc_attr( wp_json_encode( $container_context ) ); ?>"
>
	<div class="wp-block-curso-gutenberg-faq-accordion__items">
		<?php foreach ( $items as $index => $item ) : ?>
			<?php
			// Contexto específico de cada item
			$item_context = array(
				'itemId'        => $item['id'] ?? 'item-' . $index,
				'isOpen'        => false,
				'allowMultiple' => $allow_multiple,
			);

			$item_id      = $block_id . '-item-' . $index;
			$content_id   = $block_id . '-content-' . $index;
			?>
			<div
				class="wp-block-curso-gutenberg-faq-accordion__item"
				data-wp-context="<?php echo esc_attr( wp_json_encode( $item_context ) ); ?>"
				data-wp-class--is-open="context.isOpen"
			>
				<?php // Header do item - clicável ?>
				<button
					id="<?php echo esc_attr( $item_id ); ?>"
					class="wp-block-curso-gutenberg-faq-accordion__header"
					type="button"
					aria-controls="<?php echo esc_attr( $content_id ); ?>"
					data-wp-on--click="actions.toggle"
					data-wp-bind--aria-expanded="context.isOpen"
				>
					<h3 class="wp-block-curso-gutenberg-faq-accordion__question">
						<?php echo wp_kses_post( $item['question'] ?? '' ); ?>
					</h3>
					<span
						class="wp-block-curso-gutenberg-faq-accordion__icon"
						aria-hidden="true"
					>
						<?php // Ícone de seta que rotaciona ?>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
							fill="currentColor"
						>
							<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
						</svg>
					</span>
				</button>

				<?php // Conteúdo do item - expande/colapsa ?>
				<div
					id="<?php echo esc_attr( $content_id ); ?>"
					class="wp-block-curso-gutenberg-faq-accordion__content"
					role="region"
					aria-labelledby="<?php echo esc_attr( $item_id ); ?>"
					data-wp-bind--hidden="!context.isOpen"
				>
					<div class="wp-block-curso-gutenberg-faq-accordion__answer">
						<?php echo wp_kses_post( $item['answer'] ?? '' ); ?>
					</div>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>
