# Development Workflow

## Getting Started

1. Clone the repository
2. Run `npm install` to install dependencies
3. Use WordPress Playground for local development

## Development Commands

### Primary Commands

```bash
npm run playground:start   # Start WordPress Playground server
npm run build              # Build production assets
npm run start              # Start development with hot reloading
npm run format:js          # Format JavaScript code
npm run lint:css           # Lint SCSS/CSS files
npm run lint:js            # Lint JavaScript files
```

### Testing Commands

```bash
npm run test               # Run Playwright tests
npm run test:ui            # Run Playwright tests with UI
```

## WordPress Playground

The repository uses WordPress Playground (`@wp-playground/cli`) for local development:
- Automatically mounts plugins, themes, and private directories
- Provides a real WordPress environment without complex setup
- Configured via `blueprints.json` file
- Run with `npm run playground:start`

## File Structure

Standard block structure:
```
/
  /src/               # Block source code
    - edit.js         # Editor component
    - save.js         # Save function (static markup)
    - index.js        # Block registration
    - style.scss      # Frontend + editor styles
    - editor.scss     # Editor-only styles
  /build/             # Compiled assets (generated)
  /docs/              # Documentation (EN, PT, ES)
  /tests/             # Playwright tests
  block.json          # Block metadata
  *.php               # PHP entry point
```

## Build Process

- Uses `@wordpress/scripts` for building and bundling
- Source files in `/src` are compiled to `/build`
- SCSS is compiled to CSS
- JavaScript is transpiled and bundled
- Assets are optimized for production with `npm run build`

## Development Best Practices

1. **Always use the playground** to verify changes in a real WordPress environment
2. **Run linters** before committing code
3. **Build frequently** to catch errors early
4. **Test interactively** using the playground
5. **Document in three languages** (EN, PT, ES) when adding documentation

## Common Tasks

### Adding a New Block Feature
1. Modify source files in `/src`
2. Run `npm run start` for live development
3. Test in playground with `npm run playground:start`
4. Add tests in `/tests`
5. Update documentation in `/docs` (all three languages)

### Debugging
1. Use browser DevTools with the playground
2. Check build output for compilation errors
3. Review console for runtime errors
4. Use `@wordpress/scripts` error messages for guidance

### Making Changes
- Keep changes minimal and focused
- Follow the block-first approach
- Maintain editor-frontend parity
- Test thoroughly in the playground
