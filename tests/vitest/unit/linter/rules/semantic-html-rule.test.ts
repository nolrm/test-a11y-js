import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { join } from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pluginPath = join(process.cwd(), 'dist/linter/eslint-plugin/index.js')
const eslintPlugin = require(pluginPath).default
const semanticHTML = eslintPlugin.rules['semantic-html']

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

describe('semantic-html rule - JSX', () => {
  it('should pass for semantic elements', () => {
    ruleTester.run('semantic-html', semanticHTML, {
      valid: [
        {
          code: '<button>Click me</button>'
        },
        {
          code: '<nav>Navigation</nav>'
        },
        {
          code: '<main>Main content</main>'
        }
      ],
      invalid: []
    })
  })

  it('should warn for redundant role', () => {
    ruleTester.run('semantic-html', semanticHTML, {
      valid: [],
      invalid: [
        {
          code: '<button role="button">Click</button>',
          errors: [
            {
              messageId: 'semanticViolation'
            }
          ]
        }
      ]
    })
  })

  it('should suggest semantic element over generic with role', () => {
    ruleTester.run('semantic-html', semanticHTML, {
      valid: [],
      invalid: [
        {
          code: '<div role="button">Click</div>',
          errors: [
            {
              messageId: 'semanticViolation'
            }
          ]
        },
        {
          code: '<span role="link">Link</span>',
          errors: [
            {
              messageId: 'semanticViolation'
            }
          ]
        }
      ]
    })
  })
})
