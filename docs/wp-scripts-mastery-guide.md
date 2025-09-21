# wp-scripts Mastery - Student Guide

## In this article
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Exercise Setup](#exercise-setup)
- [Phase 1: Build Process Fundamentals](#phase-1-build-process-fundamentals)
- [Phase 2: Code Quality Implementation](#phase-2-code-quality-implementation)
- [Phase 3: Testing Integration](#phase-3-testing-integration)
- [Phase 4: Advanced Configurations](#phase-4-advanced-configurations)
- [Final Project](#final-project)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources)

This comprehensive guide will teach you everything you need to know about `@wordpress/scripts` (wp-scripts) for professional WordPress Gutenberg block development. You'll learn build processes, code quality tools, testing strategies, and advanced configurations used in real-world projects.

## Overview

### What is wp-scripts?

The `@wordpress/scripts` package is a collection of reusable scripts and configuration files that standardize and simplify the development process of WordPress projects requiring a JavaScript build step.

### What you'll learn

By completing this guide, you will master:

- **Build Process Fundamentals**: ESNext/JSX compilation, bundling, and asset management
- **Code Quality Tools**: ESLint, Prettier, and automated formatting
- **Testing Strategies**: Unit tests with Jest and E2E tests with Playwright
- **Advanced Configuration**: Custom webpack setups and production optimization
- **Professional Workflow**: Industry-standard development practices

### Key wp-scripts features

- **Compilation**: Converts modern JavaScript (ESNext and JSX) to browser-compatible code
- **Bundling**: Combines multiple files into optimized bundles using webpack
- **Code Linting**: Ensures code quality with ESLint
- **Code Formatting**: Maintains consistent styling with Prettier
- **Sass Compilation**: Transforms SCSS/Sass to CSS
- **Testing**: Integrated Jest for unit tests and Playwright for E2E tests
- **Minification**: Optimizes code for production deployment

## Prerequisites

Before starting this exercise, ensure you have:

- **Node.js 18+** installed on your system
- **npm** or **yarn** package manager
- **Git** for version control
- **Code editor** (VS Code recommended)
- **Basic JavaScript/React knowledge**
- **WordPress blocks fundamentals** (recommended)

### Verify your setup

Run these commands to verify your environment:

```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show 8.0.0 or higher
git --version     # Should show git version info
```

## Exercise Setup

### Step 1: Create the exercise branch

```bash
# Navigate to your project directory
cd /path/to/curso-gutenberg

# Create and switch to the exercise branch
git checkout -b feature/wp-scripts-advanced-exercise

# Verify you're on the new branch
git branch
```

### Step 2: Create the directory structure

```bash
# Create the exercise directory structure
mkdir -p exercises/wp-scripts-mastery/src/{blocks/{basic-block,advanced-block,dynamic-block},components,utils,styles,tests/{unit,e2e}}
mkdir -p exercises/wp-scripts-mastery/docs

# Navigate to the exercise directory
cd exercises/wp-scripts-mastery
```

### Step 3: Initialize the exercise project

Create the enhanced `package.json`:

```bash
# Create package.json with enhanced wp-scripts configuration
cat > package.json << 'EOF'
{
  "name": "wp-scripts-mastery-exercise",
  "version": "1.0.0",
  "description": "Advanced wp-scripts training exercise for WordPress Gutenberg development",
  "author": "Your Name",
  "license": "GPL-2.0-or-later",
  "main": "build/index.js",
  "scripts": {
    "build": "wp-scripts build",
    "build:production": "NODE_ENV=production wp-scripts build",
    "start": "wp-scripts start",
    "start:hot": "wp-scripts start --hot",
    "format": "wp-scripts format",
    "format:js": "wp-scripts format-js",
    "lint:css": "wp-scripts lint-style",
    "lint:js": "wp-scripts lint-js",
    "lint:pkg-json": "wp-scripts lint-pkg-json",
    "test": "wp-scripts test-unit-js",
    "test:e2e": "wp-scripts test-e2e",
    "test:unit": "wp-scripts test-unit-js",
    "test:watch": "wp-scripts test-unit-js --watch",
    "test:coverage": "wp-scripts test-unit-js --coverage",
    "playground:start": "npx @wp-playground/cli@latest server --auto-mount --login",
    "build:analyze": "npm run build -- --analyze"
  },
  "dependencies": {
    "@wordpress/scripts": "^30.24.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@wp-playground/cli": "^0.1.0",
    "webpack-bundle-analyzer": "^4.9.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5"
  }
}
EOF
```

### Step 4: Install dependencies

```bash
# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

---

## Phase 1: Build Process Fundamentals

### Exercise 1.1: Understanding the Build Pipeline

**Objective**: Learn how wp-scripts transforms your source code from development to production.

#### Task 1: Examine the build process

1. **Create a basic entry file**:

```bash
# Create the main entry point
cat > src/index.js << 'EOF'
/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';

console.log('wp-scripts is working!');

// Simple block registration for testing
registerBlockType('curso-gutenberg/test-block', {
    title: __('Test Block', 'curso-gutenberg'),
    category: 'widgets',
    edit: () => <div>Hello wp-scripts!</div>,
    save: () => <div>Hello wp-scripts!</div>,
});
EOF
```

2. **Create basic styles**:

```bash
# Create SCSS file
cat > src/style.scss << 'EOF'
.wp-block-curso-gutenberg-test-block {
    background: #f0f0f0;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:hover {
        background: #e0e0e0;
    }
}
EOF
```

3. **Run the build process**:

```bash
# Start development build with watching
npm run start
```

**Observe**: Notice the files created in the `build/` directory:
- `index.js` - Compiled JavaScript
- `index.css` - Compiled CSS from SCSS
- `index.asset.php` - WordPress dependencies array

4. **Make changes and observe hot reloading**:

Edit `src/index.js`, change the console message, and watch the automatic rebuild.

#### Task 2: Production vs Development builds

1. **Create a production build**:

```bash
# Stop the development server (Ctrl+C)
# Run production build
npm run build:production
```

2. **Compare the outputs**:

```bash
# Check file sizes
ls -la build/

# Examine the minified production code
head -n 10 build/index.js
```

**Key Learning Points**:
- Development builds include source maps and are not minified
- Production builds are optimized and minified
- The `.asset.php` file contains WordPress dependencies for proper enqueueing

### Exercise 1.2: Multiple Entry Points

**Objective**: Configure wp-scripts to handle multiple blocks with separate entry points.

#### Task 1: Create custom webpack configuration

```bash
# Create webpack.config.js
cat > webpack.config.js << 'EOF'
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    
    // Multiple entry points for different blocks
    entry: {
        'basic-block': './src/blocks/basic-block/index.js',
        'advanced-block': './src/blocks/advanced-block/index.js',
        'main': './src/index.js'
    },

    // Custom resolve paths for easier imports
    resolve: {
        ...defaultConfig.resolve,
        alias: {
            ...defaultConfig.resolve.alias,
            '@components': path.resolve(__dirname, 'src/components'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        }
    }
};
EOF
```

#### Task 2: Create the basic block

1. **Create block metadata**:

```bash
# Create basic block directory and files
cat > src/blocks/basic-block/block.json << 'EOF'
{
    "apiVersion": 2,
    "name": "curso-gutenberg/basic-block",
    "title": "Basic Block Exercise",
    "category": "curso-gutenberg",
    "icon": "admin-tools",
    "description": "A basic block demonstrating wp-scripts fundamentals",
    "textdomain": "curso-gutenberg",
    "supports": {
        "html": false,
        "color": {
            "background": true,
            "text": true
        },
        "spacing": {
            "margin": true,
            "padding": true
        }
    },
    "attributes": {
        "content": {
            "type": "string",
            "default": "Hello from Basic Block!"
        },
        "alignment": {
            "type": "string",
            "default": "left"
        }
    },
    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style-index.css"
}
EOF
```

2. **Create the block registration**:

```bash
cat > src/blocks/basic-block/index.js << 'EOF'
/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import './style.scss';
import metadata from './block.json';

/**
 * Register the Basic Block
 */
registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: save,
});
EOF
```

3. **Create the Edit component**:

```bash
cat > src/blocks/basic-block/edit.js << 'EOF'
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { content, alignment } = attributes;
    const blockProps = useBlockProps({
        className: `has-text-align-${alignment}`,
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Settings', 'curso-gutenberg')}>
                    <SelectControl
                        label={__('Text Alignment', 'curso-gutenberg')}
                        value={alignment}
                        options={[
                            { label: __('Left', 'curso-gutenberg'), value: 'left' },
                            { label: __('Center', 'curso-gutenberg'), value: 'center' },
                            { label: __('Right', 'curso-gutenberg'), value: 'right' },
                        ]}
                        onChange={(value) => setAttributes({ alignment: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <RichText
                    tagName="p"
                    value={content}
                    onChange={(value) => setAttributes({ content: value })}
                    placeholder={__('Enter your text...', 'curso-gutenberg')}
                />
            </div>
        </>
    );
}
EOF
```

4. **Create the Save component**:

```bash
cat > src/blocks/basic-block/save.js << 'EOF'
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { content, alignment } = attributes;
    const blockProps = useBlockProps.save({
        className: `has-text-align-${alignment}`,
    });

    return (
        <div {...blockProps}>
            <RichText.Content tagName="p" value={content} />
        </div>
    );
}
EOF
```

5. **Create styles**:

```bash
# Editor styles
cat > src/blocks/basic-block/editor.scss << 'EOF'
.wp-block-curso-gutenberg-basic-block {
    border: 2px dashed #ccc;
    padding: 1rem;
    
    &.has-text-align-center {
        text-align: center;
    }
    
    &.has-text-align-right {
        text-align: right;
    }
}
EOF

# Frontend styles
cat > src/blocks/basic-block/style.scss << 'EOF'
.wp-block-curso-gutenberg-basic-block {
    padding: 1rem;
    border-radius: 4px;
    
    &.has-text-align-center {
        text-align: center;
    }
    
    &.has-text-align-right {
        text-align: right;
    }
}
EOF
```

#### Task 3: Test the multiple entry points

```bash
# Build with custom webpack config
npm run build

# Check the build output
ls -la build/
```

You should see separate files for each entry point:
- `basic-block.js` and `basic-block.css`
- `advanced-block.js` and `advanced-block.css`
- `main.js` and `main.css`

### Exercise 1.3: Advanced Sass Features

**Objective**: Implement advanced Sass features with variables, mixins, and imports.

#### Task 1: Create Sass architecture

```bash
# Create Sass variables
cat > src/styles/_variables.scss << 'EOF'
// Color palette
:root {
    --wp-exercise-primary: #0073aa;
    --wp-exercise-secondary: #005177;
    --wp-exercise-success: #46b450;
    --wp-exercise-warning: #ffb900;
    --wp-exercise-error: #d63638;
    --wp-exercise-text: #1e1e1e;
    --wp-exercise-background: #ffffff;
    --wp-exercise-border: #ddd;
}

// Sass variables for compilation
$primary-color: #0073aa;
$secondary-color: #005177;
$border-radius: 4px;
$spacing-unit: 1rem;
$transition-speed: 0.3s;

// Breakpoints
$breakpoint-mobile: 480px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
EOF

# Create Sass mixins
cat > src/styles/_mixins.scss << 'EOF'
// Button mixin
@mixin button-style($bg-color: $primary-color, $text-color: white) {
    background-color: $bg-color;
    color: $text-color;
    border: none;
    border-radius: $border-radius;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all $transition-speed ease;
    
    &:hover {
        background-color: darken($bg-color, 10%);
        transform: translateY(-1px);
    }
    
    &:active {
        transform: translateY(0);
    }
}

// Responsive breakpoint mixin
@mixin respond-to($breakpoint) {
    @if $breakpoint == mobile {
        @media (max-width: $breakpoint-mobile) {
            @content;
        }
    }
    @if $breakpoint == tablet {
        @media (max-width: $breakpoint-tablet) {
            @content;
        }
    }
    @if $breakpoint == desktop {
        @media (min-width: $breakpoint-desktop) {
            @content;
        }
    }
}

// Card component mixin
@mixin card-style {
    background: var(--wp-exercise-background);
    border: 1px solid var(--wp-exercise-border);
    border-radius: $border-radius;
    padding: $spacing-unit;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow $transition-speed ease;
    
    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
}
EOF
```

#### Task 2: Update block styles to use Sass features

```bash
# Update basic block styles
cat > src/blocks/basic-block/style.scss << 'EOF'
@import '../../styles/variables';
@import '../../styles/mixins';

.wp-block-curso-gutenberg-basic-block {
    @include card-style;
    
    p {
        margin: 0;
        color: var(--wp-exercise-text);
    }
    
    &.has-text-align-center {
        text-align: center;
    }
    
    &.has-text-align-right {
        text-align: right;
    }
    
    // Responsive adjustments
    @include respond-to(mobile) {
        padding: $spacing-unit * 0.5;
        font-size: 0.9rem;
    }
}
EOF
```

#### Task 3: Test Sass compilation

```bash
# Start development server
npm run start

# Make changes to variables and see them reflected
# Try changing the primary color in _variables.scss
```

**Key Learning Points**:
- Sass variables and CSS custom properties work together
- Mixins reduce code duplication
- Import system allows modular styling
- wp-scripts handles Sass compilation automatically

---

## Phase 2: Code Quality Implementation

### Exercise 2.1: ESLint Configuration

**Objective**: Set up comprehensive code linting for WordPress standards.

#### Task 1: Create custom ESLint configuration

```bash
# Create .eslintrc.js
cat > .eslintrc.js << 'EOF'
module.exports = {
    extends: [
        '@wordpress/eslint-config',
        '@wordpress/eslint-config/jsx-a11y'
    ],
    rules: {
        // Import rules
        'import/no-extraneous-dependencies': 'error',
        'import/no-unresolved': 'error',
        'import/order': ['error', {
            groups: [
                'builtin',
                'external',
                ['internal', 'parent', 'sibling', 'index']
            ],
            'newlines-between': 'always'
        }],
        
        // WordPress specific rules
        '@wordpress/no-unsafe-wp-apis': 'warn',
        '@wordpress/gutenberg-phase': 'error',
        '@wordpress/no-base-control-with-label-without-id': 'error',
        
        // General code quality
        'no-console': 'warn',
        'no-debugger': 'error',
        'prefer-const': 'error',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: require.resolve('@wordpress/scripts/config/webpack.config.js')
            }
        }
    },
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true
    },
    globals: {
        wp: 'readonly',
        wpApiSettings: 'readonly',
        window: 'readonly',
        document: 'readonly'
    }
};
EOF
```

#### Task 2: Test ESLint

```bash
# Run ESLint on your code
npm run lint:js

# Fix auto-fixable issues
npm run lint:js -- --fix
```

#### Task 3: Add deliberate linting errors and fix them

1. **Add errors to basic-block/edit.js**:

```javascript
// Add these problematic lines to see ESLint in action
console.log('This will trigger a warning');
const unusedVariable = 'This will trigger an error';
var oldStyleVariable = 'This should be const/let';
```

2. **Run linting and fix issues**:

```bash
npm run lint:js
npm run lint:js -- --fix
```

### Exercise 2.2: Prettier Configuration

**Objective**: Set up consistent code formatting across the project.

#### Task 1: Create Prettier configuration

```bash
# Create .prettierrc
cat > .prettierrc << 'EOF'
{
    "useTabs": true,
    "tabWidth": 4,
    "printWidth": 80,
    "singleQuote": true,
    "trailingComma": "es5",
    "bracketSpacing": true,
    "bracketSameLine": false,
    "arrowParens": "avoid",
    "endOfLine": "lf",
    "semi": true
}
EOF

# Create .prettierignore
cat > .prettierignore << 'EOF'
build/
node_modules/
vendor/
*.min.js
*.min.css
EOF
```

#### Task 2: Format your code

```bash
# Format all JavaScript files
npm run format:js

# Check what would be formatted
npm run format:js -- --check
```

#### Task 3: Set up editor integration

If using VS Code, create `.vscode/settings.json`:

```bash
mkdir -p .vscode
cat > .vscode/settings.json << 'EOF'
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
EOF
```

---

## Phase 3: Testing Integration

### Exercise 3.1: Unit Testing with Jest

**Objective**: Write comprehensive unit tests for block components.

#### Task 1: Set up Jest configuration

```bash
# Create jest.config.js
cat > jest.config.js << 'EOF'
const defaultConfig = require('@wordpress/scripts/config/jest-unit.config');

module.exports = {
    ...defaultConfig,
    
    // Test environment
    testEnvironment: 'jsdom',
    
    // Setup files
    setupFilesAfterEnv: [
        '<rootDir>/src/tests/setup.js'
    ],
    
    // Module name mapping for aliases
    moduleNameMapper: {
        ...defaultConfig.moduleNameMapper,
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    },
    
    // Coverage configuration
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/*.test.{js,jsx}',
        '!src/tests/**',
        '!src/**/index.js'
    ],
    
    // Coverage thresholds
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    
    // Test match patterns
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
        '<rootDir>/src/**/*.test.{js,jsx}'
    ]
};
EOF
```

#### Task 2: Create test setup file

```bash
# Create test setup
cat > src/tests/setup.js << 'EOF'
// Import Jest DOM matchers
import '@testing-library/jest-dom';

