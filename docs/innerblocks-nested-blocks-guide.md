# InnerBlocks and Nested Blocks - Complete Guide

## In this article
- [Overview](#overview)
- [What are Nested Blocks?](#what-are-nested-blocks)
- [The InnerBlocks Component](#the-innerblocks-component)
- [Basic Usage](#basic-usage)
- [Allowed Blocks](#allowed-blocks)
- [Block Templates](#block-templates)
- [Template Locking](#template-locking)
- [Block Orientation](#block-orientation)
- [Default Block and Direct Insert](#default-block-and-direct-insert)
- [Block Relationships](#block-relationships)
- [useInnerBlocksProps Hook](#useinnerblocksprops-hook)
- [Exercises](#exercises)
- [Best Practices](#best-practices)
- [Additional Resources](#additional-resources)

## Overview

Nested blocks are one of the most powerful features of the WordPress block editor (Gutenberg). They allow you to create container blocks that can hold other blocks, enabling complex layouts and reusable patterns. This guide will teach you everything you need to know about creating blocks with nested content using the `InnerBlocks` component.

### What you'll learn

By completing this guide, you will master:

- **InnerBlocks Component**: Understanding and using the core component for nested blocks
- **Block Configuration**: Controlling which blocks can be inserted as children
- **Templates**: Pre-filling blocks with default content and locking structures
- **Block Relationships**: Defining parent-child and ancestor relationships
- **Advanced Patterns**: Using `useInnerBlocksProps` for custom layouts
- **Real-world Examples**: Building practical container blocks

## What are Nested Blocks?

Nested blocks are blocks that can contain other blocks as children. Common examples in WordPress core include:

- **Group Block**: A simple container for grouping blocks
- **Columns Block**: Contains column blocks that hold other blocks
- **Cover Block**: Contains blocks overlaid on an image or color
- **Query Loop**: Contains blocks that display post content

### Benefits of Nested Blocks

1. **Composability**: Build complex layouts from simple components
2. **Reusability**: Create patterns that can be reused across your site
3. **Flexibility**: Users can customize content while maintaining structure
4. **Consistency**: Enforce design systems through block relationships

## The InnerBlocks Component

The `InnerBlocks` component is the primary tool for creating nested blocks. It provides an area where users can add, remove, and arrange child blocks.

### Basic Import

```javascript
import { InnerBlocks } from '@wordpress/block-editor';
```

### Key Features

- **Block Insertion**: Provides UI for adding blocks
- **Block Management**: Allows users to select, move, and remove blocks
- **Content Persistence**: Automatically saves nested block content
- **Customization**: Supports extensive configuration options

## Basic Usage

Here's a minimal example of a container block using `InnerBlocks`:

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

**Important**: In the save function, always use `InnerBlocks.Content` (not just `InnerBlocks`) to render the saved content.

## Allowed Blocks

You can restrict which blocks users can insert as children using the `allowedBlocks` prop.

### Example: Only Paragraphs and Images

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

### Common Block Names

- `core/paragraph` - Paragraph block
- `core/heading` - Heading block
- `core/image` - Image block
- `core/list` - List block
- `core/quote` - Quote block
- `core/button` - Button block

### Allow All Blocks

If you don't specify `allowedBlocks`, users can insert any registered block.

## Block Templates

Templates allow you to pre-fill `InnerBlocks` with default blocks. This is useful for creating structured content patterns.

### Basic Template

```javascript
export default function Edit() {
    const blockProps = useBlockProps();
    const TEMPLATE = [
        [ 'core/heading', { level: 2, placeholder: 'Review Title' } ],
        [ 'core/image', { } ],
        [ 'core/paragraph', { placeholder: 'Write your review...' } ],
    ];
    
    return (
        <div { ...blockProps }>
            <InnerBlocks template={ TEMPLATE } />
        </div>
    );
}
```

### Template Structure

Each template item is an array with:
1. **Block name** (string): e.g., `'core/paragraph'`
2. **Attributes** (object): Block attributes to set
3. **Inner blocks** (array, optional): Nested template for that block

### Nested Template Example

```javascript
const TEMPLATE = [
    [ 'core/columns', {}, [
        [ 'core/column', {}, [
            [ 'core/image', {} ]
        ] ],
        [ 'core/column', {}, [
            [ 'core/paragraph', { placeholder: 'Description...' } ]
        ] ]
    ] ]
];
```

## Template Locking

Template locking controls whether users can add, remove, or move blocks within the template.

### Locking Options

```javascript
// No locking - users can modify everything (default)
<InnerBlocks template={ TEMPLATE } />

// Lock all modifications - users can only edit content
<InnerBlocks 
    template={ TEMPLATE }
    templateLock="all"
/>

// Lock insertion - prevent adding new blocks
<InnerBlocks 
    template={ TEMPLATE }
    templateLock="insert"
/>

// Lock structure - prevent removing blocks but allow reordering
<InnerBlocks 
    template={ TEMPLATE }
    templateLock={ false }
/>
```

### Lock Values

- `"all"` - Lock everything (no adding, removing, or moving blocks)
- `"insert"` - Lock adding new blocks (can remove and move existing)
- `false` or not set - No locking (full flexibility)

## Block Orientation

The `orientation` prop controls how child blocks are visually arranged in the editor.

```javascript
// Horizontal orientation (default for most blocks)
<InnerBlocks orientation="horizontal" />

// Vertical orientation
<InnerBlocks orientation="vertical" />
```

**Note**: This only affects the editor appearance, not the frontend display.

## Default Block and Direct Insert

Control what happens when users add content to empty `InnerBlocks`.

### Default Block

```javascript
// Set the default block type when inserting
<InnerBlocks 
    defaultBlock={ { name: 'core/paragraph' } }
/>
```

### Direct Insert

When `directInsert` is enabled, pressing Enter automatically inserts the default block without showing the block inserter.

```javascript
<InnerBlocks 
    defaultBlock={ { name: 'core/paragraph' } }
    directInsert={ true }
/>
```

This creates a more streamlined editing experience for content-heavy blocks.

## Block Relationships

Block relationships define the connection between blocks using block.json configuration.

### Parent Relationship

Specify which blocks can be parents of your block:

```json
{
    "name": "my-plugin/child-block",
    "parent": [ "my-plugin/parent-block" ]
}
```

This block can only be inserted inside the specified parent blocks.

### Ancestor Relationship

More flexible than `parent` - the block can be nested at any depth:

```json
{
    "name": "my-plugin/nested-block",
    "ancestor": [ "my-plugin/container-block" ]
}
```

### Providing Context to Children

Parent blocks can provide data to child blocks using the Block Context API:

```json
{
    "name": "my-plugin/parent-block",
    "providesContext": {
        "myPlugin/postId": "postId",
        "myPlugin/layout": "layoutType"
    }
}
```

### Consuming Context in Children

```json
{
    "name": "my-plugin/child-block",
    "usesContext": [ "myPlugin/postId", "myPlugin/layout" ]
}
```

Then access context in your Edit component:

```javascript
export default function Edit( { context } ) {
    const { 'myPlugin/postId': postId } = context;
    
    // Use the context data
    return (
        <div>Post ID: { postId }</div>
    );
}
```

## useInnerBlocksProps Hook

The `useInnerBlocksProps` hook provides more control over the structure and markup of inner blocks.

### Basic Usage

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

### With Custom Wrapper

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
            <h3>My Custom Header</h3>
            <div { ...innerBlocksProps } />
            <footer>My Custom Footer</footer>
        </div>
    );
}
```

### Parameters

1. **Props object** (optional): HTML attributes for the inner blocks wrapper
2. **Options object** (optional): InnerBlocks configuration (allowedBlocks, template, etc.)

### Benefits

- **Cleaner JSX**: Avoid wrapping InnerBlocks in additional divs
- **Better Integration**: Merge inner blocks seamlessly with custom markup
- **Consistent API**: Similar pattern to `useBlockProps`

## Exercises

This guide includes two hands-on exercises to practice nested blocks:

### Exercise 1: Container Block with Allowed Blocks

**Objective**: Create a container block that only allows paragraph and image blocks, with a predefined template.

**Topics Covered**:
- Basic InnerBlocks usage
- Allowed blocks configuration
- Block templates
- Template locking

**Location**: See `/exercises/innerblocks-exercise-1/` directory

### Exercise 2: Advanced InnerBlocks with Relationships

**Objective**: Build a review card system using useInnerBlocksProps and block relationships.

**Topics Covered**:
- useInnerBlocksProps hook
- Block relationships (parent/ancestor)
- Block context
- Custom wrapper markup

**Location**: See `/exercises/innerblocks-exercise-2/` directory

## Best Practices

### 1. Always Use InnerBlocks.Content in save()

```javascript
// ✅ Correct
export default function save() {
    return (
        <div { ...useBlockProps.save() }>
            <InnerBlocks.Content />
        </div>
    );
}

// ❌ Wrong
export default function save() {
    return (
        <div { ...useBlockProps.save() }>
            <InnerBlocks />
        </div>
    );
}
```

### 2. Consider User Experience

- Provide templates for structured content
- Use `allowedBlocks` to prevent inappropriate block types
- Lock templates when structure is critical
- Use `directInsert` for content-focused blocks

### 3. Think About Accessibility

```javascript
// Add ARIA labels for better accessibility
const innerBlocksProps = useInnerBlocksProps(
    { 
        className: 'my-inner-blocks',
        'aria-label': 'Container content area'
    }
);
```

### 4. Plan Block Relationships Carefully

- Use `parent` for strict parent-child relationships
- Use `ancestor` for more flexible nesting
- Document context keys clearly
- Keep context data minimal and relevant

### 5. Test Nested Structures

- Test with various child blocks
- Verify save/reload behavior
- Check editor performance with deep nesting
- Validate frontend rendering

## Additional Resources

### Official Documentation

- [WordPress Block Editor Handbook - Nested Blocks](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-templates/#nested-blocks)
- [InnerBlocks Component Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#innerblocks)
- [Block Context API](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/)
- [useBlockProps Hook](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops)

### Code Examples

- [WordPress Core Blocks](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src)
- [Group Block Implementation](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/group)
- [Columns Block Implementation](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/columns)

### Related Topics

- Block Patterns
- Block Variations
- Block Transforms
- Block Styles API

---

**Ready to practice?** Head to the exercises directory to build your own nested blocks!

For questions or suggestions about this guide, please open an issue in the repository.
