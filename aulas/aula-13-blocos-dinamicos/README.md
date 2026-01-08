# Aula 13 - Blocos Dinâmicos com PHP

## Objetivo da Aula

Aprender a criar blocos dinâmicos que são renderizados pelo PHP no momento da exibição, em vez de terem HTML estático salvo no banco de dados. Blocos dinâmicos são essenciais para conteúdo que muda frequentemente ou depende de dados do WordPress.

## Exercício: Bloco Últimos Posts

Neste exercício, criamos um **Bloco Últimos Posts** (`curso-gutenberg/ultimos-posts`) que busca e exibe posts dinamicamente usando WP_Query.

### O que o bloco faz?

- Busca posts do WordPress em tempo real
- Permite filtrar por categoria
- Configura número de posts e colunas
- Exibe imagem destacada, data e resumo (opcionais)
- Atualiza automaticamente quando novos posts são publicados

### Preview do Bloco

```
┌─────────────────────────────────────────────────────────┐
│  Últimos Posts                                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                 │
│  │ [IMG]   │  │ [IMG]   │  │ [IMG]   │                 │
│  │         │  │         │  │         │                 │
│  │ Título  │  │ Título  │  │ Título  │                 │
│  │ 01 Jan  │  │ 02 Jan  │  │ 03 Jan  │                 │
│  │ Resumo  │  │ Resumo  │  │ Resumo  │                 │
│  │ ...     │  │ ...     │  │ ...     │                 │
│  └─────────┘  └─────────┘  └─────────┘                 │
└─────────────────────────────────────────────────────────┘
```

---

## Blocos Estáticos vs Dinâmicos

### Bloco Estático
- O HTML é gerado pelo JavaScript (`save.js`)
- HTML é salvo diretamente no conteúdo do post
- O conteúdo não muda automaticamente
- Exemplo: Parágrafo, Título, Botão

### Bloco Dinâmico
- O HTML é gerado pelo PHP (`render.php`)
- Apenas os atributos são salvos no banco
- O conteúdo é gerado em cada visualização
- Exemplo: Posts Recentes, Query Loop, Comentários

---

## Configuração no block.json

A chave para blocos dinâmicos é a propriedade `render`:

```json
{
    "name": "curso-gutenberg/ultimos-posts",
    "render": "file:./render.php",
    "attributes": {
        "numberOfPosts": {
            "type": "number",
            "default": 3
        },
        "categoryId": {
            "type": "number",
            "default": 0
        },
        "showExcerpt": {
            "type": "boolean",
            "default": true
        },
        "showDate": {
            "type": "boolean",
            "default": true
        },
        "showFeaturedImage": {
            "type": "boolean",
            "default": true
        },
        "columns": {
            "type": "number",
            "default": 3
        }
    }
}
```

---

## Arquivo render.php

O `render.php` é chamado automaticamente pelo WordPress para renderizar o bloco.

### Variáveis Disponíveis

```php
<?php
// $attributes - Array com os atributos do bloco
$number_of_posts = $attributes['numberOfPosts'] ?? 3;

// $content - Conteúdo do bloco (InnerBlocks se houver)
// Para blocos dinâmicos puros, geralmente está vazio

// $block - Instância WP_Block com informações completas
$block_name = $block->name;  // "curso-gutenberg/ultimos-posts"
$context = $block->context;  // Contexto de blocos pai
```

### Estrutura Básica

```php
<?php
// 1. Obter atributos com valores padrão
$number_of_posts = $attributes['numberOfPosts'] ?? 3;
$category_id     = $attributes['categoryId'] ?? 0;

// 2. Configurar a query
$query_args = array(
    'post_type'      => 'post',
    'post_status'    => 'publish',
    'posts_per_page' => $number_of_posts,
    'orderby'        => 'date',
    'order'          => 'DESC',
);

if ( $category_id > 0 ) {
    $query_args['cat'] = $category_id;
}

// 3. Executar a query
$posts_query = new WP_Query( $query_args );

// 4. Verificar resultados
if ( ! $posts_query->have_posts() ) {
    ?>
    <div <?php echo get_block_wrapper_attributes(); ?>>
        <p><?php esc_html_e( 'Nenhum post encontrado.', 'curso-gutenberg' ); ?></p>
    </div>
    <?php
    return;
}

// 5. Renderizar posts
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
    <?php
    while ( $posts_query->have_posts() ) :
        $posts_query->the_post();
        ?>
        <article>
            <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
            <?php the_excerpt(); ?>
        </article>
        <?php
    endwhile;
    wp_reset_postdata();
    ?>
</div>
```

---

## get_block_wrapper_attributes()

Esta função é essencial para blocos dinâmicos. Ela gera os atributos do wrapper incluindo:

- Classes CSS do bloco
- Estilos dos Block Supports
- Classes de alinhamento
- ID de âncora

```php
// Básico
<div <?php echo get_block_wrapper_attributes(); ?>>

// Com classes adicionais
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'has-3-columns' ) ); ?>>

// Com estilos adicionais
<div <?php echo get_block_wrapper_attributes( array(
    'class' => 'custom-class',
    'style' => 'background: red;'
) ); ?>>
```

