# Aula 15 - WordPress Interactivity API

## Objetivo da Aula

Aprender a usar a WordPress Interactivity API para adicionar interatividade no frontend sem frameworks externos como React, Vue ou jQuery. A Interactivity API é a forma oficial do WordPress de criar experiências dinâmicas mantendo o site leve e performático.

## Exercício: FAQ Accordion

Neste exercício, criamos um **FAQ Accordion** (`curso-gutenberg/faq-accordion`) que demonstra os principais conceitos da Interactivity API.

### O que o bloco faz?

- Exibe perguntas e respostas em formato accordion
- Clique para expandir/colapsar respostas
- Opção de permitir múltiplos itens abertos
- Animações CSS suaves
- Acessibilidade completa (ARIA)

### Preview do Bloco

```
┌─────────────────────────────────────────┐
│  FAQ                                    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ ▼ Qual é a primeira pergunta?     │  │
│  ├───────────────────────────────────┤  │
│  │   Esta é a resposta para a        │  │
│  │   primeira pergunta.              │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ ▶ Qual é a segunda pergunta?      │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ ▶ Qual é a terceira pergunta?     │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## O que é a Interactivity API?

A Interactivity API é um sistema nativo do WordPress para adicionar interatividade ao frontend. Ela usa:

- **Diretivas HTML**: Atributos `data-wp-*` que conectam o HTML ao JavaScript
- **Store**: Estado centralizado com actions e callbacks
- **Reatividade**: Atualizações automáticas da UI quando o estado muda

### Vantagens

1. **Sem frameworks extras**: Não precisa carregar React no frontend
2. **Performance**: Bundle muito menor que React/Vue
3. **Declarativo**: Interatividade definida no HTML
4. **Nativo**: Integrado ao WordPress, suporte oficial

---

## Configuração no block.json

```json
{
    "name": "curso-gutenberg/faq-accordion",
    "supports": {
        "interactivity": true
    },
    "viewScriptModule": "file:./view.js",
    "render": "file:./render.php"
}
```

### Propriedades Importantes

| Propriedade | Descrição |
|-------------|-----------|
| `supports.interactivity` | Habilita a Interactivity API |
| `viewScriptModule` | Script que roda no frontend (ES modules) |
| `render` | Template PHP (blocos dinâmicos) |

---

## Arquivo view.js - A Store

O `view.js` define a store com estado, ações e callbacks:

```javascript
import { store, getContext } from '@wordpress/interactivity';

store( 'curso-gutenberg/faq-accordion', {
    // Estado global compartilhado
    state: {
        globalCounter: 0,
    },

    // Ações chamadas por eventos
    actions: {
        toggle() {
            const context = getContext();
            context.isOpen = ! context.isOpen;
        },

        openAll() {
            const context = getContext();
            context.items.forEach( item => item.isOpen = true );
        },
    },

    // Callbacks reativos
    callbacks: {
        logState() {
            const context = getContext();
            console.log( 'Estado:', context.isOpen );
        },
    },
} );
```

### Conceitos da Store

#### state
Estado global compartilhado entre todas as instâncias do bloco.

#### actions
Funções que modificam o estado. Chamadas via `data-wp-on--click`.

#### callbacks
Funções reativas executadas quando o estado muda. Úteis para side effects.

---

## getContext() - Estado Local

`getContext()` retorna o contexto do elemento atual, definido via `data-wp-context`:

```php
<div data-wp-context='{ "isOpen": false, "itemId": "faq-1" }'>
```

```javascript
actions: {
    toggle() {
        const context = getContext();
        // context.isOpen = false
        // context.itemId = "faq-1"
        context.isOpen = ! context.isOpen;
    },
}
```

---

## Arquivo render.php - Diretivas HTML

O `render.php` usa diretivas `data-wp-*` para conectar o HTML à store:

```php
<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="curso-gutenberg/faq-accordion"
    data-wp-context='<?php echo wp_json_encode( $context ); ?>'
>
    <button
        data-wp-on--click="actions.toggle"
        data-wp-bind--aria-expanded="context.isOpen"
    >
        <?php echo esc_html( $question ); ?>
    </button>

    <div
        data-wp-bind--hidden="!context.isOpen"
        data-wp-class--is-open="context.isOpen"
    >
        <?php echo wp_kses_post( $answer ); ?>
    </div>
