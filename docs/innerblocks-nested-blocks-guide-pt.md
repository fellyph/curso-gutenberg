# InnerBlocks e Blocos Aninhados - Guia Completo

## Neste artigo
- [Visão Geral](#visão-geral)
- [O que são Blocos Aninhados?](#o-que-são-blocos-aninhados)
- [O Componente InnerBlocks](#o-componente-innerblocks)
- [Uso Básico](#uso-básico)
- [Blocos Permitidos](#blocos-permitidos)
- [Templates de Blocos](#templates-de-blocos)
- [Bloqueio de Template](#bloqueio-de-template)
- [Orientação de Blocos](#orientação-de-blocos)
- [Bloco Padrão e Inserção Direta](#bloco-padrão-e-inserção-direta)
- [Relacionamentos de Blocos](#relacionamentos-de-blocos)
- [Hook useInnerBlocksProps](#hook-useinnerblocksprops)
- [Exercícios](#exercícios)
- [Melhores Práticas](#melhores-práticas)
- [Recursos Adicionais](#recursos-adicionais)

## Visão Geral

Blocos aninhados são um dos recursos mais poderosos do editor de blocos do WordPress (Gutenberg). Eles permitem que você crie blocos contêineres que podem conter outros blocos, possibilitando layouts complexos e padrões reutilizáveis. Este guia ensinará tudo o que você precisa saber sobre a criação de blocos com conteúdo aninhado usando o componente `InnerBlocks`.

### O que você aprenderá

Ao completar este guia, você dominará:

- **Componente InnerBlocks**: Compreensão e uso do componente principal para blocos aninhados
- **Configuração de Blocos**: Controle de quais blocos podem ser inseridos como filhos
- **Templates**: Pré-preenchimento de blocos com conteúdo padrão e bloqueio de estruturas
- **Relacionamentos de Blocos**: Definição de relacionamentos pai-filho e ancestral
- **Padrões Avançados**: Uso de `useInnerBlocksProps` para layouts personalizados
- **Exemplos do Mundo Real**: Construção de blocos contêineres práticos

## O que são Blocos Aninhados?

Blocos aninhados são blocos que podem conter outros blocos como filhos. Exemplos comuns no núcleo do WordPress incluem:

- **Bloco de Grupo**: Um contêiner simples para agrupar blocos
- **Bloco de Colunas**: Contém blocos de coluna que contêm outros blocos
- **Bloco de Capa**: Contém blocos sobrepostos em uma imagem ou cor
- **Loop de Consulta**: Contém blocos que exibem conteúdo de posts

### Benefícios dos Blocos Aninhados

1. **Composição**: Construa layouts complexos a partir de componentes simples
2. **Reutilização**: Crie padrões que podem ser reutilizados em todo o seu site
3. **Flexibilidade**: Usuários podem personalizar o conteúdo mantendo a estrutura
4. **Consistência**: Imponha sistemas de design através de relacionamentos de blocos

## O Componente InnerBlocks

O componente `InnerBlocks` é a ferramenta principal para criar blocos aninhados. Ele fornece uma área onde os usuários podem adicionar, remover e organizar blocos filhos.

### Importação Básica

```javascript
import { InnerBlocks } from '@wordpress/block-editor';
```

### Recursos Principais

- **Inserção de Blocos**: Fornece interface para adicionar blocos
- **Gerenciamento de Blocos**: Permite que usuários selecionem, movam e removam blocos
- **Persistência de Conteúdo**: Salva automaticamente o conteúdo de blocos aninhados
- **Personalização**: Suporta opções de configuração extensivas

## Uso Básico

Aqui está um exemplo mínimo de um bloco contêiner usando `InnerBlocks`:

### edit.js

```javascript
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
    const blockProps = useBlockProps();
    
    return (
        <div { ...blockProps }>
            <InnerBlocks />
        </div>
    );
}
```

### save.js

```javascript
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
    const blockProps = useBlockProps.save();
    
    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
}
```

**Importante**: Na função save, sempre use `InnerBlocks.Content` (não apenas `InnerBlocks`) para renderizar o conteúdo salvo.

## Blocos Permitidos

Você pode restringir quais blocos os usuários podem inserir como filhos usando a prop `allowedBlocks`.

### Exemplo: Apenas Parágrafos e Imagens

```javascript
export default function Edit() {
    const blockProps = useBlockProps();
    const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/image' ];
    
    return (
        <div { ...blockProps }>
            <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
        </div>
    );
}
```

### Nomes de Blocos Comuns

- `core/paragraph` - Bloco de parágrafo
- `core/heading` - Bloco de título
- `core/image` - Bloco de imagem
- `core/list` - Bloco de lista
- `core/quote` - Bloco de citação
- `core/button` - Bloco de botão

### Permitir Todos os Blocos

Se você não especificar `allowedBlocks`, os usuários podem inserir qualquer bloco registrado.

## Templates de Blocos

Templates permitem que você pré-preencha `InnerBlocks` com blocos padrão. Isso é útil para criar padrões de conteúdo estruturado.

### Template Básico

```javascript
export default function Edit() {
    const blockProps = useBlockProps();
    const TEMPLATE = [
        [ 'core/heading', { level: 2, placeholder: 'Título da Avaliação' } ],
        [ 'core/image', { } ],
        [ 'core/paragraph', { placeholder: 'Escreva sua avaliação...' } ],
    ];
    
    return (
        <div { ...blockProps }>
            <InnerBlocks template={ TEMPLATE } />
        </div>
    );
}
```

### Estrutura do Template

Cada item do template é um array com:
1. **Nome do bloco** (string): ex: `'core/paragraph'`
2. **Atributos** (objeto): Atributos do bloco a serem definidos
3. **Blocos internos** (array, opcional): Template aninhado para aquele bloco

### Exemplo de Template Aninhado

```javascript
const TEMPLATE = [
    [ 'core/columns', {}, [
        [ 'core/column', {}, [
            [ 'core/image', {} ]
        ] ],
        [ 'core/column', {}, [
            [ 'core/paragraph', { placeholder: 'Descrição...' } ]
        ] ]
    ] ]
];
```

## Bloqueio de Template

O bloqueio de template controla se os usuários podem adicionar, remover ou mover blocos dentro do template.

### Opções de Bloqueio

```javascript
// Sem bloqueio - usuários podem modificar tudo (padrão)
<InnerBlocks template={ TEMPLATE } />

// Bloquear todas as modificações - usuários só podem editar conteúdo
<InnerBlocks 
    template={ TEMPLATE }
    templateLock="all"
/>

// Bloquear inserção - impedir adicionar novos blocos
<InnerBlocks 
    template={ TEMPLATE }
    templateLock="insert"
/>

// Bloquear estrutura - impedir remoção de blocos mas permitir reordenação
<InnerBlocks 
    template={ TEMPLATE }
    templateLock={ false }
/>
```

### Valores de Bloqueio

- `"all"` - Bloqueia tudo (sem adicionar, remover ou mover blocos)
- `"insert"` - Bloqueia adicionar novos blocos (pode remover e mover existentes)
- `false` ou não definido - Sem bloqueio (flexibilidade total)

## Orientação de Blocos

A prop `orientation` controla como os blocos filhos são organizados visualmente no editor.

```javascript
// Orientação horizontal (padrão para a maioria dos blocos)
<InnerBlocks orientation="horizontal" />

// Orientação vertical
<InnerBlocks orientation="vertical" />
```

**Nota**: Isso afeta apenas a aparência do editor, não a exibição no frontend.

## Bloco Padrão e Inserção Direta

Controle o que acontece quando os usuários adicionam conteúdo a `InnerBlocks` vazios.

### Bloco Padrão

```javascript
// Define o tipo de bloco padrão ao inserir
<InnerBlocks 
    defaultBlock={ { name: 'core/paragraph' } }
/>
```

### Inserção Direta

Quando `directInsert` está habilitado, pressionar Enter insere automaticamente o bloco padrão sem mostrar o inseridor de blocos.

```javascript
<InnerBlocks 
    defaultBlock={ { name: 'core/paragraph' } }
    directInsert={ true }
/>
```

Isso cria uma experiência de edição mais simplificada para blocos com muito conteúdo.

## Relacionamentos de Blocos

Relacionamentos de blocos definem a conexão entre blocos usando a configuração block.json.

### Relacionamento Parent

Especifique quais blocos podem ser pais do seu bloco:

```json
{
    "name": "my-plugin/child-block",
    "parent": [ "my-plugin/parent-block" ]
}
```

Este bloco só pode ser inserido dentro dos blocos pai especificados.

### Relacionamento Ancestor

Mais flexível que `parent` - o bloco pode ser aninhado em qualquer profundidade:

```json
{
    "name": "my-plugin/nested-block",
    "ancestor": [ "my-plugin/container-block" ]
}
```

### Fornecendo Contexto para Filhos

Blocos pai podem fornecer dados para blocos filhos usando a API de Contexto de Blocos:

```json
{
    "name": "my-plugin/parent-block",
    "providesContext": {
        "myPlugin/postId": "postId",
        "myPlugin/layout": "layoutType"
    }
}
```

### Consumindo Contexto em Filhos

```json
{
    "name": "my-plugin/child-block",
    "usesContext": [ "myPlugin/postId", "myPlugin/layout" ]
}
```

Então acesse o contexto em seu componente Edit:

```javascript
export default function Edit( { context } ) {
    const { 'myPlugin/postId': postId } = context;
    
    // Use os dados do contexto
    return (
        <div>ID do Post: { postId }</div>
    );
}
```

## Hook useInnerBlocksProps

O hook `useInnerBlocksProps` fornece mais controle sobre a estrutura e marcação dos blocos internos.

### Uso Básico

```javascript
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Edit() {
    const blockProps = useBlockProps();
    const innerBlocksProps = useInnerBlocksProps();
    
    return (
        <div { ...blockProps }>
            <div { ...innerBlocksProps } />
        </div>
    );
}
```

### Com Wrapper Personalizado

```javascript
export default function Edit() {
    const blockProps = useBlockProps();
    const innerBlocksProps = useInnerBlocksProps(
        { className: 'my-inner-blocks-wrapper' },
        {
            allowedBlocks: [ 'core/paragraph', 'core/heading' ],
            template: [
                [ 'core/heading', { level: 2 } ],
                [ 'core/paragraph', {} ]
            ]
        }
    );
    
    return (
        <div { ...blockProps }>
            <h3>Meu Cabeçalho Personalizado</h3>
            <div { ...innerBlocksProps } />
            <footer>Meu Rodapé Personalizado</footer>
        </div>
    );
}
```

### Parâmetros

1. **Objeto de props** (opcional): Atributos HTML para o wrapper dos blocos internos
2. **Objeto de opções** (opcional): Configuração do InnerBlocks (allowedBlocks, template, etc.)

### Benefícios

- **JSX Mais Limpo**: Evite envolver InnerBlocks em divs adicionais
- **Melhor Integração**: Mescle blocos internos perfeitamente com marcação personalizada
- **API Consistente**: Padrão similar ao `useBlockProps`

## Exercícios

Este guia inclui dois exercícios práticos para praticar blocos aninhados:

### Exercício 1: Bloco Contêiner com Blocos Permitidos

**Objetivo**: Criar um bloco contêiner que permite apenas blocos de parágrafo e imagem, com um template predefinido.

**Tópicos Cobertos**:
- Uso básico do InnerBlocks
- Configuração de blocos permitidos
- Templates de blocos
- Bloqueio de template

**Localização**: Veja o diretório `/exercises/innerblocks-exercise-1/`

### Exercício 2: InnerBlocks Avançado com Relacionamentos

**Objetivo**: Construir um sistema de cartão de avaliação usando useInnerBlocksProps e relacionamentos de blocos.

**Tópicos Cobertos**:
- Hook useInnerBlocksProps
- Relacionamentos de blocos (parent/ancestor)
- Contexto de blocos
- Marcação de wrapper personalizada

**Localização**: Veja o diretório `/exercises/innerblocks-exercise-2/`

## Melhores Práticas

### 1. Sempre Use InnerBlocks.Content em save()

```javascript
// ✅ Correto
export default function save() {
    return (
        <div { ...useBlockProps.save() }>
            <InnerBlocks.Content />
        </div>
    );
}

// ❌ Errado
export default function save() {
    return (
        <div { ...useBlockProps.save() }>
            <InnerBlocks />
        </div>
    );
}
```

### 2. Considere a Experiência do Usuário

- Forneça templates para conteúdo estruturado
- Use `allowedBlocks` para prevenir tipos de blocos inadequados
- Bloqueie templates quando a estrutura for crítica
- Use `directInsert` para blocos focados em conteúdo

### 3. Pense em Acessibilidade

```javascript
// Adicione labels ARIA para melhor acessibilidade
const innerBlocksProps = useInnerBlocksProps(
    { 
        className: 'my-inner-blocks',
        'aria-label': 'Área de conteúdo do contêiner'
    }
);
```

### 4. Planeje Relacionamentos de Blocos Cuidadosamente

- Use `parent` para relacionamentos pai-filho estritos
- Use `ancestor` para aninhamento mais flexível
- Documente chaves de contexto claramente
- Mantenha dados de contexto mínimos e relevantes

### 5. Teste Estruturas Aninhadas

- Teste com vários blocos filhos
- Verifique comportamento de salvar/recarregar
- Verifique performance do editor com aninhamento profundo
- Valide renderização no frontend

## Recursos Adicionais

### Documentação Oficial

- [Manual do Editor de Blocos WordPress - Blocos Aninhados](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-templates/#nested-blocks)
- [Referência do Componente InnerBlocks](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#innerblocks)
- [API de Contexto de Blocos](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/)
- [Hook useBlockProps](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops)

### Exemplos de Código

- [Blocos do Núcleo WordPress](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src)
- [Implementação do Bloco Group](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/group)
- [Implementação do Bloco Columns](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/columns)

### Tópicos Relacionados

- Padrões de Blocos
- Variações de Blocos
- Transformações de Blocos
- API de Estilos de Blocos

---

**Pronto para praticar?** Vá para o diretório de exercícios para construir seus próprios blocos aninhados!

Para perguntas ou sugestões sobre este guia, por favor abra uma issue no repositório.
