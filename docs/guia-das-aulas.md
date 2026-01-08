# Guia Completo das Aulas do Curso de Gutenberg

Este documento apresenta uma explicação detalhada de cada aula do curso, incluindo os conceitos abordados, por que são importantes e o que você será capaz de fazer após completá-las.

---

## Módulo Básico

O módulo básico estabelece as fundações necessárias para o desenvolvimento de blocos Gutenberg. Aqui você aprenderá desde os conceitos iniciais até a criação do seu primeiro bloco funcional.

---

### Aula 1 - Introdução

#### O que é esta aula?

Esta aula apresenta o editor Gutenberg e explica por que aprender a criar blocos personalizados é uma habilidade valiosa para desenvolvedores WordPress.

#### O que você vai aprender?

- **O que é o Gutenberg**: O editor de blocos que substituiu o editor clássico do WordPress, transformando a forma como criamos conteúdo
- **Arquitetura de blocos**: Como os blocos funcionam internamente, com componentes de edição (editor) e salvamento (frontend)
- **Tipos de blocos**: A diferença entre blocos estáticos (salvos no banco de dados) e dinâmicos (renderizados em tempo real pelo PHP)
- **Ecossistema**: Onde encontrar documentação, recursos e comunidade

#### Por que é importante?

Entender os fundamentos evita confusões futuras. Muitos desenvolvedores pulam esta etapa e depois têm dificuldades para entender por que certas coisas funcionam de determinada forma.

#### Ao final desta aula você será capaz de:

- Explicar o que é o Gutenberg e sua importância
- Diferenciar blocos estáticos de dinâmicos
- Navegar pela documentação oficial

---

### Aula 2 - Ambiente de Desenvolvimento

#### O que é esta aula?

Configuração completa do ambiente de desenvolvimento local para criar blocos Gutenberg de forma profissional.

#### O que você vai aprender?

- **Node.js e npm**: Instalação e configuração do runtime JavaScript e gerenciador de pacotes
- **VS Code**: Configuração do editor com extensões úteis para desenvolvimento WordPress
- **WordPress Playground**: Ambiente de desenvolvimento instantâneo direto no navegador, sem necessidade de servidor local
- **Alternativas**: Local by Flywheel, Docker com wp-env para quem prefere ambientes tradicionais

#### Por que é importante?

Um ambiente bem configurado aumenta sua produtividade e reduz frustrações. O WordPress Playground, em particular, permite testar blocos rapidamente sem configuração complexa.

#### Ao final desta aula você será capaz de:

- Ter um ambiente de desenvolvimento funcional
- Executar comandos npm
- Testar blocos em um WordPress local

---

### Aula 3 - Criando Blocos com create-block

#### O que é esta aula?

Introdução ao `@wordpress/create-block`, a ferramenta oficial do WordPress para gerar a estrutura inicial de um bloco.

#### O que você vai aprender?

- **Scaffolding**: Como usar o comando `npx @wordpress/create-block` para criar toda a estrutura de arquivos
- **Estrutura de arquivos**: Entender cada arquivo gerado:
  - `block.json` - Metadados e configurações do bloco
  - `index.js` - Registro do bloco
  - `edit.js` - Componente exibido no editor
  - `save.js` - HTML salvo no banco de dados
- **Ativação**: Como ativar o plugin e usar o bloco no editor

#### Por que é importante?

O create-block segue as melhores práticas oficiais do WordPress. Começar com uma estrutura correta evita retrabalho e garante compatibilidade futura.

#### Ao final desta aula você será capaz de:

- Criar um novo bloco do zero
- Entender a função de cada arquivo
- Ver seu bloco funcionando no editor

---

### Aula 4 - Criando Blocos com create-block (Continuação)

#### O que é esta aula?

Aprofundamento no arquivo `block.json` e personalização completa dos metadados do bloco.

#### O que você vai aprender?

- **Anatomia do block.json**: Cada propriedade em detalhes:
  - `apiVersion` - Versão da API de blocos
  - `name` - Identificador único (namespace/nome)
  - `title` - Nome exibido ao usuário
  - `category` - Onde o bloco aparece no inserter
  - `icon` - Ícone do bloco (Dashicons ou SVG)
  - `keywords` - Palavras-chave para busca
- **Ciclo de vida**: Como o bloco passa de edit → save → renderização
- **Categorias personalizadas**: Como criar suas próprias categorias de blocos

#### Por que é importante?

O block.json é o "coração" do bloco. Uma configuração bem feita melhora a experiência do usuário e a descobribilidade do seu bloco.