</div>
```

---

## Diretivas Disponíveis

### data-wp-interactive

Define o namespace da store para o elemento e seus filhos:

```html
<div data-wp-interactive="meu-plugin/meu-bloco">
```

---

### data-wp-context

Define o contexto local (estado) do elemento:

```html
<div data-wp-context='{ "isOpen": false, "count": 0 }'>
```

---

### data-wp-on--[evento]

Adiciona event handlers:

```html
<button data-wp-on--click="actions.toggle">Clique</button>
<input data-wp-on--input="actions.updateValue">
<div data-wp-on--mouseenter="actions.highlight">
```

Eventos suportados: `click`, `input`, `change`, `submit`, `keydown`, `mouseenter`, `mouseleave`, etc.

---

### data-wp-bind--[atributo]

Binding reativo de atributos HTML:

```html
<button data-wp-bind--disabled="state.isLoading">
<div data-wp-bind--hidden="!context.isVisible">
<input data-wp-bind--value="context.inputValue">
<a data-wp-bind--href="state.currentUrl">
```

---

### data-wp-class--[classe]

Toggle reativo de classes CSS:

```html
<div data-wp-class--is-open="context.isOpen">
<div data-wp-class--is-active="state.isActive">
<div data-wp-class--has-error="context.hasError">
```

---

### data-wp-text

Binding reativo de conteúdo de texto:

```html
<span data-wp-text="context.counter"></span>
<p data-wp-text="state.message"></p>
```

---

### data-wp-watch

Executa callback quando dependências mudam:

```html
<div data-wp-watch="callbacks.logState">
```

---

## Código Completo do Exercício

### view.js

```javascript
import { store, getContext } from '@wordpress/interactivity';

store( 'curso-gutenberg/faq-accordion', {
    state: {},

    actions: {
        toggle() {
            const context = getContext();

            // Se não permite múltiplos, fecha outros
            if ( ! context.allowMultiple ) {
                // Lógica para fechar outros itens
            }

            context.isOpen = ! context.isOpen;
        },
    },

    callbacks: {
        updateAriaExpanded() {
            const context = getContext();
            return context.isOpen ? 'true' : 'false';
        },
    },
} );
```

### render.php (simplificado)

```php
<?php
$items = $attributes['items'] ?? array();
$allow_multiple = $attributes['allowMultiple'] ?? false;
?>

<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="curso-gutenberg/faq-accordion"
    data-wp-context='{ "allowMultiple": <?php echo $allow_multiple ? 'true' : 'false'; ?> }'
>
    <?php foreach ( $items as $index => $item ) : ?>
        <div
            data-wp-context='{ "isOpen": false, "itemId": "item-<?php echo $index; ?>" }'
            data-wp-class--is-open="context.isOpen"
        >
            <button
                data-wp-on--click="actions.toggle"
                data-wp-bind--aria-expanded="context.isOpen"
            >
                <?php echo esc_html( $item['question'] ); ?>
            </button>

            <div data-wp-bind--hidden="!context.isOpen">
                <?php echo wp_kses_post( $item['answer'] ); ?>
            </div>
        </div>
    <?php endforeach; ?>
</div>
```

---

## Estado Local vs Global

### Estado Local (context)
- Específico para cada elemento
- Definido com `data-wp-context`
- Acessado com `getContext()`
- Ideal para: estado de UI individual

### Estado Global (state)
- Compartilhado entre todos os blocos
- Definido na store
- Acessado com `state.propriedade`
- Ideal para: dados compartilhados, contadores globais

---

## Acessibilidade

O exercício demonstra boas práticas de acessibilidade:

```php
<button
    id="faq-item-1"
    aria-controls="faq-content-1"
    data-wp-bind--aria-expanded="context.isOpen"
>
    Pergunta
</button>

<div
    id="faq-content-1"
    role="region"
    aria-labelledby="faq-item-1"
    data-wp-bind--hidden="!context.isOpen"
>
    Resposta
</div>
```

### Atributos ARIA Importantes

| Atributo | Descrição |
|----------|-----------|
| `aria-expanded` | Indica se o accordion está aberto |
| `aria-controls` | ID do conteúdo controlado |
| `aria-labelledby` | ID do elemento que rotula |
| `role="region"` | Define a região de conteúdo |

---

## CSS para Animações

```scss
.wp-block-curso-gutenberg-faq-accordion {
    &__item {
        // Ícone que rotaciona
        .icon {
            transition: transform 0.3s ease;
        }

        &.is-open .icon {
            transform: rotate(180deg);
        }
    }

    &__content {
        // Conteúdo oculto
        &[hidden] {
            display: none;
        }

        // Animação de entrada
        animation: slideDown 0.3s ease;
    }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

---

## Desafios Propostos

1. **Expandir/Colapsar Todos**: Adicione botões para abrir/fechar todos os itens
2. **Deep Linking**: Faça o accordion abrir baseado na URL (#faq-1)
3. **Busca**: Adicione um campo de busca para filtrar perguntas
4. **Persistência**: Salve o estado aberto/fechado no localStorage

---

## Quando Usar a Interactivity API?

### Use quando:
- Precisa de interatividade simples a moderada
- Quer evitar carregar React no frontend
- O bloco é renderizado pelo PHP
- Precisa de performance máxima

### Considere alternativas quando:
- Interatividade muito complexa
- Já usa React no frontend por outros motivos
- Precisa de bibliotecas específicas do React

---

## Referências

- [Interactivity API - Block Editor Handbook](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/)
- [Interactivity API Reference](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/api-reference/)
- [Getting Started with Interactivity API](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/iapi-quick-start-guide/)
