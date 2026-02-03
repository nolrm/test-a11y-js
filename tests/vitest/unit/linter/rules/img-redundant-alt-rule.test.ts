import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { getRule } from './rule-test-helper'

const imgRedundantAlt = getRule('img-redundant-alt')

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

describe('img-redundant-alt rule - JSX', () => {
  it('should pass for images with descriptive alt text', () => {
    ruleTester.run('img-redundant-alt', imgRedundantAlt, {
      valid: [
        { code: '<img src="cat.jpg" alt="A fluffy orange cat sleeping on a couch" />' },
        { code: '<img src="team.jpg" alt="Our development team at the 2024 conference" />' },
        { code: '<img src="chart.png" alt="Sales growth from Q1 to Q4" />' },
        { code: '<img src="sunset.jpg" alt="Sunset over the Pacific Ocean" />' }
      ],
      invalid: []
    })
  })

  it('should pass for images with empty alt (decorative)', () => {
    ruleTester.run('img-redundant-alt', imgRedundantAlt, {
      valid: [
        { code: '<img src="decorative.png" alt="" />' }
      ],
      invalid: []
    })
  })

  it('should pass for images with dynamic alt text', () => {
    ruleTester.run('img-redundant-alt', imgRedundantAlt, {
      valid: [
        { code: '<img src="product.jpg" alt={productDescription} />' },
        { code: '<img src={src} alt={alt} />' }
      ],
      invalid: []
    })
  })

  it('should fail for alt text containing "image"', () => {
    ruleTester.run('img-redundant-alt', imgRedundantAlt, {
      valid: [],
      invalid: [
        {
          code: '<img src="cat.jpg" alt="Image of a cat" />',
          errors: [{ messageId: 'redundantAlt', data: { word: 'image' } }]
        },
        {
          code: '<img src="logo.png" alt="Company logo image" />',
          errors: [{ messageId: 'redundantAlt', data: { word: 'image' } }]
        }
      ]
    })
  })

  it('should fail for alt text containing "photo"', () => {
    ruleTester.run('img-redundant-alt', imgRedundantAlt, {
      valid: [],
      invalid: [
        {
          code: '<img src="team.jpg" alt="Photo of our team" />',
          errors: [{ messageId: 'redundantAlt', data: { word: 'photo' } }]
        },
        {
          code: '<img src="profile.jpg" alt="Profile photo" />',
          errors: [{ messageId: 'redundantAlt', data: { word: 'photo' } }]
        }
      ]
    })
  })

  it('should fail for alt text containing "picture"', () => {
    ruleTester.run('img-redundant-alt', imgRedundantAlt, {
      valid: [],
      invalid: [
        {
          code: '<img src="scenery.jpg" alt="Picture of mountains" />',
          errors: [{ messageId: 'redundantAlt', data: { word: 'picture' } }]
        }
      ]
    })
  })

  it('should fail for alt text containing "graphic" or "icon"', () => {
    ruleTester.run('img-redundant-alt', imgRedundantAlt, {
      valid: [],
      invalid: [
        {
          code: '<img src="chart.png" alt="Graphic showing sales" />',
          errors: [{ messageId: 'redundantAlt', data: { word: 'graphic' } }]
        },
        {
          code: '<img src="settings.svg" alt="Settings icon" />',
          errors: [{ messageId: 'redundantAlt', data: { word: 'icon' } }]
        }
      ]
    })
  })

  it('should allow custom redundant words configuration', () => {
    ruleTester.run('img-redundant-alt', imgRedundantAlt, {
      valid: [
        {
          code: '<img src="cat.jpg" alt="Image of a cat" />',
          options: [{ words: ['screenshot'] }]
        }
      ],
      invalid: [
        {
          code: '<img src="app.png" alt="Screenshot of the app" />',
          options: [{ words: ['screenshot'] }],
          errors: [{ messageId: 'redundantAlt', data: { word: 'screenshot' } }]
        }
      ]
    })
  })
})

describe('img-redundant-alt rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue images with descriptive alt', () => {
    vueRuleTester.run('img-redundant-alt', imgRedundantAlt, {
      valid: [
        { code: '<template><img src="cat.jpg" alt="A fluffy cat" /></template>' }
      ],
      invalid: []
    })
  })

  it('should fail for Vue images with redundant alt', () => {
    vueRuleTester.run('img-redundant-alt', imgRedundantAlt, {
      valid: [],
      invalid: [
        {
          code: '<template><img src="cat.jpg" alt="Image of a cat" /></template>',
          errors: [{ messageId: 'redundantAlt', data: { word: 'image' } }]
        }
      ]
    })
  })
})
