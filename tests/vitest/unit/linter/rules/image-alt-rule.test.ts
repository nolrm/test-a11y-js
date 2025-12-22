import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { imageAlt } from './rule-test-helper'

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

describe('image-alt rule - JSX', () => {
  it('should pass for image with alt attribute', () => {
    ruleTester.run('image-alt', imageAlt, {
      valid: [
        {
          code: '<img src="test.jpg" alt="Test image" />'
        },
        {
          code: '<img src="test.jpg" alt="A beautiful landscape" />'
        },
        {
          code: 'const Image = () => <img src="test.jpg" alt="Test" />'
        }
      ],
      invalid: []
    })
  })

  it('should fail for image without alt attribute', () => {
    ruleTester.run('image-alt', imageAlt, {
      valid: [],
      invalid: [
        {
          code: '<img src="test.jpg" />',
          errors: [
            {
              messageId: 'missingAlt'
            }
          ]
        },
        {
          code: 'const Image = () => <img src="test.jpg" />',
          errors: [
            {
              messageId: 'missingAlt'
            }
          ]
        }
      ]
    })
  })

  it('should fail for image with empty alt attribute', () => {
    ruleTester.run('image-alt', imageAlt, {
      valid: [],
      invalid: [
        {
          code: '<img src="test.jpg" alt="" />',
          errors: [
            {
              messageId: 'emptyAlt'
            }
          ]
        }
      ]
    })
  })

  it('should warn for dynamic alt attribute', () => {
    ruleTester.run('image-alt', imageAlt, {
      valid: [],
      invalid: [
        {
          code: '<img src="test.jpg" alt={altText} />',
          errors: [
            {
              messageId: 'dynamicAlt'
            }
          ]
        }
      ]
    })
  })
})

describe('image-alt rule - HTML strings', () => {
  const htmlRuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for HTML string with alt', () => {
    htmlRuleTester.run('image-alt', imageAlt, {
      valid: [
        {
          code: 'const html = "<img src=\\"test.jpg\\" alt=\\"Test\\" />"'
        }
      ],
      invalid: []
    })
  })

  it('should fail for HTML string without alt', () => {
    htmlRuleTester.run('image-alt', imageAlt, {
      valid: [],
      invalid: [
        {
          code: 'const html = "<img src=\\"test.jpg\\" />"',
          errors: [
            {
              messageId: 'missingAlt'
            }
          ]
        }
      ]
    })
  })
})

