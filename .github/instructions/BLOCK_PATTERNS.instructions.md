# Block Development Patterns

## Block-First Philosophy

Every UI component should be evaluated as a potential block or block pattern. When adding functionality, always ask:

1. ✅ Can this be a block or block pattern?
2. ✅ Does an existing block meet the need?
3. ✅ Can a block binding for a core block be created and used instead?
4. ✅ Does it need Block Context for parent-child communication?
5. ✅ Should it provide context to potential child blocks?
6. ✅ Does it need frontend interactivity via Interactivity API?
7. ✅ Can it leverage existing Block Supports (colors, spacing, typography)?
8. ✅ Is there a need for custom block variations?
9. ✅ Is there visual parity between editor and frontend?
10. ✅ Does it follow progressive enhancement principles?

## Block Architecture

### Block Context API

Use for parent-child data flow without prop drilling:

**Parent block's block.json:**
```json
{
  "providesContext": {
    "curso-gutenberg/postId": "postId",
    "curso-gutenberg/datasetId": "selectedDataset"
  }
}
```

**Child block's block.json:**
```json
{
  "usesContext": ["curso-gutenberg/postId", "curso-gutenberg/datasetId"]
}
```

### Block Supports API

Leverage native block supports over custom implementations:
- **Spacing**: margin, padding
- **Colors**: text color, background color
- **Typography**: font size, line height
- **Dimensions**: width, height

Only add custom attributes when Block Supports don't cover the need.

### WordPress Interactivity API

For frontend state management, use directives:
- `data-wp-interactive`: Initialize interactive region
- `data-wp-context`: Define reactive state
- `data-wp-bind`: Bind attributes to state
- `data-wp-on`: Handle events

## Development Patterns

### Dynamic Blocks
Prefer dynamic blocks (render.php) for data-driven content:
- Use `render.php` for server-side rendering
- Set `save.js` to return `null`
- Share rendering logic where possible

### InnerBlocks
Use for composable block structures:
- Allow nesting of blocks
- Create complex layouts
- Maintain flexibility

### Block Variations
Implement variations over duplicate blocks:
- Reuse block logic
- Provide different configurations
- Reduce code duplication

### Progressive Enhancement
1. Start with static HTML base
2. Enhance with JavaScript via Interactivity API
3. Ensure functionality without JavaScript where possible

## Editor-Frontend Parity

Maintain 1:1 visual consistency between editor and frontend:
- Use same components where possible
- Share styles between edit.js and save.js/render.php
- Test both environments
- Verify responsive behavior

## Common Patterns

### Block Registration
```javascript
import { registerBlockType } from '@wordpress/blocks';

registerBlockType('curso-gutenberg/block-name', {
  edit: Edit,
  save: Save,
});
```

### Using Block Context
```javascript
import { useBlockProps, useBlockEditingMode } from '@wordpress/block-editor';

function Edit({ context }) {
  const { 'curso-gutenberg/postId': postId } = context;
  // Use context value
}
```

### InnerBlocks Pattern
```javascript
import { InnerBlocks } from '@wordpress/block-editor';

function Edit() {
  return (
    <div {...useBlockProps()}>
      <InnerBlocks />
    </div>
  );
}
```

### Dynamic Block Pattern
```php
// render.php
<div <?php echo get_block_wrapper_attributes(); ?>>
  <?php echo esc_html($attributes['content']); ?>
</div>
```

```javascript
// save.js
export default function save() {
  return null; // Dynamic rendering
}
```

## Performance Considerations

- Optimize for readability while maintaining efficiency
- Use memoization for expensive computations
- Lazy load components when appropriate
- Minimize rerenders with proper dependency arrays

## Accessibility

- Implement ARIA roles and attributes as priority
- Ensure keyboard navigation
- Provide proper labels
- Test with screen readers

## Block Development Workflow

1. Define block in `block.json`
2. Create `edit.js` for editor component
3. Create `save.js` or `render.php` for output
4. Add styles in `style.scss` and `editor.scss`
5. Register block in `index.js`
6. Test in playground
7. Add Playwright tests
8. Update documentation (all three languages)