#### Ao final desta aula você será capaz de:

- Personalizar completamente os metadados do bloco
- Criar ícones personalizados
- Organizar blocos em categorias

---

### Aula 5 - Trabalhando com CSS e SCSS

#### O que é esta aula?

Estilização de blocos Gutenberg usando CSS e SCSS, com atenção especial para a paridade visual entre editor e frontend.

#### O que você vai aprender?

- **Arquivos de estilo**:
  - `style.scss` - Estilos aplicados tanto no editor quanto no frontend
  - `editor.scss` - Estilos exclusivos do editor
- **Metodologia BEM**: Nomenclatura de classes CSS organizada e previsível
- **Variáveis CSS do WordPress**: Uso das propriedades customizadas do tema
- **Compilação**: Como o wp-scripts processa SCSS para CSS

#### Por que é importante?

Usuários esperam que o bloco no editor pareça igual ao frontend. Uma boa estratégia de CSS garante essa consistência e facilita a manutenção.

#### Ao final desta aula você será capaz de:

- Estilizar blocos profissionalmente
- Manter paridade visual editor/frontend
- Usar variáveis CSS do tema

---

### Aula 6 - Melhorando a Qualidade do Código com wp-scripts

#### O que é esta aula?

Configuração de ferramentas de linting e formatação para manter código limpo e consistente.

#### O que você vai aprender?

- **ESLint**: Análise estática de código JavaScript seguindo os padrões do WordPress
- **Prettier**: Formatação automática de código
- **Scripts disponíveis**:
  - `npm run lint:js` - Verificar erros no JavaScript
  - `npm run lint:css` - Verificar erros no CSS/SCSS
  - `npm run format` - Formatar código automaticamente
- **Integração com VS Code**: Correção automática ao salvar

#### Por que é importante?

Código consistente é mais fácil de manter, revisar e colaborar. Seguir os padrões do WordPress também facilita contribuições para o core ou plugins oficiais.

#### Ao final desta aula você será capaz de:

- Configurar linting no projeto
- Corrigir erros automaticamente
- Manter código padronizado

---

### Aula 7 - Criando Blocos com EcmaScript 5

#### O que é esta aula?

Como criar blocos usando JavaScript tradicional (ES5) sem processo de build.

#### O que você vai aprender?

- **Sintaxe ES5**: Registro de blocos sem JSX ou recursos modernos:
  ```javascript
  wp.blocks.registerBlockType('namespace/block', {
    title: 'Meu Bloco',
    edit: function() { return wp.element.createElement('div', {}, 'Olá'); },
    save: function() { return wp.element.createElement('div', {}, 'Olá'); }
  });
  ```
- **Quando usar**: Cenários onde ES5 faz sentido (plugins simples, sem build)
- **Limitações**: O que não é possível fazer sem ESNext

#### Por que é importante?

Embora ESNext seja recomendado, entender ES5 ajuda a compreender o que acontece "por baixo dos panos" e pode ser útil para blocos muito simples.

#### Ao final desta aula você será capaz de:

- Criar blocos sem processo de build
- Entender a relação entre ES5 e ESNext
- Escolher a abordagem certa para cada projeto

---

## Módulo Intermediário

O módulo intermediário aprofunda os conceitos e apresenta recursos mais avançados para criar blocos profissionais e reutilizáveis.

---

### Aula 8 - Trabalhando com Atributos de Bloco

#### O que é esta aula?

Atributos são os "dados" do bloco - textos, números, configurações que o usuário define. Esta aula ensina a definir e usar atributos corretamente.

#### O que você vai aprender?

- **Tipos de atributos**:
  - `string` - Textos simples
  - `boolean` - Verdadeiro/falso
  - `number` - Valores numéricos
  - `array` - Listas de valores
  - `object` - Dados complexos
- **Source e selector**: Como extrair valores do HTML salvo
- **setAttributes()**: Função para atualizar valores
- **Valores padrão**: Definindo defaults no block.json

#### Por que é importante?

Atributos são fundamentais para blocos personalizáveis. Sem eles, seu bloco seria estático e não permitiria configuração pelo usuário.

#### Ao final desta aula você será capaz de:

- Definir atributos de qualquer tipo
- Ler e atualizar valores no editor
- Salvar dados corretamente no frontend

#### Exemplo prático:

Bloco de citação com texto, autor e cor de borda configuráveis.

---

### Aula 9 - Componentes do Block Editor

#### O que é esta aula?

O WordPress fornece dezenas de componentes prontos para usar no editor. Esta aula apresenta os mais importantes.

#### O que você vai aprender?

