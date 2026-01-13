/**
 * ESLint rule: heading-order
 * 
 * Enforces proper heading hierarchy (no skipped levels)
 */

import type { Rule } from 'eslint'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce proper heading hierarchy (no skipped levels)',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/eslint-plugin-test-a11y-js'
    },
    messages: {
      skippedLevel: 'Heading level skipped from h{{previous}} to h{{current}}'
    },
    fixable: undefined,
    schema: []
  },
  create(context: Rule.RuleContext) {
    // Track heading levels in the current file
    const headingNodes: Array<{ node: Rule.Node; level: number }> = []

    return {
      // Check JSX heading elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        
        // Only handle simple identifiers (not member expressions)
        if (!jsxNode.name || jsxNode.name.type !== 'JSXIdentifier') {
          return
        }
        
        const tagName = jsxNode.name.name?.toLowerCase()
        
        if (tagName && /^h[1-6]$/.test(tagName)) {
          const currentLevel = parseInt(tagName[1])
          headingNodes.push({ node, level: currentLevel })
        }
      },

      // Check Vue template heading elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        const tagName = vueNode.name?.toLowerCase()
        
        if (tagName && /^h[1-6]$/.test(tagName)) {
          const currentLevel = parseInt(tagName[1])
          headingNodes.push({ node, level: currentLevel })
        }
      },

      // After checking all nodes, verify heading order
      'Program:exit'() {
        // Check heading order
        let prevLevel = 0
        
        for (const { node, level } of headingNodes) {
          if (prevLevel > 0 && level - prevLevel > 1) {
            context.report({
              node,
              messageId: 'skippedLevel',
              data: {
                previous: String(prevLevel),
                current: String(level)
              },
            })
          }
          prevLevel = level
        }
      }
    }
  }
}

export default rule
