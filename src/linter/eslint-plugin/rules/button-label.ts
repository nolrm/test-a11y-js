/**
 * ESLint rule: button-label
 * 
 * Enforces that buttons have labels or aria-label attributes
 */

import type { Rule } from 'eslint'
import { A11yChecker } from '../../../core/a11y-checker'
import { jsxToElement, hasJSXAttribute, isJSXAttributeDynamic } from '../utils/jsx-ast-utils'
import { htmlNodeToElement } from '../utils/html-ast-utils'
import { vueElementToDOM, hasVueAttribute, isVueAttributeDynamic } from '../utils/vue-ast-utils'
import { isJSXElement, isHTMLLiteral, isVueElement } from '../utils/ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce buttons have labels or aria-label',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/test-a11y-js'
    },
    messages: {
      missingLabel: 'Button must have a label or aria-label',
      dynamicLabel: 'Button label is dynamic. Ensure it is not empty at runtime.'
    },
    fixable: null,
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      // Check JSX button elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        if (jsxNode.name?.name === 'button') {
          // Quick check: if no aria-label and no text content, report
          const hasAriaLabel = hasJSXAttribute(jsxNode, 'aria-label')
          const hasAriaLabelledBy = hasJSXAttribute(jsxNode, 'aria-labelledby')
          
          // Check if aria-label is dynamic
          if (hasAriaLabel) {
            const ariaLabelAttr = jsxNode.attributes?.find((attr: any) => 
              attr.name?.name === 'aria-label'
            )
            if (ariaLabelAttr && isJSXAttributeDynamic(ariaLabelAttr)) {
              context.report({
                node,
                messageId: 'dynamicLabel',
                severity: 1 // Warning
              })
            }
          }

          // Convert to DOM and check with A11yChecker
          try {
            const element = jsxToElement(node, context)
            const violations = A11yChecker.checkButtonLabel(element)
            
            for (const violation of violations) {
              if (violation.id === 'button-label') {
                context.report({
                  node,
                  messageId: 'missingLabel'
                })
              }
            }
          } catch (error) {
            // If conversion fails, check manually
            if (!hasAriaLabel && !hasAriaLabelledBy) {
              // Check if there are children (text content)
              const jsxElement = context.getSourceCode().getNodeByRangeIndex
              // If we can't determine, report
              context.report({
                node,
                messageId: 'missingLabel'
              })
            }
          }
        }
      },

      // Check HTML strings
      Literal(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkButtonLabel(element)
            for (const violation of violations) {
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
            const violations = A11yChecker.checkButtonLabel(element)
            for (const violation of violations) {
              context.report({
                node,
                messageId: 'missingLabel'
              })
            }
          }
        }
      },

      // Check Vue template elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        if (vueNode.name === 'button') {
          // Quick check: if no aria-label and no text content, report
          const hasAriaLabel = hasVueAttribute(vueNode, 'aria-label')
          const hasAriaLabelledBy = hasVueAttribute(vueNode, 'aria-labelledby')
          
          // Check if aria-label is dynamic
          if (hasAriaLabel) {
            const ariaLabelAttr = vueNode.startTag?.attributes?.find((attr: any) => 
              attr.key?.name === 'aria-label' || attr.key?.argument === 'aria-label'
            )
            if (ariaLabelAttr && isVueAttributeDynamic(ariaLabelAttr)) {
              context.report({
                node,
                messageId: 'dynamicLabel',
                severity: 1 // Warning
              })
            }
          }

          // Convert to DOM and check with A11yChecker
          try {
            const element = vueElementToDOM(node, context)
            if (element) {
              const violations = A11yChecker.checkButtonLabel(element)
              for (const violation of violations) {
                if (violation.id === 'button-label') {
                  context.report({
                    node,
                    messageId: 'missingLabel'
                  })
                }
              }
            }
          } catch (error) {
            // If conversion fails, check manually
            if (!hasAriaLabel && !hasAriaLabelledBy) {
              // Check if there are children (text content)
              const hasChildren = vueNode.children && vueNode.children.length > 0
              if (!hasChildren) {
                context.report({
                  node,
                  messageId: 'missingLabel'
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

