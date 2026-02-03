/**
 * Focusable element detection utilities
 *
 * Provides functions to determine if elements are focusable or interactive
 * for accessibility validation rules.
 */

import type { Rule } from 'eslint'
import { hasJSXAttribute, getJSXAttribute } from './jsx-ast-utils'
import { hasVueAttribute, getVueAttribute } from './vue-ast-utils'
import { getElementRoleFromJSX } from './component-mapping'

/**
 * Native HTML elements that are natively focusable
 */
const NATIVELY_FOCUSABLE_ELEMENTS = new Set([
  'a',       // Only with href
  'button',
  'input',
  'select',
  'textarea',
  'summary', // Only inside details
  'area',    // Only with href
])

/**
 * Native HTML elements that are interactive (can receive user input)
 */
const INTERACTIVE_ELEMENTS = new Set([
  'a',
  'button',
  'input',
  'select',
  'textarea',
  'summary',
  'area',
  'details',
  'audio',   // With controls
  'video',   // With controls
])

/**
 * Non-interactive HTML elements (static elements)
 */
const STATIC_ELEMENTS = new Set([
  'div',
  'span',
  'section',
  'article',
  'aside',
  'footer',
  'header',
  'nav',
  'main',
  'p',
  'ul',
  'ol',
  'li',
  'dl',
  'dt',
  'dd',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'caption',
  'figure',
  'figcaption',
  'blockquote',
  'pre',
  'code',
  'em',
  'strong',
  'small',
  'mark',
  'sub',
  'sup',
  'address',
  'time',
  'abbr',
])

/**
 * Non-interactive HTML elements that have semantic meaning
 */
const NON_INTERACTIVE_ELEMENTS = new Set([
  ...STATIC_ELEMENTS,
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'img',
  'hr',
  'br',
])

/**
 * ARIA roles that are interactive (widgets)
 */
const INTERACTIVE_ROLES = new Set([
  'button',
  'checkbox',
  'combobox',
  'gridcell',
  'link',
  'listbox',
  'menu',
  'menubar',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'option',
  'progressbar',
  'radio',
  'scrollbar',
  'searchbox',
  'slider',
  'spinbutton',
  'switch',
  'tab',
  'tabpanel',
  'textbox',
  'tree',
  'treeitem',
])

/**
 * Get tabindex value from a JSX node
 */
export function getJSXTabIndexValue(node: any): number | null {
  const tabIndexAttr = getJSXAttribute(node, 'tabIndex') || getJSXAttribute(node, 'tabindex')
  if (!tabIndexAttr) return null

  // Handle literal value
  if (tabIndexAttr.value?.type === 'Literal') {
    const value = tabIndexAttr.value.value
    if (typeof value === 'number') return value
    if (typeof value === 'string') {
      const parsed = parseInt(value, 10)
      return isNaN(parsed) ? null : parsed
    }
  }

  // Handle JSX expression with literal
  if (tabIndexAttr.value?.type === 'JSXExpressionContainer') {
    const expression = tabIndexAttr.value.expression as any
    if (expression?.type === 'Literal' && typeof expression.value === 'number') {
      return expression.value
    }
    if (expression?.type === 'UnaryExpression' &&
        expression.operator === '-' &&
        expression.argument?.type === 'Literal') {
      return -(expression.argument.value as number)
    }
  }

  return null
}

/**
 * Get tabindex value from a Vue node
 */
export function getVueTabIndexValue(node: any): number | null {
  const tabIndexAttr = getVueAttribute(node, 'tabindex')
  if (!tabIndexAttr) return null

  if (tabIndexAttr.value?.value) {
    const parsed = parseInt(tabIndexAttr.value.value, 10)
    return isNaN(parsed) ? null : parsed
  }

  return null
}

/**
 * Check if a JSX element has tabindex attribute
 */
export function hasJSXTabIndex(node: any): boolean {
  return hasJSXAttribute(node, 'tabIndex') || hasJSXAttribute(node, 'tabindex')
}

/**
 * Check if a Vue element has tabindex attribute
 */
export function hasVueTabIndex(node: any): boolean {
  return hasVueAttribute(node, 'tabindex')
}

/**
 * Check if a JSX element is natively focusable
 * Elements are natively focusable if they are interactive elements
 * or have tabindex >= 0
 */
export function isJSXElementFocusable(node: any, context: Rule.RuleContext): boolean {
  const tagName = getElementRoleFromJSX(node, context)

  if (!tagName) {
    // Unknown component - check tabindex
    const tabIndex = getJSXTabIndexValue(node)
    return tabIndex !== null && tabIndex >= 0
  }

  // Check if natively focusable
  if (NATIVELY_FOCUSABLE_ELEMENTS.has(tagName)) {
    // <a> needs href to be focusable
    if (tagName === 'a' || tagName === 'area') {
      return hasJSXAttribute(node, 'href')
    }
    // <input type="hidden"> is not focusable
    if (tagName === 'input') {
      const typeAttr = getJSXAttribute(node, 'type')
      if (typeAttr?.value?.type === 'Literal' && typeAttr.value.value === 'hidden') {
        return false
      }
    }
    // Disabled elements are not focusable
    if (hasJSXAttribute(node, 'disabled')) {
      return false
    }
    return true
  }

  // Check tabindex
  const tabIndex = getJSXTabIndexValue(node)
  if (tabIndex !== null && tabIndex >= 0) {
    return true
  }

  return false
}

