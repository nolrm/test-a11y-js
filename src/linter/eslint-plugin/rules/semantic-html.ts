/**
 * ESLint rule for semantic HTML validation (AST-first, no JSDOM)
 * Validates proper use of semantic HTML elements and detects misuse
 */

import { Rule } from 'eslint'
import { validateJSXSemanticHTML, validateVueSemanticHTML } from '../utils/semantic-html-ast-validation'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce proper use of semantic HTML elements',
      category: 'Accessibility',
      recommended: false // Start as opt-in, graduate to recommended once stable
    },
    messages: {
      semanticViolation: '{{message}}'
    },
    schema: []
  },
  create(context: Rule.RuleContext) {
    return {
      JSXOpeningElement(node: any) {
        const issues = validateJSXSemanticHTML(node)
        for (const issue of issues) {
          context.report({
            node,
            messageId: 'semanticViolation',
            data: {
              message: issue.message
            }
          })
        }
      },
      VElement(node: any) {
        const issues = validateVueSemanticHTML(node)
        for (const issue of issues) {
          context.report({
            node,
            messageId: 'semanticViolation',
            data: {
              message: issue.message
            }
          })
        }
      }
    }
  }
}

export default rule