- **RichText**: Campo de texto editável com formatação
- **MediaUpload**: Seleção de imagens da biblioteca de mídia
- **InspectorControls**: Painel de configurações na sidebar direita
- **BlockControls**: Toolbar que aparece acima do bloco selecionado
- **Componentes de formulário**: TextControl, SelectControl, ToggleControl, RangeControl, ColorPalette

#### Por que é importante?

Usar componentes nativos garante consistência visual com o resto do editor e economiza tempo de desenvolvimento.

#### Ao final desta aula você será capaz de:

- Adicionar campos de texto formatável
- Implementar upload de imagens
- Criar painéis de configuração completos

#### Exemplo prático:

Card com imagem, título, descrição e botão com controles de cor.

---

### Aula 10 - Block Supports API

#### O que é esta aula?

A Block Supports API permite adicionar controles nativos do WordPress (cores, tipografia, espaçamentos) sem escrever código adicional.

#### O que você vai aprender?

- **Supports de cor**: background, text, gradients, link
- **Supports de tipografia**: fontSize, lineHeight, fontFamily, fontWeight
- **Supports de espaçamento**: margin, padding, blockGap
- **Supports de borda**: color, radius, style, width
- **Outros**: align, anchor, shadow

#### Por que é importante?

A Supports API oferece uma experiência consistente com blocos nativos do WordPress e reduz drasticamente a quantidade de código necessário.

#### Ao final desta aula você será capaz de:

- Adicionar controles de cor com uma linha de configuração
- Implementar tipografia personalizada sem código
- Usar o sistema de design do tema automaticamente

#### Exemplo prático:

Bloco de texto com todos os supports habilitados - controle total via sidebar.

---

### Aula 11 - InnerBlocks e Blocos Aninhados

#### O que é esta aula?

InnerBlocks permite criar blocos "container" que podem conter outros blocos dentro deles.

#### O que você vai aprender?

- **InnerBlocks básico**: Permitir qualquer bloco dentro do container
- **allowedBlocks**: Restringir quais blocos podem ser adicionados
- **template**: Definir estrutura inicial de blocos filhos
- **templateLock**: Travar a estrutura (impedir adição/remoção)
- **orientation**: Layout horizontal ou vertical

#### Por que é importante?

InnerBlocks é essencial para criar layouts complexos, como seções, cards, colunas personalizadas e qualquer estrutura que agrupe conteúdo.

#### Ao final desta aula você será capaz de:

- Criar blocos container
- Definir templates obrigatórios
- Controlar quais blocos são permitidos

#### Exemplo prático:

Feature Box com ícone, título e descrição usando template predefinido.

---

### Aula 12 - Block Variations e Patterns

#### O que é esta aula?

Variations são versões alternativas de um bloco existente. Patterns são combinações predefinidas de múltiplos blocos.

#### O que você vai aprender?

- **Block Variations**: Criar variações de blocos existentes:
  - Variação do core/group para criar cards
  - Variação do core/button para estilos diferentes
- **Block Patterns**: Combinar blocos em padrões reutilizáveis:
  - Hero sections
  - Pricing tables
  - Team members
- **Categorias de patterns**: Organizar patterns em grupos

#### Por que é importante?

Variations e patterns aceleram a criação de conteúdo e garantem consistência no design do site.

#### Ao final desta aula você será capaz de:

- Criar variações de blocos nativos
- Registrar patterns reutilizáveis
- Organizar patterns em categorias

---

## Módulo Avançado

O módulo avançado cobre técnicas sofisticadas para criar blocos dinâmicos, interativos e prontos para produção.

---

### Aula 13 - Blocos Dinâmicos com PHP

#### O que é esta aula?

Blocos dinâmicos são renderizados pelo PHP no momento da exibição, em vez de terem HTML salvo no banco de dados.

#### O que você vai aprender?

- **Quando usar dinâmicos**: Dados que mudam (posts recentes, usuário logado)
- **render.php**: Arquivo PHP que gera o HTML do bloco
- **Variáveis disponíveis**: `$attributes`, `$content`, `$block`
- **WP_Query**: Buscar posts, páginas ou custom post types
- **Segurança**: Escapamento correto com `esc_html()`, `wp_kses_post()`

#### Por que é importante?

Muitos blocos úteis precisam buscar dados do banco de dados ou variar baseado no contexto. Blocos dinâmicos tornam isso possível.

#### Ao final desta aula você será capaz de:

- Criar blocos que buscam posts dinamicamente
- Implementar lógica PHP no frontend
- Aplicar práticas de segurança

#### Exemplo prático:

