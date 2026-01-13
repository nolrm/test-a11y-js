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
import minimal from './configs/minimal'

// Version is injected at build time from package.json
declare const __PACKAGE_VERSION__: string
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
import fieldsetLegend from './rules/fieldset-legend'
import tableStructure from './rules/table-structure'
import detailsSummary from './rules/details-summary'
import videoCaptions from './rules/video-captions'
import audioCaptions from './rules/audio-captions'
import landmarkRoles from './rules/landmark-roles'
import dialogModal from './rules/dialog-modal'
import ariaValidation from './rules/aria-validation'
import semanticHTML from './rules/semantic-html'
import formValidation from './rules/form-validation'

/**
 * ESLint plugin for accessibility checking
 */
const plugin: ESLint.Plugin = {
  meta: {
    name: 'eslint-plugin-test-a11y-js',
    version: __PACKAGE_VERSION__
  },
  rules: {
    'image-alt': imageAlt,
    'button-label': buttonLabel,
    'link-text': linkText,
    'form-label': formLabel,
    'heading-order': headingOrder,
    'iframe-title': iframeTitle,
    'fieldset-legend': fieldsetLegend,
    'table-structure': tableStructure,
    'details-summary': detailsSummary,
    'video-captions': videoCaptions,
    'audio-captions': audioCaptions,
    'landmark-roles': landmarkRoles,
    'dialog-modal': dialogModal,
    'aria-validation': ariaValidation,
    'semantic-html': semanticHTML,
    'form-validation': formValidation
  },
  configs: {
    minimal: {
      plugins: ['test-a11y-js'],
      rules: minimal
    },
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

// CommonJS compatibility - ensure plugin is accessible without .default
if (typeof module !== 'undefined' && module.exports) {
  module.exports = plugin
  module.exports.default = plugin
}

