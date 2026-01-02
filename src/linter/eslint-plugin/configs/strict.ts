/**
 * Strict ESLint configuration for test-a11y-js
 * 
 * This configuration enables all accessibility rules as errors.
 * Use this for projects that want to enforce strict accessibility standards.
 */

import type { RuleConfig } from '../utils/types'

const strict: RuleConfig = {
  // All rules set to error for strict enforcement
  'test-a11y-js/image-alt': 'error',
  'test-a11y-js/button-label': 'error',
  'test-a11y-js/link-text': 'error',
  'test-a11y-js/form-label': 'error',
  'test-a11y-js/heading-order': 'error',
  'test-a11y-js/iframe-title': 'error',
  'test-a11y-js/fieldset-legend': 'error',
  'test-a11y-js/table-structure': 'error',
  'test-a11y-js/details-summary': 'error',
  'test-a11y-js/video-captions': 'error'
}

export default strict

