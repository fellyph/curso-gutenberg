## WordPress Gutenberg Training
This is a repository with exercises from the WordPress Gutenberg Training. It's a Guterberg block, where the exercises are organized by branches:

- **Gutenberg Block**: The exercises involve over one block where the progress of the features are included on different branches
- **Block-based content and user interface components** using Gutenberg blocks for rich content creation

## Development commands

### Playground

The playground is a local development environment that allows you to develop and test blocks and plugins in a real WordPress environment. The playground is configured to automatically mount the plugins, themes, and private directories in the root of the repository.

```bash
npm run playground:start   # Start playground server
```

### Individual Plugin Development

Most plugins have their own package.json with these standard commands:

```bash
npm run build              # Build production assets
npm run start              # Start development with file watching
npm run format             # Format code
npm run lint:css           # Lint CSS/SCSS files
```

### Block Development

#### Core Block Architecture Principles

- **Block-first mindset**: Every UI component should be evaluated as a potential block or block pattern
- **Block Context API**: Use `providesContext`/`usesContext` in block.json for parent-child data flow between nested blocks (e.g., Query blocks providing post data to child blocks)
- **Block Supports API**: Leverage native block supports (spacing, colors, typography) over custom implementations for consistency
- **WordPress Interactivity API**: Use `data-wp-interactive`, `data-wp-context`, `data-wp-bind` directives for frontend state management
- **Editor-Frontend Parity**: Maintain 1:1 visual consistency between editor and frontend.

#### Block Development Patterns

- Prefer dynamic blocks (render.php) for data-driven content
- Use InnerBlocks for composable block structures
- Implement block variations over duplicate blocks
- Follow progressive enhancement: static HTML base, JavaScript enhancement via Interactivity API
- Share rendering logic between edit.js and save.js/render.php

### Block Context Patterns

When developing blocks that share data:

```php
// Parent block's block.json
{
  "providesContext": {
    "prc/postId": "postId",
    "curso-gutenberg/datasetId": "selectedDataset"
  }
}

// Child block's block.json
{
  "usesContext": ["curso-gutenberg/postId", "curso-gutenberg/datasetId"]
}
```

### Block-First Development Checklist

When implementing new features:

1. ✅ Can this be a block or block pattern?
2. ✅ Does an existing block meet the need?
3. ✅ Can a block binding for a core block be created and used instead?
4. ✅ Does it need Block Context for parent-child communication?
5. ✅ Should it provide context to potential child blocks?
6. ✅ Does it need frontend interactivity via Interactivity API?
7. ✅ Can it leverage existing Block Supports (colors, spacing, typography)? If not, what additional colors and styling attributes are needed?
8. ✅ Is there a need for custom block variations?
9. ✅ Is there visual parity between editor and frontend?
10. ✅ Does it follow progressive enhancement principles?

### Code Standards

- **PHP**: Follow WordPress VIP coding standards
- **JavaScript/TypeScript**: Use functional programming patterns, avoid classes
- **CSS**: Use SCSS with BEM methodology where applicable
- **Accessibility**: Implement ARIA roles and attributes as priority
- **Performance**: Optimize for readability while maintaining efficiency

### File Structure

Standard block structure in plugins:

```
/prc-{plugin-name}/
  /src/
      - block.json         # Metadata, attributes, provides/usesContext
      - index.js          # Block registration
      - edit.js           # Editor component
      - save.js           # Static markup (or null for dynamic)
      - render.php        # Server-side rendering
      - view.js           # Interactivity API frontend
      - style.scss        # Frontend + editor styles
      - editor.scss       # Editor-only styles
```
## Architecture Decisions

### Why Block-First?

- **Composability**: Blocks can be combined to create complex layouts
- **Reusability**: Block patterns and variations reduce code duplication
- **User Empowerment**: Editorial teams can build without developer intervention
- **Consistency**: Block Supports ensure design system adherence

### Context vs Props vs Attributes

- **Block Attributes**: User-configurable settings stored in post content
- **Block Context**: Parent-to-child data flow without prop drilling
- **Interactivity API Context**: Frontend reactive state management
- **PHP Context**: Server-side data passed via `render_callback`

## Testing Strategy

All modules should have tests in `/tests` directory using Playwright. Run tests with environment started:

```bash
npm run playground:start && npm run test
```

To create the tests with Playwright use the `@wp-playground/cli` package, with the method `runCLI`, for example:

```TypeScript
import { test, expect } from '@playwright/test';
import { runCLI, RunCLIArgs, RunCLIServer } from '@wp-playground/cli';

test.describe('set-wordpress-language', () => {
  let cliServer: RunCLIServer;

  test.afterEach(async () => {
    if (cliServer) {
      await cliServer.server.close();
    }
  });

  test('should set WordPress site language to Portuguese (Brazil)', async () => {
    const expectedLanguage = 'pt_BR';

    cliServer = await runCLI({
      command: 'server',
      blueprint: {
        steps: [
          {
            step: 'setSiteLanguage',
            language: 'pt_BR',
          },
        ],
      },
    } as RunCLIArgs);

    // Create a PHP file to check the site language
    await cliServer.playground.writeFile(
      '/wordpress/check-language.php',
      `<?php
            	require_once '/wordpress/wp-load.php';
            	echo get_locale();
            ?>`
    );

    const response = await cliServer.playground.request({
      url: '/check-language.php',
      method: 'GET',
    });

    expect(response.httpStatusCode).toBe(200);
    expect(response.text.trim()).toBe(expectedLanguage);
  });
});
```

## Common Gotchas for AI Agents

1. **Block Context ≠ Interactivity API Context**: Block Context is for editor/PHP data sharing, Interactivity API is for frontend state
2. **Dynamic blocks need render.php**: If using server-side rendering, save.js should return null

## Important Notes

- **Gutenberg Block-first approach** for content creation and function management. All new features should be implemented as blocks where possible.
- **Use the Playground to check changes** always use the playground to check if the playground is runing
- **Create tests for new fuctionalities** to validate the changes keep the tests updates
- **Translate the documentation** always when a document is included add a portuguese and spanish translation

