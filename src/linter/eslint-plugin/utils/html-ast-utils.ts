/**
 * HTML string parsing utilities
 * 
 * Parses HTML strings from template literals or string literals
 * and converts them to DOM Elements
 */

// @ts-ignore - jsdom types may not be available
import { JSDOM } from 'jsdom'
import type { Rule } from 'eslint'
import { getNodeText } from './ast-utils'

/**
 * Parse HTML string to DOM Element
 * 
 * @param html - HTML string to parse
 * @returns DOM Element or null if parsing fails
 */
export function parseHTMLString(html: string): Element | null {
  try {
    const dom = new JSDOM(html, { contentType: 'text/html' })
    const body = dom.window.document.body
    
    // If body has a single child, return it; otherwise return body
    if (body.children.length === 1) {
      return body.children[0] as Element
    }
    
    return body
  } catch (error) {
    // If parsing fails, return null
    return null
  }
}

/**
 * Extract HTML from a template literal or string literal node
 * 
 * @param node - AST node (Literal or TemplateLiteral)
 * @param context - ESLint rule context
 * @returns HTML string or null
 */
export function extractHTMLFromNode(
  node: Rule.Node,
  _context: Rule.RuleContext
): string | null {
  if (node.type === 'Literal') {
    const literal = node as any
    if (typeof literal.value === 'string') {
      return literal.value
    }
    return null
  }
  
  if (node.type === 'TemplateLiteral') {
    // For template literals, we can only check if all parts are strings
    // If there are expressions, we can't statically analyze
    const template = node as any
    if (template.quasis && template.quasis.length > 0) {
      // If there are expressions, return null (can't analyze)
      if (template.expressions && template.expressions.length > 0) {
        return null
      }
      // All static parts - concatenate them
      return template.quasis
        .map((quasi: any) => quasi.value.cooked || quasi.value.raw)
        .join('')
    }
    return null
  }
  
  if (node.type === 'TaggedTemplateExpression') {
    // For tagged template expressions like html`<div>...</div>`
    const tagged = node as any
    if (tagged.quasi && tagged.quasi.quasis) {
      // Check if there are expressions
      if (tagged.quasi.expressions && tagged.quasi.expressions.length > 0) {
        return null
      }
      // All static parts
      return tagged.quasi.quasis
        .map((quasi: any) => quasi.value.cooked || quasi.value.raw)
        .join('')
    }
  }
  
  return null
}

/**
 * Convert AST node containing HTML to DOM Element
 * 
 * @param node - AST node (Literal, TemplateLiteral, or TaggedTemplateExpression)
 * @param context - ESLint rule context
 * @returns DOM Element or null if conversion fails
 */
export function htmlNodeToElement(
  node: Rule.Node,
  context: Rule.RuleContext
): Element | null {
  const html = extractHTMLFromNode(node, context)
  if (!html) {
    return null
  }
  
  return parseHTMLString(html)
}

/**
 * Check if a template literal contains HTML-like content
 */
export function isHTMLTemplate(node: Rule.Node, context: Rule.RuleContext): boolean {
  if (node.type !== 'TemplateLiteral' && node.type !== 'TaggedTemplateExpression') {
    return false
  }
  
  const text = getNodeText(node, context)
  // Simple heuristic: check if it contains HTML tags
  return /<[a-z][\s\S]*>/i.test(text)
}

