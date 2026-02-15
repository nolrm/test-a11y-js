import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

/**
 * Binary Smoke Test
 *
 * Tests that bin/eslint-with-progress.js exists, has a shebang, and runs without crashing
 */

describe('bin/eslint-with-progress.js', () => {
  const binPath = join(process.cwd(), 'bin/eslint-with-progress.js')

  it('should exist', () => {
    expect(existsSync(binPath)).toBe(true)
  })

  it('should have a node shebang', () => {
    const content = readFileSync(binPath, 'utf-8')
    expect(content.startsWith('#!/usr/bin/env node')).toBe(true)
  })

  it('should load without syntax errors', () => {
    // Use node --check to validate syntax without executing
    const result = execSync(`node --check "${binPath}" 2>&1`, { encoding: 'utf-8' })
    // --check produces no output on success
    expect(result.trim()).toBe('')
  })

  it('should reference the formatter from dist', () => {
    const content = readFileSync(binPath, 'utf-8')
    expect(content).toContain('formatter')
    expect(content).toContain('dist')
  })

  it('should use ESLint API', () => {
    const content = readFileSync(binPath, 'utf-8')
    expect(content).toContain("require('eslint')")
    expect(content).toContain('ESLint')
  })
})
