# Internationalization (i18n) Guide - Curso Gutenberg

This guide explains how to implement and manage internationalization in WordPress Gutenberg blocks, specifically for the "Meu Primeiro Block" project.

## 📚 Table of Contents

1. [Overview](#overview)
2. [Project Setup](#project-setup)
3. [Adding Translatable Strings](#adding-translatable-strings)
4. [Managing Translation Files](#managing-translation-files)
5. [Testing Translations](#testing-translations)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

## Overview

Internationalization (i18n) allows your WordPress blocks to be translated into multiple languages, making them accessible to a global audience. This project supports:

- **Portuguese (Brazil)** - Original language
- **English (US)** - Primary international language  
- **Spanish (Spain)** - Secondary international language

## Project Setup

### File Structure

The complete i18n setup includes:

```
curso-gutenberg/
├── languages/                          # Translation files directory
│   ├── meu-primeiro-block.pot          # Template file
│   ├── meu-primeiro-block-en_US.po     # English translations
│   ├── meu-primeiro-block-en_US-hash.json # English for JavaScript
│   ├── meu-primeiro-block-es_ES.po     # Spanish translations
│   ├── meu-primeiro-block-es_ES-hash.json # Spanish for JavaScript
│   └── README.md                       # Translation guidelines
├── src/                                # Block source code
│   ├── index.js                       # Block registration with i18n
│   ├── edit.js                        # Editor component with i18n
│   └── save.js                        # Save component with i18n
├── meu-primeiro-block.php             # PHP plugin file with i18n setup
├── block.json                         # Block metadata with textdomain
└── package.json                       # npm scripts for i18n workflow
```

### NPM Scripts

The `package.json` includes these i18n management scripts:

```json
{
  "scripts": {
    "i18n:pot": "wp i18n make-pot . languages/meu-primeiro-block.pot --exclude=node_modules,vendor,build",
    "i18n:po": "wp i18n make-po languages/meu-primeiro-block.pot languages/",
    "i18n:json": "wp i18n make-json languages/ --no-purge",
    "i18n:update": "npm run i18n:pot && npm run i18n:po && npm run i18n:json"
  }
}
```

## Adding Translatable Strings

### JavaScript (Block Editor)

Use the `__()` function from `@wordpress/i18n`:

```javascript
import { __ } from '@wordpress/i18n';

// Block registration
registerBlockType('curso-gutenberg/meu-primeiro-block', {
    title: __('Meu Primeiro Block', 'meu-primeiro-block'),
    description: __(
        'Example block written with ESNext standard and JSX support – build step required.',
        'meu-primeiro-block'
    ),
    // ... other properties
});

// In React components
export default function Edit() {
    return (
        <p {...useBlockProps()}>
            {__(
                'Meu Primeiro Block – Olá Curso Gutenberg !!!',
                'meu-primeiro-block'
            )}
        </p>
    );
}
```

### PHP (Server-side)

Use WordPress i18n functions:

```php
// Simple translation
$message = __('You need to run `npm start` or `npm run build` first.', 'meu-primeiro-block');

// Echo translation
_e('Plugin Name', 'meu-primeiro-block');

// Plural forms
_n('One item', '%d items', $count, 'meu-primeiro-block');

// With context
_x('Post', 'noun', 'meu-primeiro-block');
```

### Block Metadata (block.json)

The `textdomain` property enables translation:

```json
{
    "textdomain": "meu-primeiro-block",
    "title": "Meu Primeiro Block",
    "description": "Exemplo de bloco escrito com ESNext standard e suporte a JSX"
}
```

## Managing Translation Files

### 1. Generate POT Template

Create or update the translation template:

```bash
npm run i18n:pot
```

This scans all PHP and JavaScript files for translatable strings.

### 2. Update PO Files

Update existing translation files with new strings:

```bash
npm run i18n:po
```

### 3. Generate JSON Files

Create JavaScript translation files:

```bash
npm run i18n:json
```

### 4. Complete Workflow

Update all translation files at once:

```bash
npm run i18n:update
```

### Manual Translation Process

1. **Open the .po file** for your target language
2. **Find untranslated strings** (empty `msgstr ""`)
3. **Add translations**:
   ```
   msgid "Meu Primeiro Block"
   msgstr "My First Block"
   ```
4. **Save the file**
5. **Generate JSON files** for JavaScript

## Testing Translations

### Local WordPress Environment

1. **Install the plugin** in WordPress
2. **Change language** in Settings > General > Site Language
3. **Test in block editor**:
   - Search for the block by translated name
   - Verify block description is translated
   - Check all UI elements use translated strings
4. **Test on frontend**:
   - Create a post with the block
   - View the post to verify frontend translations

### Using WordPress Playground

```bash
# Start the playground
npm run playground:start

# In WordPress admin:
# 1. Go to Settings > General
# 2. Change "Site Language" to your target language
# 3. Test the block functionality
```

### Automated Testing

Create Playwright tests for different languages:

```javascript
test('should display English translations', async ({ page }) => {
    // Set WordPress language to English
    await page.goto('/wp-admin/options-general.php');
    await page.selectOption('#WPLANG', 'en_US');
    await page.click('#submit');
    
    // Test block in editor
    await page.goto('/wp-admin/post-new.php');
    await page.click('[aria-label="Add block"]');
    await page.fill('[placeholder="Search for blocks and patterns"]', 'My First Block');
    
    // Verify English translation appears
    await expect(page.locator('text=My First Block')).toBeVisible();
});
```

## Best Practices

### 1. String Extraction

✅ **Do:**
- Use i18n functions for all user-facing text
- Include meaningful context when strings could be ambiguous
- Keep strings complete and readable

❌ **Don't:**
- Concatenate translated strings
- Include variables within translated strings
- Break sentences across multiple translation calls

### 2. Translation Quality

✅ **Do:**
- Provide context for translators
- Use consistent terminology
- Consider cultural differences
- Test translations in real UI contexts

❌ **Don't:**
- Use automatic translation tools without review
- Ignore UI space constraints
- Forget to translate error messages and help text

### 3. File Management

✅ **Do:**
- Keep translation files in version control
- Use meaningful commit messages for translation updates
- Document the translation process for contributors

❌ **Don't:**
- Edit JSON files manually (regenerate them)
- Ignore POT file updates
- Forget to build after translation changes

## Troubleshooting

### Common Issues

#### 1. Translations Not Loading

**Problem:** Strings appear in original language despite translations existing.

**Solutions:**
- Check textdomain matches in all files
- Verify `wp_set_script_translations()` includes correct path
- Ensure JSON files have correct hash in filename
- Clear any caches (object cache, opcache)

#### 2. JavaScript Translations Missing

**Problem:** PHP translations work, but JavaScript strings remain untranslated.

**Solutions:**
- Verify JSON files exist and are named correctly
- Check `wp_set_script_translations()` is called after script registration
- Ensure build process includes latest translations
- Verify script handle matches in registration and translation setup

#### 3. Build Process Issues

**Problem:** Translation files are not generated or updated.

**Solutions:**
- Install WP-CLI with i18n command: `composer require wp-cli/i18n-command`
- Check internet connection for WP-CLI block metadata
- Verify exclude patterns in npm scripts
- Run commands individually to isolate issues

### Debugging Steps

1. **Enable WordPress Debug Mode:**
   ```php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   ```

2. **Check Translation Loading:**
   ```php
   // Add to functions.php temporarily
   add_action('init', function() {
       $loaded = load_textdomain('meu-primeiro-block', '/path/to/languages/meu-primeiro-block-en_US.mo');
       error_log('Textdomain loaded: ' . ($loaded ? 'Yes' : 'No'));
   });
   ```

3. **Verify Script Registration:**
   ```javascript
   // Check browser console for translation errors
   console.log(wp.i18n.__('Test string', 'meu-primeiro-block'));
   ```

## Contributing Translations

### For New Languages

1. **Copy the POT file** to create new PO file: `meu-primeiro-block-{locale}.po`
2. **Translate all strings** in the PO file
3. **Generate JSON file** using `npm run i18n:json`
4. **Test thoroughly** in WordPress environment
5. **Submit pull request** with both PO and JSON files

### For Existing Languages

1. **Update PO file** with new translations
2. **Run `npm run i18n:json`** to regenerate JSON
3. **Test changes** locally
4. **Submit pull request** with clear description of changes

## Resources

### WordPress Documentation
- [Plugin Internationalization](https://developer.wordpress.org/plugins/internationalization/)
- [JavaScript Internationalization](https://developer.wordpress.org/block-editor/how-to-guides/internationalization/)
- [WP-CLI i18n Commands](https://developer.wordpress.org/cli/commands/i18n/)

### Tools
- [Poedit](https://poedit.net/) - Translation editor
- [WP-CLI](https://wp-cli.org/) - Command line interface
- [GlotPress](https://glotpress.blog/) - Web-based translation platform

### Community
- [WordPress Polyglots](https://make.wordpress.org/polyglots/) - Translation team
- [Translate WordPress](https://translate.wordpress.org/) - Official translation platform

---

**Next Steps:**
- Follow this guide to add new translatable strings
- Set up translation workflow for new languages
- Contribute to WordPress translation community