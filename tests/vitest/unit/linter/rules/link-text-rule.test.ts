import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { linkText } from './rule-test-helper'

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

describe('link-text rule - JSX', () => {
  it('should pass for link with descriptive text', () => {
    ruleTester.run('link-text', linkText, {
      valid: [
        {
          code: '<a href="/about">About Us</a>'
        },
        {
          code: '<a href="/contact" aria-label="Contact page">Contact</a>'
        },
        {
          code: '<a href="/blog">Read our blog</a>'
        }
      ],
      invalid: []
    })
  })

  it('should warn for link with non-descriptive text', () => {
    ruleTester.run('link-text', linkText, {
      valid: [],
      invalid: [
        {
          code: '<a href="/about">Click here</a>',
          errors: [
            {
              messageId: 'nonDescriptive'
            }
          ]
        },
        {
          code: '<a href="/more">Read more</a>',
          errors: [
            {
              messageId: 'nonDescriptive'
            }
          ]
        },
        {
          code: '<a href="/more">more</a>',
          errors: [
            {
              messageId: 'nonDescriptive'
            }
          ]
        }
      ]
    })
  })

  it('should fail for link without text', () => {
    ruleTester.run('link-text', linkText, {
      valid: [],
      invalid: [
        {
          code: '<a href="/about"></a>',
          errors: [
            {
              messageId: 'missingText'
            }
          ]
        }
      ]
    })
  })
})

describe('link-text rule - HTML strings', () => {
  const htmlRuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for HTML link with descriptive text', () => {
    htmlRuleTester.run('link-text', linkText, {
      valid: [
        {
          code: 'const html = "<a href=\\"/about\\">About Us</a>"'
        }
      ],
      invalid: []
    })
  })

  it('should warn for HTML link with non-descriptive text', () => {
    htmlRuleTester.run('link-text', linkText, {
      valid: [],
      invalid: [
        {
          code: 'const html = "<a href=\\"/about\\">Click here</a>"',
          errors: [
            {
              messageId: 'nonDescriptive'
            }
          ]
        }
      ]
    })
  })
})

