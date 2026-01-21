import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { join } from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pluginPath = join(process.cwd(), 'dist/linter/eslint-plugin/index.js')
const eslintPlugin = require(pluginPath).default
const headingOrder = eslintPlugin.rules['heading-order']

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
})

describe('heading-order rule - with options', () => {
  describe('allowSameLevel', () => {
    it('should allow same level by default', () => {
      ruleTester.run('heading-order', headingOrder, {
        valid: [
          {
            code: '<h2>First</h2><h2>Second</h2>'
          }
        ],
        invalid: []
      })
    })
  })

  describe('maxSkip', () => {
    it('should allow skips within maxSkip limit', () => {
      ruleTester.run('heading-order', headingOrder, {
        valid: [
          {
            code: '<h1>Title</h1><h2>Subtitle</h2>',
            options: [{
              maxSkip: 1
            }]
          },
          {
            code: '<h1>Title</h1><h3>Section</h3>',
            options: [{
              maxSkip: 2
            }]
          }
        ],
        invalid: []
      })
    })

    it('should warn when skip exceeds maxSkip', () => {
      ruleTester.run('heading-order', headingOrder, {
        valid: [],
        invalid: [
          {
            code: '<h1>Title</h1><h4>Subsection</h4>',
            options: [{
              maxSkip: 2
            }],
            errors: [{
              messageId: 'skippedLevel',
              data: {
                previous: '1',
                current: '4'
              }
            }]
          }
        ]
      })
    })
  })
})