Bloco "Últimos Posts" que exibe posts de uma categoria selecionada.

---

### Aula 14 - Block Context API

#### O que é esta aula?

Block Context permite que blocos pai compartilhem dados com blocos filhos de forma elegante.

#### O que você vai aprender?

- **providesContext**: Definir quais atributos o bloco pai expõe
- **usesContext**: Declarar quais contextos o bloco filho consome
- **Acesso no JavaScript**: Via prop `context` no edit.js
- **Acesso no PHP**: Via `$block->context` no render.php
- **Contextos nativos**: postId, postType, queryId

#### Por que é importante?

Context evita "prop drilling" e permite criar sistemas de blocos pai/filho coesos, onde configurações do pai afetam os filhos automaticamente.

#### Ao final desta aula você será capaz de:

- Compartilhar dados entre blocos
- Criar sistemas de blocos relacionados
- Usar contextos nativos do WordPress

#### Exemplo prático:

Slider onde o container define o estilo e os slides herdam automaticamente.

---

### Aula 15 - WordPress Interactivity API

#### O que é esta aula?

A Interactivity API é a forma oficial do WordPress de adicionar interatividade no frontend sem frameworks externos.

#### O que você vai aprender?

- **Store**: Definir state, actions e callbacks
- **Diretivas HTML**:
  - `data-wp-interactive` - Namespace da store
  - `data-wp-context` - Estado local do elemento
  - `data-wp-on--click` - Event handlers
  - `data-wp-bind--attr` - Binding de atributos
  - `data-wp-class--name` - Toggle de classes
- **Context**: Estado local vs global
- **Reatividade**: Atualizações automáticas da UI

#### Por que é importante?

A Interactivity API substitui a necessidade de carregar React, Vue ou jQuery no frontend, resultando em páginas mais leves e performáticas.

#### Ao final desta aula você será capaz de:

- Criar blocos interativos nativamente
- Implementar acordeões, tabs, modais
- Gerenciar estado no frontend

#### Exemplo prático:

FAQ Accordion com animações e suporte a múltiplos itens abertos.

---

### Aula 16 - Criando Plugins de Sidebar

#### O que é esta aula?

Além de blocos, você pode estender o editor com painéis na sidebar usando o sistema SlotFill.

#### O que você vai aprender?

- **PluginSidebar**: Criar uma sidebar customizada
- **PluginDocumentSettingPanel**: Adicionar painel à sidebar do documento
- **PluginPrePublishPanel**: Painel antes de publicar
- **useEntityProp**: Ler e salvar post meta
- **SlotFill customizado**: Criar seus próprios slots

#### Por que é importante?

Sidebars são ideais para configurações que afetam o documento inteiro, como SEO, schema markup ou campos personalizados.

#### Ao final desta aula você será capaz de:

- Criar painéis na sidebar do editor
- Salvar meta dados do post
- Estender a interface do editor

#### Exemplo prático:

Sidebar de SEO com campos de título, descrição e imagem social.

---

### Aula 17 - Internacionalização (i18n)

#### O que é esta aula?

Preparar seus blocos para serem traduzidos para diferentes idiomas.

#### O que você vai aprender?

- **Text domain**: Identificador único para traduções
- **Funções JavaScript**: `__()`, `_x()`, `_n()`, `sprintf()`
- **Funções PHP**: `esc_html__()`, `esc_attr__()`
- **Geração de POT**: Extrair strings traduzíveis
- **Ferramentas**: Poedit, Loco Translate

#### Por que é importante?

Um plugin bem internacionalizado pode alcançar usuários globalmente. O WordPress.org exige que plugins sejam traduzíveis.

#### Ao final desta aula você será capaz de:

- Preparar strings para tradução
- Gerar arquivos de tradução
- Carregar traduções no WordPress

---

## Módulo de Qualidade e Deploy

O módulo final prepara você para lançar plugins profissionais, com testes, performance e acessibilidade.

---

### Aula 18 - Testes com Playwright

#### O que é esta aula?

Testes end-to-end automatizados garantem que seu bloco funciona corretamente após cada alteração.

#### O que você vai aprender?

- **Configuração do Playwright**: Setup para WordPress
- **Estrutura de testes**: describe, test, expect
- **Ações comuns**:
  - Login no admin
  - Criar posts
  - Inserir blocos
  - Verificar conteúdo
- **Execução**: Linha de comando e interface visual
- **CI/CD**: Integração com GitHub Actions

#### Por que é importante?

Testes automatizados detectam bugs antes dos usuários. Isso é especialmente importante quando você atualiza dependências ou adiciona novas features.

