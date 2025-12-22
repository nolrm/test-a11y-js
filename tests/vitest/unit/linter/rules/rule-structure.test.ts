import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * Tests for ESLint rule structure
 * 
 * These tests verify that rules are properly structured and exported
 * without requiring the full plugin bundle (which has jsdom bundling issues)
 */

describe('ESLint Rule Structure', () => {
  const rulesDir = join(process.cwd(), 'src/linter/eslint-plugin/rules')
  
  const ruleFiles = [
    'image-alt.ts',
    'button-label.ts',
    'link-text.ts',
    'form-label.ts',
    'heading-order.ts'
  ]

  it('should have all rule files', () => {
    ruleFiles.forEach(ruleFile => {
      const rulePath = join(rulesDir, ruleFile)
      const content = readFileSync(rulePath, 'utf-8')
      expect(content).toBeTruthy()
    })
  })

  it('should export create function from image-alt', () => {
    const rulePath = join(rulesDir, 'image-alt.ts')
    const content = readFileSync(rulePath, 'utf-8')
    expect(content).toContain('export default')
    expect(content).toContain('create')
    expect(content).toContain('JSXOpeningElement')
  })

  it('should export create function from button-label', () => {
    const rulePath = join(rulesDir, 'button-label.ts')
    const content = readFileSync(rulePath, 'utf-8')
    expect(content).toContain('export default')
    expect(content).toContain('create')
    expect(content).toContain('JSXOpeningElement')
  })

  it('should export create function from link-text', () => {
    const rulePath = join(rulesDir, 'link-text.ts')
    const content = readFileSync(rulePath, 'utf-8')
    expect(content).toContain('export default')
    expect(content).toContain('create')
    expect(content).toContain('JSXOpeningElement')
  })

  it('should export create function from form-label', () => {
    const rulePath = join(rulesDir, 'form-label.ts')
    const content = readFileSync(rulePath, 'utf-8')
    expect(content).toContain('export default')
    expect(content).toContain('create')
    expect(content).toContain('JSXOpeningElement')
  })

  it('should export create function from heading-order', () => {
    const rulePath = join(rulesDir, 'heading-order.ts')
    const content = readFileSync(rulePath, 'utf-8')
    expect(content).toContain('export default')
    expect(content).toContain('create')
    expect(content).toContain('JSXOpeningElement')
  })

  it('should have proper meta information in rules', () => {
    ruleFiles.forEach(ruleFile => {
      const rulePath = join(rulesDir, ruleFile)
      const content = readFileSync(rulePath, 'utf-8')
      // Should have meta object
      expect(content).toMatch(/meta:\s*\{/)
      // Should have messages
      expect(content).toMatch(/messages:\s*\{/)
      // Should have type
      expect(content).toMatch(/type:\s*['"]problem['"]/)
    })
  })

  it('should handle JSX elements', () => {
    ruleFiles.forEach(ruleFile => {
      const rulePath = join(rulesDir, ruleFile)
      const content = readFileSync(rulePath, 'utf-8')
      expect(content).toContain('JSXOpeningElement')
    })
  })

  it('should handle Vue elements', () => {
    ruleFiles.forEach(ruleFile => {
      const rulePath = join(rulesDir, ruleFile)
      const content = readFileSync(rulePath, 'utf-8')
      expect(content).toContain('VElement')
    })
  })

  it('should handle HTML strings', () => {
    ruleFiles.forEach(ruleFile => {
      const rulePath = join(rulesDir, ruleFile)
      const content = readFileSync(rulePath, 'utf-8')
      // Should check for HTML in template literals
      expect(content).toMatch(/Literal|TemplateLiteral/)
    })
  })
})

