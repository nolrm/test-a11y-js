/**
 * React-specific ESLint configuration for test-a11y-js
 * 
 * This configuration is optimized for React/JSX projects.
 * It includes the recommended rules with React-specific parser settings.
 */

import type { RuleConfig } from '../utils/types'
import recommended from './recommended'

const react: RuleConfig = {
  ...recommended,
  // React-specific overrides can be added here if needed
}

export default react

