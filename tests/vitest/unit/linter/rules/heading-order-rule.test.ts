import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { headingOrder } from './rule-test-helper'

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

describe('heading-order rule - JSX', () => {
  it('should pass for proper heading hierarchy', () => {
    ruleTester.run('heading-order', headingOrder, {
      valid: [
        {
          code: '<h1>Title</h1><h2>Subtitle</h2><h3>Section</h3>'
        },
        {
          code: '<h1>Title</h1><h2>Subtitle</h2><h2>Another Subtitle</h2>'
        },
        {
          code: '<h2>Subtitle</h2><h3>Section</h3><h4>Subsection</h4>'
        }
      ],
      invalid: []
    })
  })

  it('should warn for skipped heading levels', () => {
    ruleTester.run('heading-order', headingOrder, {
      valid: [],
      invalid: [
        {
          code: '<h1>Title</h1><h3>Section</h3>',
          errors: [
            {
              messageId: 'skippedLevel',
              data: {
                previous: '1',
                current: '3'
              }
            }
          ]
        },
        {
          code: '<h2>Subtitle</h2><h4>Subsection</h4>',
          errors: [
            {
              messageId: 'skippedLevel',
              data: {
                previous: '2',
                current: '4'
              }
            }
          ]
        }
      ]
    })
  })

  it('should allow same level headings', () => {
    ruleTester.run('heading-order', headingOrder, {
      valid: [
        {
          code: '<h2>First</h2><h2>Second</h2><h3>Section</h3>'
        }
      ],
      invalid: []
    })
  })
})

describe('heading-order rule - HTML strings', () => {
  const htmlRuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for HTML with proper heading hierarchy', () => {
    htmlRuleTester.run('heading-order', headingOrder, {
      valid: [
        {
          code: 'const html = "<h1>Title</h1><h2>Subtitle</h2>"'
        }
      ],
      invalid: []
    })
  })

  it('should warn for HTML with skipped heading levels', () => {
    htmlRuleTester.run('heading-order', headingOrder, {
      valid: [],
      invalid: [
        {
          code: 'const html = "<h1>Title</h1><h3>Section</h3>"',
          errors: [
            {
              messageId: 'skippedLevel'
            }
          ]
        }
      ]
    })
  })
})

