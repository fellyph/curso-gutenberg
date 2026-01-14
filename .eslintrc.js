module.exports = {
	root: true,
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	rules: {
		// Enhanced code quality rules
		'no-console': 'warn',
		'no-debugger': 'error',
		'prefer-const': 'error',
		'no-unused-vars': [ 'error', { argsIgnorePattern: '^_' } ],

		// ES6+ Standards
		'object-shorthand': 'error',
		'prefer-arrow-callback': 'error',
		'prefer-template': 'error',

		// String standards - enforce single quotes
		quotes: [ 'error', 'single' ],
		'jsx-quotes': [ 'error', 'prefer-double' ],

		// Enforce proper spacing for better readability
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'always',
			},
		],
	},
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
	},
	globals: {
		wp: 'readonly',
		wpApiSettings: 'readonly',
		window: 'readonly',
		document: 'readonly',
	},
};
