/**
 * Progress reporter for ESLint
 * Shows which files are being linted (like Vite test output)
 * 
 * This can be used with ESLint's programmatic API to show progress
 */

export interface ProgressReporter {
  start(totalFiles: number): void
  update(currentFile: number, fileName: string): void
  complete(results: any[]): void
}

/**
 * Create a progress reporter that shows file-by-file progress
 */
export function createProgressReporter(): ProgressReporter {
  const colors = {
    reset: '\x1b[0m',
    dim: '\x1b[2m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
  }
  
  let totalFiles = 0
  const processedFiles: string[] = []
  
  return {
    start(total: number) {
      totalFiles = total
      if (process.stdout.isTTY) {
        process.stdout.write(`\n${colors.cyan}Linting ${total} file${total !== 1 ? 's' : ''}...${colors.reset}\n`)
      }
    },
    
    update(fileNum: number, fileName: string) {
      processedFiles.push(fileName)
      
      if (process.stdout.isTTY) {
        const progress = `  ${colors.dim}[${fileNum}/${totalFiles}]${colors.reset} ${colors.cyan}${fileName}${colors.reset}\n`
        process.stdout.write(progress)
      }
    },
    
    complete(results: any[]) {
      if (process.stdout.isTTY) {
        // Clear progress lines and show summary
        const totalErrors = results.reduce((sum, r) => sum + r.errorCount, 0)
        const totalWarnings = results.reduce((sum, r) => sum + r.warningCount, 0)
        
        let status = colors.green + '✓' + colors.reset
        if (totalErrors > 0) {
          status = colors.red + '✖' + colors.reset
        } else if (totalWarnings > 0) {
          status = colors.yellow + '⚠' + colors.reset
        }
        
        process.stdout.write(`\n${status} ${results.length} file${results.length !== 1 ? 's' : ''} linted`)
        if (totalErrors > 0) {
          process.stdout.write(` • ${colors.red}${totalErrors} error${totalErrors !== 1 ? 's' : ''}${colors.reset}`)
        }
        if (totalWarnings > 0) {
          process.stdout.write(` • ${colors.yellow}${totalWarnings} warning${totalWarnings !== 1 ? 's' : ''}${colors.reset}`)
        }
        process.stdout.write('\n\n')
      }
    }
  }
}

