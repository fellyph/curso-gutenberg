# Exercise 1: Container Block with Allowed Blocks

## Objective

Create a container block that only allows specific child blocks (paragraph and image), with a predefined template for structured content.

## What You'll Learn

- Basic usage of the `InnerBlocks` component
- Restricting allowed child blocks with `allowedBlocks`
- Creating block templates with `template`
- Template locking strategies with `templateLock`

## Exercise Structure

This exercise has two versions:

### Before (`/before` directory)
A simple static block that displays hardcoded content. This represents a starting point without InnerBlocks.

### After (`/after` directory)
The same block transformed into a container block using InnerBlocks with:
- Allowed blocks restriction (only paragraph and image)
- A template with pre-filled placeholder content
- Template locking to maintain structure

## Instructions

### Step 1: Examine the "Before" Version

1. Navigate to the `/before` directory
2. Review the files:
   - `block.json` - Block metadata
   - `edit.js` - Editor component (static content)
   - `save.js` - Frontend render (static content)
   - `style.scss` - Frontend and editor styles

3. Notice that the content is hardcoded and cannot be customized by users.

### Step 2: Study the "After" Version

1. Navigate to the `/after` directory
2. Compare the same files and note the changes:
   - `edit.js` now uses `InnerBlocks` with configuration
   - `save.js` uses `InnerBlocks.Content`
   - Template is defined with default blocks

### Step 3: Build Your Own

Try creating your own version following these steps:

1. Start with the "before" files as a base
2. Import `InnerBlocks` from `@wordpress/block-editor`
3. Replace static content with `<InnerBlocks />` in edit.js
4. Configure `allowedBlocks` to restrict to paragraph and image
5. Create a template with placeholder text
6. Add template locking if desired
7. Update save.js to use `InnerBlocks.Content`

### Step 4: Test Your Block

1. Build the block: `npm run build`
2. Start the playground: `npm run playground:start`
3. Create a new post and insert your container block
4. Try adding different block types - only paragraph and image should be allowed
5. Verify the template appears with placeholder content

## Key Concepts

### InnerBlocks Component

The `InnerBlocks` component provides an area where users can add nested blocks:

```javascript
import { InnerBlocks } from '@wordpress/block-editor';

<InnerBlocks />
```

### Allowed Blocks

Restrict which blocks can be inserted:

```javascript
const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/image' ];

<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
```

### Block Template

Pre-fill with default blocks:

```javascript
const TEMPLATE = [
    [ 'core/heading', { level: 2, placeholder: 'Enter title...' } ],
    [ 'core/paragraph', { placeholder: 'Write your content...' } ],
];

<InnerBlocks template={ TEMPLATE } />
```

### Template Locking

Control user modifications:

```javascript
// Lock all - users can only edit content, not add/remove/move blocks
<InnerBlocks template={ TEMPLATE } templateLock="all" />

// Lock insert - users can't add new blocks but can remove/move existing ones
<InnerBlocks template={ TEMPLATE } templateLock="insert" />
```

### Save Function

Always use `InnerBlocks.Content` in the save function:

```javascript
export default function save() {
    return (
        <div { ...useBlockProps.save() }>
            <InnerBlocks.Content />
        </div>
    );
}
```

## Expected Outcome

After completing this exercise, you should have:

- ✅ A functional container block using InnerBlocks
- ✅ Restriction to only paragraph and image child blocks
- ✅ A template that pre-fills with placeholder content
- ✅ Understanding of template locking options
- ✅ A block that saves and loads correctly

## Troubleshooting

### Block doesn't save content
- Make sure you're using `InnerBlocks.Content` (not `InnerBlocks`) in save.js

### Can't add blocks
- Check that your `allowedBlocks` array includes the block names you want
- Verify block names are correct (e.g., 'core/paragraph', not 'paragraph')

### Template doesn't appear
- Ensure the template array is properly formatted
- Check that block names in the template are valid

### Build errors
- Run `npm run build` and check for syntax errors
- Make sure all imports are correct

## Next Steps

After completing this exercise:

1. Experiment with different allowed blocks
2. Try different template configurations
3. Test various template locking options
4. Move on to Exercise 2 for advanced InnerBlocks usage

## Additional Resources

- [InnerBlocks Documentation](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#innerblocks)
- [Block Templates](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-templates/)
- [Core Block Reference](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/)
