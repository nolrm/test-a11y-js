/**
 * ESLint rule: link-text
 * 
 * Enforces that links have descriptive text
 */

import type { Rule } from 'eslint'
import { hasJSXAttribute, isJSXAttributeDynamic, getJSXAttribute } from '../utils/jsx-ast-utils'
import { hasVueAttribute, isVueAttributeDynamic, getVueAttribute } from '../utils/vue-ast-utils'
import { isElementLike } from '../utils/component-mapping'
import { getLinkTextOptions, matchesDenylist } from '../utils/rule-options'

/**
 * Get accessible name from JSX element (text, aria-label, aria-labelledby)
 */
function getJSXAccessibleName(node: any, _context: Rule.RuleContext): { text: string; source: 'text' | 'aria-label' | 'aria-labelledby' | null } {
  // Check aria-label first
  const ariaLabelAttr = getJSXAttribute(node, 'aria-label')
  if (ariaLabelAttr && ariaLabelAttr.value?.type === 'Literal') {
    return { text: ariaLabelAttr.value.value || '', source: 'aria-label' }
  }
  
  // Check aria-labelledby (would need to resolve ID, but for now just note it exists)
  if (hasJSXAttribute(node, 'aria-labelledby')) {
    return { text: '', source: 'aria-labelledby' }
  }
  
  // Check text content
  const parent = node.parent
  const jsxElement = parent
  if (jsxElement?.children) {
    const textContent = jsxElement.children
      .filter((child: any) => child.type === 'JSXText')
      .map((child: any) => child.value || '')
      .join('')
      .trim()
    if (textContent) {
      return { text: textContent, source: 'text' }
    }
  }
  
  return { text: '', source: null }
}

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
    schema: [
      {
        type: 'object',
        properties: {
          denylist: {
            type: 'array',
            items: { type: 'string' }
          },
          caseInsensitive: {
            type: 'boolean'
          },
          allowlistPatterns: {
            type: 'array',
            items: { type: 'string' }
          }
        },
        additionalProperties: false
      }
    ]
  },
  create(context: Rule.RuleContext) {
    const options = getLinkTextOptions(context.options)
    
    return {
      // Check JSX anchor elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        
        // Only handle simple identifiers (not member expressions)
        if (!jsxNode.name || jsxNode.name.type !== 'JSXIdentifier') {
          return
        }
        
        // Check if it's an anchor element (native or mapped component)
        if (jsxNode.name.name === 'a' || isElementLike(node, context, 'a')) {
          // Get accessible name from multiple sources
          const accessibleName = getJSXAccessibleName(jsxNode, context)
          
          // Check if aria-label is dynamic
          const ariaLabelAttr = getJSXAttribute(jsxNode, 'aria-label')
          if (ariaLabelAttr && isJSXAttributeDynamic(ariaLabelAttr)) {
            context.report({
              node,
              messageId: 'dynamicText',
            })
            return
          }

          // Check if link has no accessible name
          if (!accessibleName.text && accessibleName.source !== 'aria-labelledby') {
            context.report({
              node,
              messageId: 'missingText'
            })
            return
          }

          // Check if text matches denylist
          if (accessibleName.text && matchesDenylist(accessibleName.text, options)) {
            context.report({
              node,
              messageId: 'nonDescriptive'
            })
          }
        }
      },


      // Check Vue template elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        if (vueNode.name === 'a') {
          // Get accessible name from multiple sources
          let accessibleText = ''
          let source: 'text' | 'aria-label' | 'aria-labelledby' | null = null
          
          // Check aria-label
          const ariaLabelAttr = getVueAttribute(vueNode, 'aria-label')
          if (ariaLabelAttr) {
            if (isVueAttributeDynamic(ariaLabelAttr)) {
              context.report({
                node,
                messageId: 'dynamicText',
              })
              return
            }
            if (ariaLabelAttr.value?.value) {
              accessibleText = ariaLabelAttr.value.value
              source = 'aria-label'
            }
          }
          
          // Check aria-labelledby
          if (!source && hasVueAttribute(vueNode, 'aria-labelledby')) {
            source = 'aria-labelledby'
          }
          
          // Check text content
          if (!source && vueNode.children) {
            const textContent = vueNode.children
              .filter((child: any) => child.type === 'VText')
              .map((child: any) => child.value || '')
              .join('')
              .trim()
            if (textContent) {
              accessibleText = textContent
              source = 'text'
            }
          }

          // Check if link has no accessible name
          if (!accessibleText && source !== 'aria-labelledby') {
            context.report({
              node,
              messageId: 'missingText'
            })
            return
          }

          // Check if text matches denylist
          if (accessibleText && matchesDenylist(accessibleText, options)) {
            context.report({
              node,
              messageId: 'nonDescriptive'
            })
          }
        }
      }
    }
  }
}

export default rule

