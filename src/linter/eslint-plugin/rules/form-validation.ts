/**
 * ESLint rule for form validation messages
 * Validates form validation and error handling
 */

import { Rule } from 'eslint'
import { A11yChecker } from '../../../core/a11y-checker'
import { jsxToElement } from '../utils/jsx-ast-utils'
import { vueElementToDOM } from '../utils/vue-ast-utils'
import { parseHTMLString } from '../utils/html-ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce proper form validation messages and error handling',
      category: 'Accessibility',
      recommended: true
    },
    messages: {
      formValidationViolation: '{{message}}'
    },
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      JSXOpeningElement(node: any) {
        const element = jsxToElement(node, context)
        if (!element) return

        const violations = A11yChecker.checkFormValidationMessages(element)

        for (const violation of violations) {
          context.report({
            node,
            messageId: 'formValidationViolation',
            data: {
              message: violation.description
            }
          })
        }
      },
      VElement(node: any) {
        const element = vueElementToDOM(node, context)
        if (!element) return

        const violations = A11yChecker.checkFormValidationMessages(element)

        for (const violation of violations) {
          context.report({
            node,
            messageId: 'formValidationViolation',
            data: {
              message: violation.description
            }
          })
        }
      },
      Literal(node: any) {
        if (typeof node.value !== 'string') return
        const element = parseHTMLString(node.value)
        if (!element) return

        const violations = A11yChecker.checkFormValidationMessages(element)

        for (const violation of violations) {
          context.report({
            node,
            messageId: 'formValidationViolation',
            data: {
              message: violation.description
            }
          })
        }
      },
      TemplateLiteral(node: any) {
        if (node.quasis && node.quasis.length > 0) {
          for (const quasi of node.quasis) {
            if (quasi.value && typeof quasi.value.raw === 'string') {
              const element = parseHTMLString(quasi.value.raw)
              if (!element) continue

              const violations = A11yChecker.checkFormValidationMessages(element)

              for (const violation of violations) {
                context.report({
                  node: quasi,
                  messageId: 'formValidationViolation',
                  data: {
                    message: violation.description
                  }
                })
              }
            }
          }
        }
      }
    }
  }
}

export default rule

