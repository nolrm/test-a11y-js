#!/usr/bin/env node
/**
 * CLI wrapper for ESLint with loader and nice formatting
 * Provides Vite-style output with spinner and summary
 */

import { ESLint } from 'eslint'
import { format } from './formatter'

/**
 * Create a simple spinner
 */
function createSimpleSpinner() {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  let frameIndex = 0
  let interval: NodeJS.Timeout | null = null
  
  return {
    start(message: string) {
      process.stdout.write(`\r${frames[frameIndex]} ${message}`)
      interval = setInterval(() => {
        frameIndex = (frameIndex + 1) % frames.length
        process.stdout.write(`\r${frames[frameIndex]} ${message}`)
      }, 80)
    },
    stop(message?: string) {
      if (interval) {
        clearInterval(interval)
        interval = null
      }
      if (message) {
        process.stdout.write(`\r${message}\n`)
      } else {
        process.stdout.write(`\r${' '.repeat(50)}\r`)
      }
    },
    succeed(message: string) {
      this.stop(`✓ ${message}`)
    },
    fail(message: string) {
      this.stop(`✖ ${message}`)
    }
  }
}

/**
 * Main CLI function
 */
async function main() {
  const args = process.argv.slice(2)
  
  // Parse arguments
  const files = args.filter(arg => !arg.startsWith('--'))
  const useCache = args.includes('--cache')
  const fix = args.includes('--fix')
  const formatOnly = args.includes('--format-only')
  
  // Create ESLint instance
  const eslint = new ESLint({
    cache: useCache,
    fix: fix && !formatOnly,
    cacheLocation: '.eslintcache',
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    useEslintrc: true,
  })
  
  const spinner = createSimpleSpinner()
  
  try {
    // Start linting
    spinner.start('Linting files...')
    
    // Get files to lint
    const targetFiles = files.length > 0 ? files : ['.']
    
    // Lint files
    const startTime = Date.now()
    const results = await eslint.lintFiles(targetFiles)
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(2)
    
    spinner.stop()
    
    // Calculate stats
    const totalErrors = results.reduce((sum, r) => sum + r.errorCount, 0)
    const totalWarnings = results.reduce((sum, r) => sum + r.warningCount, 0)
    
    // Format output
    const output = format(results, process.stdout.isTTY)
    
    // Print formatted output
    console.log(output)
    
    // Print timing
    if (process.stdout.isTTY) {
      const colors = {
        dim: '\x1b[2m',
        reset: '\x1b[0m',
      }
      console.log(`${colors.dim}Completed in ${duration}s${colors.reset}\n`)
    }
    
    // Exit with appropriate code
    if (totalErrors > 0) {
      process.exit(1)
    } else if (totalWarnings > 0 && !args.includes('--max-warnings')) {
      process.exit(0)
    } else {
      process.exit(0)
    }
  } catch (error) {
    spinner.fail('Linting failed')
    console.error(error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Unexpected error:', error)
    process.exit(1)
  })
}

export { main }

