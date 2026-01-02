/**
 * Recommended ESLint configuration for test-a11y-js
 * 
 * This configuration enables all accessibility rules with recommended severity levels
 * based on the impact of violations (critical/serious = error, moderate/minor = warn)
 */

import type { RuleConfig } from '../utils/types'

const recommended: RuleConfig = {
  // Critical/Serious violations - set to error
  'test-a11y-js/image-alt': 'error',
  'test-a11y-js/button-label': 'error',
  'test-a11y-js/form-label': 'error',
  'test-a11y-js/iframe-title': 'error',
  'test-a11y-js/fieldset-legend': 'error',
  'test-a11y-js/table-structure': 'error',
  'test-a11y-js/details-summary': 'error',
  'test-a11y-js/video-captions': 'error',
  'test-a11y-js/audio-captions': 'error',
  
  // Moderate/Minor violations - set to warn
  'test-a11y-js/link-text': 'warn',
  'test-a11y-js/heading-order': 'warn'
}

export default recommended

