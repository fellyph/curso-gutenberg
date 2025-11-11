# Security and Best Practices

## Security Considerations

### Input Validation
- Always sanitize user input in PHP
- Use WordPress escaping functions
- Validate and sanitize in JavaScript before sending to server

### Output Escaping
Use appropriate WordPress escaping functions:
```php
esc_html()        // For HTML content
esc_attr()        // For HTML attributes
esc_url()         // For URLs
wp_kses_post()    // For post content
```

### Nonces
Use WordPress nonces for form submissions and AJAX:
```php
wp_create_nonce('action-name')
wp_verify_nonce($nonce, 'action-name')
```

### SQL Queries
- Use WordPress wpdb methods with prepared statements
- Never concatenate user input into SQL queries
- Use WP_Query when possible instead of direct SQL

### File Operations
- Validate file uploads
- Check file types and sizes
- Use WordPress upload handlers
- Never trust client-side validation alone

## Code Quality Best Practices

### PHP

#### Namespacing
```php
namespace CursoGutenberg\Blocks;
```

#### Type Hints
```php
function process_data(array $data): string {
  // Implementation
}
```

#### Docblocks
```php
/**
 * Process block data.
 *
 * @param array $data Block data to process.
 * @return string Processed output.
 */
function process_data(array $data): string {
  // Implementation
}
```

### JavaScript

#### Functional Components
```javascript
// Preferred
function MyComponent({ attribute }) {
  return <div>{attribute}</div>;
}

// Avoid
class MyComponent extends Component {
  // ...
}
```

#### Import Organization
```javascript
// 1. External dependencies
import { useState } from 'react';

// 2. WordPress dependencies
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

// 3. Internal dependencies
import './style.scss';
```

#### Hooks Rules
- Only call hooks at the top level
- Only call hooks from React functions
- Use dependency arrays correctly
- Prefer useMemo and useCallback for performance

### CSS/SCSS

#### BEM Naming
```scss
.curso-gutenberg-block {
  &__element {
    // Element styles
  }
  
  &--modifier {
    // Modifier styles
  }
  
  &.is-active {
    // State styles
  }
}
```

#### Avoid Global Styles
- Prefix all classes with package name
- Use scoped styles
- Avoid `!important` unless absolutely necessary

## Performance Best Practices

### Lazy Loading
```javascript
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

### Memoization
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
```

### Asset Optimization
- Minimize bundle size
- Use code splitting when appropriate
- Optimize images before committing
- Use SVG for icons when possible

## Accessibility Best Practices

### Semantic HTML
```html
<nav aria-label="Main navigation">
  <ul role="list">
    <li role="listitem">...</li>
  </ul>
</nav>
```

### ARIA Attributes
- Use proper ARIA roles
- Provide aria-label for non-text elements
- Use aria-describedby for additional context
- Implement aria-live for dynamic content

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Implement proper focus management
- Use tabindex appropriately (0 or -1, avoid positive values)
- Test with keyboard only

### Screen Reader Support
- Use visually-hidden class instead of display:none for screen-reader-only content
- Provide meaningful alt text for images
- Use proper heading hierarchy (h1, h2, h3)

## Git Best Practices

### Commit Messages
```
feat: Add new block variation
fix: Resolve editor-frontend parity issue
docs: Update translation guidelines
test: Add Playwright test for block rendering
```

Use conventional commits format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Test additions or changes
- `refactor:` Code refactoring
- `style:` Code style changes
- `chore:` Maintenance tasks

### Branch Strategy
- Work on feature branches
- Keep commits focused and atomic
- Test before pushing
- Follow the existing branch structure

## Dependencies

### Adding Dependencies
1. Check if the functionality exists in WordPress packages first
2. Evaluate package size and maintenance status
3. Prefer @wordpress packages over third-party when available
4. Document why the dependency is needed

### Updating Dependencies
```bash
npm run packages-update    # Update @wordpress packages
npm outdated              # Check for outdated packages
```

## Error Handling

### JavaScript
```javascript
try {
  // Risky operation
} catch (error) {
  console.error('Specific error message:', error);
  // Graceful fallback
}
```

### PHP
```php
if (is_wp_error($result)) {
  error_log('Error message: ' . $result->get_error_message());
  return false;
}
```

## Code Review Checklist

Before submitting code:
- [ ] Linters pass (`npm run lint:js`, `npm run lint:css`)
- [ ] Build succeeds (`npm run build`)
- [ ] Tests pass (`npm run test`)
- [ ] Tested in playground
- [ ] No console errors
- [ ] Editor-frontend parity maintained
- [ ] Accessibility verified
- [ ] Documentation updated (all three languages)
- [ ] No security vulnerabilities introduced
- [ ] Performance impact considered

## Common Mistakes to Avoid

1. **Don't** use inline styles - use SCSS
2. **Don't** use var - use const or let
3. **Don't** ignore linting errors - fix them
4. **Don't** skip translations - always provide all three languages
5. **Don't** bypass security - sanitize and escape
6. **Don't** ignore accessibility - it's a priority
7. **Don't** commit build artifacts - they're generated
8. **Don't** use class components - use functional components
9. **Don't** skip testing - write Playwright tests
10. **Don't** break editor-frontend parity - maintain consistency
