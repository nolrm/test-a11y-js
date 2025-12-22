/**
 * Vue template AST parsing utilities
 * 
 * Note: This requires vue-eslint-parser to be installed.
 * Full implementation will be completed in Phase 4.
 */

import type { Rule } from 'eslint'
import { JSDOM } from 'jsdom'

/**
 * Vue Element AST node type (from vue-eslint-parser)
 * This is a placeholder type - actual types come from vue-eslint-parser
 */
interface VElement {
  name: string
  startTag: {
    attributes?: Array<{
      key: {
        name?: string
        argument?: string
      }
      value?: {
        value?: string
        expression?: unknown
      }
    }>
  }
  children?: VElement[]
  type: string
}

/**
 * Check if vue-eslint-parser is available
 */
function hasVueParser(): boolean {
  try {
    // Check if the parser is vue-eslint-parser by looking at the parser name
    // This is checked at runtime in the rule context
    return true // Assume available if vue-eslint-parser is in peerDependencies
  } catch {
    return false
  }
}

/**
 * Check if the current file is a Vue file
 */
export function isVueFile(context: Rule.RuleContext): boolean {
  const parser = context.parserPath || context.getSourceCode().parserServices
  // Check if parser is vue-eslint-parser
  try {
    // Check parser name or file extension
    const filename = context.getFilename()
    return filename.endsWith('.vue') || 
           (parser && typeof parser === 'string' && parser.includes('vue-eslint-parser'))
  } catch {
    return false
  }
}

/**
 * Get Vue attribute value
 * 
 * @param attr - Vue attribute node
 * @returns Attribute value or null
 */
function getVueAttributeValue(attr: VElement['startTag']['attributes'][0]): string | null {
  if (!attr.value) {
    // Boolean attribute
    return attr.key.name || attr.key.argument || null
  }
  
  if (attr.value.value) {
    return attr.value.value
  }
  
  // Dynamic attribute (v-bind, :attr)
  if (attr.value.expression) {
    // Can't evaluate statically
    return null
  }
  
  return null
}

/**
 * Convert Vue element to DOM Element
 * 
 * @param node - Vue element AST node
 * @param context - ESLint rule context
 * @returns DOM Element representation
 */
export function vueElementToDOM(
  node: Rule.Node,
  context: Rule.RuleContext
): Element | null {
  const vueNode = node as unknown as VElement
  
  if (!vueNode || vueNode.type !== 'VElement') {
    return null
  }
  
  const tagName = vueNode.name.toLowerCase()
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
  const element = dom.window.document.createElement(tagName)
  
  // Set attributes
  if (vueNode.startTag?.attributes) {
    for (const attr of vueNode.startTag.attributes) {
      // Handle both regular attributes and v-bind/: syntax
      const attrName = attr.key.name || attr.key.argument
      if (attrName) {
        // Skip v-bind and : prefixes for attribute names
        const cleanName = attrName.replace(/^(v-bind:)?(:)?/, '')
        const value = getVueAttributeValue(attr)
        if (value !== null) {
          element.setAttribute(cleanName, value)
        } else if (!attr.value || !attr.value.expression) {
          // Boolean attribute
          element.setAttribute(cleanName, '')
        }
      }
    }
  }
  
  // Set text content if available
  if (vueNode.children) {
    const textContent = vueNode.children
      .filter((child: any) => child.type === 'VText')
      .map((child: any) => child.value || '')
      .join('')
      .trim()
    if (textContent) {
      element.textContent = textContent
    }
  }
  
  return element
}

/**
 * Check if Vue attribute is dynamic (uses v-bind or :)
 */
export function isVueAttributeDynamic(
  attr: VElement['startTag']['attributes'][0]
): boolean {
  if (!attr.value) return false
  return attr.value.expression !== undefined
}

/**
 * Get Vue attribute by name
 */
export function getVueAttribute(
  element: VElement,
  name: string
): VElement['startTag']['attributes'][0] | undefined {
  if (!element.startTag?.attributes) {
    return undefined
  }
  
  return element.startTag.attributes.find(
    attr => attr.key.name === name || attr.key.argument === name
  )
}

/**
 * Check if Vue element has a specific attribute
 */
export function hasVueAttribute(element: VElement, name: string): boolean {
  return getVueAttribute(element, name) !== undefined
}

