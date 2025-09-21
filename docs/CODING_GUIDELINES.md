# Gutenberg Coding Guidelines Implementation

This document outlines the comprehensive coding guidelines implemented in this repository to ensure consistency, maintainability, and adherence to WordPress and Gutenberg coding standards.

## 📋 Overview

This repository now follows the complete Gutenberg coding guidelines covering:
- **CSS Standards** with BEM-inspired naming conventions
- **JavaScript Standards** with ES6+ compliance and proper documentation
- **PHP Standards** with WordPress Coding Standards compliance
- **Documentation Standards** with comprehensive JSDoc

## 🔧 Configuration Files

### ESLint Configuration (`.eslintrc.js`)

```javascript
module.exports = {
    root: true,
    extends: ['plugin:@wordpress/eslint-plugin/recommended'],
    rules: {
        // Enhanced code quality rules
        'no-console': 'warn',
        'no-debugger': 'error',
        'prefer-const': 'error',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        
        // ES6+ Standards
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-template': 'error',
        
        // String standards
        'quotes': ['error', 'single'],
        'jsx-quotes': ['error', 'prefer-double'],
    }
};
```

### Prettier Configuration (`.prettierrc`)

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

### PHP CodeSniffer Configuration (`phpcs.xml.dist`)

Configured to use WordPress Coding Standards with appropriate exclusions for Gutenberg development patterns.

## 🎨 CSS Standards Implementation

### BEM-Inspired Naming Conventions

```scss
.wp-block-curso-gutenberg-meu-primeiro-block {
    // Base component styles
    
    // Component elements following BEM methodology
    &__content {
        font-size: 16px;
        line-height: 1.5;
    }
    
    &__icon {
        margin-right: 8px;
        width: 20px;
        height: 20px;
    }
    
    // State indicators following is-* pattern
    &.is-highlighted {
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--wp-admin-theme-color);
    }
    
    &.is-loading {
        opacity: 0.6;
        pointer-events: none;
    }
    
    // Modifier classes following has-* pattern for features
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

### Key CSS Principles

1. **Package-Directory Prefixes**: All classes start with `wp-block-curso-gutenberg-`
2. **Component Isolation**: Classes are scoped to their respective components
3. **State Indicators**: Use `is-*` for states (is-active, is-loading, is-highlighted)
4. **Feature Modifiers**: Use `has-*` for features (has-border, has-large-text)
5. **BEM Elements**: Use `__` for component parts (component__element)

## 🔤 JavaScript Standards Implementation

### Import Organization

```javascript
// External dependencies (WordPress packages)
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

// Internal dependencies (local files)
import './style.scss';
import Edit from './edit';
import save from './save';
```

### JSDoc Documentation Standards

```javascript
/**
 * Edit component for the Meu Primeiro Block.
 *
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @function Edit
 * @return {Element} Element to render in the block editor.
 *
 * @example
 * // Usage in block registration
 * registerBlockType('curso-gutenberg/meu-primeiro-block', {
 *   edit: Edit,
 * });
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 */
export default function Edit() {
    // Implementation
}
```

### Type Definitions

```javascript
/**
 * Block configuration object type definition.
 *
 * @typedef {Object} BlockConfig
 * @property {number} apiVersion - Block API version.
 * @property {string} title - Block display title.
 * @property {string} description - Block description.
 * @property {string} category - Block category.
 * @property {string} icon - Block icon.
 * @property {Object} supports - Block support features.
 * @property {Function} edit - Edit component.
 * @property {Function} save - Save component.
 */
```

## 📦 Available Commands

### Linting Commands

```bash
# JavaScript/JSX linting
npm run lint:js

# CSS/SCSS linting
npm run lint:css

# PHP linting (requires composer install)
npm run lint:php

# Package.json linting
npm run lint:pkg-json

# All linting checks
npm run lint:all
```

### Formatting Commands

```bash
# Auto-fix JavaScript issues
npm run lint:js:fix

# Auto-fix CSS issues
npm run format:css

# Auto-fix all fixable issues
npm run lint:fix
```

### Build Commands

```bash
# Production build
npm run build

# Development with hot reload
npm run start

# Development with hot module replacement
npm run start:hot
```

## 🚀 Implementation Benefits

### Code Quality Improvements

1. **Consistent Formatting**: Prettier ensures uniform code style
2. **Error Prevention**: ESLint catches potential bugs and enforces best practices
3. **Modern JavaScript**: ES6+ features for better code readability and performance
4. **Accessibility**: WordPress a11y rules ensure inclusive design
5. **Documentation**: Comprehensive JSDoc for better developer experience

### CSS Architecture Benefits

1. **Scalability**: BEM methodology makes CSS maintainable at scale
2. **Predictability**: Clear naming conventions make component structure obvious
3. **Modularity**: Component-scoped styles prevent CSS conflicts
4. **Theme Integration**: Proper use of CSS custom properties for WordPress themes

### Developer Experience

1. **Auto-fixing**: Most formatting issues are automatically resolved
2. **Real-time Feedback**: Linting integrated into development workflow
3. **Clear Documentation**: JSDoc provides inline help and examples
4. **Standards Compliance**: Automatic adherence to WordPress coding standards

## 🔍 Code Examples

### Before vs After Implementation

**Before (Basic Implementation):**
```javascript
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

export default function Edit() {
    return <p>Hello World</p>;
}
```

**After (Guideline Compliant):**
```javascript
/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Edit component with proper documentation.
 *
 * @function Edit
 * @return {Element} Element to render in the block editor.
 */
export default function Edit() {
    return (
        <p { ...useBlockProps() }>
            { __( 'Hello World', 'text-domain' ) }
        </p>
    );
}
```

## 📚 References

- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [Gutenberg Handbook](https://developer.wordpress.org/block-editor/)
- [ESLint WordPress Plugin](https://github.com/WordPress/gutenberg/tree/trunk/packages/eslint-plugin)
- [BEM Methodology](https://getbem.com/introduction/)
- [JSDoc Documentation](https://jsdoc.app/)

## 🤝 Contributing

When contributing to this repository:

1. **Run linting before commits**: `npm run lint:all`
2. **Fix auto-fixable issues**: `npm run lint:fix`
3. **Follow naming conventions**: Use BEM-inspired CSS and proper JSDoc
4. **Test builds**: Ensure `npm run build` passes without errors
5. **Document changes**: Update JSDoc for any new functions or components

## 🛠️ Troubleshooting

### Common Issues

**ESLint Errors:**
```bash
# Fix most ESLint issues automatically
npm run lint:js:fix
```

**CSS Linting Errors:**
```bash
# Fix CSS formatting issues
npm run format:css
```

**Build Failures:**
```bash
# Clean build and reinstall dependencies
rm -rf build/ node_modules/
npm install
npm run build
```

This implementation ensures that all code in this repository follows the highest standards of WordPress and Gutenberg development practices.