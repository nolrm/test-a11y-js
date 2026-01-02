import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { fieldsetLegend } from './rule-test-helper'

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

describe('fieldset-legend rule - JSX', () => {
  it('should pass for fieldset with valid legend', () => {
    ruleTester.run('fieldset-legend', fieldsetLegend, {
      valid: [
        {
          code: '<fieldset><legend>Personal Information</legend></fieldset>'
        },
        {
          code: '<fieldset><legend>Contact Details</legend><input /></fieldset>'
        },
        {
          code: 'const Form = () => <fieldset><legend>Form Section</legend></fieldset>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for fieldset without legend', () => {
    ruleTester.run('fieldset-legend', fieldsetLegend, {
      valid: [],
      invalid: [
        {
          code: '<fieldset></fieldset>',
          errors: [
            {
              messageId: 'missingLegend'
            }
          ]
        },
        {
          code: '<fieldset><input /></fieldset>',
          errors: [
            {
              messageId: 'missingLegend'
            }
          ]
        }
      ]
    })
  })

  it('should fail for fieldset with empty legend', () => {
    ruleTester.run('fieldset-legend', fieldsetLegend, {
      valid: [],
      invalid: [
        {
          code: '<fieldset><legend></legend></fieldset>',
          errors: [
            {
              messageId: 'emptyLegend'
            }
          ]
        },
        {
          code: '<fieldset><legend>   </legend></fieldset>',
          errors: [
            {
              messageId: 'emptyLegend'
            }
          ]
        }
      ]
    })
  })
})

describe('fieldset-legend rule - HTML strings', () => {
  const htmlRuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for HTML fieldset with legend', () => {
    htmlRuleTester.run('fieldset-legend', fieldsetLegend, {
      valid: [
        {
          code: 'const html = "<fieldset><legend>Section</legend></fieldset>"'
        }
      ],
      invalid: []
    })
  })

  it('should fail for HTML fieldset without legend', () => {
    htmlRuleTester.run('fieldset-legend', fieldsetLegend, {
      valid: [],
      invalid: [
        {
          code: 'const html = "<fieldset></fieldset>"',
          errors: [
            {
              messageId: 'missingLegend'
            }
          ]
        }
      ]
    })
  })
})

describe('fieldset-legend rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue fieldset with legend', () => {
    vueRuleTester.run('fieldset-legend', fieldsetLegend, {
      valid: [
        {
          code: '<template><fieldset><legend>Section</legend></fieldset></template>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for Vue fieldset without legend', () => {
    vueRuleTester.run('fieldset-legend', fieldsetLegend, {
      valid: [],
      invalid: [
        {
          code: '<template><fieldset></fieldset></template>',
          errors: [
            {
              messageId: 'missingLegend'
            }
          ]
        }
      ]
    })
  })
})