---

## Segurança: Escapamento

**SEMPRE** escape dados antes de exibir:

```php
// Texto simples
<?php echo esc_html( $title ); ?>

// Atributos HTML
<a href="<?php echo esc_url( $link ); ?>">

// Atributos gerais
<div id="<?php echo esc_attr( $id ); ?>">

// HTML permitido (posts, excerpts)
<?php echo wp_kses_post( $content ); ?>

// Traduções
<?php esc_html_e( 'Texto traduzível', 'textdomain' ); ?>
<?php echo esc_html__( 'Texto traduzível', 'textdomain' ); ?>
```

---

## Editor (edit.js) para Blocos Dinâmicos

No editor, usamos a REST API para buscar dados em tempo real:

```javascript
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default function Edit( { attributes } ) {
    const { numberOfPosts, categoryId } = attributes;

    // Buscar posts via REST API
    const posts = useSelect( ( select ) => {
        const query = {
            per_page: numberOfPosts,
            _embed: true,  // Incluir mídia
        };

        if ( categoryId > 0 ) {
            query.categories = [ categoryId ];
        }

        return select( coreStore ).getEntityRecords( 'postType', 'post', query );
    }, [ numberOfPosts, categoryId ] );

    // Buscar categorias para o SelectControl
    const categories = useSelect( ( select ) => {
        return select( coreStore ).getEntityRecords( 'taxonomy', 'category', {
            per_page: -1,
        } );
    }, [] );

    // Renderizar preview
    return (
        <div { ...useBlockProps() }>
            { ! posts && <Spinner /> }
            { posts && posts.length === 0 && <p>Nenhum post encontrado.</p> }
            { posts && posts.map( ( post ) => (
                <article key={ post.id }>
                    <h3>{ post.title.rendered }</h3>
                </article>
            ) ) }
        </div>
    );
}
```

---

## useSelect e REST API

### Buscar Posts

```javascript
const posts = useSelect( ( select ) => {
    return select( coreStore ).getEntityRecords( 'postType', 'post', {
        per_page: 10,
        status: 'publish',
        _embed: true,
    } );
}, [] );
```

### Buscar Categorias

```javascript
const categories = useSelect( ( select ) => {
    return select( coreStore ).getEntityRecords( 'taxonomy', 'category', {
        per_page: -1,
    } );
}, [] );
```

### Buscar um Post Específico

```javascript
const post = useSelect( ( select ) => {
    return select( coreStore ).getEntityRecord( 'postType', 'post', postId );
}, [ postId ] );
```

---

## Código Completo do Exercício

### Estrutura de Arquivos

```
aula-13-blocos-dinamicos/
├── block.json      # Metadados e atributos
├── edit.js         # Componente do editor (usa REST API)
├── render.php      # Renderização do frontend (usa WP_Query)
├── style.scss      # Estilos do bloco
└── editor.scss     # Estilos apenas do editor
```

### render.php (simplificado)

```php
<?php
$posts_query = new WP_Query( array(
    'posts_per_page' => $attributes['numberOfPosts'] ?? 3,
    'cat'            => $attributes['categoryId'] ?? 0,
) );

if ( ! $posts_query->have_posts() ) {
    echo '<p>Nenhum post encontrado.</p>';
    return;
}
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <?php while ( $posts_query->have_posts() ) : $posts_query->the_post(); ?>
        <article>
            <?php if ( has_post_thumbnail() ) : ?>
                <a href="<?php the_permalink(); ?>">
                    <?php the_post_thumbnail( 'medium' ); ?>
                </a>
            <?php endif; ?>

            <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
            <time datetime="<?php echo get_the_date( 'c' ); ?>">
                <?php echo get_the_date(); ?>
            </time>
            <?php the_excerpt(); ?>
        </article>
    <?php endwhile; wp_reset_postdata(); ?>
</div>
```

---

## Quando Usar Blocos Dinâmicos?

### Use dinâmico quando:
- O conteúdo muda frequentemente (posts recentes)
- Depende do usuário logado
- Requer queries ao banco de dados
- Precisa de dados de taxonomias/meta
- O bloco deve ser sempre atualizado

### Use estático quando:
- O conteúdo é fixo (texto, imagens)
- Não depende de dados externos
- Não precisa de atualização automática
- Performance é crítica

---

## Desafios Propostos

1. **Adicionar paginação**: Implemente botões "Anterior" e "Próximo"
2. **Filtro por tag**: Adicione um SelectControl para filtrar por tag
3. **Custom Post Type**: Modifique para suportar qualquer post type
4. **Cache**: Implemente transients para cache dos resultados

---

## Referências

- [Dynamic Blocks - Block Editor Handbook](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/)
- [WP_Query Class Reference](https://developer.wordpress.org/reference/classes/wp_query/)
- [get_block_wrapper_attributes()](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)
- [Data Module Reference](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/)
