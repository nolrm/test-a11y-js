/**
 * Helper for testing ESLint rules
 * 
 * This helper loads rules from the plugin to avoid module resolution issues
 */

// @ts-ignore - Module resolution issue in test environment
// Note: This import may fail in vitest due to TypeScript module resolution.
// Tests that use RuleTester may need to be run differently or use structure tests instead.
import eslintPlugin from '../../../../src/linter/eslint-plugin/index'

export function getRule(ruleName: string) {
  return eslintPlugin.rules[ruleName]
}

export const imageAlt = getRule('image-alt')
export const buttonLabel = getRule('button-label')
export const linkText = getRule('link-text')
export const formLabel = getRule('form-label')
export const headingOrder = getRule('heading-order')
export const iframeTitle = getRule('iframe-title')
export const fieldsetLegend = getRule('fieldset-legend')
export const tableStructure = getRule('table-structure')
export const detailsSummary = getRule('details-summary')
export const videoCaptions = getRule('video-captions')
export const audioCaptions = getRule('audio-captions')
export const landmarkRoles = getRule('landmark-roles')
export const dialogModal = getRule('dialog-modal')

