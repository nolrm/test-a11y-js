import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { formLabel } from './rule-test-helper'

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

describe('form-label rule - JSX', () => {
  it('should pass for input with label via id/for', () => {
    ruleTester.run('form-label', formLabel, {
      valid: [
        {
          code: '<label htmlFor="name">Name</label><input id="name" />'
        },
        {
          code: '<label htmlFor="email">Email</label><input id="email" type="email" />'
        }
      ],
      invalid: []
    })
  })

  it('should pass for input with aria-label', () => {
    ruleTester.run('form-label', formLabel, {
      valid: [
        {
          code: '<input type="text" aria-label="Email address" />'
        },
        {
          code: '<input type="email" aria-label="Your email" />'
        }
      ],
      invalid: []
    })
  })

  it('should pass for input with aria-labelledby', () => {
    ruleTester.run('form-label', formLabel, {
      valid: [
        {
          code: '<span id="email-label">Email</span><input type="email" aria-labelledby="email-label" />'
        }
      ],
      invalid: []
    })
  })

  it('should fail for input without label', () => {
    ruleTester.run('form-label', formLabel, {
      valid: [],
      invalid: [
        {
          code: '<input type="text" />',
          errors: [
            {
              messageId: 'missingLabel'
            }
          ]
        },
        {
          code: '<input type="email" />',
          errors: [
            {
              messageId: 'missingLabel'
            }
          ]
        }
      ]
    })
  })

  it('should check select and textarea elements', () => {
    ruleTester.run('form-label', formLabel, {
      valid: [
        {
          code: '<select id="country" aria-label="Country"><option>USA</option></select>'
        },
        {
          code: '<textarea id="message" aria-label="Message"></textarea>'
        }
      ],
      invalid: [
        {
          code: '<select><option>USA</option></select>',
          errors: [
            {
              messageId: 'missingLabel'
            }
          ]
        },
        {
          code: '<textarea></textarea>',
          errors: [
            {
              messageId: 'missingLabel'
            }
          ]
        }
      ]
    })
  })
})

describe('form-label rule - HTML strings', () => {
  const htmlRuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for HTML input with label', () => {
    htmlRuleTester.run('form-label', formLabel, {
      valid: [
        {
          code: 'const html = "<label for=\\"name\\">Name</label><input id=\\"name\\" />"'
        }
      ],
      invalid: []
    })
  })

  it('should fail for HTML input without label', () => {
    htmlRuleTester.run('form-label', formLabel, {
      valid: [],
      invalid: [
        {
          code: 'const html = "<input type=\\"text\\" />"',
          errors: [
            {
              messageId: 'missingLabel'
            }
          ]
        }
      ]
    })
  })
})

