import { expect, afterEach } from 'vitest'
import { config } from '@vue/test-utils'

// Cleanup after each test
afterEach(() => {
  // Clear the document body
  document.body.innerHTML = ''
})

// Add custom matchers if needed
expect.extend({
  // Add custom matchers here
})

// Configure Vue Test Utils
config.global.stubs = {
  // Add any global stubs if needed
} 