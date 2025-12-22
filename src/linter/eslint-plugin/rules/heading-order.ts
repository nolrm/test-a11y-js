/**
 * ESLint rule: heading-order
 * 
 * Enforces proper heading hierarchy (no skipped levels)
 */

import type { Rule } from 'eslint'
import { A11yChecker } from '../../../core/a11y-checker'
import { jsxToElement } from '../utils/jsx-ast-utils'
import { htmlNodeToElement } from '../utils/html-ast-utils'
import { vueElementToDOM } from '../utils/vue-ast-utils'
import { isHTMLLiteral } from '../utils/ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce proper heading hierarchy (no skipped levels)',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/test-a11y-js'
    },
    messages: {
      skippedLevel: 'Heading level skipped from h{{previous}} to h{{current}}'
    },
    fixable: null,
    schema: []
  },
  create(context: Rule.RuleContext) {
    // Track heading levels in the current file
    let previousLevel = 0
    const headingNodes: Array<{ node: Rule.Node; level: number }> = []

    return {
      // Check JSX heading elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        const tagName = jsxNode.name?.name?.toLowerCase()
        
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
                previous: prevLevel,
                current: level
              },
              severity: 1 // Warning
            })
          }
          prevLevel = level
        }

        // Also check with A11yChecker for HTML strings
        // (JSX heading order is checked above)
      },

      // Check HTML strings
      Literal(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkHeadingOrder(element)
            for (const violation of violations) {
              const match = violation.description.match(/from h(\d+) to h(\d+)/)
              if (match) {
                context.report({
                  node,
                  messageId: 'skippedLevel',
                  data: {
                    previous: match[1],
                    current: match[2]
                  },
                  severity: 1 // Warning
                })
              }
            }
          }
        }
      },

      TemplateLiteral(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkHeadingOrder(element)
            for (const violation of violations) {
              const match = violation.description.match(/from h(\d+) to h(\d+)/)
              if (match) {
                context.report({
                  node,
                  messageId: 'skippedLevel',
                  data: {
                    previous: match[1],
                    current: match[2]
                  },
                  severity: 1 // Warning
                })
              }
            }
          }
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
      }
    }
  }
}

export default rule

