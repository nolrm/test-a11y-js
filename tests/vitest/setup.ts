import { expect, afterEach } from 'vitest'

// Cleanup after each test
afterEach(() => {
  // Clear the document body
  document.body.innerHTML = ''
})

// Add custom matchers if needed
expect.extend({
  // Add custom matchers here
}) 