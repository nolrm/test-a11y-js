import { describe, it, expect, beforeAll } from 'vitest'
import { ESLint } from 'eslint'
import { join } from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

/**
 * Component mapping integration tests
 * 
 * These tests verify that component mapping works with ESLint
 */
describe('Component Mapping Integration', () => {

  it('should lint custom Link component as anchor', async () => {
    const pluginPath = join(process.cwd(), 'dist/linter/eslint-plugin/index.js')
    const plugin = require(pluginPath).default
    
    const eslintWithSettings = new ESLint({
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
          'test-a11y-js/link-text': 'warn'
        },
        settings: {
          'test-a11y-js': {
            components: {
              Link: 'a'
            }
          }
        }
      }
    })

    const results = await eslintWithSettings.lintText(
      '<Link href="/about">Click here</Link>',
      { filePath: 'test.tsx' }
    )

    expect(results).toHaveLength(1)
    const linkTextErrors = results[0].messages.filter(m => m.ruleId === 'test-a11y-js/link-text')
    expect(linkTextErrors.length).toBeGreaterThan(0)
  })

  it('should lint custom Button component as button', async () => {
    const pluginPath = join(process.cwd(), 'dist/linter/eslint-plugin/index.js')
    const plugin = require(pluginPath).default
    
    const eslintWithSettings = new ESLint({
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
          'test-a11y-js/button-label': 'error'
        },
        settings: {
          'test-a11y-js': {
            components: {
              Button: 'button'
            }
          }
        }
      }
    })

    const results = await eslintWithSettings.lintText(
      '<Button></Button>',
      { filePath: 'test.tsx' }
    )

    expect(results).toHaveLength(1)
    const buttonErrors = results[0].messages.filter(m => m.ruleId === 'test-a11y-js/button-label')
    expect(buttonErrors.length).toBeGreaterThan(0)
  })

  it('should handle polymorphic components', async () => {
    const pluginPath = join(process.cwd(), 'dist/linter/eslint-plugin/index.js')
    const plugin = require(pluginPath).default
    
    const eslintWithSettings = new ESLint({
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
          'test-a11y-js/link-text': 'warn'
        },
        settings: {
          'test-a11y-js': {
            polymorphicPropNames: ['as']
          }
        }
      }
    })

    const results = await eslintWithSettings.lintText(
      '<Link as="a" href="/about">Click here</Link>',
      { filePath: 'test.tsx' }
    )

    expect(results).toHaveLength(1)
    const linkTextErrors = results[0].messages.filter(m => m.ruleId === 'test-a11y-js/link-text')
    expect(linkTextErrors.length).toBeGreaterThan(0)
  })
})
