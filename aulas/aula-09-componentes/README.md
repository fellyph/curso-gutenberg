# Aula 09 - Componentes do Block Editor

## Objetivo da Aula

Aprender a utilizar os componentes nativos do Block Editor do WordPress para criar interfaces de edição ricas e profissionais. Os componentes são peças reutilizáveis que seguem o design system do WordPress.

## Exercício: Bloco Card Completo

Neste exercício, criamos um **Card Completo** (`curso-gutenberg/card-completo`) que demonstra os principais componentes disponíveis no Block Editor.

### O que o bloco faz?

- Exibe uma imagem selecionada da biblioteca de mídia
- Permite editar título e descrição inline
- Oferece controles de cor de fundo e texto
- Inclui um botão com texto e URL configuráveis

### Preview do Bloco

```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  │         [IMAGEM]            │    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  Título do Card                     │
│                                     │
│  Descrição do card com texto        │
│  explicativo sobre o conteúdo.      │
│                                     │
│  [ Saiba mais ]                     │
│                                     │
└─────────────────────────────────────┘
```

---

## Componentes Utilizados

### 1. MediaUpload - Upload de Imagens

O `MediaUpload` permite selecionar arquivos da biblioteca de mídia do WordPress.

```javascript
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

<MediaUploadCheck>
    <MediaUpload
        onSelect={ ( media ) => {
            setAttributes( {
                imageUrl: media.url,
                imageId: media.id,
                imageAlt: media.alt || '',
            } );
        } }
        allowedTypes={ [ 'image' ] }
        value={ imageId }
        render={ ( { open } ) => (
            <Button onClick={ open }>
                Selecionar imagem
            </Button>
        ) }
    />
</MediaUploadCheck>
```

#### Props Importantes

| Prop | Descrição |
|------|-----------|
| `onSelect` | Callback quando uma mídia é selecionada |
| `allowedTypes` | Array de tipos permitidos (`image`, `video`, `audio`) |
| `value` | ID da mídia atualmente selecionada |
| `render` | Função que renderiza o botão de ativação |

#### MediaUploadCheck

O `MediaUploadCheck` verifica se o usuário tem permissão para fazer upload. Sempre envolva o `MediaUpload` com ele.

---

### 2. RichText - Texto Editável

O `RichText` cria campos de texto com formatação inline.

```javascript
import { RichText } from '@wordpress/block-editor';

<RichText
    tagName="h3"
    value={ title }
    onChange={ ( value ) => setAttributes( { title: value } ) }
    placeholder="Título do card"
/>
```

#### Props Importantes

| Prop | Descrição |
|------|-----------|
| `tagName` | Elemento HTML a ser renderizado (`p`, `h1`, `h2`, `span`, etc.) |
| `value` | Conteúdo atual |
| `onChange` | Callback quando o conteúdo muda |
| `placeholder` | Texto exibido quando vazio |
| `allowedFormats` | Formatos permitidos (negrito, itálico, link) |

---

### 3. InspectorControls - Sidebar

O `InspectorControls` adiciona painéis na sidebar direita do editor.

```javascript
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

<InspectorControls>
    <PanelBody title="Configurações" initialOpen={ true }>
        {/* Controles aqui */}
    </PanelBody>
</InspectorControls>
```

#### PanelBody

Agrupa controles relacionados em um painel expansível.

| Prop | Descrição |
|------|-----------|
| `title` | Título do painel |
| `initialOpen` | Se o painel inicia aberto ou fechado |
| `icon` | Ícone opcional no título |

---

### 4. BlockControls - Toolbar

O `BlockControls` adiciona botões na toolbar que aparece acima do bloco.

```javascript
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

<BlockControls>
    <ToolbarGroup>
        <ToolbarButton
            icon="format-image"
            label="Editar imagem"
            onClick={ open }
        />
    </ToolbarGroup>
</BlockControls>
```

---

### 5. ColorPalette - Seleção de Cores

O `ColorPalette` exibe uma paleta de cores pré-definidas.

```javascript
import { ColorPalette } from '@wordpress/components';

const COLORS = [
    { name: 'Branco', color: '#ffffff' },
    { name: 'Preto', color: '#000000' },
    { name: 'Azul', color: '#0073aa' },
];

<ColorPalette
    colors={ COLORS }
    value={ backgroundColor }
    onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
/>
```

