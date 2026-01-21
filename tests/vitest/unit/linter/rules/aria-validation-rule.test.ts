import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { join } from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pluginPath = join(process.cwd(), 'dist/linter/eslint-plugin/index.js')
const eslintPlugin = require(pluginPath).default
const ariaValidation = eslintPlugin.rules['aria-validation']

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

describe('aria-validation rule - JSX', () => {
  it('should pass for valid ARIA role', () => {
    ruleTester.run('aria-validation', ariaValidation, {
      valid: [
        {
          code: '<div role="button">Click me</div>'
        },
        {
          code: '<div role="dialog" aria-label="Modal">Content</div>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for invalid ARIA role', () => {
    ruleTester.run('aria-validation', ariaValidation, {
      valid: [],
      invalid: [
        {
          code: '<div role="invalid-role">Content</div>',
          errors: [
            {
              messageId: 'ariaViolation'
            }
          ]
        }
      ]
    })
  })

  it('should warn for redundant role', () => {
    ruleTester.run('aria-validation', ariaValidation, {
      valid: [],
      invalid: [
        {
          code: '<button role="button">Click</button>',
          errors: [
            {
              messageId: 'ariaViolation'
            }
          ]
        }
      ]
    })
  })

  it('should validate ARIA property values', () => {
    ruleTester.run('aria-validation', ariaValidation, {
      valid: [],
      invalid: [
        {
          code: '<div aria-required="maybe">Content</div>',
          errors: [
            {
              messageId: 'ariaViolation'
            }
          ]
        }
      ]
    })
  })

  it('should validate ID references', () => {
    ruleTester.run('aria-validation', ariaValidation, {
      valid: [
        {
          code: '<label id="email-label">Email</label><input aria-labelledby="email-label" />'
        }
      ],
      invalid: [
        {
          code: '<input aria-labelledby="missing-id" />',
          errors: [
            {
              messageId: 'ariaViolation'
            }
          ]
        }
      ]
    })
  })
})
