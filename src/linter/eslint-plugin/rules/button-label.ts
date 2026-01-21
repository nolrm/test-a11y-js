/**
 * ESLint rule: button-label
 * 
 * Enforces that buttons have labels or aria-label attributes
 */

import type { Rule } from 'eslint'
import { hasJSXAttribute, isJSXAttributeDynamic } from '../utils/jsx-ast-utils'
import { hasVueAttribute, isVueAttributeDynamic } from '../utils/vue-ast-utils'
import { isElementLike } from '../utils/component-mapping'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce buttons have labels or aria-label',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/eslint-plugin-test-a11y-js'
    },
    messages: {
      missingLabel: 'Button must have a label or aria-label',
      dynamicLabel: 'Button label is dynamic. Ensure it is not empty at runtime.'
    },
    fixable: undefined,
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      // Check JSX button elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        
        // Only handle simple identifiers (not member expressions like <UI.Button>)
        if (!jsxNode.name || jsxNode.name.type !== 'JSXIdentifier') {
          return
        }
        
        // Check if it's a button element (native or mapped component)
        if (jsxNode.name.name === 'button' || isElementLike(node, context, 'button')) {
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
                messageId: 'dynamicLabel'
              })
              return
            }
          }

          // Check if button has no accessible name
          if (!hasAriaLabel && !hasAriaLabelledBy) {
            // Check if JSXElement has children (text content)
            const parent = node as any
            const jsxElement = parent.parent
            const hasChildren = jsxElement?.children && jsxElement.children.length > 0
            
            if (!hasChildren) {
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
                messageId: 'dynamicLabel'
              })
              return
            }
          }

          // Check if button has no accessible name
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

export default rule

