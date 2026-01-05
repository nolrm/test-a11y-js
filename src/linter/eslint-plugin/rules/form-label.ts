/**
 * ESLint rule: form-label
 * 
 * Enforces that form controls have associated labels
 */

import type { Rule } from 'eslint'
import { A11yChecker } from '../../../core/a11y-checker'
import { jsxToElement, hasJSXAttribute } from '../utils/jsx-ast-utils'
import { htmlNodeToElement } from '../utils/html-ast-utils'
import { hasVueAttribute, getVueAttribute } from '../utils/vue-ast-utils'
import { isHTMLLiteral } from '../utils/ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce form controls have associated labels',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/eslint-plugin-test-a11y-js'
    },
    messages: {
      missingLabel: 'Form control must have an associated label (use id/for, aria-label, or aria-labelledby)'
    },
    fixable: undefined,
    schema: []
  },
  create(context: Rule.RuleContext) {
    // Track form controls and their labels in the current file
    const formControls = new Map<string, any>()
    const labels = new Map<string, any>()

    return {
      // Check JSX form control elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        const tagName = jsxNode.name?.name?.toLowerCase()
        
        if (tagName === 'input' || tagName === 'select' || tagName === 'textarea') {
          // Check if it has aria-label or aria-labelledby
          const hasAriaLabel = hasJSXAttribute(jsxNode, 'aria-label')
          const hasAriaLabelledBy = hasJSXAttribute(jsxNode, 'aria-labelledby')
          
          // Get id attribute
          const idAttr = jsxNode.attributes?.find((attr: any) => 
            attr.name?.name === 'id'
          )
          const id = idAttr?.value?.value

          // If no aria-label, aria-labelledby, or id, report
          if (!hasAriaLabel && !hasAriaLabelledBy && !id) {
            context.report({
              node,
              messageId: 'missingLabel'
            })
          } else if (id) {
            // Store for later checking against label[for]
            formControls.set(id, node)
          }
        }

        // Check for label elements
        if (tagName === 'label') {
          const forAttr = jsxNode.attributes?.find((attr: any) => 
            attr.name?.name === 'for' || attr.name?.name === 'htmlFor'
          )
          const forValue = forAttr?.value?.value
          if (forValue) {
            labels.set(forValue, node)
          }
        }
      },

      // After checking all nodes, verify label associations
      'Program:exit'() {
        // Check if form controls have matching labels
        for (const [id, node] of formControls.entries()) {
          if (!labels.has(id)) {
            // Convert to DOM and check with A11yChecker
            try {
              const element = jsxToElement(node, context)
              const violations = A11yChecker.checkFormLabels(element)
              
              for (const violation of violations) {
                if (violation.id === 'form-label') {
                  context.report({
                    node,
                    messageId: 'missingLabel'
                  })
                }
              }
            } catch (error) {
              // If conversion fails, we already checked above
            }
          }
        }
      },

      // Check HTML strings
      Literal(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkFormLabels(element)
            if (violations.length > 0) {
              context.report({
                node,
                messageId: 'missingLabel'
              })
            }
          }
        }
      },

      TemplateLiteral(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkFormLabels(element)
            if (violations.length > 0) {
              context.report({
                node,
                messageId: 'missingLabel'
              })
            }
          }
        }
      },

      // Check Vue template form control elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        const tagName = vueNode.name?.toLowerCase()
        
        if (tagName === 'input' || tagName === 'select' || tagName === 'textarea') {
          // Check if it has aria-label or aria-labelledby
          const hasAriaLabel = hasVueAttribute(vueNode, 'aria-label')
          const hasAriaLabelledBy = hasVueAttribute(vueNode, 'aria-labelledby')
          
          // Get id attribute
          const idAttr = getVueAttribute(vueNode, 'id')
          const id = idAttr?.value?.value

          // If no aria-label, aria-labelledby, or id, report
          if (!hasAriaLabel && !hasAriaLabelledBy && !id) {
            context.report({
              node,
              messageId: 'missingLabel'
            })
          } else if (id) {
            // Store for later checking against label[for]
            formControls.set(id, node)
          }
        }

        // Check for label elements
        if (tagName === 'label') {
          const forAttr = getVueAttribute(vueNode, 'for')
          const forValue = forAttr?.value?.value
          if (forValue) {
            labels.set(forValue, node)
          }
        }
      }
    }
  }
}

export default rule

