import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { getRule } from './rule-test-helper'

const noDistractingElements = getRule('no-distracting-elements')

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

describe('no-distracting-elements rule - JSX', () => {
  it('should pass for normal elements', () => {
    ruleTester.run('no-distracting-elements', noDistractingElements, {
      valid: [
        { code: '<div>Content</div>' },
        { code: '<span>Text</span>' },
        { code: '<p>Paragraph</p>' },
        { code: '<section>Section content</section>' },
        { code: '<article>Article content</article>' }
      ],
      invalid: []
    })
  })

  it('should fail for blink element', () => {
    ruleTester.run('no-distracting-elements', noDistractingElements, {
      valid: [],
      invalid: [
        {
          code: '<blink>Warning!</blink>',
          errors: [{ messageId: 'noDistractingElements', data: { element: 'blink' } }]
        },
        {
          code: 'const Alert = () => <blink>Attention</blink>',
          errors: [{ messageId: 'noDistractingElements', data: { element: 'blink' } }]
        }
      ]
    })
  })

  it('should fail for marquee element', () => {
    ruleTester.run('no-distracting-elements', noDistractingElements, {
      valid: [],
      invalid: [
        {
          code: '<marquee>Scrolling text</marquee>',
          errors: [{ messageId: 'noDistractingElements', data: { element: 'marquee' } }]
        },
        {
          code: 'const Banner = () => <marquee direction="left">News ticker</marquee>',
          errors: [{ messageId: 'noDistractingElements', data: { element: 'marquee' } }]
        }
      ]
    })
  })

  it('should allow custom elements configuration', () => {
    ruleTester.run('no-distracting-elements', noDistractingElements, {
      valid: [
        {
          code: '<blink>Allowed</blink>',
          options: [{ elements: ['marquee'] }]
        }
      ],
      invalid: [
        {
          code: '<marquee>Not allowed</marquee>',
          options: [{ elements: ['marquee'] }],
          errors: [{ messageId: 'noDistractingElements', data: { element: 'marquee' } }]
        }
      ]
    })
  })
})

describe('no-distracting-elements rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue normal elements', () => {
    vueRuleTester.run('no-distracting-elements', noDistractingElements, {
      valid: [
        { code: '<template><div>Content</div></template>' },
        { code: '<template><span>Text</span></template>' }
      ],
      invalid: []
    })
  })

  it('should fail for Vue blink and marquee elements', () => {
    vueRuleTester.run('no-distracting-elements', noDistractingElements, {
      valid: [],
      invalid: [
        {
          code: '<template><blink>Warning</blink></template>',
          errors: [{ messageId: 'noDistractingElements', data: { element: 'blink' } }]
        },
        {
          code: '<template><marquee>Scrolling</marquee></template>',
          errors: [{ messageId: 'noDistractingElements', data: { element: 'marquee' } }]
        }
      ]
    })
  })
})
