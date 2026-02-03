import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { getRule } from './rule-test-helper'

const clickEventsHaveKeyEvents = getRule('click-events-have-key-events')

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

describe('click-events-have-key-events rule - JSX', () => {
  it('should pass for elements without onClick', () => {
    ruleTester.run('click-events-have-key-events', clickEventsHaveKeyEvents, {
      valid: [
        { code: '<div>Content</div>' },
        { code: '<span>Text</span>' },
        { code: '<p>Paragraph</p>' }
      ],
      invalid: []
    })
  })

  it('should pass for native interactive elements with onClick', () => {
    ruleTester.run('click-events-have-key-events', clickEventsHaveKeyEvents, {
      valid: [
        { code: '<button onClick={handleClick}>Click me</button>' },
        { code: '<a href="/page" onClick={handleClick}>Link</a>' },
        { code: '<input type="button" onClick={handleClick} />' },
        { code: '<select onClick={handleClick}><option>One</option></select>' }
      ],
      invalid: []
    })
  })

  it('should pass for elements with onClick and keyboard handler', () => {
    ruleTester.run('click-events-have-key-events', clickEventsHaveKeyEvents, {
      valid: [
        { code: '<div onClick={handleClick} onKeyDown={handleKey}>Clickable</div>' },
        { code: '<div onClick={handleClick} onKeyUp={handleKey}>Clickable</div>' },
        { code: '<div onClick={handleClick} onKeyPress={handleKey}>Clickable</div>' },
        { code: '<span onClick={handleClick} onKeyDown={handleKey}>Text</span>' }
      ],
      invalid: []
    })
  })

  it('should fail for non-interactive elements with onClick but no keyboard handler', () => {
    ruleTester.run('click-events-have-key-events', clickEventsHaveKeyEvents, {
      valid: [],
      invalid: [
        {
          code: '<div onClick={handleClick}>Clickable</div>',
          errors: [{ messageId: 'missingKeyboardHandler' }]
        },
        {
          code: '<span onClick={handleClick}>Clickable</span>',
          errors: [{ messageId: 'missingKeyboardHandler' }]
        },
        {
          code: '<section onClick={handleClick}>Section</section>',
          errors: [{ messageId: 'missingKeyboardHandler' }]
        }
      ]
    })
  })
})

describe('click-events-have-key-events rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue native interactive elements', () => {
    vueRuleTester.run('click-events-have-key-events', clickEventsHaveKeyEvents, {
      valid: [
        { code: '<template><button @click="handleClick">Click</button></template>' },
        { code: '<template><a href="/page" @click="handleClick">Link</a></template>' }
      ],
      invalid: []
    })
  })
})
