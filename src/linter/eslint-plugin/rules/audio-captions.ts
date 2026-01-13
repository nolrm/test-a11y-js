/**
 * ESLint rule: audio-captions
 * 
 * Enforces that audio elements have caption tracks or transcripts
 */

import type { Rule } from 'eslint'
import { jsxToElement } from '../utils/jsx-ast-utils'
import { vueElementToDOM } from '../utils/vue-ast-utils'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce audio elements have caption tracks or transcripts',
      category: 'Accessibility',
      recommended: true,
      url: 'https://github.com/nolrm/eslint-plugin-test-a11y-js'
    },
    messages: {
      missingCaptions: 'Audio element must have track elements or a transcript link',
      missingSrclang: 'Audio track must have a srclang attribute',
      missingLabel: 'Audio track should have a label attribute'
    },
    fixable: undefined,
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      // Check JSX audio elements
      JSXOpeningElement(node: Rule.Node) {
        const jsxNode = node as any
        if (jsxNode.name?.name === 'audio') {
          // Convert to DOM and check with A11yChecker
          try {
            const element = jsxToElement(node, context)
            const violations = A11yChecker.checkAudioCaptions(element)
            
            for (const violation of violations) {
              if (violation.id === 'audio-captions') {
                context.report({
                  node,
                  messageId: 'missingCaptions'
                })
              } else if (violation.id === 'audio-track-srclang') {
                context.report({
                  node: violation.element as any,
                  messageId: 'missingSrclang'
                })
              } else if (violation.id === 'audio-track-label') {
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
            const violations = A11yChecker.checkAudioCaptions(element)
            for (const violation of violations) {
              if (violation.id === 'audio-captions') {
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
            const violations = A11yChecker.checkAudioCaptions(element)
            for (const violation of violations) {
              if (violation.id === 'audio-captions') {
                context.report({
                  node,
                  messageId: 'missingCaptions'
                })
              }
            }
          }
        }
      },

      // Check Vue template audio elements
      VElement(node: Rule.Node) {
        const vueNode = node as any
        if (vueNode.name === 'audio') {
          // Convert to DOM and check with A11yChecker
          try {
            const element = vueElementToDOM(node, context)
            if (element) {
              const violations = A11yChecker.checkAudioCaptions(element)
              for (const violation of violations) {
                if (violation.id === 'audio-captions') {
                  context.report({
                    node,
                    messageId: 'missingCaptions'
                  })
                } else if (violation.id === 'audio-track-srclang') {
                  context.report({
                    node: violation.element as any,
                    messageId: 'missingSrclang'
                  })
                } else if (violation.id === 'audio-track-label') {
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

