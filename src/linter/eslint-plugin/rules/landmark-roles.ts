/**
 * ESLint rule: landmark-roles
 * 
 * Enforces proper use of landmark elements
 */

import type { Rule } from 'eslint'
import { jsxToElement } from '../utils/jsx-ast-utils'
import { vueElementToDOM } from '../utils/vue-ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce proper use of landmark elements (nav, main, header, footer, aside, section, article)',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/eslint-plugin-test-a11y-js'
    },
    messages: {
      multipleMain: 'Page should have only one main element',
      missingName: 'Landmark element should have an accessible name (heading, aria-label, or aria-labelledby)',
      duplicateUnnamed: 'Multiple landmark elements found. Each should have an accessible name (aria-label or aria-labelledby)'
    },
    fixable: undefined,
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      // Check JSX landmark elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        const tagName = jsxNode.name?.name?.toLowerCase()
        const landmarkTags = ['nav', 'main', 'header', 'footer', 'aside', 'section', 'article']
        
        if (landmarkTags.includes(tagName)) {
          try {
            const element = jsxToElement(node, context)
            const violations = A11yChecker.checkLandmarks(element)
            
            for (const violation of violations) {
              if (violation.id === 'landmark-multiple-main') {
                context.report({
                  node,
                  messageId: 'multipleMain'
                })
              } else if (violation.id === 'landmark-missing-name') {
                context.report({
                  node,
                  messageId: 'missingName'
                })
              } else if (violation.id === 'landmark-duplicate-unnamed') {
                context.report({
                  node,
                  messageId: 'duplicateUnnamed'
                })
              }
            }
          } catch (error) {
            // If conversion fails, we can't check, so skip
          }
        }
      },

      // Check HTML strings
      Literal(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkLandmarks(element)
            for (const violation of violations) {
              if (violation.id === 'landmark-multiple-main') {
                context.report({
                  node,
                  messageId: 'multipleMain'
                })
              } else if (violation.id === 'landmark-missing-name') {
                context.report({
                  node,
                  messageId: 'missingName'
                })
              }
            }
          }
        }
      },

      TemplateLiteral(node: Rule.Node) {
        if (isHTMLLiteral(node)) {
          const element = htmlNodeToElement(node, context)
          if (element) {
            const violations = A11yChecker.checkLandmarks(element)
            for (const violation of violations) {
              if (violation.id === 'landmark-multiple-main') {
                context.report({
                  node,
                  messageId: 'multipleMain'
                })
              } else if (violation.id === 'landmark-missing-name') {
                context.report({
                  node,
                  messageId: 'missingName'
                })
              }
            }
          }
        }
      },

      // Check Vue template landmark elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        const tagName = vueNode.name?.toLowerCase()
        const landmarkTags = ['nav', 'main', 'header', 'footer', 'aside', 'section', 'article']
        
        if (landmarkTags.includes(tagName)) {
          try {
            const element = vueElementToDOM(node, context)
            if (element) {
              const violations = A11yChecker.checkLandmarks(element)
              for (const violation of violations) {
                if (violation.id === 'landmark-multiple-main') {
                  context.report({
                    node,
                    messageId: 'multipleMain'
                  })
                } else if (violation.id === 'landmark-missing-name') {
                  context.report({
                    node,
                    messageId: 'missingName'
                  })
                } else if (violation.id === 'landmark-duplicate-unnamed') {
                  context.report({
                    node,
                    messageId: 'duplicateUnnamed'
                  })
                }
              }
            }
          } catch (error) {
            // If conversion fails, we can't check, so skip
          }
        }
      }
    }
  }
}

export default rule

