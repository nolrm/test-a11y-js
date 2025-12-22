/**
 * ESLint rule: image-alt
 * 
 * Enforces that images have alt attributes for accessibility
 */

import type { Rule } from 'eslint'
import { A11yChecker } from '../../../core/a11y-checker'
import { jsxToElement, hasJSXAttribute, isJSXAttributeDynamic, getJSXAttribute } from '../utils/jsx-ast-utils'
import { htmlNodeToElement } from '../utils/html-ast-utils'
import { vueElementToDOM, hasVueAttribute, isVueAttributeDynamic, getVueAttribute } from '../utils/vue-ast-utils'
import { isJSXElement, isHTMLLiteral, isVueElement } from '../utils/ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce images have alt attributes',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/test-a11y-js'
    },
    messages: {
      missingAlt: 'Image must have an alt attribute',
      emptyAlt: 'Image alt attribute must not be empty',
      dynamicAlt: 'Image alt attribute is dynamic. Ensure it is not empty at runtime.'
    },
    fixable: null,
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      // Check JSX img elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        if (jsxNode.name?.name === 'img') {
          // Check if alt attribute exists
          if (!hasJSXAttribute(jsxNode, 'alt')) {
            context.report({
              node,
              messageId: 'missingAlt'
            })
            return
          }

          // Check if alt is dynamic
          const altAttr = getJSXAttribute(jsxNode, 'alt')
          if (altAttr && isJSXAttributeDynamic(altAttr)) {
            context.report({
              node,
              messageId: 'dynamicAlt',
              severity: 1 // Warning for dynamic attributes
            })
            return
          }

          // Convert to DOM and check with A11yChecker
          try {
            const element = jsxToElement(node, context)
            const violations = A11yChecker.checkImageAlt(element)
            
            for (const violation of violations) {
              if (violation.id === 'image-alt') {
                context.report({
                  node,
                  messageId: violation.description.includes('empty') ? 'emptyAlt' : 'missingAlt'
                })
              }
            }
          } catch (error) {
            // If conversion fails, we already checked for missing alt above
          }
        }
      },

      // Check HTML strings in template literals
      Literal(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkImageAlt(element)
            for (const violation of violations) {
              context.report({
                node,
                messageId: violation.description.includes('empty') ? 'emptyAlt' : 'missingAlt'
              })
            }
          }
        }
      },

      TemplateLiteral(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkImageAlt(element)
            for (const violation of violations) {
              context.report({
                node,
                messageId: violation.description.includes('empty') ? 'emptyAlt' : 'missingAlt'
              })
            }
          }
        }
      },

      // Check Vue template elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        if (vueNode.name === 'img') {
          // Check if alt attribute exists
          if (!hasVueAttribute(vueNode, 'alt')) {
            context.report({
              node,
              messageId: 'missingAlt'
            })
            return
          }

          // Check if alt is dynamic
          const altAttr = getVueAttribute(vueNode, 'alt')
          if (altAttr && isVueAttributeDynamic(altAttr)) {
            context.report({
              node,
              messageId: 'dynamicAlt',
              severity: 1 // Warning for dynamic attributes
            })
            return
          }

          // Convert to DOM and check with A11yChecker
          try {
            const element = vueElementToDOM(node, context)
            if (element) {
              const violations = A11yChecker.checkImageAlt(element)
              for (const violation of violations) {
                if (violation.id === 'image-alt') {
                  context.report({
                    node,
                    messageId: violation.description.includes('empty') ? 'emptyAlt' : 'missingAlt'
                  })
                }
              }
            }
          } catch (error) {
            // If conversion fails, we already checked for missing alt above
          }
        }
      }
    }
  }
}

export default rule

