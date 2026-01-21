import { describe, it, expect, beforeAll } from 'vitest'
import { ESLint } from 'eslint'
import { join } from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

describe('ESLint Suggestions Integration', () => {
  let eslint: ESLint

  beforeAll(() => {
    const pluginPath = join(process.cwd(), 'dist/linter/eslint-plugin/index.js')
    const plugin = require(pluginPath).default
    
    eslint = new ESLint({
      useEslintrc: false,
      plugins: {
        'test-a11y-js': plugin
      },
      baseConfig: {
        parser: require.resolve('@typescript-eslint/parser'),
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true
          }
        },
        rules: {
          'test-a11y-js/iframe-title': 'error',
          'test-a11y-js/button-label': 'error',
          'test-a11y-js/link-text': 'warn',
          'test-a11y-js/heading-order': 'warn'
        }
      }
    })
  })

  describe('suggestions are available', () => {
    it('should detect violations that support suggestions', async () => {
      // Test that rules with suggestions work correctly
      // Note: Suggestions are tested in unit tests; here we verify rules work
      const results = await eslint.lintText(
        '<iframe src="/page.html" /><button></button><a href="/about">Click here</a>',
        { filePath: 'test.tsx' }
      )

      expect(results).toHaveLength(1)
      const messages = results[0].messages
      
      // Verify rules trigger
      expect(messages.some(m => m.ruleId === 'test-a11y-js/iframe-title')).toBe(true)
      expect(messages.some(m => m.ruleId === 'test-a11y-js/button-label')).toBe(true)
      expect(messages.some(m => m.ruleId === 'test-a11y-js/link-text')).toBe(true)
    })
  })
})
