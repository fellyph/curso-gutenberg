# Translation Guidelines - Meu Primeiro Block

This directory contains translation files for the "Meu Primeiro Block" Gutenberg block plugin.

## File Structure

```
languages/
├── meu-primeiro-block.pot           # Template file (for translators)
├── meu-primeiro-block-en_US.po      # English translation source
├── meu-primeiro-block-en_US-hash.json # English JSON for JavaScript
├── meu-primeiro-block-es_ES.po      # Spanish translation source  
├── meu-primeiro-block-es_ES-hash.json # Spanish JSON for JavaScript
└── README.md                        # This file
```

## Translation Process

### For Developers Adding New Strings

1. **Use i18n functions** in your code:
   - PHP: `__('String', 'meu-primeiro-block')`, `_e('String', 'meu-primeiro-block')`
   - JavaScript: `__('String', 'meu-primeiro-block')`

2. **Update translation files**:
   ```bash
   npm run i18n:pot   # Generate new POT template
   npm run i18n:po    # Update PO files  
   npm run i18n:json  # Generate JSON files for JavaScript
   ```

3. **Update translations** in .po files for each language

### For Translators

1. **Open the .po file** for your language (e.g., `meu-primeiro-block-es_ES.po`)
2. **Translate the msgstr entries** - keep msgid unchanged
3. **Maintain context** - consider the UI context when translating
4. **Test your translations** in a WordPress environment
5. **Submit via pull request**

## Language-Specific Guidelines

### English (en_US)
- Use clear, concise language
- Follow WordPress UI conventions
- Maintain technical accuracy

### Spanish (es_ES)  
- Use formal register for UI elements
- Maintain WordPress terminology consistency
- Consider regional variations when appropriate

## String Context Guidelines

| String Type | Guidelines |
|-------------|------------|
| **Plugin Name** | Usually keep original or translate literally |
| **Block Names** | Should be descriptive and clear |
| **UI Labels** | Keep short, use standard UI terminology |
| **Descriptions** | Can be more detailed, explain functionality |
| **Error Messages** | Be clear about the problem and solution |

## Testing Translations

1. **Install the plugin** in a WordPress environment
2. **Change WordPress language** in Settings > General
3. **Check block editor** - verify block name and description
4. **Test block functionality** - ensure UI elements are translated
5. **Check frontend display** - verify saved content translations

## Cultural Considerations

- **Date/Time formats** - Follow local conventions
- **Number formats** - Use appropriate decimal separators
- **Currency** - Not applicable for this plugin
- **Cultural references** - Adapt when necessary for local audience

## Common Translation Mistakes

- ❌ **Changing placeholders** - Don't translate `%s`, `{0}`, etc.
- ❌ **Breaking HTML** - Preserve HTML tags and structure
- ❌ **Wrong context** - Consider where the string appears in the UI
- ❌ **Inconsistent terminology** - Use the same terms throughout

## Contributing

1. Fork the repository
2. Create a feature branch for your translation
3. Update the appropriate .po file
4. Test your translation locally
5. Submit a pull request with description of changes

## Support

If you need help with translations:
- Check WordPress Translator Handbook
- Join WordPress Polyglots team
- Ask in the plugin's GitHub issues