# Translation Requirements

## Mandatory Multilingual Support

All documentation in this repository **must** be available in three languages:
- English (EN)
- Portuguese (PT)
- Spanish (ES)

## When to Translate

Translate whenever you:
- Create new documentation files
- Update existing documentation
- Add README files
- Write user-facing guides
- Create tutorial content

## What Needs Translation

### Always Translate
- README files
- Documentation in `/docs`
- Tutorial content
- User guides
- Code comments that explain concepts (not implementation details)

### Do Not Translate
- Code (variable names, function names, etc.)
- Configuration files
- File paths and URLs
- Technical error messages in code
- Implementation comments (standard // single-line comments)

## Translation File Naming

Use language suffixes for translated files:

```
wp-scripts-mastery-guide.md       # English (default)
wp-scripts-mastery-guide-pt.md    # Portuguese
wp-scripts-mastery-guide-es.md    # Spanish
```

## Example Structure

If you create a new documentation file:

```
/docs/
  my-new-guide.md        # English version
  my-new-guide-pt.md     # Portuguese version
  my-new-guide-es.md     # Spanish version
```

## Translation Quality

- Use clear, natural language for each locale
- Maintain technical accuracy across all versions
- Keep formatting consistent across translations
- Preserve code examples (don't translate code)
- Translate comments in code examples

## Existing Documentation

The repository already has multilingual documentation in `/docs`:
- `wp-scripts-mastery-guide.md` (EN)
- `wp-scripts-mastery-guide-pt.md` (PT)
- `wp-scripts-mastery-guide-es.md` (ES)

Follow this pattern for all new documentation.

## Translation Workflow

1. Write documentation in English first
2. Create Portuguese translation
3. Create Spanish translation
4. Verify all versions have the same structure
5. Ensure code examples are identical across versions

## Important Notes

- This is a learning repository for Portuguese and Spanish-speaking developers
- Complete multilingual support is not optional - it's required
- Missing translations block completion of documentation tasks
- Use professional, educational tone appropriate for technical learning
