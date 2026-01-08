# Aula 10 - Block Supports API

## Objetivo da Aula

Aprender a usar a Block Supports API para adicionar controles nativos do WordPress (cores, tipografia, espaçamentos, bordas) sem escrever código JavaScript adicional. Todo o poder da personalização com configuração mínima!

## Exercício: Bloco com Supports Completos

Neste exercício, criamos um **Bloco com Supports** (`curso-gutenberg/bloco-supports`) que demonstra como habilitar diversos controles nativos apenas configurando o `block.json`.

### O que o bloco faz?

- Exibe um texto editável
- Oferece controles completos de cores (fundo, texto, gradientes)
- Oferece controles de tipografia (tamanho, família, peso, estilo)
- Oferece controles de espaçamento (margin, padding)
- Oferece controles de borda (cor, raio, estilo, largura)
- Suporta alinhamentos e âncoras HTML

### O Poder da Supports API

O mais impressionante deste exercício é o quão **pouco código** é necessário:

**edit.js - Apenas 15 linhas de código relevante!**

```javascript
export default function Edit( { attributes, setAttributes } ) {
    const { content } = attributes;
    const blockProps = useBlockProps();

    return (
        <div { ...blockProps }>
            <RichText
                tagName="p"
                value={ content }
                onChange={ ( value ) => setAttributes( { content: value } ) }
                placeholder="Digite seu texto aqui..."
            />
        </div>
    );
}
```

Todo o resto é feito automaticamente pelo WordPress através do `block.json`!

---

## Configuração no block.json

### Supports de Cores

```json
{
    "supports": {
        "color": {
            "background": true,
            "text": true,
            "gradients": true,
            "link": true,
            "__experimentalDefaultControls": {
                "background": true,
                "text": true
            }
        }
    }
}
```

| Opção | Descrição |
|-------|-----------|
| `background` | Habilita cor de fundo |
| `text` | Habilita cor do texto |
| `gradients` | Habilita gradientes |
| `link` | Habilita cor dos links |
| `__experimentalDefaultControls` | Define quais aparecem abertos por padrão |

---

### Supports de Tipografia

```json
{
    "supports": {
        "typography": {
            "fontSize": true,
            "lineHeight": true,
            "__experimentalFontFamily": true,
            "__experimentalFontWeight": true,
            "__experimentalFontStyle": true,
            "__experimentalTextTransform": true,
            "__experimentalTextDecoration": true,
            "__experimentalLetterSpacing": true,
            "__experimentalDefaultControls": {
                "fontSize": true
            }
        }
    }
}
```

| Opção | Descrição |
|-------|-----------|
| `fontSize` | Tamanho da fonte |
| `lineHeight` | Altura da linha |
| `__experimentalFontFamily` | Família da fonte |
| `__experimentalFontWeight` | Peso (bold, normal, etc.) |
| `__experimentalFontStyle` | Estilo (itálico, normal) |
| `__experimentalTextTransform` | Transformação (maiúsculas, etc.) |
| `__experimentalTextDecoration` | Decoração (sublinhado, etc.) |
| `__experimentalLetterSpacing` | Espaçamento entre letras |

---

### Supports de Espaçamento

```json
{
    "supports": {
        "spacing": {
            "margin": true,
            "padding": true,
            "blockGap": true,
            "__experimentalDefaultControls": {
                "padding": true
            }
        }
    }
}
```

| Opção | Descrição |
|-------|-----------|
| `margin` | Margens externas (top, right, bottom, left) |
| `padding` | Preenchimento interno |
| `blockGap` | Espaço entre blocos filhos |

---

### Supports de Borda

```json
{
    "supports": {
        "border": {
            "color": true,
            "radius": true,
            "style": true,
            "width": true,
            "__experimentalDefaultControls": {
                "color": true,
                "radius": true,
                "style": true,
                "width": true
            }
        }
    }
}
```

