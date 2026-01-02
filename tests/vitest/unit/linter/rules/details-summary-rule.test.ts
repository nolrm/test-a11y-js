import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { detailsSummary } from './rule-test-helper'

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

describe('details-summary rule - JSX', () => {
  it('should pass for details with valid summary', () => {
    ruleTester.run('details-summary', detailsSummary, {
      valid: [
        {
          code: '<details><summary>Click to expand</summary><div>Content</div></details>'
        },
        {
          code: 'const Component = () => <details><summary>More info</summary></details>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for details without summary', () => {
    ruleTester.run('details-summary', detailsSummary, {
      valid: [],
      invalid: [
        {
          code: '<details><div>Content</div></details>',
          errors: [
            {
              messageId: 'missingSummary'
            }
          ]
        }
      ]
    })
  })

  it('should fail for details with empty summary', () => {
    ruleTester.run('details-summary', detailsSummary, {
      valid: [],
      invalid: [
        {
          code: '<details><summary></summary><div>Content</div></details>',
          errors: [
            {
              messageId: 'emptySummary'
            }
          ]
        }
      ]
    })
  })
})

describe('details-summary rule - HTML strings', () => {
  const htmlRuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for HTML details with summary', () => {
    htmlRuleTester.run('details-summary', detailsSummary, {
      valid: [
        {
          code: 'const html = "<details><summary>Expand</summary><div>Content</div></details>"'
        }
      ],
      invalid: []
    })
  })

  it('should fail for HTML details without summary', () => {
    htmlRuleTester.run('details-summary', detailsSummary, {
      valid: [],
      invalid: [
        {
          code: 'const html = "<details><div>Content</div></details>"',
          errors: [
            {
              messageId: 'missingSummary'
            }
          ]
        }
      ]
    })
  })
})

describe('details-summary rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue details with summary', () => {
    vueRuleTester.run('details-summary', detailsSummary, {
      valid: [
        {
          code: '<template><details><summary>Expand</summary><div>Content</div></details></template>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for Vue details without summary', () => {
    vueRuleTester.run('details-summary', detailsSummary, {
      valid: [],
      invalid: [
        {
          code: '<template><details><div>Content</div></details></template>',
          errors: [
            {
              messageId: 'missingSummary'
            }
          ]
        }
      ]
    })
  })
})

