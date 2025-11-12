# Exercise 2: Advanced InnerBlocks with Relationships

## Objective

Build a review card system using the `useInnerBlocksProps` hook and block relationships (parent/ancestor). This exercise demonstrates advanced InnerBlocks patterns with custom markup and block context.

## What You'll Learn

- Using the `useInnerBlocksProps` hook for better markup control
- Defining block relationships with `parent` and `ancestor`
- Providing and consuming block context
- Integrating InnerBlocks with custom HTML structure
- Creating child blocks that depend on parent blocks

## Exercise Structure

This exercise has two versions:

### Before (`/before` directory)
A basic review card using standard InnerBlocks without advanced features. The structure is simple but less flexible.

### After (`/after` directory)
An enhanced review card system with:
- `useInnerBlocksProps` for cleaner markup integration
- Parent-child block relationships
- Block context to share data between blocks
- Custom wrapper elements alongside InnerBlocks
- A dedicated "review item" child block that only works within the review card

## Instructions

### Step 1: Examine the "Before" Version

1. Navigate to the `/before` directory
2. Review the review card block files:
   - `block.json` - Basic block metadata
   - `edit.js` - Uses standard InnerBlocks
   - `save.js` - Simple InnerBlocks.Content rendering

3. Notice the basic structure without custom wrappers or relationships.

### Step 2: Study the "After" Version

1. Navigate to the `/after` directory
2. Examine the enhanced review card system:
   - `review-card/` - Parent container block
     - `block.json` includes `providesContext`
     - `edit.js` uses `useInnerBlocksProps`
     - Custom header and footer alongside InnerBlocks
   - `review-item/` - Child block (optional)
     - `block.json` includes `parent` relationship
     - `edit.js` uses context from parent

### Step 3: Build Your Own

Try creating your own version:

1. Start with a simple InnerBlocks container
2. Add `useInnerBlocksProps` to integrate custom markup
3. Create a custom header or footer element
4. Define block context in block.json
5. Create a child block that uses the parent relationship
6. Implement context consumption in the child block

### Step 4: Test Your Blocks

1. Build the blocks: `npm run build`
2. Start the playground: `npm run playground:start`
3. Create a new post and insert your review card
4. Verify that custom markup appears
5. Try inserting the child block both inside and outside the parent
6. Confirm that the parent relationship is enforced

## Key Concepts

### useInnerBlocksProps Hook

The `useInnerBlocksProps` hook gives you more control over InnerBlocks markup:

```javascript
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Edit() {
    const blockProps = useBlockProps();
    const innerBlocksProps = useInnerBlocksProps(
        { className: 'my-inner-wrapper' },
        {
            allowedBlocks: [ 'core/paragraph' ],
            template: [ [ 'core/paragraph', {} ] ]
        }
    );
    
    return (
        <div { ...blockProps }>
            <header>Custom Header</header>
            <div { ...innerBlocksProps } />
            <footer>Custom Footer</footer>
        </div>
    );
}
```

### Block Relationships

Define parent-child relationships in block.json:

```json
{
    "name": "my-plugin/child-block",
    "parent": [ "my-plugin/parent-block" ]
}
```

This child block can only be inserted inside the specified parent.

For more flexible nesting, use `ancestor`:

```json
{
    "name": "my-plugin/child-block",
    "ancestor": [ "my-plugin/container-block" ]
}
```

### Block Context

Share data from parent to child blocks:

**Parent block.json:**
```json
{
    "name": "my-plugin/parent-block",
    "providesContext": {
        "myPlugin/cardId": "cardId",
        "myPlugin/theme": "colorTheme"
    },
    "attributes": {
        "cardId": {
            "type": "string"
        },
        "colorTheme": {
            "type": "string",
            "default": "light"
        }
    }
}
```

**Child block.json:**
```json
{
    "name": "my-plugin/child-block",
    "usesContext": [ "myPlugin/cardId", "myPlugin/theme" ]
}
```

**Child edit.js:**
```javascript
export default function Edit( { context } ) {
    const cardId = context[ 'myPlugin/cardId' ];
    const theme = context[ 'myPlugin/theme' ];
    
    return (
        <div className={ `theme-${ theme }` }>
            Card ID: { cardId }
        </div>
    );
}
```

### Combining useInnerBlocksProps with Context

```javascript
export default function Edit( { attributes, setAttributes } ) {
    const { cardId } = attributes;
    
    const blockProps = useBlockProps();
    const innerBlocksProps = useInnerBlocksProps(
        { className: 'review-card__content' },
        {
            allowedBlocks: [ 'my-plugin/review-item' ],
            template: [
                [ 'my-plugin/review-item', {} ]
            ]
        }
    );
    
    return (
        <div { ...blockProps }>
            <div className="review-card__header">
                <h3>Review Card #{cardId}</h3>
            </div>
            <div { ...innerBlocksProps } />
            <div className="review-card__footer">
                <small>End of review</small>
            </div>
        </div>
    );
}
```

## Expected Outcome

After completing this exercise, you should have:

- ✅ A review card block using useInnerBlocksProps
- ✅ Custom header/footer elements integrated with InnerBlocks
- ✅ A child block with parent relationship constraints
- ✅ Block context flowing from parent to child
- ✅ Understanding of when to use useInnerBlocksProps vs InnerBlocks
- ✅ A more sophisticated nested block system

## Troubleshooting

### useInnerBlocksProps not working
- Make sure you're spreading the returned props on a div element
- Check that you're importing it from '@wordpress/block-editor'

### Child block can be inserted anywhere
- Verify the `parent` or `ancestor` setting in block.json
- Ensure the parent block name matches exactly

### Context not available in child
- Check that parent's `providesContext` keys match child's `usesContext`
- Verify attribute names in parent match the context mapping
- Confirm parent has the attributes defined that provide context

### Custom markup not showing
- Ensure you're using `useInnerBlocksProps` correctly
- Check that you're spreading props on the right element
- Verify JSX structure is valid

## Next Steps

After completing this exercise:

1. Experiment with different context data types
2. Try creating multiple levels of nested blocks
3. Implement more complex parent-child interactions
4. Add dynamic behavior based on context
5. Explore block variations for your parent block

## Additional Resources

- [useInnerBlocksProps Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useinnerblocksprops)
- [Block Context API](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/)
- [Block Registration](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/)
- [WordPress Core Blocks Source](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src)
