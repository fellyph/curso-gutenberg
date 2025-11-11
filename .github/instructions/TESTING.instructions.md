# Testing Strategy

## Testing Framework

This repository uses **Playwright** with **@wp-playground/cli** for end-to-end testing in a real WordPress environment.

## Test Location

All tests are located in the `/tests` directory.

## Running Tests

```bash
npm run test               # Run all tests headless
npm run test:ui            # Run tests with Playwright UI
npm run playground:start   # Start playground before manual testing
```

## Test Pattern

Tests use the WordPress Playground CLI to create isolated WordPress instances:

```typescript
import { test, expect } from '@playwright/test';
import { runCLI, RunCLIArgs, RunCLIServer } from '@wp-playground/cli';

test.describe('feature-name', () => {
  let cliServer: RunCLIServer;

  test.afterEach(async () => {
    if (cliServer) {
      await cliServer.server.close();
    }
  });

  test('should do something', async () => {
    cliServer = await runCLI({
      command: 'server',
      blueprint: {
        steps: [
          // Configuration steps
        ],
      },
    } as RunCLIArgs);

    // Test implementation
  });
});
```

## Testing Best Practices

### Always Test New Functionality
- Create tests for all new features
- Update tests when modifying existing features
- Keep tests up to date with code changes

### Test Structure
1. **Setup**: Create playground instance with necessary configuration
2. **Action**: Perform the operation being tested
3. **Assert**: Verify expected outcomes
4. **Cleanup**: Close the server in afterEach hook

### Common Test Patterns

#### Testing WordPress Configuration
```typescript
await cliServer.playground.writeFile(
  '/wordpress/check-setting.php',
  `<?php
    require_once '/wordpress/wp-load.php';
    echo get_option('setting_name');
  ?>`
);

const response = await cliServer.playground.request({
  url: '/check-setting.php',
  method: 'GET',
});

expect(response.httpStatusCode).toBe(200);
expect(response.text.trim()).toBe('expected_value');
```

#### Testing Block Rendering
- Use playground to render blocks
- Verify HTML output
- Check for proper attributes and classes
- Validate accessibility

### When to Write Tests

Write tests for:
- New block features
- Configuration changes
- API integrations
- Complex logic
- Bug fixes (regression tests)

### When Not to Write Tests

Skip tests for:
- Pure documentation changes
- Minor text updates
- Styling-only changes (unless testing specific CSS classes)

## Test Maintenance

- Run tests before committing changes
- Update tests when changing functionality
- Remove or update obsolete tests
- Keep test descriptions clear and descriptive

## Debugging Tests

1. Use `npm run test:ui` for interactive debugging
2. Add console.logs in test code
3. Check playground logs
4. Verify blueprint configuration
5. Test manually in playground first

## Important Notes

- Tests run in isolated WordPress instances
- Each test gets a fresh environment
- Always clean up servers in afterEach
- Tests should be independent and not rely on shared state
