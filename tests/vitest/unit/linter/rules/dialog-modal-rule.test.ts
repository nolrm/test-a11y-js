import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { dialogModal } from './rule-test-helper'

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

describe('dialog-modal rule - JSX', () => {
  it('should pass for dialog with heading', () => {
    ruleTester.run('dialog-modal', dialogModal, {
      valid: [
        {
          code: '<dialog><h2>Dialog Title</h2><div>Content</div></dialog>'
        },
        {
          code: '<dialog><h3>Confirmation</h3></dialog>'
        }
      ],
      invalid: []
    })
  })

  it('should pass for dialog with aria-label', () => {
    ruleTester.run('dialog-modal', dialogModal, {
      valid: [
        {
          code: '<dialog aria-label="Confirmation Dialog"><div>Content</div></dialog>'
        },
        {
          code: '<dialog aria-labelledby="dialog-title"><h2 id="dialog-title">Title</h2></dialog>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for dialog without accessible name', () => {
    ruleTester.run('dialog-modal', dialogModal, {
      valid: [],
      invalid: [
        {
          code: '<dialog><div>Content without heading</div></dialog>',
          errors: [
            {
              messageId: 'missingName'
            }
          ]
        }
      ]
    })
  })

  it('should fail for modal dialog without aria-modal', () => {
    ruleTester.run('dialog-modal', dialogModal, {
      valid: [],
      invalid: [
        {
          code: '<dialog open><h2>Modal Title</h2></dialog>',
          errors: [
            {
              messageId: 'missingModal'
            }
          ]
        }
      ]
    })
  })

  it('should pass for modal dialog with aria-modal', () => {
    ruleTester.run('dialog-modal', dialogModal, {
      valid: [
        {
          code: '<dialog open aria-modal="true"><h2>Modal Title</h2></dialog>'
        },
        {
          code: '<dialog aria-modal="true" aria-label="Dialog"><div>Content</div></dialog>'
        }
      ],
      invalid: []
    })
  })
})

describe('dialog-modal rule - HTML strings', () => {
  const htmlRuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for HTML dialog with heading', () => {
    htmlRuleTester.run('dialog-modal', dialogModal, {
      valid: [
        {
          code: 'const html = "<dialog><h2>Title</h2></dialog>"'
        }
      ],
      invalid: []
    })
  })

  it('should fail for HTML dialog without name', () => {
    htmlRuleTester.run('dialog-modal', dialogModal, {
      valid: [],
      invalid: [
        {
          code: 'const html = "<dialog><div>Content</div></dialog>"',
          errors: [
            {
              messageId: 'missingName'
            }
          ]
        }
      ]
    })
  })
})

describe('dialog-modal rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue dialog with heading', () => {
    vueRuleTester.run('dialog-modal', dialogModal, {
      valid: [
        {
          code: '<template><dialog><h2>Dialog Title</h2></dialog></template>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for Vue dialog without name', () => {
    vueRuleTester.run('dialog-modal', dialogModal, {
      valid: [],
      invalid: [
        {
          code: '<template><dialog><div>Content</div></dialog></template>',
          errors: [
            {
              messageId: 'missingName'
            }
          ]
        }
      ]
    })
  })

  it('should pass for Vue modal dialog with aria-modal', () => {
    vueRuleTester.run('dialog-modal', dialogModal, {
      valid: [
        {
          code: '<template><dialog open aria-modal="true"><h2>Modal</h2></dialog></template>'
        }
      ],
      invalid: []
    })
  })
})

