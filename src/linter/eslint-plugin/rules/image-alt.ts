/**
 * ESLint rule: image-alt
 * 
 * Enforces that images have alt attributes for accessibility
 */

import type { Rule } from 'eslint'
import { hasJSXAttribute, isJSXAttributeDynamic, getJSXAttribute } from '../utils/jsx-ast-utils'
import { hasVueAttribute, isVueAttributeDynamic, getVueAttribute } from '../utils/vue-ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce images have alt attributes',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/eslint-plugin-test-a11y-js'
    },
    messages: {
      missingAlt: 'Image must have an alt attribute',
      emptyAlt: 'Image alt attribute must not be empty',
      dynamicAlt: 'Image alt attribute is dynamic. Ensure it is not empty at runtime.'
    },
    fixable: undefined,
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      // Check JSX img elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        
        // Only handle simple identifiers (not member expressions like <UI.Image>)
        if (!jsxNode.name || jsxNode.name.type !== 'JSXIdentifier') {
          return
        }
        
        if (jsxNode.name.name === 'img') {
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
                messageId: 'dynamicAlt'
              })
            return
          }

          // Check if alt is empty string
          if (altAttr && altAttr.value && altAttr.value.type === 'Literal' && altAttr.value.value === '') {
            context.report({
              node,
              messageId: 'emptyAlt'
            })
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
                messageId: 'dynamicAlt'
              })
            return
          }

          // Check if alt is empty string
          if (altAttr && altAttr.value && altAttr.value.value === '') {
            context.report({
              node,
              messageId: 'emptyAlt'
            })
          }
        }
      }
    }
  }
}

export default rule

