import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { videoCaptions } from './rule-test-helper'

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

describe('video-captions rule - JSX', () => {
  it('should pass for video with valid caption track', () => {
    ruleTester.run('video-captions', videoCaptions, {
      valid: [
        {
          code: '<video><source src="video.mp4" /><track kind="captions" srclang="en" label="English" /></video>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for video without caption tracks', () => {
    ruleTester.run('video-captions', videoCaptions, {
      valid: [],
      invalid: [
        {
          code: '<video><source src="video.mp4" /></video>',
          errors: [
            {
              messageId: 'missingCaptions'
            }
          ]
        }
      ]
    })
  })
})

describe('video-captions rule - HTML strings', () => {
  const htmlRuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for HTML video with captions', () => {
    htmlRuleTester.run('video-captions', videoCaptions, {
      valid: [
        {
          code: 'const html = "<video><track kind=\\"captions\\" srclang=\\"en\\" /></video>"'
        }
      ],
      invalid: []
    })
  })

  it('should fail for HTML video without captions', () => {
    htmlRuleTester.run('video-captions', videoCaptions, {
      valid: [],
      invalid: [
        {
          code: 'const html = "<video><source src=\\"video.mp4\\" /></video>"',
          errors: [
            {
              messageId: 'missingCaptions'
            }
          ]
        }
      ]
    })
  })
})

describe('video-captions rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue video with captions', () => {
    vueRuleTester.run('video-captions', videoCaptions, {
      valid: [
        {
          code: '<template><video><track kind="captions" srclang="en" label="English" /></video></template>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for Vue video without captions', () => {
    vueRuleTester.run('video-captions', videoCaptions, {
      valid: [],
      invalid: [
        {
          code: '<template><video><source src="video.mp4" /></video></template>',
          errors: [
            {
              messageId: 'missingCaptions'
            }
          ]
        }
      ]
    })
  })
})

