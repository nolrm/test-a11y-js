/**
 * ESLint rule: iframe-title
 * 
 * Enforces that iframes have title attributes for accessibility
 */

import type { Rule } from 'eslint'
import { hasJSXAttribute, isJSXAttributeDynamic, getJSXAttribute } from '../utils/jsx-ast-utils'
import { hasVueAttribute, isVueAttributeDynamic, getVueAttribute } from '../utils/vue-ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce iframes have title attributes',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/eslint-plugin-test-a11y-js'
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
        
        // Only handle simple identifiers (not member expressions)
        if (!jsxNode.name || jsxNode.name.type !== 'JSXIdentifier') {
          return
        }
        
        if (jsxNode.name.name === 'iframe') {
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

          // Check if title is empty string
          if (titleAttr && titleAttr.value && titleAttr.value.type === 'Literal' && titleAttr.value.value === '') {
            context.report({
              node,
              messageId: 'emptyTitle'
            })
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

          // Check if title is empty string
          if (titleAttr && titleAttr.value && titleAttr.value.value === '') {
            context.report({
              node,
              messageId: 'emptyTitle'
            })
          }
        }
      }
    }
  }
}

export default rule
