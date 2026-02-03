import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { getRule } from './rule-test-helper'

const noNoninteractiveElementInteractions = getRule('no-noninteractive-element-interactions')

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

describe('no-noninteractive-element-interactions rule - JSX', () => {
  it('should pass for non-interactive elements without event handlers', () => {
    ruleTester.run('no-noninteractive-element-interactions', noNoninteractiveElementInteractions, {
      valid: [
        { code: '<h1>Heading</h1>' },
        { code: '<p>Paragraph</p>' },
        { code: '<img src="image.png" alt="Description" />' },
        { code: '<li>List item</li>' }
      ],
      invalid: []
    })
  })

  it('should pass for interactive elements with event handlers', () => {
    ruleTester.run('no-noninteractive-element-interactions', noNoninteractiveElementInteractions, {
      valid: [
        { code: '<button onClick={handleClick}>Click me</button>' },
        { code: '<a href="/page" onClick={handleClick}>Link</a>' },
        { code: '<input type="text" onChange={handleChange} />' }
      ],
      invalid: []
    })
  })

  it('should pass for non-interactive elements with role and event handlers', () => {
    ruleTester.run('no-noninteractive-element-interactions', noNoninteractiveElementInteractions, {
      valid: [
        { code: '<h1 role="button" onClick={handleClick}>Clickable heading</h1>' },
        { code: '<p role="link" onClick={handleClick}>Clickable paragraph</p>' },
        { code: '<li role="tab" onClick={handleClick}>Tab item</li>' }
      ],
      invalid: []
    })
  })

  it('should fail for non-interactive elements with event handlers', () => {
    ruleTester.run('no-noninteractive-element-interactions', noNoninteractiveElementInteractions, {
      valid: [],
      invalid: [
        {
          code: '<h1 onClick={handleClick}>Clickable heading</h1>',
          errors: [{ messageId: 'noNonInteractiveElementInteractions', data: { element: 'h1' } }]
        },
        {
          code: '<p onClick={handleClick}>Clickable paragraph</p>',
          errors: [{ messageId: 'noNonInteractiveElementInteractions', data: { element: 'p' } }]
        },
        {
          code: '<li onClick={handleClick}>Clickable list item</li>',
          errors: [{ messageId: 'noNonInteractiveElementInteractions', data: { element: 'li' } }]
        }
      ]
    })
  })
})

describe('no-noninteractive-element-interactions rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue non-interactive elements without handlers', () => {
    vueRuleTester.run('no-noninteractive-element-interactions', noNoninteractiveElementInteractions, {
      valid: [
        { code: '<template><h1>Heading</h1></template>' },
        { code: '<template><p>Paragraph</p></template>' }
      ],
      invalid: []
    })
  })

  it('should pass for Vue non-interactive elements with role', () => {
    vueRuleTester.run('no-noninteractive-element-interactions', noNoninteractiveElementInteractions, {
      valid: [
        { code: '<template><h1 role="button" @click="handleClick">Heading</h1></template>' }
      ],
      invalid: []
    })
  })
})
