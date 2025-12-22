import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * Tests for Vue-specific rule support
 * 
 * These tests verify that rules properly handle Vue template syntax
 */

describe('Vue Rule Support', () => {
  const rulesDir = join(process.cwd(), 'src/linter/eslint-plugin/rules')
  
  const ruleFiles = [
    'image-alt.ts',
    'button-label.ts',
    'link-text.ts',
    'form-label.ts',
    'heading-order.ts'
  ]

  it('should handle VElement nodes in all rules', () => {
    ruleFiles.forEach(ruleFile => {
      const rulePath = join(rulesDir, ruleFile)
      const content = readFileSync(rulePath, 'utf-8')
      // Should have VElement visitor
      expect(content).toContain('VElement')
    })
  })

  it('should use vue-ast-utils for Vue parsing', () => {
    ruleFiles.forEach(ruleFile => {
      const rulePath = join(rulesDir, ruleFile)
      const content = readFileSync(rulePath, 'utf-8')
      // Should import or use vue-ast-utils
      expect(content).toMatch(/vue-ast-utils|vueElementToDOM|getVueAttribute/)
    })
  })

  it('should handle Vue attribute syntax (:alt, v-bind:alt)', () => {
    const imageAltPath = join(rulesDir, 'image-alt.ts')
    const content = readFileSync(imageAltPath, 'utf-8')
    // Should handle dynamic Vue attributes
    expect(content).toMatch(/isVueAttributeDynamic|getVueAttribute/)
  })

  it('should handle Vue button attributes', () => {
    const buttonLabelPath = join(rulesDir, 'button-label.ts')
    const content = readFileSync(buttonLabelPath, 'utf-8')
    // Should check for aria-label in Vue
    expect(content).toMatch(/aria-label|getVueAttribute/)
  })

  it('should handle Vue form label associations', () => {
    const formLabelPath = join(rulesDir, 'form-label.ts')
    const content = readFileSync(formLabelPath, 'utf-8')
    // Should handle Vue label associations
    expect(content).toContain('VElement')
  })

  it('should handle Vue heading elements', () => {
    const headingOrderPath = join(rulesDir, 'heading-order.ts')
    const content = readFileSync(headingOrderPath, 'utf-8')
    // Should handle Vue heading elements
    expect(content).toContain('VElement')
  })
})

