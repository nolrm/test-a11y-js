import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { getRule } from './rule-test-helper'

const headingHasContent = getRule('heading-has-content')

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

describe('heading-has-content rule - JSX', () => {
  it('should pass for headings with text content', () => {
    ruleTester.run('heading-has-content', headingHasContent, {
      valid: [
        { code: '<h1>Page Title</h1>' },
        { code: '<h2>Section Title</h2>' },
        { code: '<h3>Subsection</h3>' },
        { code: '<h4>Minor heading</h4>' },
        { code: '<h5>Small heading</h5>' },
        { code: '<h6>Smallest heading</h6>' }
      ],
      invalid: []
    })
  })

  it('should pass for headings with expression content', () => {
    ruleTester.run('heading-has-content', headingHasContent, {
      valid: [
        { code: '<h1>{title}</h1>' },
        { code: '<h2>{getTitle()}</h2>' },
        { code: '<h1>{title || "Default"}</h1>' }
      ],
      invalid: []
    })
  })

  it('should pass for headings with nested elements', () => {
    ruleTester.run('heading-has-content', headingHasContent, {
      valid: [
        { code: '<h1><span>Title</span></h1>' },
        { code: '<h2><Icon /> Section</h2>' },
        { code: '<h1><span className="highlight">Important</span></h1>' }
      ],
      invalid: []
    })
  })

  it('should pass for headings with aria-label', () => {
    ruleTester.run('heading-has-content', headingHasContent, {
      valid: [
        { code: '<h1 aria-label="Page Title"></h1>' },
        { code: '<h2 aria-label={title}></h2>' }
      ],
      invalid: []
    })
  })

  it('should pass for headings with aria-labelledby', () => {
    ruleTester.run('heading-has-content', headingHasContent, {
      valid: [
        { code: '<h1 aria-labelledby="title-id"></h1>' }
      ],
      invalid: []
    })
  })

  it('should pass for headings with title attribute', () => {
    ruleTester.run('heading-has-content', headingHasContent, {
      valid: [
        { code: '<h1 title="Page Title"></h1>' }
      ],
      invalid: []
    })
  })

  it('should pass for headings with dangerouslySetInnerHTML', () => {
    ruleTester.run('heading-has-content', headingHasContent, {
      valid: [
        { code: '<h1 dangerouslySetInnerHTML={{ __html: title }}></h1>' }
      ],
      invalid: []
    })
  })

  it('should fail for empty headings', () => {
    ruleTester.run('heading-has-content', headingHasContent, {
      valid: [],
      invalid: [
        {
          code: '<h1></h1>',
          errors: [{ messageId: 'headingMustHaveContent' }]
        },
        {
          code: '<h2></h2>',
          errors: [{ messageId: 'headingMustHaveContent' }]
        },
        {
          code: '<h3></h3>',
          errors: [{ messageId: 'headingMustHaveContent' }]
        }
      ]
    })
  })

  it('should fail for headings with only whitespace', () => {
    ruleTester.run('heading-has-content', headingHasContent, {
      valid: [],
      invalid: [
        {
          code: '<h1>   </h1>',
          errors: [{ messageId: 'headingMustHaveContent' }]
        },
        {
          code: '<h2>\n\t</h2>',
          errors: [{ messageId: 'headingMustHaveContent' }]
        }
      ]
    })
  })

  it('should fail for self-closing headings', () => {
    ruleTester.run('heading-has-content', headingHasContent, {
      valid: [],
      invalid: [
        {
          code: '<h1 />',
          errors: [{ messageId: 'headingMustHaveContent' }]
        },
        {
          code: '<h2 />',
          errors: [{ messageId: 'headingMustHaveContent' }]
        }
      ]
    })
  })
})

describe('heading-has-content rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue headings with content', () => {
    vueRuleTester.run('heading-has-content', headingHasContent, {
      valid: [
        { code: '<template><h1>Title</h1></template>' },
        { code: '<template><h2>Section</h2></template>' },
        { code: '<template><h1 aria-label="Title"></h1></template>' }
      ],
      invalid: []
    })
  })

  it('should pass for Vue headings with v-html', () => {
    vueRuleTester.run('heading-has-content', headingHasContent, {
      valid: [
        { code: '<template><h1 v-html="title"></h1></template>' }
      ],
      invalid: []
    })
  })

  it('should fail for Vue empty headings', () => {
    vueRuleTester.run('heading-has-content', headingHasContent, {
      valid: [],
      invalid: [
        {
          code: '<template><h1></h1></template>',
          errors: [{ messageId: 'headingMustHaveContent' }]
        }
      ]
    })
  })
})
