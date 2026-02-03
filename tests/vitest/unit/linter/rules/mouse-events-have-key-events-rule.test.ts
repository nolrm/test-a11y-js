import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { getRule } from './rule-test-helper'

const mouseEventsHaveKeyEvents = getRule('mouse-events-have-key-events')

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

describe('mouse-events-have-key-events rule - JSX', () => {
  it('should pass for elements without mouse events', () => {
    ruleTester.run('mouse-events-have-key-events', mouseEventsHaveKeyEvents, {
      valid: [
        { code: '<div>Content</div>' },
        { code: '<span onClick={handleClick}>Text</span>' },
        { code: '<button onMouseDown={handleMouseDown}>Click</button>' }
      ],
      invalid: []
    })
  })

  it('should pass for onMouseOver with onFocus', () => {
    ruleTester.run('mouse-events-have-key-events', mouseEventsHaveKeyEvents, {
      valid: [
        { code: '<div onMouseOver={showTooltip} onFocus={showTooltip}>Hover me</div>' },
        { code: '<span onMouseOver={highlight} onFocus={highlight}>Text</span>' }
      ],
      invalid: []
    })
  })

  it('should pass for onMouseOut with onBlur', () => {
    ruleTester.run('mouse-events-have-key-events', mouseEventsHaveKeyEvents, {
      valid: [
        { code: '<div onMouseOut={hideTooltip} onBlur={hideTooltip}>Hover me</div>' },
        { code: '<span onMouseOut={unhighlight} onBlur={unhighlight}>Text</span>' }
      ],
      invalid: []
    })
  })

  it('should fail for onMouseOver without onFocus', () => {
    ruleTester.run('mouse-events-have-key-events', mouseEventsHaveKeyEvents, {
      valid: [],
      invalid: [
        {
          code: '<div onMouseOver={showTooltip}>Hover me</div>',
          errors: [{ messageId: 'mouseOverWithoutFocus' }]
        },
        {
          code: '<span onMouseOver={highlight}>Text</span>',
          errors: [{ messageId: 'mouseOverWithoutFocus' }]
        }
      ]
    })
  })

  it('should fail for onMouseOut without onBlur', () => {
    ruleTester.run('mouse-events-have-key-events', mouseEventsHaveKeyEvents, {
      valid: [],
      invalid: [
        {
          code: '<div onMouseOut={hideTooltip}>Hover me</div>',
          errors: [{ messageId: 'mouseOutWithoutBlur' }]
        },
        {
          code: '<span onMouseOut={unhighlight}>Text</span>',
          errors: [{ messageId: 'mouseOutWithoutBlur' }]
        }
      ]
    })
  })

  it('should report both errors when both mouse events lack keyboard equivalents', () => {
    ruleTester.run('mouse-events-have-key-events', mouseEventsHaveKeyEvents, {
      valid: [],
      invalid: [
        {
          code: '<div onMouseOver={show} onMouseOut={hide}>Content</div>',
          errors: [
            { messageId: 'mouseOverWithoutFocus' },
            { messageId: 'mouseOutWithoutBlur' }
          ]
        }
      ]
    })
  })
})
