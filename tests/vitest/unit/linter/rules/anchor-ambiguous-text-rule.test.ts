import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { getRule } from './rule-test-helper'

const anchorAmbiguousText = getRule('anchor-ambiguous-text')

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

describe('anchor-ambiguous-text rule - JSX', () => {
  it('should pass for links with descriptive text', () => {
    ruleTester.run('anchor-ambiguous-text', anchorAmbiguousText, {
      valid: [
        { code: '<a href="/about">About our company</a>' },
        { code: '<a href="/products">View all products</a>' },
        { code: '<a href="/docs">Documentation</a>' },
        { code: '<a href="/contact">Contact us today</a>' }
      ],
      invalid: []
    })
  })

  it('should pass for links with aria-label', () => {
    ruleTester.run('anchor-ambiguous-text', anchorAmbiguousText, {
      valid: [
        { code: '<a href="/more" aria-label="Read more about accessibility">Read more</a>' },
        { code: '<a href="/page" aria-label="Go to the homepage">Click here</a>' }
      ],
      invalid: []
    })
  })

  it('should pass for links with aria-labelledby', () => {
    ruleTester.run('anchor-ambiguous-text', anchorAmbiguousText, {
      valid: [
        { code: '<a href="/more" aria-labelledby="desc-id">Read more</a>' }
      ],
      invalid: []
    })
  })

  it('should fail for ambiguous link text', () => {
    ruleTester.run('anchor-ambiguous-text', anchorAmbiguousText, {
      valid: [],
      invalid: [
        {
          code: '<a href="/page">Click here</a>',
          errors: [{ messageId: 'ambiguousText', data: { text: 'Click here' } }]
        },
        {
          code: '<a href="/more">Read more</a>',
          errors: [{ messageId: 'ambiguousText', data: { text: 'Read more' } }]
        },
        {
          code: '<a href="/info">Learn more</a>',
          errors: [{ messageId: 'ambiguousText', data: { text: 'Learn more' } }]
        },
        {
          code: '<a href="/link">Here</a>',
          errors: [{ messageId: 'ambiguousText', data: { text: 'Here' } }]
        },
        {
          code: '<a href="/link">Link</a>',
          errors: [{ messageId: 'ambiguousText', data: { text: 'Link' } }]
        }
      ]
    })
  })

  it('should allow custom ambiguous words configuration', () => {
    ruleTester.run('anchor-ambiguous-text', anchorAmbiguousText, {
      valid: [
        {
          code: '<a href="/page">Click here</a>',
          options: [{ words: ['foo', 'bar'] }]
        }
      ],
      invalid: [
        {
          code: '<a href="/page">Foo</a>',
          options: [{ words: ['foo', 'bar'] }],
          errors: [{ messageId: 'ambiguousText', data: { text: 'Foo' } }]
        }
      ]
    })
  })
})

describe('anchor-ambiguous-text rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue links with descriptive text', () => {
    vueRuleTester.run('anchor-ambiguous-text', anchorAmbiguousText, {
      valid: [
        { code: '<template><a href="/about">About us</a></template>' },
        { code: '<template><a href="/products">View products</a></template>' }
      ],
      invalid: []
    })
  })

  it('should fail for Vue ambiguous link text', () => {
    vueRuleTester.run('anchor-ambiguous-text', anchorAmbiguousText, {
      valid: [],
      invalid: [
        {
          code: '<template><a href="/page">Click here</a></template>',
          errors: [{ messageId: 'ambiguousText', data: { text: 'Click here' } }]
        }
      ]
    })
  })
})
