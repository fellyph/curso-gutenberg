# wp-scripts Mastery - Guia do Estudante

## Neste artigo
- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Exercício](#configuração-do-exercício)
- [Fase 1: Fundamentos do Processo de Build](#fase-1-fundamentos-do-processo-de-build)
- [Fase 2: Implementação de Qualidade de Código](#fase-2-implementação-de-qualidade-de-código)
- [Fase 3: Integração de Testes](#fase-3-integração-de-testes)
- [Fase 4: Configurações Avançadas](#fase-4-configurações-avançadas)
- [Projeto Final](#projeto-final)
- [Solução de Problemas](#solução-de-problemas)
- [Recursos Adicionais](#recursos-adicionais)

Este guia abrangente irá ensiná-lo tudo o que você precisa saber sobre `@wordpress/scripts` (wp-scripts) para desenvolvimento profissional de blocos WordPress Gutenberg. Você aprenderá processos de build, ferramentas de qualidade de código, estratégias de teste e configurações avançadas usadas em projetos do mundo real.

## Visão Geral

### O que é wp-scripts?

O pacote `@wordpress/scripts` é uma coleção de scripts reutilizáveis e arquivos de configuração que padronizam e simplificam o processo de desenvolvimento de projetos WordPress que requerem uma etapa de build JavaScript.

### O que você vai aprender

Ao completar este guia, você dominará:

- **Fundamentos do Processo de Build**: Compilação ESNext/JSX, bundling e gerenciamento de assets
- **Ferramentas de Qualidade de Código**: ESLint, Prettier e formatação automatizada
- **Estratégias de Teste**: Testes unitários com Jest e testes E2E com Playwright
- **Configuração Avançada**: Configurações webpack customizadas e otimização de produção
- **Fluxo de Trabalho Profissional**: Práticas de desenvolvimento padrão da indústria

### Principais recursos do wp-scripts

- **Compilação**: Converte JavaScript moderno (ESNext e JSX) para código compatível com navegadores
- **Bundling**: Combina múltiplos arquivos em bundles otimizados usando webpack
- **Linting de Código**: Garante qualidade de código com ESLint
- **Formatação de Código**: Mantém estilo consistente com Prettier
- **Compilação Sass**: Transforma SCSS/Sass para CSS
- **Testes**: Jest integrado para testes unitários e Playwright para testes E2E
- **Minificação**: Otimiza código para deploy de produção

## Pré-requisitos

Antes de iniciar este exercício, certifique-se de ter:

- **Node.js 18+** instalado no seu sistema
- **npm** ou **yarn** como gerenciador de pacotes
- **Git** para controle de versão
- **Editor de código** (VS Code recomendado)
- **Conhecimento básico de JavaScript/React**
- **Fundamentos de blocos WordPress** (recomendado)

### Verificar sua configuração

Execute estes comandos para verificar seu ambiente:

```bash
node --version    # Deve mostrar v18.0.0 ou superior
npm --version     # Deve mostrar 8.0.0 ou superior
git --version     # Deve mostrar informações da versão do git
```

## Configuração do Exercício

### Passo 1: Criar o branch do exercício

```bash
# Navegar para o diretório do projeto
cd /path/to/curso-gutenberg

# Criar e mudar para o branch do exercício
git checkout -b feature/wp-scripts-advanced-exercise

# Verificar que você está no novo branch
git branch
```

### Passo 2: Criar a estrutura de diretórios

```bash
# Criar a estrutura de diretórios do exercício
mkdir -p exercises/wp-scripts-mastery/src/{blocks/{basic-block,advanced-block,dynamic-block},components,utils,styles,tests/{unit,e2e}}
mkdir -p exercises/wp-scripts-mastery/docs

# Navegar para o diretório do exercício
cd exercises/wp-scripts-mastery
```

### Passo 3: Inicializar o projeto do exercício

Criar o `package.json` aprimorado:

```bash
# Criar package.json com configuração wp-scripts aprimorada
cat > package.json << 'EOF'
{
  "name": "wp-scripts-mastery-exercise",
  "version": "1.0.0",
  "description": "Exercício de treinamento avançado wp-scripts para desenvolvimento WordPress Gutenberg",
  "author": "Seu Nome",
  "license": "GPL-2.0-or-later",
  "main": "build/index.js",
  "scripts": {
    "build": "wp-scripts build",
    "build:production": "NODE_ENV=production wp-scripts build",
    "start": "wp-scripts start",
    "start:hot": "wp-scripts start --hot",
    "format": "wp-scripts format",
    "format:js": "wp-scripts format-js",
    "lint:css": "wp-scripts lint-style",
    "lint:js": "wp-scripts lint-js",
    "lint:pkg-json": "wp-scripts lint-pkg-json",
    "test": "wp-scripts test-unit-js",
    "test:e2e": "wp-scripts test-e2e",
    "test:unit": "wp-scripts test-unit-js",
    "test:watch": "wp-scripts test-unit-js --watch",
    "test:coverage": "wp-scripts test-unit-js --coverage",
    "playground:start": "npx @wp-playground/cli@latest server --auto-mount --login",
    "build:analyze": "npm run build -- --analyze"
  },
  "dependencies": {
    "@wordpress/scripts": "^30.24.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@wp-playground/cli": "^0.1.0",
    "webpack-bundle-analyzer": "^4.9.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5"
  }
}
EOF
```

### Passo 4: Instalar dependências

```bash
# Instalar todas as dependências
npm install

# Verificar instalação
npm list --depth=0
```

---

## Fase 1: Fundamentos do Processo de Build

### Exercício 1.1: Entendendo o Pipeline de Build

**Objetivo**: Aprender como wp-scripts transforma seu código fonte de desenvolvimento para produção.

#### Tarefa 1: Examinar o processo de build

1. **Criar um arquivo de entrada básico**:

```bash
# Criar o ponto de entrada principal
cat > src/index.js << 'EOF'
/**
 * Dependências do WordPress
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Dependências internas
 */
import './style.scss';

console.log('wp-scripts está funcionando!');

// Registro simples de bloco para teste
registerBlockType('curso-gutenberg/test-block', {
    title: __('Bloco de Teste', 'curso-gutenberg'),
    category: 'widgets',
    edit: () => <div>Olá wp-scripts!</div>,
    save: () => <div>Olá wp-scripts!</div>,
});
EOF
```

2. **Criar estilos básicos**:

```bash
# Criar arquivo SCSS
cat > src/style.scss << 'EOF'
.wp-block-curso-gutenberg-test-block {
    background: #f0f0f0;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:hover {
        background: #e0e0e0;
    }
}
EOF
```

3. **Executar o processo de build**:

```bash
# Iniciar build de desenvolvimento com observação
npm run start
```

**Observar**: Note os arquivos criados no diretório `build/`:
- `index.js` - JavaScript compilado
- `index.css` - CSS compilado do SCSS
- `index.asset.php` - Array de dependências do WordPress

4. **Fazer alterações e observar hot reloading**:

Edite `src/index.js`, altere a mensagem do console e observe a reconstrução automática.

#### Tarefa 2: Builds de produção vs desenvolvimento

1. **Criar um build de produção**:

```bash
# Parar o servidor de desenvolvimento (Ctrl+C)
# Executar build de produção
npm run build:production
```

2. **Comparar as saídas**:

```bash
# Verificar tamanhos dos arquivos
ls -la build/

# Examinar o código de produção minificado
head -n 10 build/index.js
```

**Pontos de Aprendizado Chave**:
- Builds de desenvolvimento incluem source maps e não são minificados
- Builds de produção são otimizados e minificados
- O arquivo `.asset.php` contém dependências do WordPress para enfileiramento adequado

### Exercício 1.2: Múltiplos Pontos de Entrada

**Objetivo**: Configurar wp-scripts para lidar com múltiplos blocos com pontos de entrada separados.

#### Tarefa 1: Criar configuração webpack customizada

```bash
# Criar webpack.config.js
cat > webpack.config.js << 'EOF'
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    
    // Múltiplos pontos de entrada para diferentes blocos
    entry: {
        'basic-block': './src/blocks/basic-block/index.js',
        'advanced-block': './src/blocks/advanced-block/index.js',
        'main': './src/index.js'
    },

    // Caminhos de resolução customizados para importações mais fáceis
    resolve: {
        ...defaultConfig.resolve,
        alias: {
            ...defaultConfig.resolve.alias,
            '@components': path.resolve(__dirname, 'src/components'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        }
    }
};
EOF
```

#### Tarefa 2: Criar o bloco básico

1. **Criar metadados do bloco**:

```bash
# Criar diretório e arquivos do bloco básico
cat > src/blocks/basic-block/block.json << 'EOF'
{
    "apiVersion": 2,
    "name": "curso-gutenberg/basic-block",
    "title": "Exercício Bloco Básico",
    "category": "curso-gutenberg",
    "icon": "admin-tools",
    "description": "Um bloco básico demonstrando fundamentos do wp-scripts",
    "textdomain": "curso-gutenberg",
    "supports": {
        "html": false,
        "color": {
            "background": true,
            "text": true
        },
        "spacing": {
            "margin": true,
            "padding": true
        }
    },
    "attributes": {
        "content": {
            "type": "string",
            "default": "Olá do Bloco Básico!"
        },
        "alignment": {
            "type": "string",
            "default": "left"
        }
    },
    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style-index.css"
}
EOF
```

2. **Criar o registro do bloco**:

```bash
cat > src/blocks/basic-block/index.js << 'EOF'
/**
 * Dependências do WordPress
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Dependências internas
 */
import Edit from './edit';
import save from './save';
import './style.scss';
import metadata from './block.json';

/**
 * Registrar o Bloco Básico
 */
registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: save,
});
EOF
```

3. **Criar o componente Edit**:

```bash
cat > src/blocks/basic-block/edit.js << 'EOF'
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { content, alignment } = attributes;
    const blockProps = useBlockProps({
        className: `has-text-align-${alignment}`,
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Configurações', 'curso-gutenberg')}>
                    <SelectControl
                        label={__('Alinhamento do Texto', 'curso-gutenberg')}
                        value={alignment}
                        options={[
                            { label: __('Esquerda', 'curso-gutenberg'), value: 'left' },
                            { label: __('Centro', 'curso-gutenberg'), value: 'center' },
                            { label: __('Direita', 'curso-gutenberg'), value: 'right' },
                        ]}
                        onChange={(value) => setAttributes({ alignment: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <RichText
                    tagName="p"
                    value={content}
                    onChange={(value) => setAttributes({ content: value })}
                    placeholder={__('Digite seu texto...', 'curso-gutenberg')}
                />
            </div>
        </>
    );
}
EOF
```

4. **Criar o componente Save**:

```bash
cat > src/blocks/basic-block/save.js << 'EOF'
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { content, alignment } = attributes;
    const blockProps = useBlockProps.save({
        className: `has-text-align-${alignment}`,
    });

    return (
        <div {...blockProps}>
            <RichText.Content tagName="p" value={content} />
        </div>
    );
}
EOF
```

5. **Criar estilos**:

```bash
# Estilos do editor
cat > src/blocks/basic-block/editor.scss << 'EOF'
.wp-block-curso-gutenberg-basic-block {
    border: 2px dashed #ccc;
    padding: 1rem;
    
    &.has-text-align-center {
        text-align: center;
    }
    
    &.has-text-align-right {
        text-align: right;
    }
}
EOF

# Estilos do frontend
cat > src/blocks/basic-block/style.scss << 'EOF'
.wp-block-curso-gutenberg-basic-block {
    padding: 1rem;
    border-radius: 4px;
    
    &.has-text-align-center {
        text-align: center;
    }
    
    &.has-text-align-right {
        text-align: right;
    }
}
EOF
```

#### Tarefa 3: Testar os múltiplos pontos de entrada

```bash
# Build com configuração webpack customizada
npm run build

# Verificar a saída do build
ls -la build/
```

Você deve ver arquivos separados para cada ponto de entrada:
- `basic-block.js` e `basic-block.css`
- `advanced-block.js` e `advanced-block.css`
- `main.js` e `main.css`

---

## Fase 2: Implementação de Qualidade de Código

### Exercício 2.1: Configuração ESLint

**Objetivo**: Configurar linting abrangente de código para padrões WordPress.

#### Tarefa 1: Criar configuração ESLint customizada

```bash
# Criar .eslintrc.js
cat > .eslintrc.js << 'EOF'
module.exports = {
    extends: [
        '@wordpress/eslint-config',
        '@wordpress/eslint-config/jsx-a11y'
    ],
    rules: {
        // Regras de importação
        'import/no-extraneous-dependencies': 'error',
        'import/no-unresolved': 'error',
        'import/order': ['error', {
            groups: [
                'builtin',
                'external',
                ['internal', 'parent', 'sibling', 'index']
            ],
            'newlines-between': 'always'
        }],
        
        // Regras específicas do WordPress
        '@wordpress/no-unsafe-wp-apis': 'warn',
        '@wordpress/gutenberg-phase': 'error',
        '@wordpress/no-base-control-with-label-without-id': 'error',
        
        // Qualidade geral de código
        'no-console': 'warn',
        'no-debugger': 'error',
        'prefer-const': 'error',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: require.resolve('@wordpress/scripts/config/webpack.config.js')
            }
        }
    },
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true
    },
    globals: {
        wp: 'readonly',
        wpApiSettings: 'readonly',
        window: 'readonly',
        document: 'readonly'
    }
};
EOF
```

#### Tarefa 2: Testar ESLint

```bash
# Executar ESLint no seu código
npm run lint:js

# Corrigir problemas auto-corrigíveis
npm run lint:js -- --fix
```

### Exercício 2.2: Configuração Prettier

**Objetivo**: Configurar formatação consistente de código em todo o projeto.

#### Tarefa 1: Criar configuração Prettier

```bash
# Criar .prettierrc
cat > .prettierrc << 'EOF'
{
    "useTabs": true,
    "tabWidth": 4,
    "printWidth": 80,
    "singleQuote": true,
    "trailingComma": "es5",
    "bracketSpacing": true,
    "bracketSameLine": false,
    "arrowParens": "avoid",
    "endOfLine": "lf",
    "semi": true
}
EOF

# Criar .prettierignore
cat > .prettierignore << 'EOF'
build/
node_modules/
vendor/
*.min.js
*.min.css
EOF
```

#### Tarefa 2: Formatar seu código

```bash
# Formatar todos os arquivos JavaScript
npm run format:js

# Verificar o que seria formatado
npm run format:js -- --check
```

---

## Fase 3: Integração de Testes

### Exercício 3.1: Testes Unitários com Jest

**Objetivo**: Escrever testes unitários abrangentes para componentes de blocos.

#### Tarefa 1: Configurar Jest

```bash
# Criar jest.config.js
cat > jest.config.js << 'EOF'
const defaultConfig = require('@wordpress/scripts/config/jest-unit.config');

module.exports = {
    ...defaultConfig,
    
    // Ambiente de teste
    testEnvironment: 'jsdom',
    
    // Arquivos de configuração
    setupFilesAfterEnv: [
        '<rootDir>/src/tests/setup.js'
    ],
    
    // Mapeamento de nomes de módulo para aliases
    moduleNameMapper: {
        ...defaultConfig.moduleNameMapper,
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    },
    
    // Configuração de cobertura
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/*.test.{js,jsx}',
        '!src/tests/**',
        '!src/**/index.js'
    ],
    
    // Limites de cobertura
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    
    // Padrões de correspondência de teste
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
        '<rootDir>/src/**/*.test.{js,jsx}'
    ]
};
EOF
```

#### Tarefa 2: Criar arquivo de configuração de teste

```bash
# Criar configuração de teste
cat > src/tests/setup.js << 'EOF'
// Importar matchers Jest DOM
import '@testing-library/jest-dom';

// Mock de globais do WordPress
global.wp = {
    i18n: {
        __: (text) => text,
        _x: (text) => text,
        _n: (single, plural, number) => number === 1 ? single : plural,
    },
    blocks: {
        registerBlockType: jest.fn(),
    },
    element: {
        createElement: jest.fn(),
        Fragment: 'Fragment',
    },
    components: {
        PanelBody: 'PanelBody',
        SelectControl: 'SelectControl',
    },
    blockEditor: {
        useBlockProps: () => ({ className: 'wp-block' }),
        RichText: 'RichText',
        InspectorControls: 'InspectorControls',
    },
};

// Mock de métodos do console em testes
global.console = {
    ...console,
    // Descomente para ignorar um nível específico de log
    // log: jest.fn(),
    // debug: jest.fn(),
    // info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};
EOF
```

#### Tarefa 3: Escrever testes unitários para o bloco básico

```bash
# Criar diretório de teste
mkdir -p src/blocks/basic-block/__tests__

# Criar teste unitário
cat > src/blocks/basic-block/__tests__/edit.test.js << 'EOF'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Edit from '../edit';

// Mock das dependências do WordPress
jest.mock('@wordpress/i18n', () => ({
    __: (text) => text,
}));

jest.mock('@wordpress/block-editor', () => ({
    useBlockProps: () => ({ className: 'wp-block-basic-block' }),
    RichText: ({ value, placeholder, onChange, tagName }) => (
        <input
            data-testid="rich-text-input"
            value={value || ''}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    ),
    InspectorControls: ({ children }) => (
        <div data-testid="inspector-controls">{children}</div>
    ),
}));

jest.mock('@wordpress/components', () => ({
    PanelBody: ({ title, children }) => (
        <div data-testid="panel-body" title={title}>
            {children}
        </div>
    ),
    SelectControl: ({ label, value, onChange, options }) => (
        <select
            data-testid="select-control"
            aria-label={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    ),
}));

describe('Componente Edit do BasicBlock', () => {
    const defaultAttributes = {
        content: 'Conteúdo de teste',
        alignment: 'left',
    };

    const mockSetAttributes = jest.fn();

    beforeEach(() => {
        mockSetAttributes.mockClear();
    });

    test('renderiza sem falhar', () => {
        render(
            <Edit
                attributes={defaultAttributes}
                setAttributes={mockSetAttributes}
            />
        );
    });

    test('exibe o conteúdo correto', () => {
        render(
            <Edit
                attributes={defaultAttributes}
                setAttributes={mockSetAttributes}
            />
        );

        expect(screen.getByDisplayValue('Conteúdo de teste')).toBeInTheDocument();
    });

    test('renderiza controles do inspector', () => {
        render(
            <Edit
                attributes={defaultAttributes}
                setAttributes={mockSetAttributes}
            />
        );

        expect(screen.getByTestId('inspector-controls')).toBeInTheDocument();
        expect(screen.getByTestId('panel-body')).toBeInTheDocument();
        expect(screen.getByTestId('select-control')).toBeInTheDocument();
    });

    test('chama setAttributes quando o conteúdo muda', () => {
        render(
            <Edit
                attributes={defaultAttributes}
                setAttributes={mockSetAttributes}
            />
        );

        const richTextInput = screen.getByTestId('rich-text-input');
        fireEvent.change(richTextInput, { target: { value: 'Novo conteúdo' } });

        expect(mockSetAttributes).toHaveBeenCalledWith({ content: 'Novo conteúdo' });
    });

    test('chama setAttributes quando o alinhamento muda', () => {
        render(
            <Edit
                attributes={defaultAttributes}
                setAttributes={mockSetAttributes}
            />
        );

        const selectControl = screen.getByTestId('select-control');
        fireEvent.change(selectControl, { target: { value: 'center' } });

        expect(mockSetAttributes).toHaveBeenCalledWith({ alignment: 'center' });
    });
});
EOF
```

#### Tarefa 4: Executar os testes

```bash
# Executar todos os testes
npm run test

# Executar testes em modo observação
npm run test:watch

# Executar testes com cobertura
npm run test:coverage

# Executar arquivo de teste específico
npm run test -- --testPathPattern=edit.test.js
```

---

## Fase 4: Configurações Avançadas

### Exercício 4.1: Análise de Bundle

**Objetivo**: Analisar e otimizar seus bundles webpack.

#### Tarefa 1: Gerar análise de bundle

```bash
# Instalar analisador de bundle se ainda não instalado
npm install --save-dev webpack-bundle-analyzer

# Gerar análise de bundle
npm run build:analyze

# Isso criará um arquivo bundle-report.html
open bundle-report.html
```

#### Tarefa 2: Otimizar tamanho do bundle

Atualizar sua configuração webpack para implementar code splitting:

```bash
# Atualizar webpack.config.js com otimização
cat > webpack.config.js << 'EOF'
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

// Verificar se estamos em modo de análise
const isAnalyze = process.env.ANALYZE_BUNDLE === 'true';

module.exports = {
    ...defaultConfig,
    
    // Múltiplos pontos de entrada
    entry: {
        'basic-block': './src/blocks/basic-block/index.js',
        'advanced-block': './src/blocks/advanced-block/index.js',
        'main': './src/index.js'
    },

    // Caminhos de resolução customizados
    resolve: {
        ...defaultConfig.resolve,
        alias: {
            ...defaultConfig.resolve.alias,
            '@components': path.resolve(__dirname, 'src/components'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        }
    },

    // Plugins aprimorados
    plugins: [
        ...defaultConfig.plugins,
        ...(isAnalyze ? [
            new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: 'bundle-report.html'
            })
        ] : [])
    ],

    // Otimização avançada
    optimization: {
        ...defaultConfig.optimization,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // Pacotes WordPress
                wordpress: {
                    test: /[\\/]node_modules[\\/]@wordpress[\\/]/,
                    name: 'wordpress-vendor',
                    chunks: 'all',
                    priority: 20
                },
                // Outras bibliotecas vendor
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: 10
                },
                // Código comum entre blocos
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 5,
                    reuseExistingChunk: true
                }
            }
        }
    },

    // Dicas de performance
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};
EOF
```

---

## Projeto Final

### Objetivo: Criar uma Suíte Completa de Blocos

Crie uma suíte abrangente de blocos que demonstre todos os conceitos aprendidos:

#### Tarefa 1: Bloco Avançado com Conteúdo Dinâmico

Crie um bloco avançado que demonstre:
- Renderização do lado do servidor
- Configurações complexas
- Integração com APIs do WordPress
- Interatividade frontend

#### Tarefa 2: Criar testes abrangentes

Escreva testes que alcancem >90% de cobertura para todos os componentes.

#### Tarefa 3: Implementar otimizações de performance

- Code splitting
- Lazy loading
- Otimização de bundle
- Otimização de assets

#### Tarefa 4: Criar documentação

Documente sua implementação com:
- Comentários no código
- Arquivos README
- Exemplos de uso
- Benchmarks de performance

---

## Solução de Problemas

### Problemas Comuns e Soluções

#### Erros de Build

**Erro**: `Module not found: Error: Can't resolve '@wordpress/blocks'`

**Solução**: Certifique-se de que todas as dependências do WordPress estão instaladas adequadamente:
```bash
npm install @wordpress/scripts --save-dev
```

**Erro**: `Cannot resolve alias '@components'`

**Solução**: Verifique se sua configuração de alias no webpack.config.js corresponde à sua estrutura de diretórios.

#### Falhas de Teste

**Erro**: `Cannot find module '@testing-library/jest-dom'`

**Solução**: Instale as dependências de teste:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

---

## Recursos Adicionais

### Documentação Oficial
- [Pacote wp-scripts](https://www.npmjs.com/package/@wordpress/scripts)
- [Manual do Editor de Blocos WordPress](https://developer.wordpress.org/block-editor/)
- [Configuração Webpack](https://webpack.js.org/configuration/)
- [Framework de Testes Jest](https://jestjs.io/)

### Recursos da Comunidade
- [Blog do Desenvolvedor WordPress](https://developer.wordpress.org/news/)
- [Repositório GitHub do Gutenberg](https://github.com/WordPress/gutenberg)
- [WordPress Stack Exchange](https://wordpress.stackexchange.com/)

---

## Conclusão

Parabéns! Você completou o exercício de domínio do wp-scripts. Agora você tem:

✅ **Compreensão profunda** dos processos de build do wp-scripts
✅ **Fluxo de trabalho profissional** com linting, formatação e testes
✅ **Habilidades de configuração avançada** para projetos complexos
✅ **Técnicas de otimização prontas para produção**
✅ **Estratégias de teste abrangentes** para código confiável

### Próximos Passos

1. **Aplique essas habilidades** em projetos WordPress reais
2. **Contribua para código aberto** em plugins e temas WordPress
3. **Compartilhe seu conhecimento** com a comunidade WordPress
4. **Mantenha-se atualizado** com os recursos mais recentes do wp-scripts

Continue construindo blocos WordPress incríveis! 🚀
