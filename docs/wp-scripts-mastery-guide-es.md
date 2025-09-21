# wp-scripts Mastery - Guía del Estudiante

## En este artículo
- [Descripción General](#descripción-general)
- [Prerrequisitos](#prerrequisitos)
- [Configuración del Ejercicio](#configuración-del-ejercicio)
- [Fase 1: Fundamentos del Proceso de Build](#fase-1-fundamentos-del-proceso-de-build)
- [Fase 2: Implementación de Calidad de Código](#fase-2-implementación-de-calidad-de-código)
- [Fase 3: Integración de Pruebas](#fase-3-integración-de-pruebas)
- [Fase 4: Configuraciones Avanzadas](#fase-4-configuraciones-avanzadas)
- [Proyecto Final](#proyecto-final)
- [Solución de Problemas](#solución-de-problemas)
- [Recursos Adicionales](#recursos-adicionales)

Esta guía completa te enseñará todo lo que necesitas saber sobre `@wordpress/scripts` (wp-scripts) para el desarrollo profesional de bloques WordPress Gutenberg. Aprenderás procesos de build, herramientas de calidad de código, estrategias de prueba y configuraciones avanzadas utilizadas en proyectos del mundo real.

## Descripción General

### ¿Qué es wp-scripts?

El paquete `@wordpress/scripts` es una colección de scripts reutilizables y archivos de configuración que estandarizan y simplifican el proceso de desarrollo de proyectos WordPress que requieren un paso de build de JavaScript.

### Lo que aprenderás

Al completar esta guía, dominarás:

- **Fundamentos del Proceso de Build**: Compilación ESNext/JSX, bundling y gestión de assets
- **Herramientas de Calidad de Código**: ESLint, Prettier y formateo automatizado
- **Estrategias de Prueba**: Pruebas unitarias con Jest y pruebas E2E con Playwright
- **Configuración Avanzada**: Configuraciones webpack personalizadas y optimización de producción
- **Flujo de Trabajo Profesional**: Prácticas de desarrollo estándar de la industria

### Características principales de wp-scripts

- **Compilación**: Convierte JavaScript moderno (ESNext y JSX) a código compatible con navegadores
- **Bundling**: Combina múltiples archivos en bundles optimizados usando webpack
- **Linting de Código**: Asegura calidad de código con ESLint
- **Formateo de Código**: Mantiene estilo consistente con Prettier
- **Compilación Sass**: Transforma SCSS/Sass a CSS
- **Pruebas**: Jest integrado para pruebas unitarias y Playwright para pruebas E2E
- **Minificación**: Optimiza código para despliegue de producción

## Prerrequisitos

Antes de comenzar este ejercicio, asegúrate de tener:

- **Node.js 18+** instalado en tu sistema
- **npm** o **yarn** como gestor de paquetes
- **Git** para control de versiones
- **Editor de código** (VS Code recomendado)
- **Conocimiento básico de JavaScript/React**
- **Fundamentos de bloques WordPress** (recomendado)

### Verificar tu configuración

Ejecuta estos comandos para verificar tu entorno:

```bash
node --version    # Debería mostrar v18.0.0 o superior
npm --version     # Debería mostrar 8.0.0 o superior
git --version     # Debería mostrar información de versión de git
```

## Configuración del Ejercicio

### Paso 1: Crear la rama del ejercicio

```bash
# Navegar al directorio del proyecto
cd /path/to/curso-gutenberg

# Crear y cambiar a la rama del ejercicio
git checkout -b feature/wp-scripts-advanced-exercise

# Verificar que estás en la nueva rama
git branch
```

### Paso 2: Crear la estructura de directorios

```bash
# Crear la estructura de directorios del ejercicio
mkdir -p exercises/wp-scripts-mastery/src/{blocks/{basic-block,advanced-block,dynamic-block},components,utils,styles,tests/{unit,e2e}}
mkdir -p exercises/wp-scripts-mastery/docs

# Navegar al directorio del ejercicio
cd exercises/wp-scripts-mastery
```

### Paso 3: Inicializar el proyecto del ejercicio

Crear el `package.json` mejorado:

```bash
# Crear package.json con configuración wp-scripts mejorada
cat > package.json << 'EOF'
{
  "name": "wp-scripts-mastery-exercise",
  "version": "1.0.0",
  "description": "Ejercicio de entrenamiento avanzado wp-scripts para desarrollo WordPress Gutenberg",
  "author": "Tu Nombre",
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

### Paso 4: Instalar dependencias

```bash
# Instalar todas las dependencias
npm install

# Verificar instalación
npm list --depth=0
```

---

## Fase 1: Fundamentos del Proceso de Build

### Ejercicio 1.1: Entendiendo el Pipeline de Build

**Objetivo**: Aprender cómo wp-scripts transforma tu código fuente de desarrollo a producción.

#### Tarea 1: Examinar el proceso de build

1. **Crear un archivo de entrada básico**:

```bash
# Crear el punto de entrada principal
cat > src/index.js << 'EOF'
/**
 * Dependencias de WordPress
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Dependencias internas
 */
import './style.scss';

console.log('¡wp-scripts está funcionando!');

// Registro simple de bloque para prueba
registerBlockType('curso-gutenberg/test-block', {
    title: __('Bloque de Prueba', 'curso-gutenberg'),
    category: 'widgets',
    edit: () => <div>¡Hola wp-scripts!</div>,
    save: () => <div>¡Hola wp-scripts!</div>,
});
EOF
```

2. **Crear estilos básicos**:

```bash
# Crear archivo SCSS
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

3. **Ejecutar el proceso de build**:

```bash
# Iniciar build de desarrollo con observación
npm run start
```

**Observar**: Nota los archivos creados en el directorio `build/`:
- `index.js` - JavaScript compilado
- `index.css` - CSS compilado del SCSS
- `index.asset.php` - Array de dependencias de WordPress

4. **Hacer cambios y observar hot reloading**:

Edita `src/index.js`, cambia el mensaje del console y observa la reconstrucción automática.

#### Tarea 2: Builds de producción vs desarrollo

1. **Crear un build de producción**:

```bash
# Detener el servidor de desarrollo (Ctrl+C)
# Ejecutar build de producción
npm run build:production
```

2. **Comparar las salidas**:

```bash
# Verificar tamaños de archivos
ls -la build/

# Examinar el código de producción minificado
head -n 10 build/index.js
```

**Puntos de Aprendizaje Clave**:
- Los builds de desarrollo incluyen source maps y no están minificados
- Los builds de producción están optimizados y minificados
- El archivo `.asset.php` contiene dependencias de WordPress para encolado adecuado

### Ejercicio 1.2: Múltiples Puntos de Entrada

**Objetivo**: Configurar wp-scripts para manejar múltiples bloques con puntos de entrada separados.

#### Tarea 1: Crear configuración webpack personalizada

```bash
# Crear webpack.config.js
cat > webpack.config.js << 'EOF'
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    
    // Múltiples puntos de entrada para diferentes bloques
    entry: {
        'basic-block': './src/blocks/basic-block/index.js',
        'advanced-block': './src/blocks/advanced-block/index.js',
        'main': './src/index.js'
    },

    // Rutas de resolución personalizadas para importaciones más fáciles
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

#### Tarea 2: Crear el bloque básico

1. **Crear metadatos del bloque**:

```bash
# Crear directorio y archivos del bloque básico
cat > src/blocks/basic-block/block.json << 'EOF'
{
    "apiVersion": 2,
    "name": "curso-gutenberg/basic-block",
    "title": "Ejercicio Bloque Básico",
    "category": "curso-gutenberg",
    "icon": "admin-tools",
    "description": "Un bloque básico demostrando fundamentos de wp-scripts",
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
            "default": "¡Hola del Bloque Básico!"
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

2. **Crear el registro del bloque**:

```bash
cat > src/blocks/basic-block/index.js << 'EOF'
/**
 * Dependencias de WordPress
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Dependencias internas
 */
import Edit from './edit';
import save from './save';
import './style.scss';
import metadata from './block.json';

/**
 * Registrar el Bloque Básico
 */
registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: save,
});
EOF
```

3. **Crear el componente Edit**:

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
                <PanelBody title={__('Configuraciones', 'curso-gutenberg')}>
                    <SelectControl
                        label={__('Alineación del Texto', 'curso-gutenberg')}
                        value={alignment}
                        options={[
                            { label: __('Izquierda', 'curso-gutenberg'), value: 'left' },
                            { label: __('Centro', 'curso-gutenberg'), value: 'center' },
                            { label: __('Derecha', 'curso-gutenberg'), value: 'right' },
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
                    placeholder={__('Ingresa tu texto...', 'curso-gutenberg')}
                />
            </div>
        </>
    );
}
EOF
```

---

## Fase 2: Implementación de Calidad de Código

### Ejercicio 2.1: Configuración ESLint

**Objetivo**: Configurar linting completo de código para estándares de WordPress.

#### Tarea 1: Crear configuración ESLint personalizada

```bash
# Crear .eslintrc.js
cat > .eslintrc.js << 'EOF'
module.exports = {
    extends: [
        '@wordpress/eslint-config',
        '@wordpress/eslint-config/jsx-a11y'
    ],
    rules: {
        // Reglas de importación
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
        
        // Reglas específicas de WordPress
        '@wordpress/no-unsafe-wp-apis': 'warn',
        '@wordpress/gutenberg-phase': 'error',
        '@wordpress/no-base-control-with-label-without-id': 'error',
        
        // Calidad general de código
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

---

## Fase 3: Integración de Pruebas

### Ejercicio 3.1: Pruebas Unitarias con Jest

**Objetivo**: Escribir pruebas unitarias completas para componentes de bloques.

#### Tarea 1: Configurar Jest

```bash
# Crear jest.config.js
cat > jest.config.js << 'EOF'
const defaultConfig = require('@wordpress/scripts/config/jest-unit.config');

module.exports = {
    ...defaultConfig,
    
    // Ambiente de prueba
    testEnvironment: 'jsdom',
    
    // Archivos de configuración
    setupFilesAfterEnv: [
        '<rootDir>/src/tests/setup.js'
    ],
    
    // Mapeo de nombres de módulo para aliases
    moduleNameMapper: {
        ...defaultConfig.moduleNameMapper,
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    },
    
    // Configuración de cobertura
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/*.test.{js,jsx}',
        '!src/tests/**',
        '!src/**/index.js'
    ],
    
    // Umbrales de cobertura
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    
    // Patrones de coincidencia de prueba
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
        '<rootDir>/src/**/*.test.{js,jsx}'
    ]
};
EOF
```

---

## Fase 4: Configuraciones Avanzadas

### Ejercicio 4.1: Análisis de Bundle

**Objetivo**: Analizar y optimizar tus bundles webpack.

#### Tarea 1: Generar análisis de bundle

```bash
# Instalar analizador de bundle si no está instalado
npm install --save-dev webpack-bundle-analyzer

# Generar análisis de bundle
npm run build:analyze

# Esto creará un archivo bundle-report.html
open bundle-report.html
```

---

## Proyecto Final

### Objetivo: Crear una Suite Completa de Bloques

Crea una suite completa de bloques que demuestre todos los conceptos aprendidos:

#### Tarea 1: Bloque Avanzado con Contenido Dinámico

Crea un bloque avanzado que demuestre:
- Renderizado del lado del servidor
- Configuraciones complejas
- Integración con APIs de WordPress
- Interactividad frontend

#### Tarea 2: Crear pruebas completas

Escribe pruebas que alcancen >90% de cobertura para todos los componentes.

#### Tarea 3: Implementar optimizaciones de rendimiento

- Code splitting
- Lazy loading
- Optimización de bundle
- Optimización de assets

#### Tarea 4: Crear documentación

Documenta tu implementación con:
- Comentarios en el código
- Archivos README
- Ejemplos de uso
- Benchmarks de rendimiento

---

## Solución de Problemas

### Problemas Comunes y Soluciones

#### Errores de Build

**Error**: `Module not found: Error: Can't resolve '@wordpress/blocks'`

**Solución**: Asegúrate de que todas las dependencias de WordPress estén instaladas correctamente:
```bash
npm install @wordpress/scripts --save-dev
```

**Error**: `Cannot resolve alias '@components'`

**Solución**: Verifica que tu configuración de alias en webpack.config.js coincida con tu estructura de directorios.

#### Fallas de Prueba

**Error**: `Cannot find module '@testing-library/jest-dom'`

**Solución**: Instala las dependencias de prueba:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

---

## Recursos Adicionales

### Documentación Oficial
- [Paquete wp-scripts](https://www.npmjs.com/package/@wordpress/scripts)
- [Manual del Editor de Bloques WordPress](https://developer.wordpress.org/block-editor/)
- [Configuración Webpack](https://webpack.js.org/configuration/)
- [Framework de Pruebas Jest](https://jestjs.io/)

### Recursos de la Comunidad
- [Blog del Desarrollador WordPress](https://developer.wordpress.org/news/)
- [Repositorio GitHub de Gutenberg](https://github.com/WordPress/gutenberg)
- [WordPress Stack Exchange](https://wordpress.stackexchange.com/)

---

## Conclusión

¡Felicitaciones! Has completado el ejercicio de dominio de wp-scripts. Ahora tienes:

✅ **Comprensión profunda** de los procesos de build de wp-scripts
✅ **Flujo de trabajo profesional** con linting, formateo y pruebas
✅ **Habilidades de configuración avanzada** para proyectos complejos
✅ **Técnicas de optimización listas para producción**
✅ **Estrategias de prueba completas** para código confiable

### Próximos Pasos

1. **Aplica estas habilidades** en proyectos WordPress reales
2. **Contribuye al código abierto** en plugins y temas de WordPress
3. **Comparte tu conocimiento** con la comunidad WordPress
4. **Mantente actualizado** con las características más recientes de wp-scripts

¡Sigue construyendo bloques WordPress increíbles! 🚀