// Mock WordPress globals
global.wp = {
    i18n: {
        __: (text) => text,
        _x: (text) => text,
        _n: (single, plural, number) => number === 1 ? single : plural,
    },
    blocks: {
        registerBlockType: jest.fn(),
    },
    element: {
        createElement: jest.fn(),
        Fragment: 'Fragment',
    },
    components: {
        PanelBody: 'PanelBody',
        SelectControl: 'SelectControl',
    },
    blockEditor: {
        useBlockProps: () => ({ className: 'wp-block' }),
        RichText: 'RichText',
        InspectorControls: 'InspectorControls',
    },
};

// Mock console methods in tests
global.console = {
    ...console,
    // Uncomment to ignore a specific log level
    // log: jest.fn(),
    // debug: jest.fn(),
    // info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};
EOF
```

#### Task 3: Write unit tests for the basic block

```bash
# Create test directory
mkdir -p src/blocks/basic-block/__tests__

# Create unit test
cat > src/blocks/basic-block/__tests__/edit.test.js << 'EOF'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Edit from '../edit';

// Mock WordPress dependencies
jest.mock('@wordpress/i18n', () => ({
    __: (text) => text,
}));

jest.mock('@wordpress/block-editor', () => ({
    useBlockProps: () => ({ className: 'wp-block-basic-block' }),
    RichText: ({ value, placeholder, onChange, tagName }) => (
        <input
            data-testid="rich-text-input"
            value={value || ''}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    ),
    InspectorControls: ({ children }) => (
        <div data-testid="inspector-controls">{children}</div>
    ),
}));

jest.mock('@wordpress/components', () => ({
    PanelBody: ({ title, children }) => (
        <div data-testid="panel-body" title={title}>
            {children}
        </div>
    ),
    SelectControl: ({ label, value, onChange, options }) => (
        <select
            data-testid="select-control"
            aria-label={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    ),
}));

describe('BasicBlock Edit Component', () => {
    const defaultAttributes = {
        content: 'Test content',
        alignment: 'left',
    };

    const mockSetAttributes = jest.fn();

    beforeEach(() => {
        mockSetAttributes.mockClear();
    });

    test('renders without crashing', () => {
        render(
            <Edit
                attributes={defaultAttributes}
                setAttributes={mockSetAttributes}
            />
        );
    });

    test('displays the correct content', () => {
        render(
            <Edit
                attributes={defaultAttributes}
                setAttributes={mockSetAttributes}
            />
        );

        expect(screen.getByDisplayValue('Test content')).toBeInTheDocument();
    });

    test('renders inspector controls', () => {
        render(
            <Edit
                attributes={defaultAttributes}
                setAttributes={mockSetAttributes}
            />
        );

        expect(screen.getByTestId('inspector-controls')).toBeInTheDocument();
        expect(screen.getByTestId('panel-body')).toBeInTheDocument();
        expect(screen.getByTestId('select-control')).toBeInTheDocument();
    });

    test('calls setAttributes when content changes', () => {
        render(
            <Edit
                attributes={defaultAttributes}
                setAttributes={mockSetAttributes}
            />
        );

        const richTextInput = screen.getByTestId('rich-text-input');
        fireEvent.change(richTextInput, { target: { value: 'New content' } });

        expect(mockSetAttributes).toHaveBeenCalledWith({ content: 'New content' });
    });

    test('calls setAttributes when alignment changes', () => {
        render(
            <Edit
                attributes={defaultAttributes}
                setAttributes={mockSetAttributes}
            />
        );

        const selectControl = screen.getByTestId('select-control');
        fireEvent.change(selectControl, { target: { value: 'center' } });

        expect(mockSetAttributes).toHaveBeenCalledWith({ alignment: 'center' });
    });

    test('applies correct CSS class based on alignment', () => {
        const { container } = render(
            <Edit
                attributes={{ ...defaultAttributes, alignment: 'center' }}
                setAttributes={mockSetAttributes}
            />
        );

        expect(container.querySelector('.has-text-align-center')).toBeInTheDocument();
    });
});
EOF
```

#### Task 4: Run the tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test -- --testPathPattern=edit.test.js
```

### Exercise 3.2: Test Coverage Analysis

#### Task 1: Generate coverage reports

```bash
# Generate coverage report
npm run test:coverage

# Open coverage report in browser
open coverage/lcov-report/index.html
```

#### Task 2: Improve test coverage

Add more tests to achieve the 80% threshold:

```bash
# Create save component test
cat > src/blocks/basic-block/__tests__/save.test.js << 'EOF'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import save from '../save';

// Mock WordPress dependencies
jest.mock('@wordpress/block-editor', () => ({
    useBlockProps: {
        save: () => ({ className: 'wp-block-basic-block' }),
    },
    RichText: {
        Content: ({ tagName, value }) => {
            const Tag = tagName || 'div';
            return <Tag>{value}</Tag>;
        },
    },
}));

describe('BasicBlock Save Component', () => {
    const defaultAttributes = {
        content: 'Test content',
        alignment: 'left',
    };

    test('renders saved content correctly', () => {
        const { container } = render(save({ attributes: defaultAttributes }));
        
        expect(container.firstChild).toHaveClass('wp-block-basic-block');
        expect(container.firstChild).toHaveClass('has-text-align-left');
        expect(container).toHaveTextContent('Test content');
    });

    test('applies center alignment class', () => {
        const { container } = render(
            save({ attributes: { ...defaultAttributes, alignment: 'center' } })
        );
        
        expect(container.firstChild).toHaveClass('has-text-align-center');
    });

    test('applies right alignment class', () => {
        const { container } = render(
            save({ attributes: { ...defaultAttributes, alignment: 'right' } })
        );
        
        expect(container.firstChild).toHaveClass('has-text-align-right');
    });
});
EOF
```

---

## Phase 4: Advanced Configurations

### Exercise 4.1: Bundle Analysis

**Objective**: Analyze and optimize your webpack bundles.

#### Task 1: Generate bundle analysis

```bash
# Install bundle analyzer if not already installed
npm install --save-dev webpack-bundle-analyzer

# Generate bundle analysis
npm run build:analyze

# This will create a bundle-report.html file
open bundle-report.html
```

#### Task 2: Optimize bundle size

Update your webpack configuration to implement code splitting:

```bash
# Update webpack.config.js with optimization
cat > webpack.config.js << 'EOF'
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

// Check if we're in analyze mode
const isAnalyze = process.env.ANALYZE_BUNDLE === 'true';

module.exports = {
    ...defaultConfig,
    
    // Multiple entry points
    entry: {
        'basic-block': './src/blocks/basic-block/index.js',
        'advanced-block': './src/blocks/advanced-block/index.js',
        'main': './src/index.js'
    },

    // Custom resolve paths
    resolve: {
        ...defaultConfig.resolve,
        alias: {
            ...defaultConfig.resolve.alias,
            '@components': path.resolve(__dirname, 'src/components'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        }
    },

    // Enhanced plugins
    plugins: [
        ...defaultConfig.plugins,
        ...(isAnalyze ? [
            new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: 'bundle-report.html'
            })
        ] : [])
    ],

    // Advanced optimization
    optimization: {
        ...defaultConfig.optimization,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // WordPress packages
                wordpress: {
                    test: /[\\/]node_modules[\\/]@wordpress[\\/]/,
                    name: 'wordpress-vendor',
                    chunks: 'all',
                    priority: 20
                },
                // Other vendor libraries
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: 10
                },
                // Common code between blocks
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 5,
                    reuseExistingChunk: true
                }
            }
        }
    },

    // Performance hints
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};
EOF
```

### Exercise 4.2: Environment-Specific Configuration

#### Task 1: Create environment-specific builds

```bash
# Create production-specific configuration
cat > webpack.prod.js << 'EOF'
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        ...common.optimization,
        minimize: true,
        sideEffects: false,
    },
    performance: {
        hints: 'error',
        maxEntrypointSize: 250000,
        maxAssetSize: 250000
    }
});
EOF

# Create development-specific configuration
cat > webpack.dev.js << 'EOF'
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    optimization: {
        ...common.optimization,
        minimize: false,
    },
    devServer: {
        ...common.devServer,
        hot: true,
        liveReload: true,
    }
});
EOF
```

#### Task 2: Update package.json scripts

```bash
# Update scripts in package.json to use environment-specific configs
npm pkg set scripts.build:dev="wp-scripts build --config webpack.dev.js"
npm pkg set scripts.build:prod="wp-scripts build --config webpack.prod.js"
npm pkg set scripts.start:dev="wp-scripts start --config webpack.dev.js"
```

---

## Final Project

### Objective: Create a Complete Block Suite

Create a comprehensive block suite that demonstrates all learned concepts:

#### Task 1: Advanced Block with Dynamic Content

```bash
# Create advanced block structure
mkdir -p src/blocks/advanced-block

# Create advanced block with server-side rendering
cat > src/blocks/advanced-block/block.json << 'EOF'
{
    "apiVersion": 2,
    "name": "curso-gutenberg/advanced-block",
    "title": "Advanced Block Exercise",
    "category": "curso-gutenberg",
    "icon": "admin-settings",
    "description": "Advanced block with dynamic content and interactions",
    "textdomain": "curso-gutenberg",
    "supports": {
        "html": false,
        "color": true,
        "spacing": true,
        "typography": true
    },
    "attributes": {
        "postType": {
            "type": "string",
            "default": "post"
        },
        "postsToShow": {
            "type": "number",
            "default": 3
        },
        "displayExcerpt": {
            "type": "boolean",
            "default": true
        }
    },
    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style-index.css",
    "render": "file:./render.php"
}
EOF
```

#### Task 2: Create comprehensive tests

Write tests that achieve >90% coverage for all components.

#### Task 3: Implement performance optimizations

- Code splitting
- Lazy loading
- Bundle optimization
- Asset optimization

#### Task 4: Create documentation

Document your implementation with:
- Code comments
- README files
- Usage examples
- Performance benchmarks

---

## Troubleshooting

### Common Issues and Solutions

#### Build Errors

**Error**: `Module not found: Error: Can't resolve '@wordpress/blocks'`

**Solution**: Ensure all WordPress dependencies are properly installed:
```bash
npm install @wordpress/scripts --save-dev
```

**Error**: `Cannot resolve alias '@components'`

**Solution**: Check your webpack.config.js alias configuration matches your directory structure.

#### Test Failures

**Error**: `Cannot find module '@testing-library/jest-dom'`

**Solution**: Install testing dependencies:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

**Error**: `ReferenceError: wp is not defined`

**Solution**: Ensure your test setup file properly mocks WordPress globals.

#### Linting Issues

**Error**: `'wp' is not defined`

**Solution**: Add WordPress globals to your ESLint configuration:
```javascript
globals: {
    wp: 'readonly',
    wpApiSettings: 'readonly'
}
```

### Getting Help

1. **Check the console** for detailed error messages
2. **Review the webpack output** for build issues
3. **Use the WordPress Developer Tools** browser extension
4. **Consult the official documentation**:
   - [wp-scripts documentation](https://www.npmjs.com/package/@wordpress/scripts)
   - [Block Editor Handbook](https://developer.wordpress.org/block-editor/)

---

## Additional Resources

### Official Documentation
- [wp-scripts Package](https://www.npmjs.com/package/@wordpress/scripts)
- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Webpack Configuration](https://webpack.js.org/configuration/)
- [Jest Testing Framework](https://jestjs.io/)

### Community Resources
- [WordPress Developer Blog](https://developer.wordpress.org/news/)
- [Gutenberg GitHub Repository](https://github.com/WordPress/gutenberg)
- [WordPress Stack Exchange](https://wordpress.stackexchange.com/)

### Tools and Extensions
- [WordPress Developer Tools](https://chrome.google.com/webstore/detail/wordpress-developer-tools/)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/)

### Code Quality Tools
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/) (for Git hooks)
- [lint-staged](https://github.com/okonet/lint-staged)

---

## Conclusion

Congratulations! You've completed the wp-scripts mastery exercise. You now have:

✅ **Deep understanding** of wp-scripts build processes
✅ **Professional workflow** with linting, formatting, and testing
✅ **Advanced configuration skills** for complex projects
✅ **Production-ready optimization** techniques
✅ **Comprehensive testing strategies** for reliable code

### Next Steps

1. **Apply these skills** to real WordPress projects
2. **Contribute to open source** WordPress plugins and themes
3. **Share your knowledge** with the WordPress community
4. **Stay updated** with the latest wp-scripts features and best practices

Keep building amazing WordPress blocks! 🚀
