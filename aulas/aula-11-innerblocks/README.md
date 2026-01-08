# Aula 11 - InnerBlocks e Blocos Aninhados

## Objetivo da Aula

Aprender a criar blocos "container" que podem conter outros blocos dentro deles. O InnerBlocks é fundamental para criar layouts complexos, seções, cards e qualquer estrutura que agrupe conteúdo.

## Exercício: Feature Box

Neste exercício, criamos um **Feature Box** (`curso-gutenberg/feature-box`) que demonstra como usar InnerBlocks com templates, blocos permitidos e contexto.

### O que o bloco faz?

- Cria um container com cor de fundo personalizável
- Define um template inicial com título e parágrafo
- Restringe quais blocos podem ser adicionados
- Compartilha uma cor de ícone via Block Context

### Preview do Bloco

```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐    │
│  │  Feature Box                │    │
│  │                             │    │
│  │  ★ Título da Feature        │    │
│  │                             │    │
│  │  Descrição detalhada da     │    │
│  │  feature que você está      │    │
│  │  apresentando.              │    │
│  │                             │    │
│  │  [+ Adicionar bloco]        │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

---

## Conceito: InnerBlocks

O `InnerBlocks` é um componente que cria uma área onde outros blocos podem ser inseridos:

```javascript
import { InnerBlocks } from '@wordpress/block-editor';

// No edit.js
<div { ...blockProps }>
    <InnerBlocks />
</div>

// No save.js
<div { ...blockProps.save() }>
    <InnerBlocks.Content />
</div>
```

---

## Props do InnerBlocks

### 1. template - Estrutura Inicial

Define quais blocos aparecem quando o bloco é inserido:

```javascript
const TEMPLATE = [
    [
        'core/heading',
        {
            level: 3,
            placeholder: 'Título da Feature',
        },
    ],
    [
        'core/paragraph',
        {
            placeholder: 'Descreva a feature aqui...',
        },
    ],
];

<InnerBlocks template={ TEMPLATE } />
```

#### Estrutura do Template

```javascript
[
    [ 'namespace/block-name', { atributos }, [ blocos-filhos ] ],
    [ 'core/paragraph', { content: 'Texto inicial' } ],
    [ 'core/columns', {}, [
        [ 'core/column', {}, [
            [ 'core/paragraph', {} ]
        ] ]
    ] ]
]
```

---

### 2. allowedBlocks - Blocos Permitidos

Restringe quais blocos podem ser adicionados:

```javascript
const ALLOWED_BLOCKS = [
    'core/heading',
    'core/paragraph',
    'core/image',
    'core/list',
    'core/buttons',
];

<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
```

Se omitido, todos os blocos são permitidos.

---

### 3. templateLock - Travar Estrutura

Controla se o usuário pode modificar a estrutura:

```javascript
<InnerBlocks templateLock="all" />     // Não pode adicionar, remover ou mover
<InnerBlocks templateLock="insert" />  // Pode mover, mas não adicionar/remover
<InnerBlocks templateLock={ false } /> // Totalmente livre (padrão)
<InnerBlocks templateLock="contentOnly" /> // Apenas edita conteúdo
```

| Valor | Adicionar | Remover | Mover | Editar |
|-------|-----------|---------|-------|--------|
| `false` | ✅ | ✅ | ✅ | ✅ |
| `"all"` | ❌ | ❌ | ❌ | ✅ |
| `"insert"` | ❌ | ❌ | ✅ | ✅ |
| `"contentOnly"` | ❌ | ❌ | ❌ | ✅ |

---

### 4. orientation - Direção do Layout

Define se os blocos são empilhados vertical ou horizontalmente:

```javascript
<InnerBlocks orientation="vertical" />   // Padrão - blocos empilhados
<InnerBlocks orientation="horizontal" /> // Blocos lado a lado
```

---

### 5. renderAppender - Botão de Adicionar

Customiza o botão para adicionar novos blocos:

```javascript
// Botão padrão do Gutenberg
<InnerBlocks renderAppender={ InnerBlocks.DefaultBlockAppender } />

// Botão com ícone "+"
<InnerBlocks renderAppender={ InnerBlocks.ButtonBlockAppender } />

// Sem botão de adicionar
<InnerBlocks renderAppender={ false } />

