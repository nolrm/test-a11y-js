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
  'test-a11y-js/video-captions': 'error',
  'test-a11y-js/audio-captions': 'error',
  'test-a11y-js/landmark-roles': 'error',
  'test-a11y-js/dialog-modal': 'error',
  'test-a11y-js/aria-validation': 'error',
  'test-a11y-js/semantic-html': 'error',
  'test-a11y-js/form-validation': 'error',
  // Phase 1: Simple attribute rules
  'test-a11y-js/no-access-key': 'error',
  'test-a11y-js/no-autofocus': 'error',
  'test-a11y-js/tabindex-no-positive': 'error',
  'test-a11y-js/no-distracting-elements': 'error',
  'test-a11y-js/lang': 'error',
  // Phase 2: Focusable element rules
  'test-a11y-js/no-aria-hidden-on-focusable': 'error',
  'test-a11y-js/no-role-presentation-on-focusable': 'error',
  // Phase 3: Event/keyboard rules
  'test-a11y-js/click-events-have-key-events': 'error',
  'test-a11y-js/mouse-events-have-key-events': 'error',
  'test-a11y-js/no-static-element-interactions': 'error',
  'test-a11y-js/no-noninteractive-element-interactions': 'error',
  'test-a11y-js/interactive-supports-focus': 'error',
  // Phase 4: Medium-priority rules
  'test-a11y-js/no-noninteractive-tabindex': 'error',
  'test-a11y-js/autocomplete-valid': 'error',
  'test-a11y-js/aria-activedescendant-has-tabindex': 'error',
  'test-a11y-js/heading-has-content': 'error',
  // Phase 5: Optional rules (also enabled in strict mode)
  'test-a11y-js/anchor-ambiguous-text': 'error',
  'test-a11y-js/img-redundant-alt': 'error',
  'test-a11y-js/accessible-emoji': 'error',
  'test-a11y-js/html-has-lang': 'error'
}

export default strict

