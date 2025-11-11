# Common Gotchas and Troubleshooting

## Block Context vs Interactivity API Context

**They are different!**
- **Block Context**: Editor/PHP data sharing between parent and child blocks
- **Interactivity API Context**: Frontend reactive state management

Don't confuse them - they serve different purposes.

## Dynamic Blocks and save.js

If using server-side rendering with `render.php`:
- `save.js` **must** return `null`
- Don't try to render static HTML in save.js for dynamic blocks
- All rendering happens in render.php

## WordPress Playground Specifics

### Mounting
- Plugins, themes, and private directories auto-mount from repository root
- No manual configuration needed for most cases
- Check `blueprints.json` for custom mounting

### Persistence
- Playground state is temporary by default
- Data resets when server stops
- Use blueprints for reproducible setups

### File Paths
- WordPress is at `/wordpress/` in playground
- Plugin files mount automatically
- Use correct paths when writing test files

## Build Issues

### Assets Not Updating
1. Stop development server
2. Clear `/build` directory
3. Run `npm run build` or `npm run start`
4. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)

### SCSS Compilation Errors
- Check for missing semicolons
- Verify BEM naming doesn't break selectors
- Ensure @wordpress imports are correct

### JavaScript Errors
- Check import paths
- Verify WordPress dependencies are available
- Use @wordpress packages for WordPress functionality

## Testing Issues

### Playground Server Won't Start
1. Check if port is already in use
2. Kill existing playground processes
3. Verify `blueprints.json` is valid JSON
4. Check for conflicting npm scripts

### Tests Failing
1. Verify playground server is running for manual tests
2. Check test isolation - each test should be independent
3. Ensure cleanup in afterEach hooks
4. Review console output for specific errors

### Test Timeouts
- Increase timeout for slow operations
- Check network connectivity
- Verify WordPress installation completes

## Code Standards Issues

### Linting Failures
```bash
npm run format:js        # Auto-fix JavaScript formatting
npm run lint:css -- --fix # Auto-fix CSS issues
```

### WordPress Standards
- Use WordPress VIP standards for PHP
- Follow WordPress JavaScript guidelines
- Use @wordpress packages for WordPress APIs

## Translation Issues

### Missing Translations
- All documentation must have EN, PT, and ES versions
- Check file naming: `file.md`, `file-pt.md`, `file-es.md`
- Don't translate code, only content

### Inconsistent Translations
- Keep structure identical across all language versions
- Maintain same headings and sections
- Preserve code examples without translation

## Block Registration Issues

### Block Not Appearing
1. Check `block.json` is valid JSON
2. Verify block is registered in `index.js`
3. Ensure PHP file loads block correctly
4. Clear browser cache and rebuild

### Block Attributes Not Working
- Check attribute definitions in `block.json`
- Verify attribute names match in edit.js and save.js
- Check for typos in attribute access

## Editor-Frontend Parity Issues

### Styles Don't Match
- Check if styles are in correct file (style.scss vs editor.scss)
- Verify class names are identical
- Test in playground, not just in browser dev tools

### Functionality Works in Editor but Not Frontend
- Check if JavaScript is frontend-ready
- Verify Interactivity API setup for dynamic behavior
- Ensure dependencies are enqueued properly

## Performance Issues

### Slow Build Times
- Check for large dependencies
- Verify webpack isn't processing unnecessary files
- Consider splitting large components

### Slow Playground
- Reduce number of plugins in blueprint
- Clear playground cache
- Check system resources

## Quick Fixes

### "Module not found" Error
```bash
npm install              # Reinstall dependencies
npm run build           # Rebuild assets
```

### "Block is not registered" Error
1. Check block name matches in all files
2. Verify block.json is in correct location
3. Ensure PHP file is loaded by WordPress

### Styles Not Applying
1. Check class names match between edit and save
2. Verify SCSS is compiling (check /build)
3. Clear browser cache
4. Check selector specificity

## Getting Help

When stuck:
1. Check build output for specific errors
2. Review browser console for runtime errors
3. Test in playground to isolate issues
4. Check documentation in `/docs`
5. Review AGENTS.md for repository-specific guidance

## Prevention Tips

- Run linters before committing
- Test in playground frequently
- Keep dependencies updated with `npm run packages-update`
- Follow the block development checklist
- Maintain editor-frontend parity from the start