// Componente customizado
<InnerBlocks renderAppender={ () => <MyCustomAppender /> } />
```

---

## Salvamento com InnerBlocks.Content

No `save.js`, use `InnerBlocks.Content` para renderizar os blocos filhos:

```javascript
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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
            <InnerBlocks.Content />
        </div>
    );
}
```

---

## Block Context - Compartilhando Dados

O Feature Box demonstra como compartilhar dados com blocos filhos usando Context.

### No bloco pai (block.json):

```json
{
    "providesContext": {
        "curso-gutenberg/iconColor": "iconColor"
    },
    "attributes": {
        "iconColor": {
            "type": "string",
            "default": "#0073aa"
        }
    }
}
```

### No bloco filho (block.json):

```json
{
    "usesContext": ["curso-gutenberg/iconColor"]
}
```

### Acessando o contexto (edit.js do filho):

```javascript
export default function Edit( { context } ) {
    const iconColor = context['curso-gutenberg/iconColor'];

    return (
        <div style={ { color: iconColor } }>
            {/* conteúdo */}
        </div>
    );
}
```

---

## Código Completo do Exercício

### block.json

```json
{
    "name": "curso-gutenberg/feature-box",
    "title": "Feature Box",
    "category": "design",
    "icon": "star-filled",
    "attributes": {
        "backgroundColor": {
            "type": "string",
            "default": "#f8f9fa"
        },
        "iconColor": {
            "type": "string",
            "default": "#0073aa"
        }
    },
    "providesContext": {
        "curso-gutenberg/iconColor": "iconColor"
    },
    "supports": {
        "align": ["wide", "full"],
        "spacing": {
            "padding": true,
            "margin": true
        }
    }
}
```

### edit.js (simplificado)

```javascript
const TEMPLATE = [
    ['core/heading', { level: 3, placeholder: 'Título' }],
    ['core/paragraph', { placeholder: 'Descrição...' }],
];

const ALLOWED_BLOCKS = [
    'core/heading',
    'core/paragraph',
    'core/image',
    'core/list',
    'core/buttons',
];

export default function Edit( { attributes, setAttributes } ) {
    const { backgroundColor, iconColor } = attributes;

    const blockProps = useBlockProps( {
        style: {
            backgroundColor,
            '--icon-color': iconColor,
        },
    } );

    return (
        <>
            <InspectorControls>
                {/* Controles de cor */}
            </InspectorControls>

            <div { ...blockProps }>
                <InnerBlocks
                    template={ TEMPLATE }
                    templateLock={ false }
                    allowedBlocks={ ALLOWED_BLOCKS }
                    orientation="vertical"
                    renderAppender={ InnerBlocks.ButtonBlockAppender }
                />
            </div>
        </>
    );
}
```

---

## Casos de Uso Comuns

### 1. Seção com Layout Fixo

```javascript
const TEMPLATE = [
    ['core/heading', { level: 2 }],
    ['core/paragraph', {}],
    ['core/buttons', {}, [
        ['core/button', { text: 'Saiba mais' }]
    ]]
];

<InnerBlocks template={ TEMPLATE } templateLock="all" />
```

### 2. Grid de Cards

```javascript
const TEMPLATE = [
    ['core/columns', { columns: 3 }, [
        ['core/column', {}, [['meu-plugin/card', {}]]],
        ['core/column', {}, [['meu-plugin/card', {}]]],
        ['core/column', {}, [['meu-plugin/card', {}]]],
    ]]
];

<InnerBlocks template={ TEMPLATE } templateLock="insert" />
```

### 3. Accordion/FAQ Item

```javascript
const ALLOWED_BLOCKS = ['core/paragraph', 'core/list', 'core/image'];

<InnerBlocks
    allowedBlocks={ ALLOWED_BLOCKS }
    renderAppender={ false }  // Sem botão de adicionar
/>
```

---

## Desafios Propostos

1. **Criar bloco filho**: Crie um bloco "Feature Item" que consome o contexto `iconColor`
2. **Template com colunas**: Modifique o template para usar `core/columns` com 2 colunas
3. **TemplateLock dinâmico**: Adicione um toggle para permitir/bloquear edição da estrutura
4. **Appender customizado**: Crie um botão personalizado para adicionar blocos

---

## Referências

- [InnerBlocks - Block Editor Handbook](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#innerblocks)
- [Block Context](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/)
- [Nested Blocks Tutorial](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/)
