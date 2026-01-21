/**
 * ESLint rule for ARIA validation (AST-first, no JSDOM)
 * Validates ARIA roles, properties, and ID references using pure AST analysis
 */

import { Rule } from 'eslint'
import { validateJSXAria, validateVueAria } from '../utils/aria-ast-validation'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce valid ARIA attributes, roles, and properties',
      category: 'Accessibility',
      recommended: false // Start as opt-in, graduate to recommended once stable
    },
    messages: {
      ariaViolation: '{{message}}'
    },
    schema: []
  },
  create(context: Rule.RuleContext) {
    // Track all IDs in the file for reference validation
    const allIds = new Set<string>()
    const jsxNodes: any[] = []
    const vueNodes: any[] = []
    
    return {
      // Collect IDs and store JSX nodes for validation
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
      
      // Collect IDs and store Vue nodes for validation
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
          const issues = validateJSXAria(node, allIds)
          for (const issue of issues) {
            context.report({
              node,
              messageId: 'ariaViolation',
              data: {
                message: issue.message
              }
            })
          }
        }
        
        // Validate Vue elements
        for (const node of vueNodes) {
          const issues = validateVueAria(node, allIds)
          for (const issue of issues) {
            context.report({
              node,
              messageId: 'ariaViolation',
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

