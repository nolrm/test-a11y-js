import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

/**
 * Tests for ESLint rule structure
 *
 * These tests verify that all 36 rules are properly structured and exported
 * without requiring the full plugin bundle (which has jsdom bundling issues)
 */

describe('ESLint Rule Structure', () => {
  const rulesDir = join(process.cwd(), 'src/linter/eslint-plugin/rules')

  // Dynamically read all rule files from the rules directory
  const ruleFiles = readdirSync(rulesDir)
    .filter(f => f.endsWith('.ts') && !f.startsWith('index'))
    .sort()

  it('should have exactly 36 rule files', () => {
    expect(ruleFiles.length).toBe(36)
  })

  it('should have all rule files readable', () => {
    ruleFiles.forEach(ruleFile => {
      const rulePath = join(rulesDir, ruleFile)
      const content = readFileSync(rulePath, 'utf-8')
      expect(content).toBeTruthy()
    })
  })

  it('should export default with create function in every rule', () => {
    ruleFiles.forEach(ruleFile => {
      const rulePath = join(rulesDir, ruleFile)
      const content = readFileSync(rulePath, 'utf-8')
      expect(content, `${ruleFile} should have export default`).toContain('export default')
      expect(content, `${ruleFile} should have create function`).toContain('create')
    })
  })

  it('should have proper meta information in every rule', () => {
    ruleFiles.forEach(ruleFile => {
      const rulePath = join(rulesDir, ruleFile)
      const content = readFileSync(rulePath, 'utf-8')
      expect(content, `${ruleFile} should have meta object`).toMatch(/meta:\s*\{/)
      expect(content, `${ruleFile} should have messages`).toMatch(/messages:\s*\{/)
      expect(content, `${ruleFile} should have type`).toMatch(/type:\s*['"](?:problem|suggestion)['"]/)
    })
  })

  it('should handle JSX elements in every rule', () => {
    ruleFiles.forEach(ruleFile => {
      const rulePath = join(rulesDir, ruleFile)
      const content = readFileSync(rulePath, 'utf-8')
      expect(content, `${ruleFile} should handle JSX`).toMatch(/JSXOpeningElement|JSXElement/)
    })
  })

  it('should handle Vue elements in every rule', () => {
    ruleFiles.forEach(ruleFile => {
      const rulePath = join(rulesDir, ruleFile)
      const content = readFileSync(rulePath, 'utf-8')
      expect(content, `${ruleFile} should handle VElement`).toContain('VElement')
    })
  })
})
