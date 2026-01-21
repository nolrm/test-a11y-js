/**
 * ESLint rule for form validation (AST-first, no JSDOM)
 * Validates form validation patterns and error handling
 */

import { Rule } from 'eslint'
import { validateJSXFormValidation, validateVueFormValidation } from '../utils/form-validation-ast'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce proper form validation messages and error handling',
      category: 'Accessibility',
      recommended: false // Start as opt-in, graduate to recommended once stable
    },
    messages: {
      formValidationViolation: '{{message}}'
    },
    schema: []
  },
  create(context: Rule.RuleContext) {
    // Track all IDs in the file for reference validation
    const allIds = new Set<string>()
    const jsxNodes: any[] = []
    const vueNodes: any[] = []
    
    return {
      // Collect IDs and store JSX nodes
      JSXOpeningElement(node: any) {
        // Collect ID
        if (node.attributes) {
          for (const attr of node.attributes) {
            if (attr.name?.name === 'id' && attr.value?.type === 'Literal') {
              const idValue = attr.value.value
              if (typeof idValue === 'string') {
                allIds.add(idValue)
              }
            }
          }
        }
        
        // Store for validation at Program:exit
        jsxNodes.push(node)
      },
      
      // Collect IDs and store Vue nodes
      VElement(node: any) {
        // Collect ID
        if (node.startTag?.attributes) {
          for (const attr of node.startTag.attributes) {
            const attrName = attr.key?.name || attr.key?.argument
            if (attrName === 'id' && attr.value?.value && typeof attr.value.value === 'string') {
              allIds.add(attr.value.value)
            }
          }
        }
        
        // Store for validation at Program:exit
        vueNodes.push(node)
      },
      
      // Validate all elements after collecting all IDs
      'Program:exit'() {
        // Validate JSX elements
        for (const node of jsxNodes) {
          const issues = validateJSXFormValidation(node, allIds)
          for (const issue of issues) {
            context.report({
              node,
              messageId: 'formValidationViolation',
              data: {
                message: issue.message
              }
            })
          }
        }
        
        // Validate Vue elements
        for (const node of vueNodes) {
          const issues = validateVueFormValidation(node, allIds)
          for (const issue of issues) {
            context.report({
              node,
              messageId: 'formValidationViolation',
              data: {
                message: issue.message
              }
            })
          }
        }
      }
    }
  }
}

export default rule
