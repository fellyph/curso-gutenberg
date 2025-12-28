# Curso de Criação de Blocos Gutenberg - Currículo Completo

Este documento contém a ementa detalhada de todas as aulas do curso, incluindo as aulas existentes e as novas aulas propostas.

## Sumário

- [Módulo Básico (Aulas 1-7)](#módulo-básico-aulas-1-7)
- [Módulo Intermediário (Aulas 8-12)](#módulo-intermediário-aulas-8-12)
- [Módulo Avançado (Aulas 13-17)](#módulo-avançado-aulas-13-17)
- [Módulo de Qualidade e Deploy (Aulas 18-21)](#módulo-de-qualidade-e-deploy-aulas-18-21)
- [Aulas Bônus - Projetos Práticos](#aulas-bônus---projetos-práticos)

---

## Módulo Básico (Aulas 1-7)

### Aula 1 - Introdução

**Duração estimada:** 15-20 minutos

**Objetivos de aprendizagem:**
- Entender o que é o Gutenberg e sua importância no ecossistema WordPress
- Conhecer a arquitetura de blocos
- Compreender a diferença entre blocos estáticos e dinâmicos

**Conteúdo:**
1. O que é o Editor Gutenberg
2. Por que aprender a criar blocos personalizados
3. Visão geral da arquitetura de blocos
4. Exemplos de blocos nativos do WordPress
5. Recursos e documentação oficial

**Pré-requisitos:** Conhecimento básico de WordPress

---

### Aula 2 - Ambiente de Desenvolvimento

**Duração estimada:** 25-30 minutos

**Objetivos de aprendizagem:**
- Configurar um ambiente de desenvolvimento local
- Instalar as ferramentas necessárias (Node.js, npm, VS Code)
- Conhecer o WordPress Playground

**Conteúdo:**
1. Instalando Node.js e npm
2. Configurando o VS Code com extensões recomendadas
3. Opções de ambiente local:
   - WordPress Playground (recomendado)
   - Local by Flywheel
   - Docker com wp-env
4. Testando o ambiente

**Arquivos de referência:**
- `.nvmrc` - versão do Node.js
- `blueprints.json` - configuração do Playground

---

### Aula 3 - Criando Blocos com create-block

**Duração estimada:** 30-35 minutos

**Objetivos de aprendizagem:**
- Usar o @wordpress/create-block para scaffolding
- Entender a estrutura de arquivos gerada
- Registrar um bloco no WordPress

**Conteúdo:**
1. O que é o @wordpress/create-block
2. Criando seu primeiro bloco:
   ```bash
   npx @wordpress/create-block meu-primeiro-block
   ```
3. Estrutura de arquivos:
   - `block.json` - metadados do bloco
   - `index.js` - registro do bloco
   - `edit.js` - componente do editor
   - `save.js` - saída do frontend
4. Ativando o plugin no WordPress
5. Usando o bloco no editor

**Exercício prático:** Criar um bloco simples de "Hello World"

---

### Aula 4 - Criando Blocos com create-block (Continuação)

**Duração estimada:** 30-35 minutos

**Objetivos de aprendizagem:**
- Aprofundar no arquivo block.json
- Entender o ciclo de vida do bloco
- Personalizar ícones e categorias

**Conteúdo:**
1. Anatomia do `block.json`:
   - `apiVersion`
   - `name` e `title`
   - `category` e `icon`
   - `description` e `keywords`
2. Ciclo de vida: edit → save → render
3. Personalizando o ícone do bloco
4. Criando categorias personalizadas
5. Debug e ferramentas de desenvolvimento

**Exercício prático:** Personalizar completamente os metadados do bloco

---

### Aula 5 - Trabalhando com CSS e SCSS

**Duração estimada:** 25-30 minutos

**Objetivos de aprendizagem:**
- Entender a diferença entre style.scss e editor.scss
- Aplicar estilos no editor e no frontend
- Usar a metodologia BEM

**Conteúdo:**
1. Arquivos de estilo:
   - `style.scss` - estilos compartilhados (editor + frontend)
   - `editor.scss` - estilos apenas do editor
2. Metodologia BEM para nomenclatura
3. Variáveis CSS do WordPress
4. Compilação com wp-scripts
5. Paridade visual editor/frontend

**Exercício prático:** Estilizar o bloco com cores e espaçamentos

---

### Aula 6 - Melhorando a Qualidade do Código com wp-scripts

**Duração estimada:** 25-30 minutos

**Objetivos de aprendizagem:**
- Configurar ESLint e Prettier
- Usar os scripts de linting
- Automatizar verificações de código

**Conteúdo:**
1. O que é o @wordpress/scripts
2. Scripts disponíveis:
   - `npm run lint:js`
   - `npm run lint:css`
   - `npm run format`
3. Configurando ESLint (regras WordPress)
4. Configurando Prettier
5. Integração com VS Code
6. Pre-commit hooks (opcional)

**Exercício prático:** Corrigir erros de linting em um código exemplo

---

### Aula 7 - Criando Blocos com EcmaScript 5

**Duração estimada:** 20-25 minutos

**Objetivos de aprendizagem:**
- Entender a sintaxe ES5 para blocos
- Quando usar ES5 vs ESNext
- Criar blocos sem build process

**Conteúdo:**
1. Por que ES5 ainda é relevante
2. Sintaxe ES5 para registro de blocos:
   ```javascript
   wp.blocks.registerBlockType('namespace/block-name', {
     // configurações
   });
   ```
3. Diferenças principais ES5 vs ESNext
4. Limitações do ES5
5. Quando escolher cada abordagem

**Exercício prático:** Converter um bloco ESNext para ES5

---

## Módulo Intermediário (Aulas 8-12)

### Aula 8 - Trabalhando com Atributos de Bloco

**Duração estimada:** 35-40 minutos

**Objetivos de aprendizagem:**
- Definir atributos no block.json
- Usar diferentes tipos de atributos
- Sincronizar dados entre editor e frontend

**Conteúdo:**
1. O que são atributos de bloco
2. Tipos de atributos:
   - `string` - textos simples
   - `boolean` - verdadeiro/falso
   - `number` - valores numéricos
   - `array` - listas de itens
   - `object` - dados complexos
3. Definindo atributos no `block.json`:
   ```json
   {
     "attributes": {
       "content": {
         "type": "string",
         "default": ""
       },
       "showBorder": {
         "type": "boolean",
         "default": false
       }
     }
   }
   ```
4. Acessando atributos no edit.js
5. Atualizando atributos com `setAttributes()`
6. Usando atributos no save.js
7. Validação e valores padrão

**Código exemplo:**
```jsx
// edit.js
export default function Edit({ attributes, setAttributes }) {
  const { content, showBorder } = attributes;

  return (
    <div className={showBorder ? 'has-border' : ''}>
      <RichText
        value={content}
        onChange={(value) => setAttributes({ content: value })}
      />
    </div>
  );
}
```

**Exercício prático:** Criar um bloco de citação com atributos para texto, autor e cor de fundo

---

### Aula 9 - Componentes do Block Editor

**Duração estimada:** 45-50 minutos

**Objetivos de aprendizagem:**
- Usar componentes nativos do editor
- Implementar controles na sidebar e toolbar
- Trabalhar com upload de mídia

**Conteúdo:**
1. Importando componentes do @wordpress/block-editor
2. **RichText** - Texto editável:
   ```jsx
   <RichText
     tagName="p"
     value={content}
     onChange={(value) => setAttributes({ content: value })}
     placeholder="Digite seu texto..."
   />
   ```
3. **MediaUpload** - Upload de imagens:
   ```jsx
   <MediaUpload
     onSelect={(media) => setAttributes({ imageUrl: media.url })}
     allowedTypes={['image']}
     render={({ open }) => (
       <Button onClick={open}>Selecionar Imagem</Button>
     )}
   />
   ```
4. **InspectorControls** - Sidebar do bloco:
   ```jsx
   <InspectorControls>
     <PanelBody title="Configurações">
       <ToggleControl
         label="Mostrar borda"
         checked={showBorder}
         onChange={(value) => setAttributes({ showBorder: value })}
       />
     </PanelBody>
   </InspectorControls>
   ```
5. **BlockControls** - Toolbar do bloco:
   ```jsx
   <BlockControls>
     <ToolbarGroup>
       <ToolbarButton
         icon="align-left"
         onClick={() => setAttributes({ alignment: 'left' })}
       />
     </ToolbarGroup>
   </BlockControls>
   ```
6. **ColorPicker** e **ColorPalette**
7. **SelectControl**, **TextControl**, **RangeControl**

**Exercício prático:** Criar um bloco de card com imagem, título, descrição e controles de cor

---

### Aula 10 - Block Supports API

**Duração estimada:** 35-40 minutos

**Objetivos de aprendizagem:**
- Usar o sistema de supports do WordPress
- Adicionar controles nativos sem código extra
- Entender as opções disponíveis

**Conteúdo:**
1. O que é a Block Supports API
2. Configurando supports no `block.json`:
   ```json
   {
     "supports": {
       "color": {
         "background": true,
         "text": true,
         "gradients": true
       },
       "typography": {
         "fontSize": true,
         "lineHeight": true
       },
       "spacing": {
         "margin": true,
         "padding": true
       },
       "align": ["wide", "full"]
     }
   }
   ```
3. Supports disponíveis:
   - `color` - cores de fundo e texto
   - `typography` - tamanho de fonte, altura de linha
   - `spacing` - margens e padding
   - `align` - alinhamentos
   - `anchor` - âncoras HTML
   - `className` - classes CSS personalizadas
   - `html` - edição de HTML
4. Aplicando estilos automaticamente com `useBlockProps()`
5. Sobrescrevendo estilos padrão

**Exercício prático:** Adicionar todos os supports a um bloco existente

---

### Aula 11 - InnerBlocks e Blocos Aninhados

**Duração estimada:** 40-45 minutos

**Objetivos de aprendizagem:**
- Criar blocos container
- Usar templates e allowed blocks
- Controlar a estrutura de blocos filhos

**Conteúdo:**
1. O que são InnerBlocks
2. Implementação básica:
   ```jsx
   import { InnerBlocks } from '@wordpress/block-editor';

   // edit.js
   export default function Edit() {
     return (
       <div {...useBlockProps()}>
         <InnerBlocks />
       </div>
     );
   }

   // save.js
   export default function Save() {
     return (
       <div {...useBlockProps.save()}>
         <InnerBlocks.Content />
       </div>
     );
   }
   ```
3. **allowedBlocks** - Restringir blocos permitidos:
   ```jsx
   <InnerBlocks allowedBlocks={['core/paragraph', 'core/image']} />
   ```
4. **template** - Estrutura inicial:
   ```jsx
   const TEMPLATE = [
     ['core/heading', { level: 2, placeholder: 'Título' }],
     ['core/paragraph', { placeholder: 'Descrição...' }],
   ];

   <InnerBlocks template={TEMPLATE} />
   ```
5. **templateLock** - Travar estrutura:
   - `false` - sem trava
   - `"all"` - trava tudo
   - `"insert"` - permite mover, não adicionar
6. **orientation** - Horizontal vs vertical
7. Exemplo prático: Bloco de seção com colunas

**Exercício prático:** Criar um bloco de "Feature Box" com ícone, título e descrição usando InnerBlocks

---

### Aula 12 - Block Variations e Patterns

**Duração estimada:** 35-40 minutos

**Objetivos de aprendizagem:**
- Criar variações de blocos existentes
- Registrar block patterns
- Organizar patterns em categorias

**Conteúdo:**
1. **Block Variations** - Variações de blocos:
   ```javascript
   wp.blocks.registerBlockVariation('core/group', {
     name: 'card-container',
     title: 'Card Container',
     icon: 'id-alt',
     attributes: {
       className: 'is-style-card',
     },
     innerBlocks: [
       ['core/image'],
       ['core/heading', { level: 3 }],
       ['core/paragraph'],
     ],
   });
   ```
2. Quando usar variations vs novo bloco
3. **Block Patterns** - Padrões reutilizáveis:
   ```php
   register_block_pattern(
     'meu-tema/hero-section',
     array(
       'title'       => 'Hero Section',
       'description' => 'Uma seção hero com título e CTA',
       'categories'  => array('featured'),
       'content'     => '<!-- wp:group -->...',
     )
   );
   ```
4. Criando categorias de patterns:
   ```php
   register_block_pattern_category(
     'meu-tema',
     array('label' => 'Meu Tema')
   );
   ```
5. Patterns via arquivo PHP
6. Exportando patterns do editor

**Exercício prático:** Criar 3 variações de um bloco de botão (primário, secundário, outline)

---

## Módulo Avançado (Aulas 13-17)

### Aula 13 - Blocos Dinâmicos com PHP

**Duração estimada:** 45-50 minutos

**Objetivos de aprendizagem:**
- Entender a diferença entre blocos estáticos e dinâmicos
- Implementar render_callback em PHP
- Buscar dados do banco de dados

**Conteúdo:**
1. Quando usar blocos dinâmicos:
   - Dados que mudam frequentemente
   - Queries do WordPress (posts, usuários)
   - Conteúdo personalizado por usuário
2. Configurando bloco dinâmico no `block.json`:
   ```json
   {
     "render": "file:./render.php"
   }
   ```
3. Criando o `render.php`:
   ```php
   <?php
   $content = $attributes['content'] ?? '';
   $show_border = $attributes['showBorder'] ?? false;
   ?>
   <div <?php echo get_block_wrapper_attributes(); ?>>
     <p class="<?php echo $show_border ? 'has-border' : ''; ?>">
       <?php echo esc_html($content); ?>
     </p>
   </div>
   ```
4. Acessando atributos e contexto
5. Usando WP_Query em blocos:
   ```php
   $recent_posts = new WP_Query([
     'posts_per_page' => $attributes['numberOfPosts'],
     'post_status' => 'publish',
   ]);
   ```
6. Segurança: escapamento e sanitização
7. Cache e performance

**Exercício prático:** Criar um bloco que exibe os últimos posts de uma categoria

---

### Aula 14 - Block Context API

**Duração estimada:** 35-40 minutos

**Objetivos de aprendizagem:**
- Compartilhar dados entre blocos pai e filho
- Definir providers e consumers de contexto
- Casos de uso práticos

**Conteúdo:**
1. O que é Block Context
2. Definindo contexto no bloco pai (`block.json`):
   ```json
   {
     "name": "meu-plugin/cards-container",
     "providesContext": {
       "meu-plugin/cardStyle": "style",
       "meu-plugin/showImage": "showImage"
     },
     "attributes": {
       "style": { "type": "string", "default": "default" },
       "showImage": { "type": "boolean", "default": true }
     }
   }
   ```
3. Consumindo contexto no bloco filho:
   ```json
   {
     "name": "meu-plugin/card-item",
     "usesContext": ["meu-plugin/cardStyle", "meu-plugin/showImage"]
   }
   ```
4. Acessando contexto no edit.js:
   ```jsx
   export default function Edit({ context }) {
     const { 'meu-plugin/cardStyle': cardStyle } = context;
     // usar cardStyle
   }
   ```
5. Contexto em blocos dinâmicos (PHP):
   ```php
   // No render.php, $block->context contém os valores
   $card_style = $block->context['meu-plugin/cardStyle'];
   ```
6. Contextos nativos do WordPress:
   - `postId`
   - `postType`
   - `queryId`

**Exercício prático:** Criar um bloco de slider onde o container define o estilo dos slides

---

### Aula 15 - WordPress Interactivity API

**Duração estimada:** 50-55 minutos

**Objetivos de aprendizagem:**
- Adicionar interatividade no frontend
- Usar diretivas da Interactivity API
- Gerenciar estado client-side

**Conteúdo:**
1. O que é a Interactivity API
2. Configurando no `block.json`:
   ```json
   {
     "supports": {
       "interactivity": true
     },
     "viewScriptModule": "file:./view.js"
   }
   ```
3. Estrutura do `view.js`:
   ```javascript
   import { store, getContext } from '@wordpress/interactivity';

   store('meuPlugin', {
     state: {
       isOpen: false,
     },
     actions: {
       toggle() {
         const context = getContext();
         context.isOpen = !context.isOpen;
       },
     },
     callbacks: {
       logState() {
         const { isOpen } = getContext();
         console.log('Estado:', isOpen);
       },
     },
   });
   ```
4. Diretivas HTML:
   ```html
   <div
     data-wp-interactive="meuPlugin"
     data-wp-context='{ "isOpen": false }'
   >
     <button data-wp-on--click="actions.toggle">
       Toggle
     </button>
     <div data-wp-bind--hidden="!context.isOpen">
       Conteúdo toggle
     </div>
   </div>
   ```
5. Principais diretivas:
   - `data-wp-on--[evento]` - Event handlers
   - `data-wp-bind--[atributo]` - Binding de atributos
   - `data-wp-class--[classe]` - Toggle de classes
   - `data-wp-text` - Conteúdo de texto
   - `data-wp-watch` - Observar mudanças
6. Estado global vs local (context)
7. Derived state (valores computados)

**Exercício prático:** Criar um bloco de accordion/FAQ interativo

---

### Aula 16 - Criando Plugins de Sidebar

**Duração estimada:** 40-45 minutos

**Objetivos de aprendizagem:**
- Estender o editor com painéis personalizados
- Usar o sistema SlotFill
- Criar meta boxes modernas

**Conteúdo:**
1. Anatomia do Editor:
   - Document Sidebar
   - Block Sidebar
   - Header/Footer slots
2. Registrando um plugin de sidebar:
   ```jsx
   import { registerPlugin } from '@wordpress/plugins';
   import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';

   const MyPluginSidebar = () => (
     <>
       <PluginSidebarMoreMenuItem target="meu-plugin-sidebar">
         Meu Plugin
       </PluginSidebarMoreMenuItem>
       <PluginSidebar
         name="meu-plugin-sidebar"
         title="Meu Plugin"
         icon="admin-tools"
       >
         <PanelBody title="Configurações">
           {/* Controles aqui */}
         </PanelBody>
       </PluginSidebar>
     </>
   );

   registerPlugin('meu-plugin', {
     render: MyPluginSidebar,
   });
   ```
3. Slots disponíveis:
   - `PluginSidebar` - Sidebar customizada
   - `PluginDocumentSettingPanel` - Painel na sidebar do documento
   - `PluginPostStatusInfo` - Info de status do post
   - `PluginPrePublishPanel` - Painel pré-publicação
4. Trabalhando com post meta:
   ```jsx
   import { useEntityProp } from '@wordpress/core-data';

   const [meta, setMeta] = useEntityProp('postType', 'post', 'meta');
   ```
5. SlotFill customizado

**Exercício prático:** Criar uma sidebar para configurações de SEO do post

---

### Aula 17 - Internacionalização (i18n)

**Duração estimada:** 30-35 minutos

**Objetivos de aprendizagem:**
- Preparar blocos para tradução
- Usar funções de i18n do WordPress
- Gerar arquivos de tradução

**Conteúdo:**
1. Por que internacionalizar
2. Text domain no `block.json`:
   ```json
   {
     "textdomain": "meu-plugin"
   }
   ```
3. Funções de tradução em JavaScript:
   ```jsx
   import { __ } from '@wordpress/i18n';

   <p>{__('Olá, Mundo!', 'meu-plugin')}</p>
   ```
4. Funções disponíveis:
   - `__()` - Tradução simples
   - `_x()` - Tradução com contexto
   - `_n()` - Pluralização
   - `sprintf()` - Formatação
5. Tradução em PHP:
   ```php
   <?php
   echo esc_html__('Olá, Mundo!', 'meu-plugin');
   ```
6. Gerando arquivos POT:
   ```bash
   npm run packages-update && wp i18n make-pot . languages/meu-plugin.pot
   ```
7. Ferramentas: Poedit, Loco Translate
8. Carregando traduções:
   ```php
   add_action('init', function() {
     load_plugin_textdomain('meu-plugin', false, 'meu-plugin/languages');
   });
   ```

**Exercício prático:** Internacionalizar um bloco existente e criar tradução para inglês

---

## Módulo de Qualidade e Deploy (Aulas 18-21)

### Aula 18 - Testes com Playwright

**Duração estimada:** 45-50 minutos

**Objetivos de aprendizagem:**
- Configurar Playwright para WordPress
- Escrever testes end-to-end
- Testar blocos no editor

**Conteúdo:**
1. Instalando Playwright:
   ```bash
   npm install -D @playwright/test
   npx playwright install
   ```
2. Configuração (`playwright.config.js`):
   ```javascript
   import { defineConfig } from '@playwright/test';

   export default defineConfig({
     testDir: './tests',
     use: {
       baseURL: 'http://localhost:8888',
     },
   });
   ```
3. Estrutura de testes:
   ```javascript
   import { test, expect } from '@playwright/test';

   test.describe('Meu Bloco', () => {
     test.beforeEach(async ({ page }) => {
       await page.goto('/wp-admin');
       // login
     });

     test('deve inserir o bloco', async ({ page }) => {
       await page.goto('/wp-admin/post-new.php');
       await page.click('[aria-label="Toggle block inserter"]');
       await page.fill('[placeholder="Search"]', 'Meu Bloco');
       await page.click('text=Meu Bloco');
       await expect(page.locator('.wp-block-meu-plugin-meu-bloco')).toBeVisible();
     });
   });
   ```
4. Helpers úteis:
   - Login automático
   - Criação de posts
   - Inserção de blocos
5. Executando testes:
   ```bash
   npm run test
   npm run test:ui  # Com interface visual
   ```
6. CI/CD com GitHub Actions

**Exercício prático:** Escrever 3 testes para um bloco (inserção, edição, preview)

---

### Aula 19 - Performance e Otimização

**Duração estimada:** 35-40 minutos

**Objetivos de aprendizagem:**
- Identificar gargalos de performance
- Aplicar técnicas de otimização
- Usar code splitting e lazy loading

**Conteúdo:**
1. Métricas de performance:
   - Tempo de carregamento do editor
   - Tamanho do bundle
   - Re-renders desnecessários
2. Analisando o bundle:
   ```bash
   npm run build -- --webpack-bundle-analyzer
   ```
3. Code splitting:
   ```javascript
   const HeavyComponent = lazy(() => import('./HeavyComponent'));

   <Suspense fallback={<Spinner />}>
     <HeavyComponent />
   </Suspense>
   ```
4. Otimização de re-renders:
   ```jsx
   import { useMemo, useCallback } from '@wordpress/element';

   const expensiveValue = useMemo(() => computeExpensive(data), [data]);
   const handleClick = useCallback(() => {}, []);
   ```
5. Carregamento condicional de scripts:
   ```php
   function enqueue_block_assets() {
     if (has_block('meu-plugin/meu-bloco')) {
       wp_enqueue_script('meu-script-frontend');
     }
   }
   ```
6. Otimização de imagens
7. Caching de queries

**Exercício prático:** Otimizar um bloco com lazy loading e memoização

---

### Aula 20 - Acessibilidade em Blocos

**Duração estimada:** 35-40 minutos

**Objetivos de aprendizagem:**
- Implementar navegação por teclado
- Usar ARIA labels corretamente
- Garantir contraste adequado

**Conteúdo:**
1. Por que acessibilidade importa
2. WCAG 2.1 - Diretrizes principais
3. Navegação por teclado:
   ```jsx
   <button
     onKeyDown={(e) => {
       if (e.key === 'Enter' || e.key === ' ') {
         handleAction();
       }
     }}
   >
     Ação
   </button>
   ```
4. ARIA labels:
   ```jsx
   <div
     role="button"
     aria-label="Expandir conteúdo"
     aria-expanded={isExpanded}
     tabIndex={0}
   >
   ```
5. Atributos ARIA importantes:
   - `aria-label` / `aria-labelledby`
   - `aria-describedby`
   - `aria-expanded` / `aria-hidden`
   - `role`
6. Contraste de cores:
   - Mínimo 4.5:1 para texto normal
   - Mínimo 3:1 para texto grande
7. Ferramentas de teste:
   - axe DevTools
   - Lighthouse
   - WAVE
8. Focus management

**Exercício prático:** Auditar e corrigir acessibilidade de um bloco existente

---

### Aula 21 - Publicando seu Plugin

**Duração estimada:** 40-45 minutos

**Objetivos de aprendizagem:**
- Preparar plugin para distribuição
- Submeter ao diretório WordPress.org
- Manter e atualizar o plugin

**Conteúdo:**
1. Checklist pré-publicação:
   - [ ] Código limpo e documentado
   - [ ] Testes passando
   - [ ] README.txt completo
   - [ ] Screenshots e banner
   - [ ] Licença GPL
2. Estrutura do README.txt:
   ```
   === Meu Plugin ===
   Contributors: seuusername
   Tags: gutenberg, blocks
   Requires at least: 6.0
   Tested up to: 6.4
   Stable tag: 1.0.0
   License: GPLv2 or later

   Descrição curta do plugin.

   == Description ==
   Descrição completa...

   == Installation ==
   1. Upload...

   == Changelog ==
   = 1.0.0 =
   * Initial release
   ```
3. Assets necessários:
   - `banner-1544x500.png`
   - `icon-256x256.png`
   - Screenshots
4. Processo de submissão:
   - Criar conta no WordPress.org
   - Submeter plugin para revisão
   - Aguardar aprovação (1-7 dias)
   - Usar SVN para updates
5. Mantendo o plugin:
   - Versionamento semântico
   - Changelog detalhado
   - Suporte aos usuários
6. Alternativas de distribuição:
   - GitHub releases
   - Plugins pagos (Freemius, Gumroad)

**Exercício prático:** Preparar um plugin completo para submissão

---

## Aulas Bônus - Projetos Práticos

### Bônus 1 - Criando um Bloco de Testimonials

**Duração estimada:** 60-70 minutos

**Objetivos de aprendizagem:**
- Aplicar conhecimentos de InnerBlocks
- Criar variações de estilo
- Implementar layout responsivo

**Projeto:**
Criar um sistema de blocos de testimonials com:
- Bloco container (Testimonials Grid)
- Bloco individual (Testimonial Card)
- Variações: Grid, Slider, Lista
- Suporte a imagem de avatar
- Estrelas de avaliação

**Estrutura:**
```
testimonials/
├── container/
│   ├── block.json
│   ├── edit.js
│   ├── save.js
│   └── style.scss
└── card/
    ├── block.json
    ├── edit.js
    ├── save.js
    └── style.scss
```

---

### Bônus 2 - Bloco de Cards com Query Loop

**Duração estimada:** 60-70 minutos

**Objetivos de aprendizagem:**
- Criar blocos dinâmicos com WP_Query
- Implementar paginação
- Trabalhar com taxonomias

**Projeto:**
Criar um bloco de cards que:
- Busca posts de um post type
- Filtra por categoria/tag
- Permite escolher número de posts
- Exibe em grid responsivo
- Suporta paginação AJAX

**Código base:**
```php
// render.php
$args = [
  'post_type' => $attributes['postType'],
  'posts_per_page' => $attributes['numberOfPosts'],
  'tax_query' => [...],
];
$query = new WP_Query($args);
```

---

### Bônus 3 - Bloco Interativo de FAQ/Accordion

**Duração estimada:** 60-70 minutos

**Objetivos de aprendizagem:**
- Dominar a Interactivity API
- Criar animações CSS
- Implementar acessibilidade completa

**Projeto:**
Criar um bloco de FAQ com:
- Container com múltiplos itens
- Animação suave de abertura/fechamento
- Opção de múltiplos abertos ou apenas um
- Navegação completa por teclado
- Schema markup para SEO

**Features avançadas:**
- Deep linking (âncoras)
- Estado persistente (localStorage)
- Busca/filtro de perguntas

---

## Recursos Adicionais

### Documentação Oficial
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [Components Reference](https://developer.wordpress.org/block-editor/reference-guides/components/)

### Ferramentas
- [WordPress Playground](https://playground.wordpress.net/)
- [Create Block Tool](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/)
- [Block Theme Generator](https://developer.wordpress.org/block-editor/how-to-guides/themes/create-block-theme/)

### Comunidade
- [WordPress Slack](https://make.wordpress.org/chat/)
- [GitHub Gutenberg](https://github.com/WordPress/gutenberg)
- [WordPress Stack Exchange](https://wordpress.stackexchange.com/)
