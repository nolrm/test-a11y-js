import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { getRule } from './rule-test-helper'

const noStaticElementInteractions = getRule('no-static-element-interactions')

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

describe('no-static-element-interactions rule - JSX', () => {
  it('should pass for static elements without event handlers', () => {
    ruleTester.run('no-static-element-interactions', noStaticElementInteractions, {
      valid: [
        { code: '<div>Content</div>' },
        { code: '<span>Text</span>' },
        { code: '<section>Section</section>' },
        { code: '<article>Article</article>' }
      ],
      invalid: []
    })
  })

  it('should pass for interactive elements with event handlers', () => {
    ruleTester.run('no-static-element-interactions', noStaticElementInteractions, {
      valid: [
        { code: '<button onClick={handleClick}>Click me</button>' },
        { code: '<a href="/page" onClick={handleClick}>Link</a>' },
        { code: '<input type="text" onChange={handleChange} />' }
      ],
      invalid: []
    })
  })

  it('should pass for static elements with role and event handlers', () => {
    ruleTester.run('no-static-element-interactions', noStaticElementInteractions, {
      valid: [
        { code: '<div role="button" onClick={handleClick}>Custom button</div>' },
        { code: '<span role="link" onClick={handleClick}>Custom link</span>' },
        { code: '<div role="tab" onClick={handleClick}>Tab</div>' }
      ],
      invalid: []
    })
  })

  it('should fail for static elements with event handlers', () => {
    ruleTester.run('no-static-element-interactions', noStaticElementInteractions, {
      valid: [],
      invalid: [
        {
          code: '<div onClick={handleClick}>Clickable div</div>',
          errors: [{ messageId: 'noStaticElementInteractions', data: { element: 'div' } }]
        },
        {
          code: '<span onClick={handleClick}>Clickable span</span>',
          errors: [{ messageId: 'noStaticElementInteractions', data: { element: 'span' } }]
        },
        {
          code: '<section onKeyDown={handleKey}>Section</section>',
          errors: [{ messageId: 'noStaticElementInteractions', data: { element: 'section' } }]
        }
      ]
    })
  })
})

describe('no-static-element-interactions rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue static elements without handlers', () => {
    vueRuleTester.run('no-static-element-interactions', noStaticElementInteractions, {
      valid: [
        { code: '<template><div>Content</div></template>' },
        { code: '<template><span>Text</span></template>' }
      ],
      invalid: []
    })
  })

  it('should pass for Vue static elements with role', () => {
    vueRuleTester.run('no-static-element-interactions', noStaticElementInteractions, {
      valid: [
        { code: '<template><div role="button" @click="handleClick">Button</div></template>' }
      ],
      invalid: []
    })
  })
})
