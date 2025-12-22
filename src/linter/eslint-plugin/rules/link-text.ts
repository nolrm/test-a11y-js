/**
 * ESLint rule: link-text
 * 
 * Enforces that links have descriptive text
 */

import type { Rule } from 'eslint'
import { A11yChecker } from '../../../core/a11y-checker'
import { jsxToElement, hasJSXAttribute, isJSXAttributeDynamic } from '../utils/jsx-ast-utils'
import { htmlNodeToElement } from '../utils/html-ast-utils'
import { vueElementToDOM, hasVueAttribute, isVueAttributeDynamic } from '../utils/vue-ast-utils'
import { isHTMLLiteral } from '../utils/ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce links have descriptive text',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/test-a11y-js'
    },
    messages: {
      missingText: 'Link must have descriptive text',
      nonDescriptive: 'Link text should be more descriptive (avoid "click here", "read more", etc.)',
      dynamicText: 'Link text is dynamic. Ensure it is descriptive at runtime.'
    },
    fixable: undefined,
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      // Check JSX anchor elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        if (jsxNode.name?.name === 'a') {
          // Check if aria-label exists
          const hasAriaLabel = hasJSXAttribute(jsxNode, 'aria-label')
          
          if (hasAriaLabel) {
            const ariaLabelAttr = jsxNode.attributes?.find((attr: any) => 
              attr.name?.name === 'aria-label'
            )
            if (ariaLabelAttr && isJSXAttributeDynamic(ariaLabelAttr)) {
              context.report({
                node,
                messageId: 'dynamicText',
              })
            }
          }

          // Convert to DOM and check with A11yChecker
          try {
            const element = jsxToElement(node, context)
            const violations = A11yChecker.checkLinkText(element)
            
            for (const violation of violations) {
              if (violation.id === 'link-text') {
                context.report({
                  node,
                  messageId: 'missingText'
                })
              } else if (violation.id === 'link-text-descriptive') {
                context.report({
                  node,
                  messageId: 'nonDescriptive',
                })
              }
            }
          } catch (error) {
            // If conversion fails, we can't check
          }
        }
      },

      // Check HTML strings
      Literal(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkLinkText(element)
            for (const violation of violations) {
              context.report({
                node,
                messageId: violation.id === 'link-text' ? 'missingText' : 'nonDescriptive',
              })
            }
          }
        }
      },

      TemplateLiteral(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkLinkText(element)
            for (const violation of violations) {
              context.report({
                node,
                messageId: violation.id === 'link-text' ? 'missingText' : 'nonDescriptive',
              })
            }
          }
        }
      },

      // Check Vue template elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        if (vueNode.name === 'a') {
          // Check if aria-label exists
          const hasAriaLabel = hasVueAttribute(vueNode, 'aria-label')
          
          if (hasAriaLabel) {
            const ariaLabelAttr = vueNode.startTag?.attributes?.find((attr: any) => 
              attr.key?.name === 'aria-label' || attr.key?.argument === 'aria-label'
            )
            if (ariaLabelAttr && isVueAttributeDynamic(ariaLabelAttr)) {
              context.report({
                node,
                messageId: 'dynamicText',
              })
            }
          }

          // Convert to DOM and check with A11yChecker
          try {
            const element = vueElementToDOM(node, context)
            if (element) {
              const violations = A11yChecker.checkLinkText(element)
              for (const violation of violations) {
                if (violation.id === 'link-text') {
                  context.report({
                    node,
                    messageId: 'missingText'
                  })
                } else if (violation.id === 'link-text-descriptive') {
                  context.report({
                    node,
                    messageId: 'nonDescriptive',
                  })
                }
              }
            }
          } catch (error) {
            // If conversion fails, we can't check
          }
        }
      }
    }
  }
}

export default rule

