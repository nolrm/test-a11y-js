/**
 * AST-based semantic HTML validation utilities
 * 
 * These functions validate semantic HTML usage without using JSDOM/DOM,
 * working purely on AST nodes.
 */

import { ARIA_IN_HTML } from '../../../core/aria-spec'
import { getJSXAttribute } from './jsx-ast-utils'
import { getVueAttribute } from './vue-ast-utils'

export interface SemanticHTMLIssue {
  id: string
  message: string
  severity: 'error' | 'warning'
}

/**
 * Get tag name from JSX node
 */
function getJSXTagName(node: any): string {
  if (node.name?.type === 'JSXIdentifier') {
    return node.name.name.toLowerCase()
  }
  return ''
}

/**
 * Get tag name from Vue node
 */
function getVueTagName(node: any): string {
  return node.name?.toLowerCase() || ''
}

/**
 * Get role from JSX node
 */
function getJSXRole(node: any): string | null {
  const roleAttr = getJSXAttribute(node, 'role')
  if (!roleAttr || !roleAttr.value) return null
  
  if (roleAttr.value.type === 'Literal' && typeof roleAttr.value.value === 'string') {
    return roleAttr.value.value
  }
  
  return null
}

/**
 * Get role from Vue node
 */
function getVueRole(node: any): string | null {
  const roleAttr = getVueAttribute(node, 'role')
  if (!roleAttr || !roleAttr.value) return null
  
  if (roleAttr.value.value && typeof roleAttr.value.value === 'string') {
    return roleAttr.value.value
  }
  
  return null
}

/**
 * Validate semantic HTML usage for JSX element
 */
export function validateJSXSemanticHTML(node: any): SemanticHTMLIssue[] {
  const issues: SemanticHTMLIssue[] = []
  const tagName = getJSXTagName(node)
  const role = getJSXRole(node)
  
  // Check for redundant roles
  if (role && tagName) {
    const implicitRole = ARIA_IN_HTML.implicitRoles[tagName]
    if (implicitRole === role) {
      issues.push({
        id: 'semantic-redundant-role',
        message: `Redundant role: <${tagName}> already has implicit role "${role}". Use the semantic element without the role attribute.`,
        severity: 'warning'
      })
    }
  }
  
  // Prefer semantic elements over generic ones with roles
  if (tagName === 'div' || tagName === 'span') {
    if (role) {
      // Check if there's a semantic equivalent
      const semanticEquivalents: Record<string, string> = {
        'button': 'button',
        'link': 'a',
        'heading': 'h1, h2, h3, h4, h5, or h6',
        'list': 'ul or ol',
        'listitem': 'li',
        'navigation': 'nav',
        'main': 'main',
        'article': 'article',
        'section': 'section',
        'banner': 'header',
        'contentinfo': 'footer',
        'complementary': 'aside',
        'form': 'form',
        'dialog': 'dialog'
      }
      
      const semanticTag = semanticEquivalents[role]
      if (semanticTag) {
        issues.push({
          id: 'semantic-prefer-native',
          message: `Prefer semantic element <${semanticTag}> instead of <${tagName} role="${role}">`,
          severity: 'warning'
        })
      }
    }
  }
  
  return issues
}

/**
 * Validate semantic HTML usage for Vue element
 */
export function validateVueSemanticHTML(node: any): SemanticHTMLIssue[] {
  const issues: SemanticHTMLIssue[] = []
  const tagName = getVueTagName(node)
  const role = getVueRole(node)
  
  // Check for redundant roles
  if (role && tagName) {
    const implicitRole = ARIA_IN_HTML.implicitRoles[tagName]
    if (implicitRole === role) {
      issues.push({
        id: 'semantic-redundant-role',
        message: `Redundant role: <${tagName}> already has implicit role "${role}". Use the semantic element without the role attribute.`,
        severity: 'warning'
      })
    }
  }
  
  // Prefer semantic elements over generic ones with roles
  if (tagName === 'div' || tagName === 'span') {
    if (role) {
      // Check if there's a semantic equivalent
      const semanticEquivalents: Record<string, string> = {
        'button': 'button',
        'link': 'a',
        'heading': 'h1, h2, h3, h4, h5, or h6',
        'list': 'ul or ol',
        'listitem': 'li',
        'navigation': 'nav',
        'main': 'main',
        'article': 'article',
        'section': 'section',
        'banner': 'header',
        'contentinfo': 'footer',
        'complementary': 'aside',
        'form': 'form',
        'dialog': 'dialog'
      }
      
      const semanticTag = semanticEquivalents[role]
      if (semanticTag) {
        issues.push({
          id: 'semantic-prefer-native',
          message: `Prefer semantic element <${semanticTag}> instead of <${tagName} role="${role}">`,
          severity: 'warning'
        })
      }
    }
  }
  
  return issues
}
