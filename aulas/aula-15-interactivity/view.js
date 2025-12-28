/**
 * Aula 15 - WordPress Interactivity API
 *
 * Este arquivo implementa a interatividade do bloco FAQ Accordion
 * usando a WordPress Interactivity API.
 *
 * A Interactivity API permite adicionar interatividade no frontend
 * sem precisar de frameworks externos como React.
 */

import { store, getContext } from '@wordpress/interactivity';

/**
 * Store do FAQ Accordion.
 *
 * A store contém:
 * - state: Estado global compartilhado entre todas as instâncias
 * - actions: Funções que modificam o estado
 * - callbacks: Funções reativas que respondem a mudanças de estado
 */
store( 'curso-gutenberg/faq-accordion', {
	/**
	 * Estado global da store.
	 * Valores aqui são compartilhados entre todos os blocos.
	 */
	state: {
		// Estado global pode ser definido aqui se necessário
	},

	/**
	 * Ações que podem ser chamadas via data-wp-on--click.
	 */
	actions: {
		/**
		 * Toggle de um item do accordion.
		 * Chamado quando o usuário clica no header de um item.
		 */
		toggle() {
			const context = getContext();

			// Se allowMultiple é false, fecha outros itens
			if ( ! context.allowMultiple ) {
				// O contexto do item pai contém a lista de items abertos
				const parentContext = getContext( 'parent' );
				if ( parentContext && parentContext.openItems ) {
					// Fecha todos os outros items
					Object.keys( parentContext.openItems ).forEach( ( key ) => {
						if ( key !== context.itemId ) {
							parentContext.openItems[ key ] = false;
						}
					} );
				}
			}

			// Toggle do item atual
			context.isOpen = ! context.isOpen;
		},

		/**
		 * Abre todos os itens.
		 * Útil para botões de "Expandir todos".
		 */
		openAll() {
			const context = getContext();
			if ( context.items ) {
				context.items.forEach( ( item ) => {
					item.isOpen = true;
				} );
			}
		},

		/**
		 * Fecha todos os itens.
		 * Útil para botões de "Fechar todos".
		 */
		closeAll() {
			const context = getContext();
			if ( context.items ) {
				context.items.forEach( ( item ) => {
					item.isOpen = false;
				} );
			}
		},
	},

	/**
	 * Callbacks reativos.
	 * Executados automaticamente quando dependências mudam.
	 */
	callbacks: {
		/**
		 * Atualiza atributos ARIA quando o estado muda.
		 */
		updateAriaExpanded() {
			const context = getContext();
			return context.isOpen ? 'true' : 'false';
		},

		/**
		 * Retorna a classe CSS baseada no estado.
		 */
		getItemClass() {
			const context = getContext();
			return context.isOpen ? 'is-open' : '';
		},

		/**
		 * Log para debug (remover em produção).
		 */
		logState() {
			const context = getContext();
			console.log( 'FAQ Item State:', {
				itemId: context.itemId,
				isOpen: context.isOpen,
			} );
		},
	},
} );
