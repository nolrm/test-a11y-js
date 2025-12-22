import { describe, it, expect } from 'vitest'
// Import from built version to test the actual export
// In a real scenario, users would import from 'test-a11y-js/eslint-plugin'
import eslintPlugin from '../../../../dist/linter/eslint-plugin/index.js'

describe('ESLint Plugin Structure', () => {
  it('should export a plugin object', () => {
    expect(eslintPlugin).toBeDefined()
    expect(typeof eslintPlugin).toBe('object')
  })

  it('should have meta information', () => {
    expect(eslintPlugin.meta).toBeDefined()
    expect(eslintPlugin.meta.name).toBe('test-a11y-js')
    expect(eslintPlugin.meta.version).toBe('0.2.0')
  })

  it('should have rules object (even if empty)', () => {
    expect(eslintPlugin.rules).toBeDefined()
    expect(typeof eslintPlugin.rules).toBe('object')
  })

  it('should have configs object', () => {
    expect(eslintPlugin.configs).toBeDefined()
    expect(typeof eslintPlugin.configs).toBe('object')
  })

  it('should have recommended config', () => {
    expect(eslintPlugin.configs.recommended).toBeDefined()
    expect(eslintPlugin.configs.recommended.plugins).toContain('test-a11y-js')
    expect(eslintPlugin.configs.recommended.rules).toBeDefined()
  })

  it('should have recommended rules configured', () => {
    const rules = eslintPlugin.configs.recommended.rules
    expect(rules).toHaveProperty('test-a11y-js/image-alt')
    expect(rules).toHaveProperty('test-a11y-js/button-label')
    expect(rules).toHaveProperty('test-a11y-js/link-text')
    expect(rules).toHaveProperty('test-a11y-js/form-label')
    expect(rules).toHaveProperty('test-a11y-js/heading-order')
    expect(rules).toHaveProperty('test-a11y-js/iframe-title')
  })

  it('should export all 6 rules', () => {
    expect(eslintPlugin.rules).toBeDefined()
    expect(eslintPlugin.rules).toHaveProperty('image-alt')
    expect(eslintPlugin.rules).toHaveProperty('button-label')
    expect(eslintPlugin.rules).toHaveProperty('link-text')
    expect(eslintPlugin.rules).toHaveProperty('form-label')
    expect(eslintPlugin.rules).toHaveProperty('heading-order')
    expect(eslintPlugin.rules).toHaveProperty('iframe-title')
  })

  it('should have rules with correct meta information', () => {
    const imageAltRule = eslintPlugin.rules['image-alt']
    expect(imageAltRule.meta.type).toBe('problem')
    expect(imageAltRule.meta.messages).toHaveProperty('missingAlt')
    
    const buttonLabelRule = eslintPlugin.rules['button-label']
    expect(buttonLabelRule.meta.type).toBe('problem')
    expect(buttonLabelRule.meta.messages).toHaveProperty('missingLabel')
    
    const linkTextRule = eslintPlugin.rules['link-text']
    expect(linkTextRule.meta.type).toBe('problem')
    expect(linkTextRule.meta.messages).toHaveProperty('missingText')
    
    const formLabelRule = eslintPlugin.rules['form-label']
    expect(formLabelRule.meta.type).toBe('problem')
    expect(formLabelRule.meta.messages).toHaveProperty('missingLabel')
    
    const headingOrderRule = eslintPlugin.rules['heading-order']
    expect(headingOrderRule.meta.type).toBe('problem')
    expect(headingOrderRule.meta.messages).toHaveProperty('skippedLevel')
    
    const iframeTitleRule = eslintPlugin.rules['iframe-title']
    expect(iframeTitleRule.meta.type).toBe('problem')
    expect(iframeTitleRule.meta.messages).toHaveProperty('missingTitle')
  })

  it('should have correct severity levels in recommended config', () => {
    const rules = eslintPlugin.configs.recommended.rules
    // Critical/Serious violations should be errors
    expect(rules['test-a11y-js/image-alt']).toBe('error')
    expect(rules['test-a11y-js/button-label']).toBe('error')
    expect(rules['test-a11y-js/form-label']).toBe('error')
    expect(rules['test-a11y-js/iframe-title']).toBe('error')
    
    // Moderate/Minor violations should be warnings
    expect(rules['test-a11y-js/link-text']).toBe('warn')
    expect(rules['test-a11y-js/heading-order']).toBe('warn')
  })

  it('should have strict configuration', () => {
    expect(eslintPlugin.configs.strict).toBeDefined()
    expect(eslintPlugin.configs.strict.plugins).toContain('test-a11y-js')
    expect(eslintPlugin.configs.strict.rules).toBeDefined()
    
    // All rules should be errors in strict mode
    const rules = eslintPlugin.configs.strict.rules
    expect(rules['test-a11y-js/image-alt']).toBe('error')
    expect(rules['test-a11y-js/button-label']).toBe('error')
    expect(rules['test-a11y-js/link-text']).toBe('error')
    expect(rules['test-a11y-js/form-label']).toBe('error')
    expect(rules['test-a11y-js/heading-order']).toBe('error')
  })

  it('should have react configuration', () => {
    expect(eslintPlugin.configs.react).toBeDefined()
    expect(eslintPlugin.configs.react.plugins).toContain('test-a11y-js')
    expect(eslintPlugin.configs.react.parser).toBe('@typescript-eslint/parser')
    expect(eslintPlugin.configs.react.parserOptions).toBeDefined()
    expect(eslintPlugin.configs.react.parserOptions.ecmaFeatures.jsx).toBe(true)
  })

  it('should have vue configuration', () => {
    expect(eslintPlugin.configs.vue).toBeDefined()
    expect(eslintPlugin.configs.vue.plugins).toContain('test-a11y-js')
    expect(eslintPlugin.configs.vue.parser).toBe('vue-eslint-parser')
    expect(eslintPlugin.configs.vue.parserOptions).toBeDefined()
    expect(eslintPlugin.configs.vue.parserOptions.parser).toBe('@typescript-eslint/parser')
  })
})

