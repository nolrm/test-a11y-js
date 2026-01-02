/**
 * Minimal ESLint configuration for test-a11y-js
 * 
 * This configuration enables only the most critical accessibility rules.
 * Use this for incremental adoption in large projects or when starting fresh.
 * 
 * Includes only:
 * - button-label (critical)
 * - form-label (critical)
 * - image-alt (serious)
 */

import type { RuleConfig } from '../utils/types'

const minimal: RuleConfig = {
  // Only critical/serious violations that block basic accessibility
  'test-a11y-js/button-label': 'error',
  'test-a11y-js/form-label': 'error',
  'test-a11y-js/image-alt': 'error'
}

export default minimal

