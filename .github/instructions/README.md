# Copilot Instructions for curso-gutenberg

This directory contains instruction files that help GitHub Copilot understand how to work with this repository. Each file covers a specific aspect of development.

## Instruction Files

### [OVERVIEW.instructions.md](OVERVIEW.instructions.md)
Repository purpose, structure, and target audience. Start here to understand what this repository is about.

**Key topics:**
- Repository purpose and educational goals
- Technology stack
- Branch-based learning structure
- Target audience

### [DEVELOPMENT.instructions.md](DEVELOPMENT.instructions.md)
Development workflow, commands, and environment setup.

**Key topics:**
- Getting started guide
- npm scripts and commands
- WordPress Playground usage
- File structure and build process
- Development best practices

### [BLOCK_PATTERNS.instructions.md](BLOCK_PATTERNS.instructions.md)
WordPress Gutenberg block development patterns and architecture.

**Key topics:**
- Block-first philosophy
- Block Context API
- Block Supports API
- WordPress Interactivity API
- Common block patterns
- Editor-frontend parity

### [CODING_STANDARDS.instructions.md](CODING_STANDARDS.instructions.md)
Coding standards for CSS, JavaScript, and PHP.

**Key topics:**
- BEM naming conventions
- JavaScript functional patterns
- Import organization
- PHP WordPress VIP standards
- Block development checklist

### [TESTING.instructions.md](TESTING.instructions.md)
Testing strategy using Playwright and WordPress Playground.

**Key topics:**
- Playwright test patterns
- @wp-playground/cli usage
- Test structure and best practices
- When to write tests
- Debugging tests

### [TRANSLATIONS.instructions.md](TRANSLATIONS.instructions.md)
**CRITICAL:** Mandatory multilingual documentation requirements.

**Key topics:**
- Three-language requirement (EN, PT, ES)
- File naming conventions
- What to translate vs. what not to translate
- Translation workflow

### [SECURITY_BEST_PRACTICES.instructions.md](SECURITY_BEST_PRACTICES.instructions.md)
Security considerations and code quality best practices.

**Key topics:**
- Input validation and output escaping
- WordPress security functions
- Code quality patterns
- Accessibility requirements
- Performance optimization
- Git best practices

### [TROUBLESHOOTING.instructions.md](TROUBLESHOOTING.instructions.md)
Common issues, gotchas, and their solutions.

**Key topics:**
- Block Context vs Interactivity API confusion
- Build and compilation issues
- Testing problems
- Code standards fixes
- Quick troubleshooting guide

## How to Use These Instructions

### For GitHub Copilot
These files provide context about:
- What this repository is for
- How to develop blocks correctly
- What patterns to follow
- What mistakes to avoid
- When tests are needed
- Translation requirements

### For Developers
These files serve as:
- Quick reference guides
- Development standards documentation
- Troubleshooting resources
- Best practices compilation

## Important Notes

1. **Translation is Mandatory**: All documentation must be in English, Portuguese, and Spanish
2. **Block-First Approach**: Always evaluate if something should be a block
3. **Test in Playground**: Always verify changes in WordPress Playground
4. **Maintain Parity**: Editor and frontend must look identical
5. **Write Tests**: Add Playwright tests for new functionality

## Quick Start Checklist

When working on this repository:

- [ ] Read OVERVIEW to understand the repository
- [ ] Review DEVELOPMENT for workflow
- [ ] Check BLOCK_PATTERNS for block development
- [ ] Follow CODING_STANDARDS for code style
- [ ] Write tests following TESTING guidelines
- [ ] Create translations per TRANSLATIONS requirements
- [ ] Review SECURITY_BEST_PRACTICES
- [ ] Use TROUBLESHOOTING when issues arise

## Contributing

When adding new instruction files:
1. Use `.instructions.md` suffix
2. Start with a clear title (# heading)
3. Organize with ## subheadings
4. Provide code examples where helpful
5. Update this README to reference the new file

## Related Files

- **AGENTS.md** (root): Comprehensive development documentation
- **docs/**: User-facing documentation (multilingual)
- **README.md** (root): Project overview and setup

---

**Note:** These instruction files are optimized for GitHub Copilot but also serve as useful documentation for human developers.
