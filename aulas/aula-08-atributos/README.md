# Aula 08 - Trabalhando com Atributos de Bloco

## Objetivo da Aula

Aprender a definir, usar e sincronizar atributos em blocos Gutenberg. Atributos são os dados que o usuário pode configurar no bloco, como textos, cores, opções booleanas e muito mais.

## Exercício: Bloco de Citação Personalizado

Neste exercício, criamos um **Bloco de Citação** (`curso-gutenberg/bloco-citacao`) que demonstra diferentes tipos de atributos e como sincronizá-los entre o editor e o frontend.

### O que o bloco faz?

- Exibe uma citação com texto e autor
- Permite mostrar/ocultar uma borda lateral
- Permite personalizar a cor da borda
- Permite alinhar o texto (esquerda, centro, direita)

### Preview do Bloco

```
┌─────────────────────────────────────┐
│ ▌ "Esta é uma citação de exemplo    │
│ ▌  que demonstra o uso de           │
│ ▌  atributos no Gutenberg."         │
│ ▌                                   │
│ ▌  — Nome do Autor                  │
└─────────────────────────────────────┘
```

---

## Arquivos do Exercício

### 1. block.json - Definição dos Atributos

O arquivo `block.json` define os metadados do bloco e seus atributos:

```json
{
  "attributes": {
    "content": {
      "type": "string",
      "source": "html",
      "selector": "blockquote p",
      "default": ""
    },
    "author": {
      "type": "string",
      "source": "html",
      "selector": "cite",
      "default": ""
    },
    "showBorder": {
      "type": "boolean",
      "default": true
    },
    "borderColor": {
      "type": "string",
      "default": "#0073aa"
    },
    "alignment": {
      "type": "string",
      "default": "left"
    }
  }
}
```

#### Tipos de Atributos Demonstrados

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `content` | `string` | Texto da citação (extraído do HTML) |
| `author` | `string` | Nome do autor (extraído do HTML) |
| `showBorder` | `boolean` | Mostrar ou ocultar a borda |
| `borderColor` | `string` | Cor da borda em hexadecimal |
| `alignment` | `string` | Alinhamento do texto |

#### Entendendo `source` e `selector`

Quando você define `source: "html"` e `selector: "blockquote p"`, o WordPress extrai automaticamente o conteúdo do elemento `<p>` dentro do `<blockquote>` quando o bloco é carregado. Isso permite que o valor seja persistido no HTML e recuperado corretamente.

---

### 2. edit.js - Componente do Editor

O arquivo `edit.js` é onde criamos a interface de edição do bloco:

#### Desestruturando os Atributos

```javascript
export default function Edit( { attributes, setAttributes } ) {
    const { content, author, showBorder, borderColor, alignment } = attributes;
    // ...
}
```

- `attributes` - Objeto com todos os valores atuais
- `setAttributes` - Função para atualizar valores

#### Aplicando Estilos Dinâmicos

```javascript
const blockProps = useBlockProps( {
    className: `has-text-align-${ alignment }`,
    style: {
        borderLeftColor: showBorder ? borderColor : 'transparent',
        borderLeftWidth: showBorder ? '4px' : '0',
        borderLeftStyle: 'solid',
    },
} );
```

Os estilos são calculados com base nos atributos, criando uma experiência visual em tempo real.

#### Controles na Sidebar (InspectorControls)

```javascript
<InspectorControls>
    <PanelBody title="Configurações da Citação">
        <ToggleControl
            label="Mostrar borda"
            checked={ showBorder }
            onChange={ ( value ) => setAttributes( { showBorder: value } ) }
        />
        { showBorder && (
            <ColorPicker
                color={ borderColor }
                onChange={ ( value ) => setAttributes( { borderColor: value } ) }
            />
        ) }
    </PanelBody>
</InspectorControls>
```

O `ToggleControl` atualiza o atributo `showBorder`, e condicionalmente exibimos o `ColorPicker` apenas quando a borda está visível.

#### Controles na Toolbar (BlockControls)

```javascript
<BlockControls>
    <AlignmentToolbar
        value={ alignment }
        onChange={ ( value ) => setAttributes( { alignment: value } ) }
    />
</BlockControls>
```

O `AlignmentToolbar` fornece botões de alinhamento na toolbar do bloco.

#### Campos de Texto Editável (RichText)

```javascript
<RichText
    tagName="p"
    value={ content }
    onChange={ ( value ) => setAttributes( { content: value } ) }
    placeholder="Escreva sua citação aqui..."
/>
```

O `RichText` permite edição inline com formatação básica.

---

### 3. save.js - Componente de Salvamento

O arquivo `save.js` define o HTML que será salvo no banco de dados:

```javascript
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
```

#### Pontos Importantes

1. **useBlockProps.save()** - Versão para salvamento (sem event handlers)
2. **RichText.Content** - Renderiza o conteúdo sem a interface de edição
3. **Renderização condicional** - O autor só é renderizado se existir

---

## Conceitos Aprendidos

### 1. Definição de Atributos

Atributos são definidos no `block.json` com:
- `type` - Tipo do dado (string, boolean, number, array, object)
- `default` - Valor padrão
- `source` - De onde extrair o valor (html, attribute, text, etc.)
- `selector` - Seletor CSS para encontrar o elemento

### 2. Leitura de Atributos

```javascript
const { meuAtributo } = attributes;
```

### 3. Atualização de Atributos

```javascript
setAttributes( { meuAtributo: novoValor } );
```

### 4. Sincronização Editor/Frontend

O mesmo valor de atributo é usado tanto no `edit.js` quanto no `save.js`, garantindo que o editor mostre exatamente o que será salvo.

---

## Desafios Propostos

1. **Adicionar mais opções de cor**: Implemente uma cor de fundo para a citação
2. **Tamanho da fonte**: Adicione um `RangeControl` para controlar o tamanho da fonte
3. **Estilo da borda**: Permita escolher entre solid, dashed, dotted
4. **Múltiplos autores**: Transforme `author` em um array para suportar múltiplos autores

---

## Como Testar

1. Copie os arquivos para a pasta `src/` do seu plugin
2. Atualize o namespace no `block.json` se necessário
3. Execute `npm run build`
4. Ative o plugin e adicione o bloco "Bloco de Citação" em um post

---

## Referências

- [Block Attributes - Block Editor Handbook](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/)
- [RichText Component](https://developer.wordpress.org/block-editor/reference-guides/richtext/)
- [InspectorControls](https://developer.wordpress.org/block-editor/reference-guides/components/inspector-controls/)
