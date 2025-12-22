import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

/**
 * Build verification tests
 * 
 * These tests verify that the build process correctly generates
 * all required files and that package.json exports are correct.
 */

const distPath = join(process.cwd(), 'dist')
const packageJsonPath = join(process.cwd(), 'package.json')

describe('Build Verification', () => {
  describe('Build output files', () => {
    it('should generate main entry point (CJS)', () => {
      const mainFile = join(distPath, 'index.js')
      expect(existsSync(mainFile)).toBe(true)
    })

    it('should generate module entry point (ESM)', () => {
      const moduleFile = join(distPath, 'index.mjs')
      expect(existsSync(moduleFile)).toBe(true)
    })

    it('should generate TypeScript definitions', () => {
      const typesFile = join(distPath, 'index.d.ts')
      expect(existsSync(typesFile)).toBe(true)
    })

    it('should generate ESLint plugin (CJS)', () => {
      const pluginFile = join(distPath, 'linter/eslint-plugin/index.js')
      expect(existsSync(pluginFile)).toBe(true)
    })

    it('should generate ESLint plugin (ESM)', () => {
      const pluginFile = join(distPath, 'linter/eslint-plugin/index.mjs')
      expect(existsSync(pluginFile)).toBe(true)
    })

    it('should generate ESLint plugin TypeScript definitions', () => {
      const pluginTypesFile = join(distPath, 'linter/eslint-plugin/index.d.ts')
      expect(existsSync(pluginTypesFile)).toBe(true)
    })
  })

  describe('Package.json exports', () => {
    it('should have correct exports configuration', () => {
      const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
      
      expect(pkg.exports).toBeDefined()
      expect(pkg.exports['.']).toBeDefined()
      expect(pkg.exports['./eslint-plugin']).toBeDefined()
    })

    it('should export main entry point correctly', () => {
      const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
      
      expect(pkg.exports['.'].import).toBe('./dist/index.mjs')
      expect(pkg.exports['.'].require).toBe('./dist/index.js')
      expect(pkg.exports['.'].types).toBe('./dist/index.d.ts')
    })

    it('should export eslint-plugin correctly', () => {
      const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
      
      expect(pkg.exports['./eslint-plugin'].import).toBe('./dist/linter/eslint-plugin/index.mjs')
      expect(pkg.exports['./eslint-plugin'].require).toBe('./dist/linter/eslint-plugin/index.js')
      expect(pkg.exports['./eslint-plugin'].types).toBe('./dist/linter/eslint-plugin/index.d.ts')
    })

    it('should have correct main, module, and types fields', () => {
      const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
      
      expect(pkg.main).toBe('dist/index.js')
      expect(pkg.module).toBe('dist/index.mjs')
      expect(pkg.types).toBe('dist/index.d.ts')
    })
  })

  describe('Build output content', () => {
    it('should have valid JavaScript in main file', () => {
      const mainFile = join(distPath, 'index.js')
      const content = readFileSync(mainFile, 'utf-8')
      
      // Basic sanity checks
      expect(content.length).toBeGreaterThan(0)
      expect(content).toContain('A11yChecker')
    })

    it('should have valid JavaScript in plugin file', () => {
      const pluginFile = join(distPath, 'linter/eslint-plugin/index.js')
      const content = readFileSync(pluginFile, 'utf-8')
      
      // Basic sanity checks
      expect(content.length).toBeGreaterThan(0)
      // Plugin should export rules and configs
      expect(content).toMatch(/rules|configs/)
    })
  })
})

