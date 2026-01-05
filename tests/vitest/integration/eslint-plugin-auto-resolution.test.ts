import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

/**
 * Tests that ESLint can automatically resolve the plugin by name
 * 
 * This is the key test after renaming to eslint-plugin-test-a11y-js.
 * It verifies that ESLint's plugin resolution mechanism works correctly.
 */

describe('ESLint Plugin Auto-Resolution', () => {
  it('should have correct package name for ESLint auto-resolution', () => {
    const packageJsonPath = join(process.cwd(), 'package.json')
    const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    
    expect(pkg.name).toMatch(/^eslint-plugin-/)
    const pluginName = pkg.name.replace(/^eslint-plugin-/, '')
    expect(pluginName).toBe('test-a11y-js')
  })
  
  it('should have main export pointing to ESLint plugin', () => {
    const packageJsonPath = join(process.cwd(), 'package.json')
    const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    
    expect(pkg.main).toBe('dist/linter/eslint-plugin/index.js')
    expect(pkg.exports['.']).toBeDefined()
    expect(pkg.exports['.'].require).toBe('./dist/linter/eslint-plugin/index.js')
  })
  
  it('should have core library at ./core export', () => {
    const packageJsonPath = join(process.cwd(), 'package.json')
    const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    
    expect(pkg.exports['./core']).toBeDefined()
    expect(pkg.exports['./core'].require).toBe('./dist/index.js')
  })
  
  it('should be importable as ESLint plugin', () => {
    const pluginPath = join(process.cwd(), 'dist/linter/eslint-plugin/index.js')
    const plugin = require(pluginPath).default
    
    expect(plugin).toBeDefined()
    expect(plugin.meta).toBeDefined()
    expect(plugin.meta.name).toBe('eslint-plugin-test-a11y-js')
    expect(plugin.rules).toBeDefined()
    expect(plugin.configs).toBeDefined()
  })
  
  it('should be importable as core library from ./core', () => {
    const corePath = join(process.cwd(), 'dist/index.js')
    const core = require(corePath)
    
    expect(core.A11yChecker).toBeDefined()
  })
})

