/**
 * ESLint rule: video-captions
 * 
 * Enforces that video elements have caption tracks
 */

import type { Rule } from 'eslint'
import { A11yChecker } from '../../../core/a11y-checker'
import { jsxToElement } from '../utils/jsx-ast-utils'
import { htmlNodeToElement } from '../utils/html-ast-utils'
import { vueElementToDOM } from '../utils/vue-ast-utils'
import { isHTMLLiteral } from '../utils/ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce video elements have caption tracks',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/eslint-plugin-test-a11y-js'
    },
    messages: {
      missingCaptions: 'Video element must have at least one track element with kind="captions"',
      missingSrclang: 'Video caption track must have a srclang attribute',
      missingLabel: 'Video caption track should have a label attribute'
    },
    fixable: undefined,
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      // Check JSX video elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        if (jsxNode.name?.name === 'video') {
          // Convert to DOM and check with A11yChecker
          try {
            const element = jsxToElement(node, context)
            const violations = A11yChecker.checkVideoCaptions(element)
            
            for (const violation of violations) {
              if (violation.id === 'video-captions') {
                context.report({
                  node,
                  messageId: 'missingCaptions'
                })
              } else if (violation.id === 'video-track-srclang') {
                context.report({
                  node: violation.element as any,
                  messageId: 'missingSrclang'
                })
              } else if (violation.id === 'video-track-label') {
                context.report({
                  node: violation.element as any,
                  messageId: 'missingLabel'
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
            const violations = A11yChecker.checkVideoCaptions(element)
            for (const violation of violations) {
              if (violation.id === 'video-captions') {
                context.report({
                  node,
                  messageId: 'missingCaptions'
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
            const violations = A11yChecker.checkVideoCaptions(element)
            for (const violation of violations) {
              if (violation.id === 'video-captions') {
                context.report({
                  node,
                  messageId: 'missingCaptions'
                })
              }
            }
          }
        }
      },

      // Check Vue template video elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        if (vueNode.name === 'video') {
          // Convert to DOM and check with A11yChecker
          try {
            const element = vueElementToDOM(node, context)
            if (element) {
              const violations = A11yChecker.checkVideoCaptions(element)
              for (const violation of violations) {
                if (violation.id === 'video-captions') {
                  context.report({
                    node,
                    messageId: 'missingCaptions'
                  })
                } else if (violation.id === 'video-track-srclang') {
                  context.report({
                    node: violation.element as any,
                    messageId: 'missingSrclang'
                  })
                } else if (violation.id === 'video-track-label') {
                  context.report({
                    node: violation.element as any,
                    messageId: 'missingLabel'
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

