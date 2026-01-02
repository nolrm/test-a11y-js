import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { landmarkRoles } from './rule-test-helper'

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

describe('landmark-roles rule - JSX', () => {
  it('should pass for single main element', () => {
    ruleTester.run('landmark-roles', landmarkRoles, {
      valid: [
        {
          code: '<main><h1>Main Content</h1></main>'
        },
        {
          code: '<div><main>Content</main></div>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for multiple main elements', () => {
    ruleTester.run('landmark-roles', landmarkRoles, {
      valid: [],
      invalid: [
        {
          code: '<div><main>First</main><main>Second</main></div>',
          errors: [
            {
              messageId: 'multipleMain'
            }
          ]
        }
      ]
    })
  })

  it('should pass for section with heading', () => {
    ruleTester.run('landmark-roles', landmarkRoles, {
      valid: [
        {
          code: '<section><h2>Section Title</h2></section>'
        },
        {
          code: '<section><h3>Subsection</h3></section>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for section without accessible name', () => {
    ruleTester.run('landmark-roles', landmarkRoles, {
      valid: [],
      invalid: [
        {
          code: '<section><div>Content without heading</div></section>',
          errors: [
            {
              messageId: 'missingName'
            }
          ]
        }
      ]
    })
  })

  it('should pass for section with aria-label', () => {
    ruleTester.run('landmark-roles', landmarkRoles, {
      valid: [
        {
          code: '<section aria-label="Content Section"><div>Content</div></section>'
        }
      ],
      invalid: []
    })
  })

  it('should pass for nav with aria-label', () => {
    ruleTester.run('landmark-roles', landmarkRoles, {
      valid: [
        {
          code: '<nav aria-label="Main navigation"><ul><li>Link</li></ul></nav>'
        }
      ],
      invalid: []
    })
  })
})

describe('landmark-roles rule - HTML strings', () => {
  const htmlRuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for HTML with single main', () => {
    htmlRuleTester.run('landmark-roles', landmarkRoles, {
      valid: [
        {
          code: 'const html = "<main><h1>Content</h1></main>"'
        }
      ],
      invalid: []
    })
  })

  it('should fail for HTML with multiple main', () => {
    htmlRuleTester.run('landmark-roles', landmarkRoles, {
      valid: [],
      invalid: [
        {
          code: 'const html = "<main>First</main><main>Second</main>"',
          errors: [
            {
              messageId: 'multipleMain'
            }
          ]
        }
      ]
    })
  })
})

describe('landmark-roles rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue with single main', () => {
    vueRuleTester.run('landmark-roles', landmarkRoles, {
      valid: [
        {
          code: '<template><main><h1>Content</h1></main></template>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for Vue with multiple main', () => {
    vueRuleTester.run('landmark-roles', landmarkRoles, {
      valid: [],
      invalid: [
        {
          code: '<template><main>First</main><main>Second</main></template>',
          errors: [
            {
              messageId: 'multipleMain'
            }
          ]
        }
      ]
    })
  })

  it('should pass for Vue section with heading', () => {
    vueRuleTester.run('landmark-roles', landmarkRoles, {
      valid: [
        {
          code: '<template><section><h2>Title</h2></section></template>'
        }
      ],
      invalid: []
    })
  })
})

