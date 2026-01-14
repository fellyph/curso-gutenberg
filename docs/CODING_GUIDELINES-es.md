# Implementación de Directrices de Codificación Gutenberg

Este documento describe las directrices integrales de codificación implementadas en este repositorio para garantizar consistencia, mantenibilidad y adherencia a los estándares de codificación de WordPress y Gutenberg.

## 📋 Descripción General

Este repositorio ahora sigue las directrices completas de codificación Gutenberg cubriendo:
- **Estándares CSS** con convenciones de nomenclatura inspiradas en BEM
- **Estándares JavaScript** con cumplimiento ES6+ y documentación adecuada
- **Estándares PHP** con cumplimiento de los Estándares de Codificación WordPress
- **Estándares de Documentación** con JSDoc integral

## 🔧 Archivos de Configuración

### Configuración ESLint (`.eslintrc.js`)

```javascript
module.exports = {
    root: true,
    extends: ['plugin:@wordpress/eslint-plugin/recommended'],
    rules: {
        // Reglas de calidad de código mejoradas
        'no-console': 'warn',
        'no-debugger': 'error',
        'prefer-const': 'error',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        
        // Estándares ES6+
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-template': 'error',
        
        // Estándares de cadenas
        'quotes': ['error', 'single'],
        'jsx-quotes': ['error', 'prefer-double'],
    }
};
```

### Configuración Prettier (`.prettierrc`)

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

## 🎨 Implementación de Estándares CSS

### Convenciones de Nomenclatura Inspiradas en BEM

```scss
.wp-block-curso-gutenberg-meu-primeiro-block {
    // Estilos base del componente
    
    // Elementos del componente siguiendo metodología BEM
    &__content {
        font-size: 16px;
        line-height: 1.5;
    }
    
    &__icon {
        margin-right: 8px;
        width: 20px;
        height: 20px;
    }
    
    // Indicadores de estado siguiendo patrón is-*
    &.is-highlighted {
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--wp-admin-theme-color);
    }
    
    &.is-loading {
        opacity: 0.6;
        pointer-events: none;
    }
    
    // Clases modificadoras siguiendo patrón has-* para características
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

### Principios Clave del CSS

1. **Prefijos de Directorio-Paquete**: Todas las clases comienzan con `wp-block-curso-gutenberg-`
2. **Aislamiento de Componente**: Las clases están limitadas a sus respectivos componentes
3. **Indicadores de Estado**: Use `is-*` para estados (is-active, is-loading, is-highlighted)
4. **Modificadores de Característica**: Use `has-*` para características (has-border, has-large-text)
5. **Elementos BEM**: Use `__` para partes del componente (component__element)

## 🔤 Implementación de Estándares JavaScript

### Organización de Importaciones

```javascript
// Dependencias externas (paquetes WordPress)
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

// Dependencias internas (archivos locales)
import './style.scss';
import Edit from './edit';
import save from './save';
```

### Estándares de Documentación JSDoc

```javascript
/**
 * Componente Edit para el Meu Primeiro Block.
 *
 * La función edit describe la estructura de tu bloque en el contexto del
 * editor. Esto representa lo que el editor renderizará cuando se use el bloque.
 *
 * @function Edit
 * @return {Element} Elemento para renderizar en el editor de bloques.
 *
 * @example
 * // Uso en el registro de bloque
 * registerBlockType('curso-gutenberg/meu-primeiro-block', {
 *   edit: Edit,
 * });
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 */
export default function Edit() {
    // Implementación
}
```

## 📦 Comandos Disponibles

### Comandos de Linting

```bash
# Linting JavaScript/JSX
npm run lint:js

# Linting CSS/SCSS
npm run lint:css

# Linting PHP (requiere composer install)
npm run lint:php

# Linting package.json
npm run lint:pkg-json

# Todas las verificaciones de linting
npm run lint:all
```

### Comandos de Formateo

```bash
# Auto-corrección de problemas JavaScript
npm run lint:js:fix

# Auto-corrección de problemas CSS
npm run format:css

# Auto-corrección de todos los problemas corregibles
npm run lint:fix
```

### Comandos de Build

```bash
# Build de producción
npm run build

# Desarrollo con hot reload
npm run start

# Desarrollo con hot module replacement
npm run start:hot
```

## 🚀 Beneficios de la Implementación

### Mejoras en la Calidad del Código

1. **Formateo Consistente**: Prettier garantiza estilo de código uniforme
2. **Prevención de Errores**: ESLint captura bugs potenciales y fuerza buenas prácticas
3. **JavaScript Moderno**: Características ES6+ para mejor legibilidad y rendimiento
4. **Accesibilidad**: Reglas a11y WordPress garantizan diseño inclusivo
5. **Documentación**: JSDoc integral para mejor experiencia del desarrollador

## 🤝 Contribuyendo

Al contribuir a este repositorio:

1. **Ejecute linting antes de commits**: `npm run lint:all`
2. **Corrija problemas auto-corregibles**: `npm run lint:fix`
3. **Siga convenciones de nomenclatura**: Use CSS inspirado en BEM y JSDoc adecuado
4. **Pruebe builds**: Asegúrese de que `npm run build` pase sin errores
5. **Documente cambios**: Actualice JSDoc para nuevas funciones o componentes

## 📚 Referencias

- [Estándares de Codificación WordPress](https://developer.wordpress.org/coding-standards/)
- [Manual Gutenberg](https://developer.wordpress.org/block-editor/)
- [Plugin ESLint WordPress](https://github.com/WordPress/gutenberg/tree/trunk/packages/eslint-plugin)
- [Metodología BEM](https://getbem.com/introduction/)
- [Documentación JSDoc](https://jsdoc.app/)