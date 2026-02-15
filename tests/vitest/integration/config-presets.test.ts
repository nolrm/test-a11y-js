import { describe, it, expect } from 'vitest'
import { join } from 'path'
import { createRequire } from 'module'

/**
 * Configuration Preset Tests
 *
 * Tests the built plugin's config objects with exact rule counts
 */

const require = createRequire(import.meta.url)

describe('ESLint Config Presets', () => {
  const pluginPath = join(process.cwd(), 'dist/linter/eslint-plugin/index.js')
  const plugin = require(pluginPath).default

  describe('Config Exports', () => {
    it('should export minimal config', () => {
      expect(plugin.configs.minimal).toBeDefined()
    })

    it('should export recommended config', () => {
      expect(plugin.configs.recommended).toBeDefined()
    })

    it('should export strict config', () => {
      expect(plugin.configs.strict).toBeDefined()
    })

    it('should export react config', () => {
      expect(plugin.configs.react).toBeDefined()
    })

    it('should export vue config', () => {
      expect(plugin.configs.vue).toBeDefined()
    })
  })

  describe('Minimal Config', () => {
    it('should have exactly 3 rules', () => {
      const rules = plugin.configs.minimal.rules
      const ruleCount = Object.keys(rules).length
      expect(ruleCount).toBe(3)
    })

    it('should include button-label, form-label, and image-alt as error', () => {
      const rules = plugin.configs.minimal.rules
      expect(rules['test-a11y-js/button-label']).toBe('error')
      expect(rules['test-a11y-js/form-label']).toBe('error')
      expect(rules['test-a11y-js/image-alt']).toBe('error')
    })
  })

  describe('Recommended Config', () => {
    it('should have exactly 24 rules', () => {
      const rules = plugin.configs.recommended.rules
      const ruleCount = Object.keys(rules).length
      expect(ruleCount).toBe(24)
    })

    it('should have critical rules as error', () => {
      const rules = plugin.configs.recommended.rules
      expect(rules['test-a11y-js/button-label']).toBe('error')
      expect(rules['test-a11y-js/form-label']).toBe('error')
      expect(rules['test-a11y-js/image-alt']).toBe('error')
      expect(rules['test-a11y-js/iframe-title']).toBe('error')
      expect(rules['test-a11y-js/video-captions']).toBe('error')
      expect(rules['test-a11y-js/audio-captions']).toBe('error')
    })

    it('should have moderate rules as warn', () => {
      const rules = plugin.configs.recommended.rules
      expect(rules['test-a11y-js/link-text']).toBe('warn')
      expect(rules['test-a11y-js/heading-order']).toBe('warn')
      expect(rules['test-a11y-js/landmark-roles']).toBe('warn')
    })
  })

  describe('Strict Config', () => {
    it('should have exactly 36 rules', () => {
      const rules = plugin.configs.strict.rules
      const ruleCount = Object.keys(rules).length
      expect(ruleCount).toBe(36)
    })

    it('should have all rules set to error', () => {
      const rules = plugin.configs.strict.rules
      const entries = Object.entries(rules)
      const allErrors = entries.every(([, severity]) => severity === 'error')
      expect(allErrors).toBe(true)
    })
  })

  describe('React Config', () => {
    it('should extend recommended rules', () => {
      const rules = plugin.configs.react.rules
      expect(rules).toBeDefined()
      expect(Object.keys(rules).length).toBeGreaterThanOrEqual(24)
    })

    it('should have JSX parser settings', () => {
      const config = plugin.configs.react
      // Classic configs use parserOptions at top level
      expect(config.parserOptions).toBeDefined()
      expect(config.parserOptions.ecmaFeatures?.jsx).toBe(true)
    })
  })

  describe('Vue Config', () => {
    it('should extend recommended rules', () => {
      const rules = plugin.configs.vue.rules
      expect(rules).toBeDefined()
      expect(Object.keys(rules).length).toBeGreaterThanOrEqual(24)
    })

    it('should have Vue parser settings', () => {
      const config = plugin.configs.vue
      // Classic configs use parser at top level
      expect(config.parser).toBeDefined()
    })
  })
})
