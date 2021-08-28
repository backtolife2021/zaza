// @ts-check
const config = require('@quitsmx/eslint-config')

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  extends: ['@quitsmx'],
  ignorePatterns: ['/dist', '/patches'],
  env: {
    node: true,
  },
  globals: {
    vim: 'readonly',
    print: 'readonly',
  },
  overrides: [
    {
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          classStaticBlock: true,
        },
      },
      files: ['*.ts', '*.tsx'],
      extends: ['@quitsmx/eslint-config/ts-runtime'],
    },
    {
      files: ['./*.js', 'scripts/**/*.js'],
      parserOptions: { sourceType: 'script' },
      extends: ['@quitsmx/eslint-config/node'],
      rules: {
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
      },
    },
    {
      parserOptions: { project: './packages/**/tsconfig.json' },
      files: ['rollup.config.js', 'packages/**/*.ts'],
      extends: ['@quitsmx/eslint-config/ts-runtime'],
    },
  ],
  rules: {
    'no-void': 'off',
    'no-restricted-globals': config.rules['no-restricted-globals'].filter(
      (it) => !['print'].includes(it)
    ),
  },
}
