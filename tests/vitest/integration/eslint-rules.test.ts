import { describe, it, expect, beforeAll } from 'vitest'
import { ESLint } from 'eslint'
import { join } from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

/**
 * Integration tests for ESLint rules
 * 
 * These tests run ESLint programmatically to verify rules work correctly
 */

describe('ESLint Rules Integration', () => {
  let eslint: ESLint

  beforeAll(() => {
    const pluginPath = join(process.cwd(), 'dist/linter/eslint-plugin/index.js')
    const plugin = require(pluginPath).default
    
    eslint = new ESLint({
      useEslintrc: false,
      plugins: {
        'test-a11y-js': plugin
      },
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'test-a11y-js/image-alt': 'error',
        'test-a11y-js/button-label': 'error',
        'test-a11y-js/link-text': 'warn',
        'test-a11y-js/form-label': 'error',
        'test-a11y-js/heading-order': 'warn'
      }
    })
  })

  describe('image-alt rule', () => {
    it('should detect missing alt attribute', async () => {
      const results = await eslint.lintText('<img src="test.jpg" />', {
        filePath: 'test.jsx'
      })

      expect(results[0].messages.length).toBeGreaterThan(0)
      expect(results[0].messages.some(msg => 
        msg.ruleId === 'test-a11y-js/image-alt'
      )).toBe(true)
    })

    it('should pass for image with alt', async () => {
      const results = await eslint.lintText('<img src="test.jpg" alt="Test" />', {
        filePath: 'test.jsx'
      })

      const imageAltErrors = results[0].messages.filter(msg => 
        msg.ruleId === 'test-a11y-js/image-alt'
      )
      expect(imageAltErrors.length).toBe(0)
    })
  })

  describe('button-label rule', () => {
    it('should detect button without label', async () => {
      const results = await eslint.lintText('<button></button>', {
        filePath: 'test.jsx'
      })

      expect(results[0].messages.length).toBeGreaterThan(0)
      expect(results[0].messages.some(msg => 
        msg.ruleId === 'test-a11y-js/button-label'
      )).toBe(true)
    })

    it('should pass for button with text', async () => {
      const results = await eslint.lintText('<button>Click me</button>', {
        filePath: 'test.jsx'
      })

      const buttonErrors = results[0].messages.filter(msg => 
        msg.ruleId === 'test-a11y-js/button-label'
      )
      expect(buttonErrors.length).toBe(0)
    })
  })

  describe('link-text rule', () => {
    it('should detect non-descriptive link text', async () => {
      const results = await eslint.lintText('<a href="/about">Click here</a>', {
        filePath: 'test.jsx'
      })

      expect(results[0].messages.some(msg => 
        msg.ruleId === 'test-a11y-js/link-text'
      )).toBe(true)
    })

    it('should pass for descriptive link text', async () => {
      const results = await eslint.lintText('<a href="/about">About Us</a>', {
        filePath: 'test.jsx'
      })

      const linkErrors = results[0].messages.filter(msg => 
        msg.ruleId === 'test-a11y-js/link-text'
      )
      expect(linkErrors.length).toBe(0)
    })
  })

  describe('form-label rule', () => {
    it('should detect input without label', async () => {
      const results = await eslint.lintText('<input type="text" />', {
        filePath: 'test.jsx'
      })

      expect(results[0].messages.some(msg => 
        msg.ruleId === 'test-a11y-js/form-label'
      )).toBe(true)
    })

    it('should pass for input with aria-label', async () => {
      const results = await eslint.lintText('<input type="text" aria-label="Name" />', {
        filePath: 'test.jsx'
      })

      const formErrors = results[0].messages.filter(msg => 
        msg.ruleId === 'test-a11y-js/form-label'
      )
      expect(formErrors.length).toBe(0)
    })
  })

  describe('heading-order rule', () => {
    it('should detect skipped heading levels', async () => {
      const results = await eslint.lintText('<h1>Title</h1><h3>Section</h3>', {
        filePath: 'test.jsx'
      })

      expect(results[0].messages.some(msg => 
        msg.ruleId === 'test-a11y-js/heading-order'
      )).toBe(true)
    })

    it('should pass for proper heading hierarchy', async () => {
      const results = await eslint.lintText('<h1>Title</h1><h2>Subtitle</h2>', {
        filePath: 'test.jsx'
      })

      const headingErrors = results[0].messages.filter(msg => 
        msg.ruleId === 'test-a11y-js/heading-order'
      )
      expect(headingErrors.length).toBe(0)
    })
  })
})

