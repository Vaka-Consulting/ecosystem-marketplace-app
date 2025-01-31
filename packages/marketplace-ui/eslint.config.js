module.export = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended',
    'plugin:react-perf/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['import', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'no-console': 2,
    '@typescript-eslint/no-non-null-assertion': 2,
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-duplicate-imports': 2,
    'react/prop-types': 0, // Turn off prop-types rule, as we will use TypeScript's types instead.,
    'react-hooks/exhaustive-deps': 'off',
    'react/no-children-prop': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-typos': 'error',
    'react/no-unsafe': 'error',
    'react/no-unused-state': 'error',
    'react/self-closing-comp': ['warn', { component: true, html: true }],
    'react/state-in-constructor': ['error', 'always'],
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true,
      },
    ],
    'react/jsx-no-undef': ['error', { allowGlobals: false }],
    'react/jsx-fragments': ['error', 'syntax'],
    'react-perf/jsx-no-new-object-as-prop': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    // 'import/order': [
    //   2,
    //   {
    //     alphabetize: {
    //       order: 'asc',
    //       caseInsensitive: true,
    //     },
    //     groups: ['builtin', 'external', ['unknown', 'parent', 'sibling', 'index']],
    //     pathGroups: [
    //       {
    //         pattern: 'react',
    //         group: 'builtin',
    //         position: 'before',
    //       },
    //       {
    //         pattern: 'next',
    //         group: 'builtin',
    //         position: 'after',
    //       },
    //       {
    //         pattern: '@**',
    //         group: 'external',
    //         position: 'after',
    //       },
    //       {
    //         pattern: '**.css',
    //         group: 'index',
    //         position: 'after',
    //       },
    //     ],
    //     pathGroupsExcludedImportTypes: ['builtin'],
    //     'newlines-between': 'always',
    //   },
    // ],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-console': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}