#### Ao final desta aula você será capaz de:

- Escrever testes E2E para blocos
- Automatizar verificações
- Integrar testes no CI/CD

---

### Aula 19 - Performance e Otimização

#### O que é esta aula?

Técnicas para garantir que seus blocos carregam rapidamente e não impactam a performance do site.

#### O que você vai aprender?

- **Análise de bundle**: Identificar o que está grande demais
- **Code splitting**: Carregar código sob demanda
- **Lazy loading**: Componentes pesados apenas quando necessário
- **Memoização**: useMemo, useCallback para evitar re-renders
- **Carregamento condicional**: Scripts apenas onde o bloco é usado

#### Por que é importante?

Blocos lentos prejudicam a experiência do usuário e o SEO. Sites WordPress já carregam muito JavaScript - não adicione mais sem necessidade.

#### Ao final desta aula você será capaz de:

- Analisar e otimizar bundles
- Implementar lazy loading
- Carregar scripts condicionalmente

---

### Aula 20 - Acessibilidade em Blocos

#### O que é esta aula?

Garantir que seus blocos são utilizáveis por pessoas com deficiências, incluindo usuários de leitores de tela e navegação por teclado.

#### O que você vai aprender?

- **Navegação por teclado**: Tab, Enter, Escape
- **ARIA**: Labels, roles, states
- **Contraste de cores**: Mínimos WCAG
- **Focus management**: Indicadores visíveis
- **Testes**: axe DevTools, Lighthouse

#### Por que é importante?

Acessibilidade não é opcional - é um requisito legal em muitos países e uma obrigação ética. Blocos inacessíveis excluem usuários.

#### Ao final desta aula você será capaz de:

- Implementar navegação por teclado
- Usar ARIA corretamente
- Auditar acessibilidade

---

### Aula 21 - Publicando seu Plugin

#### O que é esta aula?

O processo completo para submeter seu plugin de blocos ao diretório oficial do WordPress.org.

#### O que você vai aprender?

- **Checklist pré-publicação**: Código, testes, documentação
- **README.txt**: Formato oficial do WordPress
- **Assets**: Banners, ícones, screenshots
- **Processo de submissão**: Conta, revisão, aprovação
- **Manutenção**: SVN, versionamento, changelog
- **Alternativas**: GitHub releases, plugins pagos

#### Por que é importante?

O diretório WordPress.org é a principal fonte de plugins para milhões de sites. Estar lá aumenta drasticamente a visibilidade do seu trabalho.

#### Ao final desta aula você será capaz de:

- Preparar plugin para submissão
- Navegar o processo de revisão
- Manter o plugin atualizado

---

## Aulas Bônus - Projetos Práticos

As aulas bônus aplicam todos os conceitos em projetos completos do início ao fim.

---

### Bônus 1 - Criando um Bloco de Testimonials

#### O que você vai construir?

Um sistema completo de depoimentos com:
- Bloco container (grid de testimonials)
- Bloco individual (card de testimonial)
- Variações: Grid, Slider, Lista
- Avatar, nome, cargo, empresa
- Estrelas de avaliação

#### Conceitos aplicados:

InnerBlocks, Block Context, Variations, Supports, CSS Grid/Flexbox

---

### Bônus 2 - Bloco de Cards com Query Loop

#### O que você vai construir?

Um bloco dinâmico que:
- Busca posts de qualquer post type
- Filtra por categoria/tag
- Exibe em grid responsivo
- Suporta paginação
- Carrega mais via AJAX

#### Conceitos aplicados:

Blocos dinâmicos, WP_Query, REST API, Interactivity API

---

### Bônus 3 - Bloco Interativo de FAQ/Accordion

#### O que você vai construir?

Um FAQ completo com:
- Animações suaves de abertura/fechamento
- Opção de múltiplos abertos ou apenas um
- Navegação completa por teclado
- Schema markup para SEO
- Deep linking (âncoras)

#### Conceitos aplicados:

Interactivity API, Acessibilidade, CSS Animations, Schema.org

---

## Próximos Passos

Após completar o curso, recomendo:

1. **Praticar**: Crie seus próprios blocos para projetos reais
2. **Contribuir**: Envie PRs para o Gutenberg no GitHub
3. **Comunidade**: Participe do Slack do WordPress
4. **Atualizar**: Acompanhe as novas versões do WordPress

## Recursos

- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [WordPress Playground](https://playground.wordpress.net/)
- [GitHub Gutenberg](https://github.com/WordPress/gutenberg)
- [Make WordPress](https://make.wordpress.org/)
