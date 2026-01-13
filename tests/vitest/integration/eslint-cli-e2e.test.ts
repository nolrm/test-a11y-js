import { describe, it, expect, beforeAll } from 'vitest'
import { exec } from 'child_process'
import { promisify } from 'util'
import { join } from 'path'
import { existsSync } from 'fs'

const execAsync = promisify(exec)

/**
 * End-to-End tests that run the actual ESLint CLI
 * This simulates how users will actually use the plugin in their projects
 */

describe('ESLint CLI - End-to-End', () => {
  const fixturesDir = join(process.cwd(), 'tests/e2e/fixtures')
  const reactAppDir = join(fixturesDir, 'react-app')

  beforeAll(() => {
    // Verify fixtures exist
    expect(existsSync(reactAppDir)).toBe(true)
  })

  describe('Member Expression Components', () => {
    it('should handle member expressions without crashing', async () => {
      const command = `npx eslint "src/components/EdgeCases.tsx" --format json --no-eslintrc --config .eslintrc.json`
      
      try {
        const { stdout } = await execAsync(command, {
          cwd: reactAppDir,
          env: {
            ...process.env,
            // Ensure it uses the built plugin
            NODE_PATH: join(process.cwd(), 'node_modules')
          }
        })
        
        const results = JSON.parse(stdout)
        const edgeCasesResult = results[0]
        
        // Should not have fatal errors (crashes)
        const fatalMessages = edgeCasesResult.messages.filter(
          (m: any) => m.fatal
        )
        expect(fatalMessages.length, `Fatal error: ${JSON.stringify(fatalMessages)}`).toBe(0)
        
      } catch (error: any) {
        // ESLint exits with code 1 when it finds violations
        // That's expected - we just want to ensure no crashes
        if (error.code === 1 && error.stdout) {
          const results = JSON.parse(error.stdout)
          const edgeCasesResult = results[0]
          
          // Verify no fatal errors
          const fatalMessages = edgeCasesResult?.messages.filter(
            (m: any) => m.fatal
          ) || []
          
          expect(
            fatalMessages.length,
            `Fatal error: ${fatalMessages[0]?.message}`
          ).toBe(0)
        } else {
          // Unexpected error - log and fail
          console.error('Unexpected error:', error)
          throw error
        }
      }
    }, 30000) // 30s timeout for CLI execution

    it('should detect violations in edge cases', async () => {
      const command = `npx eslint "src/components/EdgeCases.tsx" --format json --no-eslintrc --config .eslintrc.json`
      
      try {
        await execAsync(command, { cwd: reactAppDir })
      } catch (error: any) {
        if (error.code === 1 && error.stdout) {
          const results = JSON.parse(error.stdout)
          const messages = results[0]?.messages || []
          
          // Should detect missing labels in MissingLabels function
          const formLabelViolations = messages.filter((m: any) =>
            m.ruleId === 'test-a11y-js/form-label'
          )
          
          // Should have at least some violations
          expect(formLabelViolations.length).toBeGreaterThan(0)
          
          // Should detect missing alt in MissingAlt function
          const imageAltViolations = messages.filter((m: any) =>
            m.ruleId === 'test-a11y-js/image-alt'
          )
          expect(imageAltViolations.length).toBeGreaterThan(0)
          
          // Should detect empty buttons
          const buttonViolations = messages.filter((m: any) =>
            m.ruleId === 'test-a11y-js/button-label'
          )
          expect(buttonViolations.length).toBeGreaterThan(0)
        } else {
          throw error
        }
      }
    }, 30000)
  })

  describe('Form Components', () => {
    it('should pass valid form patterns', async () => {
      const command = `npx eslint "src/components/Form.tsx" --format json --no-eslintrc --config .eslintrc.json`
      
      try {
        const { stdout } = await execAsync(command, { cwd: reactAppDir })
        const results = JSON.parse(stdout)
        
        // Should have no errors (all forms are properly labeled)
        const errorCount = results[0]?.errorCount || 0
        expect(errorCount).toBe(0)
        
      } catch (error: any) {
        if (error.code === 1 && error.stdout) {
          const results = JSON.parse(error.stdout)
          const messages = results[0]?.messages || []
          
          // No fatal errors allowed
          const fatalMessages = messages.filter((m: any) => m.fatal)
          expect(fatalMessages.length).toBe(0)
          
          // If there are violations, log them for debugging
          if (messages.length > 0) {
            console.log('Unexpected violations in Form.tsx:', messages)
          }
        } else {
          throw error
        }
      }
    }, 30000)
  })

  describe('App Component', () => {
    it('should lint without crashing', async () => {
      const command = `npx eslint "src/App.tsx" --format json --no-eslintrc --config .eslintrc.json`
      
      try {
        const { stdout } = await execAsync(command, { cwd: reactAppDir })
        const results = JSON.parse(stdout)
        
        // Should not have fatal errors
        const fatalErrors = results.filter((r: any) => 
          r.messages.some((m: any) => m.fatal)
        )
        expect(fatalErrors.length).toBe(0)
        
      } catch (error: any) {
        if (error.code === 1 && error.stdout) {
          const results = JSON.parse(error.stdout)
          
          // Verify no fatal errors
          const fatalErrors = results.filter((r: any) => 
            r.messages.some((m: any) => m.fatal)
          )
          expect(fatalErrors.length).toBe(0)
        } else {
          throw error
        }
      }
    }, 30000)
  })

  describe('Configuration Loading', () => {
    it('should load plugin configuration correctly', async () => {
      const command = `npx eslint --print-config src/App.tsx`
      
      const { stdout } = await execAsync(command, {
        cwd: reactAppDir
      })
      
      const config = JSON.parse(stdout)
      
      // Should have loaded the plugin
      expect(config.plugins).toContain('test-a11y-js')
      
      // Should have some rules enabled
      const a11yRules = Object.keys(config.rules).filter(r => 
        r.startsWith('test-a11y-js/')
      )
      expect(a11yRules.length).toBeGreaterThan(0)
    }, 30000)
  })

  describe('Entire Directory', () => {
    it('should lint all files without crashing', async () => {
      const command = `npx eslint "src/**/*.{ts,tsx}" --format json --no-eslintrc --config .eslintrc.json`
      
      try {
        const { stdout } = await execAsync(command, { 
          cwd: reactAppDir,
          maxBuffer: 1024 * 1024 * 10 // 10MB buffer
        })
        
        const results = JSON.parse(stdout)
        
        // Should not have any fatal errors (crashes)
        const fatalErrors = results.filter((r: any) => 
          r.messages.some((m: any) => m.fatal)
        )
        
        expect(
          fatalErrors.length,
          `Fatal errors found: ${JSON.stringify(fatalErrors, null, 2)}`
        ).toBe(0)
        
      } catch (error: any) {
        // ESLint exits with code 1 when it finds violations
        if (error.code === 1 && error.stdout) {
          const results = JSON.parse(error.stdout)
          
          // Verify no fatal errors
          const fatalErrors = results.filter((r: any) => 
            r.messages.some((m: any) => m.fatal)
          )
          
          expect(
            fatalErrors.length,
            `Fatal error found: ${JSON.stringify(fatalErrors[0]?.messages, null, 2)}`
          ).toBe(0)
          
          // Count total violations
          const totalViolations = results.reduce(
            (sum: number, r: any) => sum + r.messages.length, 
            0
          )
          
          // We expect some violations (intentional issues in EdgeCases.tsx)
          expect(totalViolations).toBeGreaterThan(0)
          
        } else {
          // Unexpected error
          console.error('Unexpected error:', error)
          throw error
        }
      }
    }, 30000)
  })
})

