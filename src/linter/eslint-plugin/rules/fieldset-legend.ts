/**
 * ESLint rule: fieldset-legend
 * 
 * Enforces that fieldset elements have an associated legend element
 */

import type { Rule } from 'eslint'
import { jsxToElement } from '../utils/jsx-ast-utils'
import { vueElementToDOM } from '../utils/vue-ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce fieldset elements have a legend element as a direct child',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/eslint-plugin-test-a11y-js'
    },
    messages: {
      missingLegend: 'fieldset must have a legend element as a direct child',
      emptyLegend: 'fieldset legend must have non-empty text content'
    },
    fixable: undefined,
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      // Check JSX fieldset elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        if (jsxNode.name?.name === 'fieldset') {
          // Convert to DOM and check with A11yChecker
          try {
            const element = jsxToElement(node, context)
            const violations = A11yChecker.checkFieldsetLegend(element)
            
            for (const violation of violations) {
              if (violation.id === 'fieldset-legend') {
                context.report({
                  node,
                  messageId: 'missingLegend'
                })
              } else if (violation.id === 'fieldset-legend-empty') {
                context.report({
                  node,
                  messageId: 'emptyLegend'
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
            const violations = A11yChecker.checkFieldsetLegend(element)
            for (const violation of violations) {
              if (violation.id === 'fieldset-legend') {
                context.report({
                  node,
                  messageId: 'missingLegend'
                })
              } else if (violation.id === 'fieldset-legend-empty') {
                context.report({
                  node,
                  messageId: 'emptyLegend'
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
            const violations = A11yChecker.checkFieldsetLegend(element)
            for (const violation of violations) {
              if (violation.id === 'fieldset-legend') {
                context.report({
                  node,
                  messageId: 'missingLegend'
                })
              } else if (violation.id === 'fieldset-legend-empty') {
                context.report({
                  node,
                  messageId: 'emptyLegend'
                })
              }
            }
          }
        }
      },

      // Check Vue template fieldset elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        if (vueNode.name === 'fieldset') {
          // Convert to DOM and check with A11yChecker
          try {
            const element = vueElementToDOM(node, context)
            if (element) {
              const violations = A11yChecker.checkFieldsetLegend(element)
              for (const violation of violations) {
                if (violation.id === 'fieldset-legend') {
                  context.report({
                    node,
                    messageId: 'missingLegend'
                  })
                } else if (violation.id === 'fieldset-legend-empty') {
                  context.report({
                    node,
                    messageId: 'emptyLegend'
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

