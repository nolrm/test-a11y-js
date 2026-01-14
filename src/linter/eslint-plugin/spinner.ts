/**
 * Simple spinner utility for terminal output
 */

export interface Spinner {
  start(message: string): void
  stop(message?: string): void
  succeed(message: string): void
  fail(message: string): void
}

/**
 * Create a spinner instance
 */
export function createSpinner(): Spinner {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  let frameIndex = 0
  let interval: NodeJS.Timeout | null = null
  let currentMessage = ''
  
  return {
    start(message: string) {
      currentMessage = message
      frameIndex = 0
      process.stdout.write(`\r${frames[frameIndex]} ${message}`)
      
      interval = setInterval(() => {
        frameIndex = (frameIndex + 1) % frames.length
        process.stdout.write(`\r${frames[frameIndex]} ${currentMessage}`)
      }, 80)
    },
    
    stop(message?: string) {
      if (interval) {
        clearInterval(interval)
        interval = null
      }
      
      if (message !== undefined) {
        // Clear the spinner line and write the message
        process.stdout.write(`\r${' '.repeat(50)}\r${message}\n`)
      } else {
        // Just clear the spinner line
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