#### Props Importantes

| Prop | Descrição |
|------|-----------|
| `colors` | Array de objetos com `name` e `color` |
| `value` | Cor atualmente selecionada |
| `onChange` | Callback quando a cor muda |
| `clearable` | Permite limpar a seleção |

---

### 6. TextControl - Campo de Texto

O `TextControl` cria um input de texto simples.

```javascript
import { TextControl } from '@wordpress/components';

<TextControl
    label="Texto do botão"
    value={ buttonText }
    onChange={ ( value ) => setAttributes( { buttonText: value } ) }
    help="Texto que aparecerá no botão"
/>
```

---

### 7. URLInput - Campo de URL

O `URLInput` cria um campo especializado para URLs com autocomplete de posts.

```javascript
import { URLInput } from '@wordpress/block-editor';

<URLInput
    value={ buttonUrl }
    onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
/>
```

---

### 8. Placeholder - Estado Vazio

O `Placeholder` exibe uma área de placeholder quando não há conteúdo.

```javascript
import { Placeholder } from '@wordpress/components';

<Placeholder
    icon="format-image"
    label="Imagem do Card"
>
    <Button onClick={ open } variant="primary">
        Selecionar imagem
    </Button>
</Placeholder>
```

---

### 9. Button - Botões

O componente `Button` cria botões consistentes.

```javascript
import { Button } from '@wordpress/components';

<Button variant="primary" onClick={ handleClick }>
    Ação Principal
</Button>

<Button variant="secondary">
    Ação Secundária
</Button>

<Button variant="link" isDestructive>
    Remover
</Button>
```

#### Variantes

| Variante | Uso |
|----------|-----|
| `primary` | Ação principal |
| `secondary` | Ação secundária |
| `tertiary` | Ação terciária |
| `link` | Estilo de link |

---

## Estrutura do Código

### Imports Organizados

```javascript
// Componentes do block-editor
import {
    useBlockProps,
    RichText,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls,
    BlockControls,
    URLInput,
} from '@wordpress/block-editor';

// Componentes genéricos
import {
    PanelBody,
    Button,
    TextControl,
    ColorPalette,
    ToolbarGroup,
    ToolbarButton,
    Placeholder,
} from '@wordpress/components';
```

### Handlers de Mídia

```javascript
const onSelectImage = ( media ) => {
    setAttributes( {
        imageUrl: media.url,
        imageId: media.id,
        imageAlt: media.alt || '',
    } );
};

const onRemoveImage = () => {
    setAttributes( {
        imageUrl: '',
        imageId: 0,
        imageAlt: '',
    } );
};
```

---

## Outros Componentes Úteis

Além dos demonstrados, existem outros componentes importantes:

| Componente | Descrição |
|------------|-----------|
| `ToggleControl` | Checkbox on/off |
| `SelectControl` | Dropdown de seleção |
| `RangeControl` | Slider numérico |
| `RadioControl` | Botões de rádio |
| `CheckboxControl` | Checkbox simples |
| `DateTimePicker` | Seletor de data/hora |
| `FontSizePicker` | Seletor de tamanho de fonte |
| `ColorPicker` | Seletor de cor avançado |

---

## Desafios Propostos

1. **Adicionar ToggleControl**: Implemente um toggle para mostrar/ocultar o botão
2. **RangeControl para bordas**: Adicione controle de border-radius com slider
3. **SelectControl para layout**: Permita escolher entre layout horizontal e vertical
4. **Múltiplos botões**: Transforme o botão único em um array de botões

---

## Como Testar

1. Copie os arquivos para a pasta `src/` do seu plugin
2. Execute `npm run build`
3. Adicione o bloco "Card Completo" em um post
4. Experimente todos os controles na sidebar e toolbar

---

## Referências

- [Block Editor Components](https://developer.wordpress.org/block-editor/reference-guides/components/)
- [Packages Reference](https://developer.wordpress.org/block-editor/reference-guides/packages/)
- [MediaUpload](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#mediaupload)
- [RichText](https://developer.wordpress.org/block-editor/reference-guides/richtext/)
