import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { join } from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pluginPath = join(process.cwd(), 'dist/linter/eslint-plugin/index.js')
const eslintPlugin = require(pluginPath).default
const formValidation = eslintPlugin.rules['form-validation']

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

describe('form-validation rule - JSX', () => {
  it('should pass for required input with label', () => {
    ruleTester.run('form-validation', formValidation, {
      valid: [
        {
          code: '<input type="text" required aria-label="Name" />'
        },
        {
          code: '<label id="email-label">Email</label><input type="email" required id="email" aria-labelledby="email-label" />'
        },
        {
          code: '<label id="name-label">Name</label><input type="text" required aria-labelledby="name-label" />'
        }
      ],
      invalid: []
    })
  })

  it('should fail for required input without label', () => {
    ruleTester.run('form-validation', formValidation, {
      valid: [],
      invalid: [
        {
          code: '<input type="text" required />',
          errors: [
            {
              messageId: 'formValidationViolation'
            }
          ]
        }
      ]
    })
  })

  it('should validate aria-describedby references', () => {
    ruleTester.run('form-validation', formValidation, {
      valid: [
        {
          code: '<span id="error-msg">Error</span><input aria-describedby="error-msg" />'
        }
      ],
      invalid: [
        {
          code: '<input aria-describedby="missing-id" />',
          errors: [
            {
              messageId: 'formValidationViolation'
            }
          ]
        }
      ]
    })
  })

  it('should validate aria-labelledby references', () => {
    ruleTester.run('form-validation', formValidation, {
      valid: [
        {
          code: '<label id="label-id">Label</label><input aria-labelledby="label-id" />'
        }
      ],
      invalid: [
        {
          code: '<input aria-labelledby="missing-id" />',
          errors: [
            {
              messageId: 'formValidationViolation'
            }
          ]
        }
      ]
    })
  })
})
