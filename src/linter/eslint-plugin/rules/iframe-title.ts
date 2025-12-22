/**
 * ESLint rule: iframe-title
 * 
 * Enforces that iframes have title attributes for accessibility
 */

import type { Rule } from 'eslint'
import { A11yChecker } from '../../../core/a11y-checker'
import { jsxToElement, hasJSXAttribute, isJSXAttributeDynamic, getJSXAttribute } from '../utils/jsx-ast-utils'
import { htmlNodeToElement } from '../utils/html-ast-utils'
import { vueElementToDOM, hasVueAttribute, isVueAttributeDynamic, getVueAttribute } from '../utils/vue-ast-utils'
import { isHTMLLiteral } from '../utils/ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce iframes have title attributes',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/test-a11y-js'
    },
    messages: {
      missingTitle: 'iframe must have a title attribute',
      emptyTitle: 'iframe title attribute must not be empty',
      dynamicTitle: 'iframe title attribute is dynamic. Ensure it is not empty at runtime.'
    },
    fixable: undefined,
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      // Check JSX iframe elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        if (jsxNode.name?.name === 'iframe') {
          // Check if title attribute exists
          if (!hasJSXAttribute(jsxNode, 'title')) {
            context.report({
              node,
              messageId: 'missingTitle'
            })
            return
          }

          // Check if title is dynamic
          const titleAttr = getJSXAttribute(jsxNode, 'title')
          if (titleAttr && isJSXAttributeDynamic(titleAttr)) {
              context.report({
                node,
                messageId: 'dynamicTitle'
              })
            return
          }

          // Convert to DOM and check with A11yChecker
          try {
            const element = jsxToElement(node, context)
            const violations = A11yChecker.checkIframeTitle(element)
            
            for (const violation of violations) {
              if (violation.id === 'iframe-title') {
                context.report({
                  node,
                  messageId: violation.description.includes('empty') ? 'emptyTitle' : 'missingTitle'
                })
              }
            }
          } catch (error) {
            // If conversion fails, we already checked for missing title above
          }
        }
      },

      // Check HTML strings in template literals
      Literal(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkIframeTitle(element)
            for (const violation of violations) {
              context.report({
                node,
                messageId: violation.description.includes('empty') ? 'emptyTitle' : 'missingTitle'
              })
            }
          }
        }
      },

      TemplateLiteral(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkIframeTitle(element)
            for (const violation of violations) {
              context.report({
                node,
                messageId: violation.description.includes('empty') ? 'emptyTitle' : 'missingTitle'
              })
            }
          }
        }
      },

      // Check Vue template elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        if (vueNode.name === 'iframe') {
          // Check if title attribute exists
          if (!hasVueAttribute(vueNode, 'title')) {
            context.report({
              node,
              messageId: 'missingTitle'
            })
            return
          }

          // Check if title is dynamic
          const titleAttr = getVueAttribute(vueNode, 'title')
          if (titleAttr && isVueAttributeDynamic(titleAttr)) {
              context.report({
                node,
                messageId: 'dynamicTitle'
              })
            return
          }

          // Convert to DOM and check with A11yChecker
          try {
            const element = vueElementToDOM(node, context)
            if (element) {
              const violations = A11yChecker.checkIframeTitle(element)
              for (const violation of violations) {
                if (violation.id === 'iframe-title') {
                  context.report({
                    node,
                    messageId: violation.description.includes('empty') ? 'emptyTitle' : 'missingTitle'
                  })
                }
              }
            }
          } catch (error) {
            // If conversion fails, we already checked for missing title above
          }
        }
      }
    }
  }
}

export default rule

