import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { getRule } from './rule-test-helper'

const autocompleteValid = getRule('autocomplete-valid')

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

describe('autocomplete-valid rule - JSX', () => {
  it('should pass for elements without autocomplete', () => {
    ruleTester.run('autocomplete-valid', autocompleteValid, {
      valid: [
        { code: '<input type="text" />' },
        { code: '<input type="email" />' },
        { code: '<select><option>One</option></select>' }
      ],
      invalid: []
    })
  })

  it('should pass for valid autocomplete values', () => {
    ruleTester.run('autocomplete-valid', autocompleteValid, {
      valid: [
        { code: '<input type="text" autoComplete="name" />' },
        { code: '<input type="email" autoComplete="email" />' },
        { code: '<input type="text" autoComplete="username" />' },
        { code: '<input type="password" autoComplete="current-password" />' },
        { code: '<input type="password" autoComplete="new-password" />' },
        { code: '<input type="text" autoComplete="street-address" />' },
        { code: '<input type="text" autoComplete="postal-code" />' },
        { code: '<input type="tel" autoComplete="tel" />' },
        { code: '<input type="text" autoComplete="cc-number" />' },
        { code: '<input autoComplete="on" />' },
        { code: '<input autoComplete="off" />' },
        { code: '<input type="text" autoComplete="shipping name" />' },
        { code: '<input type="text" autoComplete="billing street-address" />' }
      ],
      invalid: []
    })
  })

  it('should fail for invalid autocomplete values', () => {
    ruleTester.run('autocomplete-valid', autocompleteValid, {
      valid: [],
      invalid: [
        {
          code: '<input type="text" autoComplete="invalid" />',
          errors: [{ messageId: 'invalidAutocomplete', data: { value: 'invalid' } }]
        },
        {
          code: '<input type="text" autoComplete="foo" />',
          errors: [{ messageId: 'invalidAutocomplete', data: { value: 'foo' } }]
        },
        {
          code: '<input type="text" autoComplete="my-name" />',
          errors: [{ messageId: 'invalidAutocomplete', data: { value: 'my-name' } }]
        }
      ]
    })
  })

  it('should fail for autocomplete on unsupported input types', () => {
    ruleTester.run('autocomplete-valid', autocompleteValid, {
      valid: [],
      invalid: [
        {
          code: '<input type="checkbox" autoComplete="name" />',
          errors: [{ messageId: 'autocompleteNotSupported', data: { element: 'input', type: ' type="checkbox"' } }]
        },
        {
          code: '<input type="radio" autoComplete="name" />',
          errors: [{ messageId: 'autocompleteNotSupported', data: { element: 'input', type: ' type="radio"' } }]
        },
        {
          code: '<input type="hidden" autoComplete="name" />',
          errors: [{ messageId: 'autocompleteNotSupported', data: { element: 'input', type: ' type="hidden"' } }]
        }
      ]
    })
  })

  it('should warn for dynamic autocomplete', () => {
    ruleTester.run('autocomplete-valid', autocompleteValid, {
      valid: [],
      invalid: [
        {
          code: '<input type="text" autoComplete={autocompleteValue} />',
          errors: [{ messageId: 'dynamicAutocomplete' }]
        }
      ]
    })
  })
})

describe('autocomplete-valid rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue valid autocomplete', () => {
    vueRuleTester.run('autocomplete-valid', autocompleteValid, {
      valid: [
        { code: '<template><input type="text" autocomplete="name" /></template>' },
        { code: '<template><input type="email" autocomplete="email" /></template>' }
      ],
      invalid: []
    })
  })

  it('should fail for Vue invalid autocomplete', () => {
    vueRuleTester.run('autocomplete-valid', autocompleteValid, {
      valid: [],
      invalid: [
        {
          code: '<template><input type="text" autocomplete="invalid" /></template>',
          errors: [{ messageId: 'invalidAutocomplete', data: { value: 'invalid' } }]
        }
      ]
    })
  })
})
