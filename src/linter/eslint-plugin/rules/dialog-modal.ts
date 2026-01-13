/**
 * ESLint rule: dialog-modal
 * 
 * Enforces that dialog elements have proper accessibility attributes
 */

import type { Rule } from 'eslint'
import { jsxToElement } from '../utils/jsx-ast-utils'
import { vueElementToDOM } from '../utils/vue-ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce dialog elements have proper accessibility attributes',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/eslint-plugin-test-a11y-js'
    },
    messages: {
      missingName: 'Dialog element must have an accessible name (aria-label, aria-labelledby, or heading)',
      missingModal: 'Modal dialog should have aria-modal="true" attribute',
      invalidRole: 'Dialog element should have role="dialog" or role="alertdialog"'
    },
    fixable: undefined,
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      // Check JSX dialog elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        if (jsxNode.name?.name === 'dialog' || 
            (jsxNode.name?.name && jsxNode.attributes?.some((attr: any) => 
              attr.name?.name === 'role' && 
              (attr.value?.value === 'dialog' || attr.value?.value === 'alertdialog')
            ))) {
          // Convert to DOM and check with A11yChecker
          try {
            const element = jsxToElement(node, context)
            const violations = A11yChecker.checkDialogModal(element)
            
            for (const violation of violations) {
              if (violation.id === 'dialog-missing-name') {
                context.report({
                  node,
                  messageId: 'missingName'
                })
              } else if (violation.id === 'dialog-missing-modal') {
                context.report({
                  node,
                  messageId: 'missingModal'
                })
              } else if (violation.id === 'dialog-invalid-role') {
                context.report({
                  node,
                  messageId: 'invalidRole'
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
            const violations = A11yChecker.checkDialogModal(element)
            for (const violation of violations) {
              if (violation.id === 'dialog-missing-name') {
                context.report({
                  node,
                  messageId: 'missingName'
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
            const violations = A11yChecker.checkDialogModal(element)
            for (const violation of violations) {
              if (violation.id === 'dialog-missing-name') {
                context.report({
                  node,
                  messageId: 'missingName'
                })
              }
            }
          }
        }
      },

      // Check Vue template dialog elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        if (vueNode.name === 'dialog' || 
            (vueNode.startTag?.attributes?.some((attr: any) => 
              attr.key?.name === 'role' && 
              (attr.value?.value === 'dialog' || attr.value?.value === 'alertdialog')
            ))) {
          // Convert to DOM and check with A11yChecker
          try {
            const element = vueElementToDOM(node, context)
            if (element) {
              const violations = A11yChecker.checkDialogModal(element)
              for (const violation of violations) {
                if (violation.id === 'dialog-missing-name') {
                  context.report({
                    node,
                    messageId: 'missingName'
                  })
                } else if (violation.id === 'dialog-missing-modal') {
                  context.report({
                    node,
                    messageId: 'missingModal'
                  })
                } else if (violation.id === 'dialog-invalid-role') {
                  context.report({
                    node,
                    messageId: 'invalidRole'
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

