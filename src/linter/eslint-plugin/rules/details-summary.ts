/**
 * ESLint rule: details-summary
 * 
 * Enforces that details elements have a summary element as first child
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
      description: 'Enforce details elements have a summary element as first child',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/test-a11y-js'
    },
    messages: {
      missingSummary: 'details element must have a summary element as its first child',
      emptySummary: 'details summary element must have non-empty text content'
    },
    fixable: undefined,
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      // Check JSX details elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        if (jsxNode.name?.name === 'details') {
          // Convert to DOM and check with A11yChecker
          try {
            const element = jsxToElement(node, context)
            const violations = A11yChecker.checkDetailsSummary(element)
            
            for (const violation of violations) {
              if (violation.id === 'details-summary') {
                context.report({
                  node,
                  messageId: 'missingSummary'
                })
              } else if (violation.id === 'details-summary-empty') {
                context.report({
                  node,
                  messageId: 'emptySummary'
                })
              }
            }
          } catch (error) {
            // If conversion fails, we can't check, so skip
          }
        }
      },

      // Check HTML strings
      Literal(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkDetailsSummary(element)
            for (const violation of violations) {
              if (violation.id === 'details-summary') {
                context.report({
                  node,
                  messageId: 'missingSummary'
                })
              } else if (violation.id === 'details-summary-empty') {
                context.report({
                  node,
                  messageId: 'emptySummary'
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
            const violations = A11yChecker.checkDetailsSummary(element)
            for (const violation of violations) {
              if (violation.id === 'details-summary') {
                context.report({
                  node,
                  messageId: 'missingSummary'
                })
              } else if (violation.id === 'details-summary-empty') {
                context.report({
                  node,
                  messageId: 'emptySummary'
                })
              }
            }
          }
        }
      },

      // Check Vue template details elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        if (vueNode.name === 'details') {
          // Convert to DOM and check with A11yChecker
          try {
            const element = vueElementToDOM(node, context)
            if (element) {
              const violations = A11yChecker.checkDetailsSummary(element)
              for (const violation of violations) {
                if (violation.id === 'details-summary') {
                  context.report({
                    node,
                    messageId: 'missingSummary'
                  })
                } else if (violation.id === 'details-summary-empty') {
                  context.report({
                    node,
                    messageId: 'emptySummary'
                  })
                }
              }
            }
          } catch (error) {
            // If conversion fails, we can't check, so skip
          }
        }
      }
    }
  }
}

export default rule