/**
 * Check if a Vue element is natively focusable
 */
export function isVueElementFocusable(node: any): boolean {
  const tagName = node.name?.toLowerCase()

  if (!tagName) {
    return false
  }

  // Check if natively focusable
  if (NATIVELY_FOCUSABLE_ELEMENTS.has(tagName)) {
    // <a> needs href to be focusable
    if (tagName === 'a' || tagName === 'area') {
      return hasVueAttribute(node, 'href')
    }
    // <input type="hidden"> is not focusable
    if (tagName === 'input') {
      const typeAttr = getVueAttribute(node, 'type')
      if (typeAttr?.value?.value === 'hidden') {
        return false
      }
    }
    // Disabled elements are not focusable
    if (hasVueAttribute(node, 'disabled')) {
      return false
    }
    return true
  }

  // Check tabindex
  const tabIndex = getVueTabIndexValue(node)
  if (tabIndex !== null && tabIndex >= 0) {
    return true
  }

  return false
}

/**
 * Check if a JSX element is interactive based on tag name or role
 */
export function isJSXElementInteractive(node: any, context: Rule.RuleContext): boolean {
  const tagName = getElementRoleFromJSX(node, context)

  // Check native tag
  if (tagName && INTERACTIVE_ELEMENTS.has(tagName)) {
    // Audio/video need controls attribute
    if (tagName === 'audio' || tagName === 'video') {
      return hasJSXAttribute(node, 'controls')
    }
    return true
  }

  // Check ARIA role
  const roleAttr = getJSXAttribute(node, 'role')
  if (roleAttr?.value?.type === 'Literal') {
    const role = String(roleAttr.value.value).toLowerCase()
    if (INTERACTIVE_ROLES.has(role)) {
      return true
    }
  }

  return false
}

/**
 * Check if a Vue element is interactive based on tag name or role
 */
export function isVueElementInteractive(node: any): boolean {
  const tagName = node.name?.toLowerCase()

  // Check native tag
  if (tagName && INTERACTIVE_ELEMENTS.has(tagName)) {
    // Audio/video need controls attribute
    if (tagName === 'audio' || tagName === 'video') {
      return hasVueAttribute(node, 'controls')
    }
    return true
  }

  // Check ARIA role
  const roleAttr = getVueAttribute(node, 'role')
  if (roleAttr?.value?.value) {
    const role = roleAttr.value.value.toLowerCase()
    if (INTERACTIVE_ROLES.has(role)) {
      return true
    }
  }

  return false
}

/**
 * Check if a JSX element is a static (non-interactive) element
 */
export function isJSXElementStatic(node: any, context: Rule.RuleContext): boolean {
  const tagName = getElementRoleFromJSX(node, context)
  return tagName !== null && STATIC_ELEMENTS.has(tagName)
}

/**
 * Check if a Vue element is a static (non-interactive) element
 */
export function isVueElementStatic(node: any): boolean {
  const tagName = node.name?.toLowerCase()
  return tagName !== undefined && STATIC_ELEMENTS.has(tagName)
}

/**
 * Check if a JSX element is a non-interactive element
 */
export function isJSXElementNonInteractive(node: any, context: Rule.RuleContext): boolean {
  const tagName = getElementRoleFromJSX(node, context)

  if (!tagName) return false

  // Check if it has an interactive role
  const roleAttr = getJSXAttribute(node, 'role')
  if (roleAttr?.value?.type === 'Literal') {
    const role = String(roleAttr.value.value).toLowerCase()
    if (INTERACTIVE_ROLES.has(role)) {
      return false
    }
  }

  return NON_INTERACTIVE_ELEMENTS.has(tagName)
}

/**
 * Check if a Vue element is a non-interactive element
 */
export function isVueElementNonInteractive(node: any): boolean {
  const tagName = node.name?.toLowerCase()

  if (!tagName) return false

  // Check if it has an interactive role
  const roleAttr = getVueAttribute(node, 'role')
  if (roleAttr?.value?.value) {
    const role = roleAttr.value.value.toLowerCase()
    if (INTERACTIVE_ROLES.has(role)) {
      return false
    }
  }

  return NON_INTERACTIVE_ELEMENTS.has(tagName)
}

/**
 * Get ARIA role from JSX node
 */
export function getJSXRole(node: any): string | null {
  const roleAttr = getJSXAttribute(node, 'role')
  if (roleAttr?.value?.type === 'Literal') {
    return String(roleAttr.value.value).toLowerCase()
  }
  return null
}

/**
 * Get ARIA role from Vue node
 */
export function getVueRole(node: any): string | null {
  const roleAttr = getVueAttribute(node, 'role')
  if (roleAttr?.value?.value) {
    return roleAttr.value.value.toLowerCase()
  }
  return null
}

/**
 * Check if an element has an interactive role
 */
export function hasInteractiveRole(role: string | null): boolean {
  return role !== null && INTERACTIVE_ROLES.has(role)
}

export { INTERACTIVE_ROLES, STATIC_ELEMENTS, NON_INTERACTIVE_ELEMENTS }
