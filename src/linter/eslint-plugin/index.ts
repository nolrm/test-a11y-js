/**
 * ESLint plugin for test-a11y-js
 * 
 * Provides accessibility linting rules for React, Vue, and HTML components.
 * 
 * @example
 * ```javascript
 * // .eslintrc.js
 * module.exports = {
 *   plugins: ['test-a11y-js'],
 *   extends: ['plugin:test-a11y-js/recommended']
 * }
 * ```
 */

import type { ESLint } from 'eslint'
import recommended from './configs/recommended'
import strict from './configs/strict'
import react from './configs/react'
import vue from './configs/vue'
import imageAlt from './rules/image-alt'
import buttonLabel from './rules/button-label'
import linkText from './rules/link-text'
import formLabel from './rules/form-label'
import headingOrder from './rules/heading-order'
import iframeTitle from './rules/iframe-title'

/**
 * ESLint plugin for accessibility checking
 */
const plugin: ESLint.Plugin = {
  meta: {
    name: 'test-a11y-js',
    version: '0.2.0'
  },
  rules: {
    'image-alt': imageAlt,
    'button-label': buttonLabel,
    'link-text': linkText,
    'form-label': formLabel,
    'heading-order': headingOrder,
    'iframe-title': iframeTitle
  },
  configs: {
    recommended: {
      plugins: ['test-a11y-js'],
      rules: recommended
    },
    strict: {
      plugins: ['test-a11y-js'],
      rules: strict
    },
    react: {
      plugins: ['test-a11y-js'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: react
    },
    vue: {
      plugins: ['test-a11y-js'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      rules: vue
    }
  }
}

export default plugin

