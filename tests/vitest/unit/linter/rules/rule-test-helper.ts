/**
 * Helper for testing ESLint rules
 * 
 * This helper loads rules from the plugin to avoid module resolution issues
 */

// @ts-ignore - Module resolution issue in test environment
import eslintPlugin from '../../../../src/linter/eslint-plugin/index'

export function getRule(ruleName: string) {
  return eslintPlugin.rules[ruleName]
}

export const imageAlt = getRule('image-alt')
export const buttonLabel = getRule('button-label')
export const linkText = getRule('link-text')
export const formLabel = getRule('form-label')
export const headingOrder = getRule('heading-order')
export const fieldsetLegend = getRule('fieldset-legend')
export const tableStructure = getRule('table-structure')