| Opção | Descrição |
|-------|-----------|
| `color` | Cor da borda |
| `radius` | Border radius (arredondamento) |
| `style` | Estilo (solid, dashed, dotted) |
| `width` | Largura da borda |

---

### Outros Supports

```json
{
    "supports": {
        "align": ["left", "center", "right", "wide", "full"],
        "anchor": true,
        "className": true,
        "customClassName": true,
        "html": false,
        "shadow": true
    }
}
```

| Opção | Descrição |
|-------|-----------|
| `align` | Alinhamentos disponíveis |
| `anchor` | Permite adicionar ID (âncora HTML) |
| `className` | Adiciona classe CSS padrão |
| `customClassName` | Permite classe CSS personalizada |
| `html` | Permite edição direta de HTML |
| `shadow` | Habilita controle de sombra |

---

## Como useBlockProps() Funciona

O `useBlockProps()` é a "mágica" que faz tudo funcionar:

```javascript
const blockProps = useBlockProps();
// blockProps contém todas as classes e estilos baseados nos supports

return <div { ...blockProps }>{/* conteúdo */}</div>;
```

### O que useBlockProps() retorna:

```javascript
{
    className: "wp-block-curso-gutenberg-bloco-supports has-background has-text-color has-large-font-size",
    style: {
        backgroundColor: "#f0f0f0",
        color: "#333333",
        fontSize: "24px",
        padding: "20px",
        borderRadius: "8px",
        // ... outros estilos
    }
}
```

---

## Vantagens da Supports API

### 1. Menos Código
Sem supports, você precisaria criar manualmente:
- Componentes de seleção de cor
- Controles de tipografia
- Controles de espaçamento
- Lógica de aplicação de estilos

### 2. Consistência
Os controles são idênticos aos dos blocos nativos do WordPress, garantindo uma experiência familiar para os usuários.

### 3. Integração com Temas
Os valores respeitam as configurações do tema (`theme.json`), incluindo paletas de cores e presets de tipografia.

### 4. Acessibilidade
Os controles nativos já incluem labels, descrições e suporte a leitores de tela.

### 5. Manutenção
Atualizações do WordPress melhoram automaticamente os controles do seu bloco.

---

## __experimentalDefaultControls

Por padrão, muitos controles ficam ocultos em "Mais opções". Use `__experimentalDefaultControls` para mostrar os mais importantes:

```json
{
    "color": {
        "background": true,
        "text": true,
        "gradients": true,
        "__experimentalDefaultControls": {
            "background": true,  // Visível por padrão
            "text": true         // Visível por padrão
            // gradients não listado = oculto até expandir
        }
    }
}
```

---

## Lista Completa de Supports

### Cores
- `color.background`
- `color.text`
- `color.gradients`
- `color.link`
- `color.heading`
- `color.button`
- `color.__experimentalDuotone`

### Tipografia
- `typography.fontSize`
- `typography.lineHeight`
- `typography.__experimentalFontFamily`
- `typography.__experimentalFontWeight`
- `typography.__experimentalFontStyle`
- `typography.__experimentalTextTransform`
- `typography.__experimentalTextDecoration`
- `typography.__experimentalLetterSpacing`

### Espaçamento
- `spacing.margin`
- `spacing.padding`
- `spacing.blockGap`

### Borda
- `border.color`
- `border.radius`
- `border.style`
- `border.width`

### Layout
- `align`
- `layout`

### Outros
- `anchor`
- `className`
- `customClassName`
- `html`
- `shadow`
- `position`
- `multiple`
- `reusable`
- `lock`

---

## Desafios Propostos

1. **Adicionar duotone**: Experimente adicionar `__experimentalDuotone` para imagens
2. **Layout flex**: Habilite `layout` para criar containers flexbox
3. **Position sticky**: Experimente o support `position` para elementos fixos
4. **Customizar presets**: Crie um `theme.json` para definir suas próprias cores e tamanhos

---

## Referências

- [Block Supports - Block Editor Handbook](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/)
- [theme.json Reference](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/)
- [useBlockProps](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops)
