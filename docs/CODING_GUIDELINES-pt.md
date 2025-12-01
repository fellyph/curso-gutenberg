# Implementação das Diretrizes de Codificação Gutenberg

Este documento descreve as diretrizes abrangentes de codificação implementadas neste repositório para garantir consistência, manutenibilidade e aderência aos padrões de codificação WordPress e Gutenberg.

## 📋 Visão Geral

Este repositório agora segue as diretrizes completas de codificação Gutenberg cobrindo:
- **Padrões CSS** com convenções de nomenclatura inspiradas em BEM
- **Padrões JavaScript** com conformidade ES6+ e documentação adequada
- **Padrões PHP** com conformidade aos Padrões de Codificação WordPress
- **Padrões de Documentação** com JSDoc abrangente

## 🔧 Arquivos de Configuração

### Configuração ESLint (`.eslintrc.js`)

```javascript
module.exports = {
    root: true,
    extends: ['plugin:@wordpress/eslint-plugin/recommended'],
    rules: {
        // Regras de qualidade de código aprimoradas
        'no-console': 'warn',
        'no-debugger': 'error',
        'prefer-const': 'error',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        
        // Padrões ES6+
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-template': 'error',
        
        // Padrões de string
        'quotes': ['error', 'single'],
        'jsx-quotes': ['error', 'prefer-double'],
    }
};
```

### Configuração Prettier (`.prettierrc`)

```json
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
```

## 🎨 Implementação de Padrões CSS

### Convenções de Nomenclatura Inspiradas em BEM

```scss
.wp-block-curso-gutenberg-meu-primeiro-block {
    // Estilos base do componente
    
    // Elementos do componente seguindo metodologia BEM
    &__content {
        font-size: 16px;
        line-height: 1.5;
    }
    
    &__icon {
        margin-right: 8px;
        width: 20px;
        height: 20px;
    }
    
    // Indicadores de estado seguindo padrão is-*
    &.is-highlighted {
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--wp-admin-theme-color);
    }
    
    &.is-loading {
        opacity: 0.6;
        pointer-events: none;
    }
    
    // Classes modificadoras seguindo padrão has-* para recursos
    &.has-large-text {
        .wp-block-curso-gutenberg-meu-primeiro-block__content {
            font-size: 20px;
        }
    }
    
    &.has-border {
        border: 2px solid currentcolor;
    }
}
```

### Princípios Chave do CSS

1. **Prefixos de Diretório-Pacote**: Todas as classes começam com `wp-block-curso-gutenberg-`
2. **Isolamento de Componente**: Classes são delimitadas aos seus respectivos componentes
3. **Indicadores de Estado**: Use `is-*` para estados (is-active, is-loading, is-highlighted)
4. **Modificadores de Recurso**: Use `has-*` para recursos (has-border, has-large-text)
5. **Elementos BEM**: Use `__` para partes do componente (component__element)

## 🔤 Implementação de Padrões JavaScript

### Organização de Importações

```javascript
// Dependências externas (pacotes WordPress)
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

// Dependências internas (arquivos locais)
import './style.scss';
import Edit from './edit';
import save from './save';
```

### Padrões de Documentação JSDoc

```javascript
/**
 * Componente Edit para o Meu Primeiro Block.
 *
 * A função edit descreve a estrutura do seu bloco no contexto do
 * editor. Isso representa o que o editor renderizará quando o bloco for usado.
 *
 * @function Edit
 * @return {Element} Elemento para renderizar no editor de blocos.
 *
 * @example
 * // Uso no registro de bloco
 * registerBlockType('curso-gutenberg/meu-primeiro-block', {
 *   edit: Edit,
 * });
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 */
export default function Edit() {
    // Implementação
}
```

## 📦 Comandos Disponíveis

### Comandos de Linting

```bash
# Linting JavaScript/JSX
npm run lint:js

# Linting CSS/SCSS
npm run lint:css

# Linting PHP (requer composer install)
npm run lint:php

# Linting package.json
npm run lint:pkg-json

# Todas as verificações de linting
npm run lint:all
```

### Comandos de Formatação

```bash
# Auto-correção de problemas JavaScript
npm run lint:js:fix

# Auto-correção de problemas CSS
npm run format:css

# Auto-correção de todos os problemas corrigíveis
npm run lint:fix
```

### Comandos de Build

```bash
# Build de produção
npm run build

# Desenvolvimento com hot reload
npm run start

# Desenvolvimento com hot module replacement
npm run start:hot
```

## 🚀 Benefícios da Implementação

### Melhorias na Qualidade do Código

1. **Formatação Consistente**: Prettier garante estilo de código uniforme
2. **Prevenção de Erros**: ESLint captura bugs potenciais e força boas práticas
3. **JavaScript Moderno**: Recursos ES6+ para melhor legibilidade e performance
4. **Acessibilidade**: Regras a11y WordPress garantem design inclusivo
5. **Documentação**: JSDoc abrangente para melhor experiência do desenvolvedor

## 🤝 Contribuindo

Ao contribuir para este repositório:

1. **Execute linting antes de commits**: `npm run lint:all`
2. **Corrija problemas auto-corrigíveis**: `npm run lint:fix`
3. **Siga convenções de nomenclatura**: Use CSS inspirado em BEM e JSDoc adequado
4. **Teste builds**: Garanta que `npm run build` passe sem erros
5. **Documente mudanças**: Atualize JSDoc para novas funções ou componentes

## 📚 Referências

- [Padrões de Codificação WordPress](https://developer.wordpress.org/coding-standards/)
- [Manual Gutenberg](https://developer.wordpress.org/block-editor/)
- [Plugin ESLint WordPress](https://github.com/WordPress/gutenberg/tree/trunk/packages/eslint-plugin)
- [Metodologia BEM](https://getbem.com/introduction/)
- [Documentação JSDoc](https://jsdoc.app/)