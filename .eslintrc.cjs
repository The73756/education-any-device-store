const { configure, presets } = require('eslint-kit')

module.exports = configure({
  allowDebug: process.env.NODE_ENV !== 'production',
  presets: [
    presets.imports({
      sort: {
        newline: false,
        groups: [['^\\u0000'], ['^node:'], ['^@?\\w'], ['^'], ['^\\.']],
      },
      alias: {
        root: './src',
        jsconfig: 'jsconfig.json',
      },
    }),
    presets.node(),
    presets.prettier({
      semi: false,
      singleQuote: true,
      tabWidth: 2,
      quoteProps: 'consistent',
    }),
    presets.react({
      version: 'detect',
      newJSXTransform: false,
    }),
  ],
  extend: {
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
})