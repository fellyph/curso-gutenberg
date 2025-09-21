# WordPress Gutenberg Block Development

This repository contains Gutenberg block development exercises and training materials. Follow WordPress Coding Standards with Gutenberg-specific patterns.

## Project Structure

- `/src`: Block source code (edit.js, save.js, style.scss, editor.scss)
- `/build`: Compiled assets
- `/docs`: Documentation with Portuguese and Spanish translations
- `/tests`: Playwright tests using @wp-playground/cli

## Core Principles

- **Block-first mindset**: Every UI component should be a block or block pattern
- **Editor-Frontend Parity**: Maintain 1:1 visual consistency
- **Progressive Enhancement**: Static HTML base, JavaScript enhancement via Interactivity API
- **Block Context API**: Use providesContext/usesContext for parent-child data flow

## Coding Standards

### CSS
- Use BEM-inspired naming: `package-directory__element--modifier`
- Prefix with package name to avoid collisions
- Separate styles: `style.scss` (frontend + editor), `editor.scss` (editor-only)
- Use `is-` prefix for state modifiers: `is-active`, `is-dismissible`

### JavaScript
- Use functional components with hooks
- Import organization: External → WordPress → Internal dependencies
- Prefer stable APIs over experimental ones
- Use ES6 template strings over concatenation
- Single quotes for strings, real apostrophes (') in user-facing text

### PHP
- Follow WordPress VIP coding standards
- Use proper namespacing and PSR-4 autoloading
- Include comprehensive docblocks

## Development Commands

```bash
npm run playground:start   # Start WordPress playground
npm run build              # Build production assets
npm run start              # Development with file watching
npm run format             # Format code
npm run lint:css           # Lint CSS/SCSS
npm run lint:php           # Lint PHP
```

## Block Development Checklist

1. Can this be a block or block pattern?
2. Does it need Block Context for parent-child communication?
3. Can it leverage existing Block Supports (colors, spacing, typography)?
4. Does it need frontend interactivity via Interactivity API?
5. Is there visual parity between editor and frontend?

## Testing

Write Playwright tests in `/tests` using `@wp-playground/cli`. Always test new functionality and keep tests updated.

## Important Notes

- Use the playground to verify changes
- Create tests for new functionality
- Translate documentation to Portuguese and Spanish
- Dynamic blocks need render.php, save.js returns null