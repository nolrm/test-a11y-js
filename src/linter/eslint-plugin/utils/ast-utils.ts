/**
 * General AST traversal and utility functions
 */

import type { Rule } from 'eslint'

/**
 * Get the source code text for a node
 */
export function getNodeText(node: Rule.Node, context: Rule.RuleContext): string {
  const sourceCode = context.getSourceCode()
  return sourceCode.getText(node)
}

/**
 * Get the line number for a node
 */
export function getNodeLine(node: Rule.Node, context: Rule.RuleContext): number {
  const sourceCode = context.getSourceCode()
  return sourceCode.getLocForIndex(sourceCode.getIndexFromLoc(node.loc!.start)).line
}

/**
 * Check if a node is a JSX element
 */
export function isJSXElement(node: Rule.Node): boolean {
  return node.type === 'JSXElement' || node.type === 'JSXOpeningElement'
}

/**
 * Check if a node is a Vue element
 */
export function isVueElement(node: Rule.Node): boolean {
  return node.type === 'VElement'
}

/**
 * Check if a node is a template literal or string literal containing HTML
 */
export function isHTMLLiteral(node: Rule.Node): boolean {
  return (
    node.type === 'TemplateLiteral' ||
    node.type === 'Literal' ||
    (node.type === 'TaggedTemplateExpression' && 
     (node as any).tag.name === 'html')
  )
}

/**
 * Extract text content from a node (for simple text nodes)
 */
export function extractTextContent(node: Rule.Node, context: Rule.RuleContext): string {
  if (node.type === 'Literal' && typeof (node as any).value === 'string') {
    return (node as any).value
  }
  if (node.type === 'JSXText') {
    return (node as any).value.trim()
  }
  // For other cases, get the source text
  return getNodeText(node, context)
}

