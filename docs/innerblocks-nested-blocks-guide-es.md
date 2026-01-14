# InnerBlocks y Bloques Anidados - Guía Completa

## En este artículo
- [Descripción General](#descripción-general)
- [¿Qué son los Bloques Anidados?](#qué-son-los-bloques-anidados)
- [El Componente InnerBlocks](#el-componente-innerblocks)
- [Uso Básico](#uso-básico)
- [Bloques Permitidos](#bloques-permitidos)
- [Plantillas de Bloques](#plantillas-de-bloques)
- [Bloqueo de Plantilla](#bloqueo-de-plantilla)
- [Orientación de Bloques](#orientación-de-bloques)
- [Bloque Predeterminado e Inserción Directa](#bloque-predeterminado-e-inserción-directa)
- [Relaciones de Bloques](#relaciones-de-bloques)
- [Hook useInnerBlocksProps](#hook-useinnerblocksprops)
- [Ejercicios](#ejercicios)
- [Mejores Prácticas](#mejores-prácticas)
- [Recursos Adicionales](#recursos-adicionales)

## Descripción General

Los bloques anidados son una de las características más poderosas del editor de bloques de WordPress (Gutenberg). Permiten crear bloques contenedores que pueden contener otros bloques, habilitando diseños complejos y patrones reutilizables. Esta guía te enseñará todo lo que necesitas saber sobre la creación de bloques con contenido anidado usando el componente `InnerBlocks`.

### Lo que aprenderás

Al completar esta guía, dominarás:

- **Componente InnerBlocks**: Comprensión y uso del componente principal para bloques anidados
- **Configuración de Bloques**: Control de qué bloques pueden insertarse como hijos
- **Plantillas**: Pre-llenado de bloques con contenido predeterminado y bloqueo de estructuras
- **Relaciones de Bloques**: Definición de relaciones padre-hijo y ancestro
- **Patrones Avanzados**: Uso de `useInnerBlocksProps` para diseños personalizados
- **Ejemplos del Mundo Real**: Construcción de bloques contenedores prácticos

## ¿Qué son los Bloques Anidados?

Los bloques anidados son bloques que pueden contener otros bloques como hijos. Ejemplos comunes en el núcleo de WordPress incluyen:

- **Bloque de Grupo**: Un contenedor simple para agrupar bloques
- **Bloque de Columnas**: Contiene bloques de columna que contienen otros bloques
- **Bloque de Portada**: Contiene bloques superpuestos en una imagen o color
- **Bucle de Consulta**: Contiene bloques que muestran contenido de publicaciones

### Beneficios de los Bloques Anidados

1. **Composición**: Construye diseños complejos a partir de componentes simples
2. **Reutilización**: Crea patrones que pueden reutilizarse en todo tu sitio
3. **Flexibilidad**: Los usuarios pueden personalizar el contenido manteniendo la estructura
4. **Consistencia**: Aplica sistemas de diseño a través de relaciones de bloques

## El Componente InnerBlocks

El componente `InnerBlocks` es la herramienta principal para crear bloques anidados. Proporciona un área donde los usuarios pueden agregar, eliminar y organizar bloques hijos.

### Importación Básica

```javascript
import { InnerBlocks } from '@wordpress/block-editor';
```

### Características Principales

- **Inserción de Bloques**: Proporciona interfaz para agregar bloques
- **Gestión de Bloques**: Permite a los usuarios seleccionar, mover y eliminar bloques
- **Persistencia de Contenido**: Guarda automáticamente el contenido de bloques anidados
- **Personalización**: Soporta opciones de configuración extensivas

## Uso Básico

Aquí hay un ejemplo mínimo de un bloque contenedor usando `InnerBlocks`:

### edit.js

```javascript
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
    const blockProps = useBlockProps();
    
    return (
        <div { ...blockProps }>
            <InnerBlocks />
        </div>
    );
}
```

### save.js

```javascript
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
    const blockProps = useBlockProps.save();
    
    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
}
```

**Importante**: En la función save, siempre usa `InnerBlocks.Content` (no solo `InnerBlocks`) para renderizar el contenido guardado.

## Bloques Permitidos

Puedes restringir qué bloques los usuarios pueden insertar como hijos usando la prop `allowedBlocks`.

### Ejemplo: Solo Párrafos e Imágenes

```javascript
export default function Edit() {
    const blockProps = useBlockProps();
    const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/image' ];
    
    return (
        <div { ...blockProps }>
            <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
        </div>
    );
}
```

### Nombres de Bloques Comunes

- `core/paragraph` - Bloque de párrafo
- `core/heading` - Bloque de encabezado
- `core/image` - Bloque de imagen
- `core/list` - Bloque de lista
- `core/quote` - Bloque de cita
- `core/button` - Bloque de botón

### Permitir Todos los Bloques

Si no especificas `allowedBlocks`, los usuarios pueden insertar cualquier bloque registrado.

## Plantillas de Bloques

Las plantillas permiten pre-llenar `InnerBlocks` con bloques predeterminados. Esto es útil para crear patrones de contenido estructurado.

### Plantilla Básica

```javascript
export default function Edit() {
    const blockProps = useBlockProps();
    const TEMPLATE = [
        [ 'core/heading', { level: 2, placeholder: 'Título de la Reseña' } ],
        [ 'core/image', { } ],
        [ 'core/paragraph', { placeholder: 'Escribe tu reseña...' } ],
    ];
    
    return (
        <div { ...blockProps }>
            <InnerBlocks template={ TEMPLATE } />
        </div>
    );
}
```

### Estructura de la Plantilla

Cada elemento de la plantilla es un array con:
1. **Nombre del bloque** (string): ej: `'core/paragraph'`
2. **Atributos** (objeto): Atributos del bloque a establecer
3. **Bloques internos** (array, opcional): Plantilla anidada para ese bloque

### Ejemplo de Plantilla Anidada

```javascript
const TEMPLATE = [
    [ 'core/columns', {}, [
        [ 'core/column', {}, [
            [ 'core/image', {} ]
        ] ],
        [ 'core/column', {}, [
            [ 'core/paragraph', { placeholder: 'Descripción...' } ]
        ] ]
    ] ]
];
```

## Bloqueo de Plantilla

El bloqueo de plantilla controla si los usuarios pueden agregar, eliminar o mover bloques dentro de la plantilla.

### Opciones de Bloqueo

```javascript
// Sin bloqueo - los usuarios pueden modificar todo (predeterminado)
<InnerBlocks template={ TEMPLATE } />

// Bloquear todas las modificaciones - los usuarios solo pueden editar contenido
<InnerBlocks 
    template={ TEMPLATE }
    templateLock="all"
/>

// Bloquear inserción - prevenir agregar nuevos bloques
<InnerBlocks 
    template={ TEMPLATE }
    templateLock="insert"
/>

// Bloquear estructura - prevenir eliminar bloques pero permitir reordenar
<InnerBlocks 
    template={ TEMPLATE }
    templateLock={ false }
/>
```

### Valores de Bloqueo

- `"all"` - Bloquea todo (sin agregar, eliminar o mover bloques)
- `"insert"` - Bloquea agregar nuevos bloques (puede eliminar y mover existentes)
- `false` o no definido - Sin bloqueo (flexibilidad total)

## Orientación de Bloques

La prop `orientation` controla cómo los bloques hijos se organizan visualmente en el editor.

```javascript
// Orientación horizontal (predeterminada para la mayoría de los bloques)
<InnerBlocks orientation="horizontal" />

// Orientación vertical
<InnerBlocks orientation="vertical" />
```

**Nota**: Esto solo afecta la apariencia del editor, no la visualización en el frontend.

## Bloque Predeterminado e Inserción Directa

Controla qué sucede cuando los usuarios agregan contenido a `InnerBlocks` vacíos.

### Bloque Predeterminado

```javascript
// Define el tipo de bloque predeterminado al insertar
<InnerBlocks 
    defaultBlock={ { name: 'core/paragraph' } }
/>
```

### Inserción Directa

Cuando `directInsert` está habilitado, presionar Enter inserta automáticamente el bloque predeterminado sin mostrar el insertador de bloques.

```javascript
<InnerBlocks 
    defaultBlock={ { name: 'core/paragraph' } }
    directInsert={ true }
/>
```

Esto crea una experiencia de edición más simplificada para bloques con mucho contenido.

## Relaciones de Bloques

Las relaciones de bloques definen la conexión entre bloques usando la configuración block.json.

### Relación Parent

Especifica qué bloques pueden ser padres de tu bloque:

```json
{
    "name": "my-plugin/child-block",
    "parent": [ "my-plugin/parent-block" ]
}
```

Este bloque solo puede insertarse dentro de los bloques padre especificados.

### Relación Ancestor

Más flexible que `parent` - el bloque puede anidarse a cualquier profundidad:

```json
{
    "name": "my-plugin/nested-block",
    "ancestor": [ "my-plugin/container-block" ]
}
```

### Proporcionando Contexto a los Hijos

Los bloques padre pueden proporcionar datos a los bloques hijos usando la API de Contexto de Bloques:

```json
{
    "name": "my-plugin/parent-block",
    "providesContext": {
        "myPlugin/postId": "postId",
        "myPlugin/layout": "layoutType"
    }
}
```

### Consumiendo Contexto en Hijos

```json
{
    "name": "my-plugin/child-block",
    "usesContext": [ "myPlugin/postId", "myPlugin/layout" ]
}
```

Luego accede al contexto en tu componente Edit:

```javascript
export default function Edit( { context } ) {
    const { 'myPlugin/postId': postId } = context;
    
    // Usa los datos del contexto
    return (
        <div>ID de Publicación: { postId }</div>
    );
}
```

## Hook useInnerBlocksProps

El hook `useInnerBlocksProps` proporciona más control sobre la estructura y marcado de los bloques internos.

### Uso Básico

```javascript
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Edit() {
    const blockProps = useBlockProps();
    const innerBlocksProps = useInnerBlocksProps();
    
    return (
        <div { ...blockProps }>
            <div { ...innerBlocksProps } />
        </div>
    );
}
```

### Con Wrapper Personalizado

```javascript
export default function Edit() {
    const blockProps = useBlockProps();
    const innerBlocksProps = useInnerBlocksProps(
        { className: 'my-inner-blocks-wrapper' },
        {
            allowedBlocks: [ 'core/paragraph', 'core/heading' ],
            template: [
                [ 'core/heading', { level: 2 } ],
                [ 'core/paragraph', {} ]
            ]
        }
    );
    
    return (
        <div { ...blockProps }>
            <h3>Mi Encabezado Personalizado</h3>
            <div { ...innerBlocksProps } />
            <footer>Mi Pie de Página Personalizado</footer>
        </div>
    );
}
```

### Parámetros

1. **Objeto de props** (opcional): Atributos HTML para el wrapper de los bloques internos
2. **Objeto de opciones** (opcional): Configuración de InnerBlocks (allowedBlocks, template, etc.)

### Beneficios

- **JSX Más Limpio**: Evita envolver InnerBlocks en divs adicionales
- **Mejor Integración**: Fusiona bloques internos perfectamente con marcado personalizado
- **API Consistente**: Patrón similar a `useBlockProps`

## Ejercicios

Esta guía incluye dos ejercicios prácticos para practicar bloques anidados:

### Ejercicio 1: Bloque Contenedor con Bloques Permitidos

**Objetivo**: Crear un bloque contenedor que solo permite bloques de párrafo e imagen, con una plantilla predefinida.

**Temas Cubiertos**:
- Uso básico de InnerBlocks
- Configuración de bloques permitidos
- Plantillas de bloques
- Bloqueo de plantilla

**Ubicación**: Ver directorio `/exercises/innerblocks-exercise-1/`

### Ejercicio 2: InnerBlocks Avanzado con Relaciones

**Objetivo**: Construir un sistema de tarjeta de reseña usando useInnerBlocksProps y relaciones de bloques.

**Temas Cubiertos**:
- Hook useInnerBlocksProps
- Relaciones de bloques (parent/ancestor)
- Contexto de bloques
- Marcado de wrapper personalizado

**Ubicación**: Ver directorio `/exercises/innerblocks-exercise-2/`

## Mejores Prácticas

### 1. Siempre Usa InnerBlocks.Content en save()

```javascript
// ✅ Correcto
export default function save() {
    return (
        <div { ...useBlockProps.save() }>
            <InnerBlocks.Content />
        </div>
    );
}

// ❌ Incorrecto
export default function save() {
    return (
        <div { ...useBlockProps.save() }>
            <InnerBlocks />
        </div>
    );
}
```

### 2. Considera la Experiencia del Usuario

- Proporciona plantillas para contenido estructurado
- Usa `allowedBlocks` para prevenir tipos de bloques inapropiados
- Bloquea plantillas cuando la estructura sea crítica
- Usa `directInsert` para bloques enfocados en contenido

### 3. Piensa en Accesibilidad

```javascript
// Agrega etiquetas ARIA para mejor accesibilidad
const innerBlocksProps = useInnerBlocksProps(
    { 
        className: 'my-inner-blocks',
        'aria-label': 'Área de contenido del contenedor'
    }
);
```

### 4. Planifica las Relaciones de Bloques Cuidadosamente

- Usa `parent` para relaciones padre-hijo estrictas
- Usa `ancestor` para anidamiento más flexible
- Documenta las claves de contexto claramente
- Mantén los datos de contexto mínimos y relevantes

### 5. Prueba Estructuras Anidadas

- Prueba con varios bloques hijos
- Verifica el comportamiento de guardar/recargar
- Verifica el rendimiento del editor con anidamiento profundo
- Valida la renderización en el frontend

## Recursos Adicionales

### Documentación Oficial

- [Manual del Editor de Bloques de WordPress - Bloques Anidados](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-templates/#nested-blocks)
- [Referencia del Componente InnerBlocks](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#innerblocks)
- [API de Contexto de Bloques](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/)
- [Hook useBlockProps](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops)

### Ejemplos de Código

- [Bloques del Núcleo de WordPress](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src)
- [Implementación del Bloque Group](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/group)
- [Implementación del Bloque Columns](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/columns)

### Temas Relacionados

- Patrones de Bloques
- Variaciones de Bloques
- Transformaciones de Bloques
- API de Estilos de Bloques

---

**¿Listo para practicar?** ¡Ve al directorio de ejercicios para construir tus propios bloques anidados!

Para preguntas o sugerencias sobre esta guía, por favor abre un issue en el repositorio.
