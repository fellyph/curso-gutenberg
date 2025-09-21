# Guía de Internacionalización (i18n) - Curso Gutenberg

Esta guía explica cómo implementar y gestionar la internacionalización en bloques WordPress Gutenberg, específicamente para el proyecto "Meu Primeiro Block".

## 📚 Índice

1. [Descripción General](#descripción-general)
2. [Configuración del Proyecto](#configuración-del-proyecto)
3. [Añadiendo Cadenas Traducibles](#añadiendo-cadenas-traducibles)
4. [Gestionando Archivos de Traducción](#gestionando-archivos-de-traducción)
5. [Probando Traducciones](#probando-traducciones)
6. [Mejores Prácticas](#mejores-prácticas)
7. [Solución de Problemas](#solución-de-problemas)

## Descripción General

La internacionalización (i18n) permite que tus bloques WordPress sean traducidos a múltiples idiomas, haciéndolos accesibles a una audiencia global. Este proyecto soporta:

- **Portugués (Brasil)** - Idioma original
- **Inglés (EE.UU.)** - Idioma internacional principal
- **Español (España)** - Idioma internacional secundario

## Configuración del Proyecto

### Estructura de Archivos

La configuración completa de i18n incluye:

```
curso-gutenberg/
├── languages/                          # Directorio de archivos de traducción
│   ├── meu-primeiro-block.pot          # Archivo plantilla
│   ├── meu-primeiro-block-en_US.po     # Traducciones en inglés
│   ├── meu-primeiro-block-en_US-hash.json # Inglés para JavaScript
│   ├── meu-primeiro-block-es_ES.po     # Traducciones en español
│   ├── meu-primeiro-block-es_ES-hash.json # Español para JavaScript
│   └── README.md                       # Directrices de traducción
├── src/                                # Código fuente del bloque
│   ├── index.js                       # Registro del bloque con i18n
│   ├── edit.js                        # Componente editor con i18n
│   └── save.js                        # Componente save con i18n
├── meu-primeiro-block.php             # Archivo PHP del plugin con configuración i18n
├── block.json                         # Metadatos del bloque con textdomain
└── package.json                       # Scripts npm para flujo de trabajo i18n
```

### Scripts NPM

El `package.json` incluye estos scripts de gestión i18n:

```json
{
  "scripts": {
    "i18n:pot": "wp i18n make-pot . languages/meu-primeiro-block.pot --exclude=node_modules,vendor,build",
    "i18n:po": "wp i18n make-po languages/meu-primeiro-block.pot languages/",
    "i18n:json": "wp i18n make-json languages/ --no-purge",
    "i18n:update": "npm run i18n:pot && npm run i18n:po && npm run i18n:json"
  }
}
```

## Añadiendo Cadenas Traducibles

### JavaScript (Editor de Bloques)

Usa la función `__()` de `@wordpress/i18n`:

```javascript
import { __ } from '@wordpress/i18n';

// Registro del bloque
registerBlockType('curso-gutenberg/meu-primeiro-block', {
    title: __('Meu Primeiro Block', 'meu-primeiro-block'),
    description: __(
        'Ejemplo de bloque escrito con estándar ESNext y soporte JSX – paso de construcción requerido.',
        'meu-primeiro-block'
    ),
    // ... otras propiedades
});

// En componentes React
export default function Edit() {
    return (
        <p {...useBlockProps()}>
            {__(
                'Meu Primeiro Block – Olá Curso Gutenberg !!!',
                'meu-primeiro-block'
            )}
        </p>
    );
}
```

### PHP (Lado del Servidor)

Usa las funciones i18n de WordPress:

```php
// Traducción simple
$message = __('Necesitas ejecutar `npm start` o `npm run build` primero.', 'meu-primeiro-block');

// Imprimir traducción
_e('Nombre del Plugin', 'meu-primeiro-block');

// Formas plurales
_n('Un elemento', '%d elementos', $count, 'meu-primeiro-block');

// Con contexto
_x('Entrada', 'sustantivo', 'meu-primeiro-block');
```

### Metadatos del Bloque (block.json)

La propiedad `textdomain` habilita la traducción:

```json
{
    "textdomain": "meu-primeiro-block",
    "title": "Meu Primeiro Block",
    "description": "Exemplo de bloco escrito com ESNext standard e suporte a JSX"
}
```

## Gestionando Archivos de Traducción

### 1. Generar Plantilla POT

Crear o actualizar la plantilla de traducción:

```bash
npm run i18n:pot
```

Esto escanea todos los archivos PHP y JavaScript por cadenas traducibles.

### 2. Actualizar Archivos PO

Actualizar archivos de traducción existentes con nuevas cadenas:

```bash
npm run i18n:po
```

### 3. Generar Archivos JSON

Crear archivos de traducción JavaScript:

```bash
npm run i18n:json
```

### 4. Flujo de Trabajo Completo

Actualizar todos los archivos de traducción de una vez:

```bash
npm run i18n:update
```

## Probando Traducciones

### Entorno WordPress Local

1. **Instalar el plugin** en WordPress
2. **Cambiar idioma** en Ajustes > General > Idioma del Sitio
3. **Probar en el editor de bloques**:
   - Buscar el bloque por nombre traducido
   - Verificar que la descripción del bloque esté traducida
   - Comprobar que todos los elementos de UI usen cadenas traducidas
4. **Probar en el frontend**:
   - Crear una entrada con el bloque
   - Ver la entrada para verificar traducciones del frontend

### Usando WordPress Playground

```bash
# Iniciar el playground
npm run playground:start

# En el admin de WordPress:
# 1. Ir a Ajustes > General
# 2. Cambiar "Idioma del Sitio" a tu idioma objetivo
# 3. Probar la funcionalidad del bloque
```

## Mejores Prácticas

### 1. Extracción de Cadenas

✅ **Haz:**
- Usa funciones i18n para todo texto dirigido al usuario
- Incluye contexto significativo cuando las cadenas puedan ser ambiguas
- Mantén las cadenas completas y legibles

❌ **No hagas:**
- Concatenar cadenas traducidas
- Incluir variables dentro de cadenas traducidas
- Romper oraciones en múltiples llamadas de traducción

### 2. Calidad de la Traducción

✅ **Haz:**
- Proporciona contexto para traductores
- Usa terminología consistente
- Considera diferencias culturales
- Prueba traducciones en contextos reales de UI

❌ **No hagas:**
- Usar herramientas de traducción automática sin revisión
- Ignorar limitaciones de espacio de la UI
- Olvidar traducir mensajes de error y texto de ayuda

## Recursos

### Documentación WordPress
- [Internacionalización de Plugins](https://developer.wordpress.org/plugins/internationalization/)
- [Internacionalización JavaScript](https://developer.wordpress.org/block-editor/how-to-guides/internationalization/)
- [Comandos WP-CLI i18n](https://developer.wordpress.org/cli/commands/i18n/)

### Herramientas
- [Poedit](https://poedit.net/) - Editor de traducción
- [WP-CLI](https://wp-cli.org/) - Interfaz de línea de comandos
- [GlotPress](https://glotpress.blog/) - Plataforma de traducción basada en web

### Comunidad
- [WordPress Polyglots](https://make.wordpress.org/polyglots/) - Equipo de traducción
- [Translate WordPress](https://translate.wordpress.org/) - Plataforma oficial de traducción

---

**Próximos Pasos:**
- Sigue esta guía para añadir nuevas cadenas traducibles
- Configura flujo de trabajo de traducción para nuevos idiomas
- Contribuye a la comunidad de traducción de WordPress