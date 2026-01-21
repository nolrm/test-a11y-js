/**
 * Helper for testing ESLint rules
 * 
 * This helper loads rules from the plugin to avoid module resolution issues
 */

// Import from dist to avoid module resolution issues in test environment
import { join } from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pluginPath = join(process.cwd(), 'dist/linter/eslint-plugin/index.js')
const eslintPlugin = require(pluginPath).default

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

