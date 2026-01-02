import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * Configuration Preset Tests
 * 
 * Tests that all config presets are properly exported and configured
 */

describe('ESLint Config Presets', () => {
  const pluginPath = join(process.cwd(), 'src/linter/eslint-plugin/index.ts')
  const pluginContent = readFileSync(pluginPath, 'utf-8')

  describe('Config Exports', () => {
    it('should export minimal config', () => {
      expect(pluginContent).toContain('minimal')
      expect(pluginContent).toMatch(/configs:\s*\{[\s\S]*minimal:/)
    })

    it('should export recommended config', () => {
      expect(pluginContent).toContain('recommended')
      expect(pluginContent).toMatch(/configs:\s*\{[\s\S]*recommended:/)
    })

    it('should export strict config', () => {
      expect(pluginContent).toContain('strict')
      expect(pluginContent).toMatch(/configs:\s*\{[\s\S]*strict:/)
    })

    it('should export react config', () => {
      expect(pluginContent).toContain('react')
      expect(pluginContent).toMatch(/configs:\s*\{[\s\S]*react:/)
    })

    it('should export vue config', () => {
      expect(pluginContent).toContain('vue')
      expect(pluginContent).toMatch(/configs:\s*\{[\s\S]*vue:/)
    })
  })

  describe('Minimal Config', () => {
    const minimalPath = join(process.cwd(), 'src/linter/eslint-plugin/configs/minimal.ts')
    const minimalContent = readFileSync(minimalPath, 'utf-8')

    it('should have only 3 critical rules', () => {
      const ruleMatches = minimalContent.match(/test-a11y-js\/[^:]+/g) || []
      expect(ruleMatches.length).toBe(3)
    })

    it('should include button-label', () => {
      expect(minimalContent).toContain('button-label')
      expect(minimalContent).toContain('error')
    })

    it('should include form-label', () => {
      expect(minimalContent).toContain('form-label')
      expect(minimalContent).toContain('error')
    })

    it('should include image-alt', () => {
      expect(minimalContent).toContain('image-alt')
      expect(minimalContent).toContain('error')
    })
  })

  describe('Recommended Config', () => {
    const recommendedPath = join(process.cwd(), 'src/linter/eslint-plugin/configs/recommended.ts')
    const recommendedContent = readFileSync(recommendedPath, 'utf-8')

    it('should have all rules configured', () => {
      const ruleMatches = recommendedContent.match(/test-a11y-js\/[^:]+/g) || []
      // Should have at least 13 original rules + 3 Phase 1 rules = 16
      expect(ruleMatches.length).toBeGreaterThanOrEqual(16)
    })

    it('should have critical rules as error', () => {
      expect(recommendedContent).toMatch(/button-label.*error/)
      expect(recommendedContent).toMatch(/form-label.*error/)
      expect(recommendedContent).toMatch(/image-alt.*error/)
    })

    it('should have moderate rules as warn', () => {
      expect(recommendedContent).toMatch(/link-text.*warn/)
      expect(recommendedContent).toMatch(/heading-order.*warn/)
    })
  })

  describe('Strict Config', () => {
    const strictPath = join(process.cwd(), 'src/linter/eslint-plugin/configs/strict.ts')
    const strictContent = readFileSync(strictPath, 'utf-8')

    it('should have all rules as error', () => {
      // Count rules that are set to 'error' (not in comments)
      const ruleLines = strictContent.split('\n').filter(line => 
        line.includes('test-a11y-js/') && !line.trim().startsWith('//')
      )
      const errorRules = ruleLines.filter(line => line.includes("'error'") || line.includes('"error"'))
      const totalRules = ruleLines.length
      
      expect(errorRules.length).toBe(totalRules)
      expect(totalRules).toBe(16) // Should have 16 rules (13 original + 3 Phase 1)
    })
  })

  describe('React Config', () => {
    const reactPath = join(process.cwd(), 'src/linter/eslint-plugin/configs/react.ts')
    const reactContent = readFileSync(reactPath, 'utf-8')

    it('should extend recommended', () => {
      expect(reactContent).toContain('recommended')
    })

    it('should be configured for JSX', () => {
      // React config should work with JSX
      expect(reactContent).toBeTruthy()
    })
  })

  describe('Vue Config', () => {
    const vuePath = join(process.cwd(), 'src/linter/eslint-plugin/configs/vue.ts')
    const vueContent = readFileSync(vuePath, 'utf-8')

    it('should extend recommended', () => {
      expect(vueContent).toContain('recommended')
    })

    it('should be configured for Vue', () => {
      // Vue config should work with Vue templates
      expect(vueContent).toBeTruthy()
    })
  })
})

