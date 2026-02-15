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
  'test-a11y-js/landmark-roles': 'warn',
  'test-a11y-js/dialog-modal': 'error',

  // Moderate/Minor violations - set to warn
  'test-a11y-js/link-text': 'warn',
  'test-a11y-js/heading-order': 'warn',

  // New rules - Critical/Serious violations
  'test-a11y-js/no-access-key': 'error',
  'test-a11y-js/no-autofocus': 'error',
  'test-a11y-js/tabindex-no-positive': 'error',
  'test-a11y-js/no-distracting-elements': 'error',
  'test-a11y-js/no-aria-hidden-on-focusable': 'error',
  'test-a11y-js/no-role-presentation-on-focusable': 'error',
  'test-a11y-js/heading-has-content': 'error',
  'test-a11y-js/html-has-lang': 'error',

  // New rules - Moderate violations (warn)
  'test-a11y-js/click-events-have-key-events': 'warn',
  'test-a11y-js/no-static-element-interactions': 'warn',
  'test-a11y-js/interactive-supports-focus': 'warn'

  // Not included in recommended (available in strict):
  // - aria-validation, semantic-html, form-validation
  //   These rules are broad and may produce noise in typical projects.
  //   Enable individually or use the strict preset for full coverage.
}

export default recommended

