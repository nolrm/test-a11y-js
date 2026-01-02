import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { audioCaptions } from './rule-test-helper'

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

describe('audio-captions rule - JSX', () => {
  it('should pass for audio with valid track', () => {
    ruleTester.run('audio-captions', audioCaptions, {
      valid: [
        {
          code: '<audio><source src="audio.mp3" /><track srclang="en" label="English" /></audio>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for audio without tracks', () => {
    ruleTester.run('audio-captions', audioCaptions, {
      valid: [],
      invalid: [
        {
          code: '<audio><source src="audio.mp3" /></audio>',
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

describe('audio-captions rule - HTML strings', () => {
  const htmlRuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for HTML audio with track', () => {
    htmlRuleTester.run('audio-captions', audioCaptions, {
      valid: [
        {
          code: 'const html = "<audio><track srclang=\\"en\\" label=\\"English\\" /></audio>"'
        }
      ],
      invalid: []
    })
  })

  it('should fail for HTML audio without tracks', () => {
    htmlRuleTester.run('audio-captions', audioCaptions, {
      valid: [],
      invalid: [
        {
          code: 'const html = "<audio><source src=\\"audio.mp3\\" /></audio>"',
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

describe('audio-captions rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue audio with track', () => {
    vueRuleTester.run('audio-captions', audioCaptions, {
      valid: [
        {
          code: '<template><audio><track srclang="en" label="English" /></audio></template>'
        }
      ],
      invalid: []
    })
  })

  it('should fail for Vue audio without tracks', () => {
    vueRuleTester.run('audio-captions', audioCaptions, {
      valid: [],
      invalid: [
        {
          code: '<template><audio><source src="audio.mp3" /></audio></template>',
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

