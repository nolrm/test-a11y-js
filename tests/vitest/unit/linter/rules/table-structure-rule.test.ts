import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { tableStructure } from './rule-test-helper'

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

describe('table-structure rule - JSX', () => {
  it('should pass for table with caption and headers', () => {
    ruleTester.run('table-structure', tableStructure, {
      valid: [
        {
          code: '<table><caption>Test</caption><tr><th scope="col">Header</th></tr><tr><td>Data</td></tr></table>'
        },
        {
          code: '<table aria-label="Test"><tr><th scope="row">Header</th><td>Data</td></tr></table>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for table without caption or aria-label', () => {
    ruleTester.run('table-structure', tableStructure, {
      valid: [],
      invalid: [
        {
          code: '<table><tr><td>Data</td></tr></table>',
          errors: [
            {
              messageId: 'missingCaption'
            }
          ]
        }
      ]
    })
  })

  it('should fail for table without header cells', () => {
    ruleTester.run('table-structure', tableStructure, {
      valid: [],
      invalid: [
        {
          code: '<table><caption>Test</caption><tr><td>Data</td></tr></table>',
          errors: [
            {
              messageId: 'missingHeaders'
            }
          ]
        }
      ]
    })
  })
})

describe('table-structure rule - HTML strings', () => {
  const htmlRuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for HTML table with caption', () => {
    htmlRuleTester.run('table-structure', tableStructure, {
      valid: [
        {
          code: 'const html = "<table><caption>Test</caption><tr><th scope=\\"col\\">Header</th></tr></table>"'
        }
      ],
      invalid: []
    })
  })

  it('should fail for HTML table without caption', () => {
    htmlRuleTester.run('table-structure', tableStructure, {
      valid: [],
      invalid: [
        {
          code: 'const html = "<table><tr><td>Data</td></tr></table>"',
          errors: [
            {
              messageId: 'missingCaption'
            }
          ]
        }
      ]
    })
  })
})

describe('table-structure rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue table with caption', () => {
    vueRuleTester.run('table-structure', tableStructure, {
      valid: [
        {
          code: '<template><table><caption>Test</caption><tr><th scope="col">Header</th></tr></table></template>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for Vue table without caption', () => {
    vueRuleTester.run('table-structure', tableStructure, {
      valid: [],
      invalid: [
        {
          code: '<template><table><tr><td>Data</td></tr></table></template>',
          errors: [
            {
              messageId: 'missingCaption'
            }
          ]
        }
      ]
    })
  })
})

