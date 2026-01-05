/**
 * ESLint rule: table-structure
 * 
 * Enforces that table elements have proper accessibility structure
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
      description: 'Enforce table elements have proper accessibility structure (caption, headers, scope)',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/eslint-plugin-test-a11y-js'
    },
    messages: {
      missingCaption: 'Table must have a caption or aria-label/aria-labelledby',
      missingHeaders: 'Table must have header cells (th elements) when it has data cells',
      missingScope: 'Table header cells (th) should have a scope attribute'
    },
    fixable: undefined,
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      // Check JSX table elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        if (jsxNode.name?.name === 'table') {
          // Convert to DOM and check with A11yChecker
          try {
            const element = jsxToElement(node, context)
            const violations = A11yChecker.checkTableStructure(element)
            
            for (const violation of violations) {
              if (violation.id === 'table-caption') {
                context.report({
                  node,
                  messageId: 'missingCaption'
                })
              } else if (violation.id === 'table-headers') {
                context.report({
                  node,
                  messageId: 'missingHeaders'
                })
              } else if (violation.id === 'table-header-scope') {
                context.report({
                  node: violation.element as any,
                  messageId: 'missingScope'
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
            const violations = A11yChecker.checkTableStructure(element)
            for (const violation of violations) {
              if (violation.id === 'table-caption') {
                context.report({
                  node,
                  messageId: 'missingCaption'
                })
              } else if (violation.id === 'table-headers') {
                context.report({
                  node,
                  messageId: 'missingHeaders'
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
            const violations = A11yChecker.checkTableStructure(element)
            for (const violation of violations) {
              if (violation.id === 'table-caption') {
                context.report({
                  node,
                  messageId: 'missingCaption'
                })
              } else if (violation.id === 'table-headers') {
                context.report({
                  node,
                  messageId: 'missingHeaders'
                })
              }
            }
          }
        }
      },

      // Check Vue template table elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        if (vueNode.name === 'table') {
          // Convert to DOM and check with A11yChecker
          try {
            const element = vueElementToDOM(node, context)
            if (element) {
              const violations = A11yChecker.checkTableStructure(element)
              for (const violation of violations) {
                if (violation.id === 'table-caption') {
                  context.report({
                    node,
                    messageId: 'missingCaption'
                  })
                } else if (violation.id === 'table-headers') {
                  context.report({
                    node,
                    messageId: 'missingHeaders'
                  })
                } else if (violation.id === 'table-header-scope') {
                  context.report({
                    node: violation.element as any,
                    messageId: 'missingScope'
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

