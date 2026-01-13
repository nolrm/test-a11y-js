/**
 * ESLint rule: link-text
 * 
 * Enforces that links have descriptive text
 */

import type { Rule } from 'eslint'
import { hasJSXAttribute, isJSXAttributeDynamic } from '../utils/jsx-ast-utils'
import { hasVueAttribute, isVueAttributeDynamic } from '../utils/vue-ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce links have descriptive text',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/eslint-plugin-test-a11y-js'
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
        
        // Only handle simple identifiers (not member expressions)
        if (!jsxNode.name || jsxNode.name.type !== 'JSXIdentifier') {
          return
        }
        
        if (jsxNode.name.name === 'a') {
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

          // Check if link has no accessible name
          if (!hasAriaLabel) {
            const parent = node as any
            const jsxElement = parent.parent
            const hasChildren = jsxElement?.children && jsxElement.children.length > 0
            
            if (!hasChildren) {
              context.report({
                node,
                messageId: 'missingText'
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

          // Check if link has no accessible name
          if (!hasAriaLabel) {
            const hasChildren = vueNode.children && vueNode.children.length > 0
            if (!hasChildren) {
              context.report({
                node,
                messageId: 'missingText'
              })
            }
          }
        }
      }
    }
  }
}

export default rule

