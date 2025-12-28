# Exemplos de Código das Aulas

Esta pasta contém exemplos de código para as aulas do curso de criação de blocos Gutenberg.

## Estrutura

```
aulas/
├── aula-08-atributos/      # Trabalhando com Atributos de Bloco
├── aula-09-componentes/    # Componentes do Block Editor
├── aula-10-supports/       # Block Supports API
├── aula-11-innerblocks/    # InnerBlocks e Blocos Aninhados
├── aula-13-blocos-dinamicos/ # Blocos Dinâmicos com PHP
└── aula-15-interactivity/  # WordPress Interactivity API
```

## Como Usar os Exemplos

### 1. Copiar para seu plugin

Copie os arquivos da aula desejada para a pasta `src/` do seu plugin:

```bash
cp -r aulas/aula-08-atributos/* src/
```

### 2. Atualizar o block.json

Edite o `block.json` para usar o namespace do seu plugin:

```json
{
  "name": "seu-plugin/nome-do-bloco"
}
```

### 3. Compilar

Execute o comando de build:

```bash
npm run build
```

## Descrição das Aulas

### Aula 08 - Trabalhando com Atributos de Bloco

Aprenda a definir e usar diferentes tipos de atributos:
- String, boolean, number, array, object
- Sincronização editor/frontend
- Valores padrão e validação

**Bloco exemplo:** Citação personalizada com cor de borda

### Aula 09 - Componentes do Block Editor

Explore os componentes nativos do editor:
- `RichText` - Texto editável
- `MediaUpload` - Upload de mídia
- `InspectorControls` - Sidebar
- `BlockControls` - Toolbar
- `ColorPalette`, `TextControl`, etc.

**Bloco exemplo:** Card completo com imagem

### Aula 10 - Block Supports API

Configure controles nativos sem código adicional:
- Cores de fundo e texto
- Tipografia completa
- Espaçamentos (margin/padding)
- Bordas e sombras
- Alinhamentos

**Bloco exemplo:** Bloco de texto com todos os supports

### Aula 11 - InnerBlocks e Blocos Aninhados

Crie blocos container:
- Templates de blocos
- Blocos permitidos
- Template lock
- Block Context (compartilhar dados)

**Bloco exemplo:** Feature Box com template

### Aula 13 - Blocos Dinâmicos com PHP

Renderize blocos no servidor:
- `render.php` para output
- WP_Query para buscar posts
- Segurança e escapamento
- Variáveis disponíveis ($attributes, $block)

**Bloco exemplo:** Últimos posts de categoria

### Aula 15 - WordPress Interactivity API

Adicione interatividade no frontend:
- Store com state, actions, callbacks
- Diretivas HTML (data-wp-*)
- Contexto local vs global
- Animações CSS

**Bloco exemplo:** FAQ Accordion interativo

## Recursos Adicionais

- [Currículo completo do curso](../docs/course-curriculum.md)
- [Guia wp-scripts](../docs/wp-scripts-mastery-guide-pt.md)
- [Documentação oficial](https://developer.wordpress.org/block-editor/)

## Contribuindo

Se encontrar erros ou quiser sugerir melhorias, abra uma issue ou pull request no repositório.
