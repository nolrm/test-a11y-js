/**
 * AST-based form validation utilities
 * 
 * These functions validate form validation patterns without using JSDOM/DOM,
 * working purely on AST nodes.
 */

import { hasJSXAttribute, getJSXAttribute } from './jsx-ast-utils'
import { hasVueAttribute, getVueAttribute } from './vue-ast-utils'

export interface FormValidationIssue {
  id: string
  message: string
  severity: 'error' | 'warning'
}

/**
 * Get tag name from JSX node
 */
function getJSXTagName(node: any): string {
  if (node.name?.type === 'JSXIdentifier') {
    return node.name.name.toLowerCase()
  }
  return ''
}

/**
 * Get tag name from Vue node
 */
function getVueTagName(node: any): string {
  return node.name?.toLowerCase() || ''
}

/**
 * Validate form validation patterns for JSX element
 */
export function validateJSXFormValidation(
  node: any,
  allIds: Set<string>
): FormValidationIssue[] {
  const issues: FormValidationIssue[] = []
  const tagName = getJSXTagName(node)
  
  // Check required form controls have labels
  if (tagName === 'input' || tagName === 'select' || tagName === 'textarea') {
    const required = hasJSXAttribute(node, 'required')
    const hasAriaLabel = hasJSXAttribute(node, 'aria-label')
    const hasAriaLabelledBy = hasJSXAttribute(node, 'aria-labelledby')
    const idAttr = getJSXAttribute(node, 'id')
    const id = idAttr?.value?.type === 'Literal' ? idAttr.value.value : null
    
    if (required && !hasAriaLabel && !hasAriaLabelledBy && !id) {
      issues.push({
        id: 'form-required-missing-label',
        message: 'Required form control must have a label (use <label>, aria-label, or aria-labelledby)',
        severity: 'error'
      })
    }
    
    // Check aria-describedby references exist
    const ariaDescribedBy = getJSXAttribute(node, 'aria-describedby')
    if (ariaDescribedBy?.value?.type === 'Literal' && typeof ariaDescribedBy.value.value === 'string') {
      const ids = ariaDescribedBy.value.value.trim().split(/\s+/)
      for (const refId of ids) {
        if (!allIds.has(refId)) {
          issues.push({
            id: 'form-invalid-aria-describedby',
            message: `aria-describedby references non-existent ID: "${refId}"`,
            severity: 'error'
          })
        }
      }
    }
    
    // Check aria-labelledby references exist
    const ariaLabelledBy = getJSXAttribute(node, 'aria-labelledby')
    if (ariaLabelledBy?.value?.type === 'Literal' && typeof ariaLabelledBy.value.value === 'string') {
      const ids = ariaLabelledBy.value.value.trim().split(/\s+/)
      for (const refId of ids) {
        if (!allIds.has(refId)) {
          issues.push({
            id: 'form-invalid-aria-labelledby',
            message: `aria-labelledby references non-existent ID: "${refId}"`,
            severity: 'error'
          })
        }
      }
    }
  }
  
  return issues
}

/**
 * Validate form validation patterns for Vue element
 */
export function validateVueFormValidation(
  node: any,
  allIds: Set<string>
): FormValidationIssue[] {
  const issues: FormValidationIssue[] = []
  const tagName = getVueTagName(node)
  
  // Check required form controls have labels
  if (tagName === 'input' || tagName === 'select' || tagName === 'textarea') {
    const required = hasVueAttribute(node, 'required')
    const hasAriaLabel = hasVueAttribute(node, 'aria-label')
    const hasAriaLabelledBy = hasVueAttribute(node, 'aria-labelledby')
    const idAttr = getVueAttribute(node, 'id')
    const id = idAttr?.value?.value && typeof idAttr.value.value === 'string' ? idAttr.value.value : null
    
    if (required && !hasAriaLabel && !hasAriaLabelledBy && !id) {
      issues.push({
        id: 'form-required-missing-label',
        message: 'Required form control must have a label (use <label>, aria-label, or aria-labelledby)',
        severity: 'error'
      })
    }
    
    // Check aria-describedby references exist
    const ariaDescribedBy = getVueAttribute(node, 'aria-describedby')
    if (ariaDescribedBy?.value?.value && typeof ariaDescribedBy.value.value === 'string') {
      const ids = ariaDescribedBy.value.value.trim().split(/\s+/)
      for (const refId of ids) {
        if (!allIds.has(refId)) {
          issues.push({
            id: 'form-invalid-aria-describedby',
            message: `aria-describedby references non-existent ID: "${refId}"`,
            severity: 'error'
          })
        }
      }
    }
    
    // Check aria-labelledby references exist
    const ariaLabelledBy = getVueAttribute(node, 'aria-labelledby')
    if (ariaLabelledBy?.value?.value && typeof ariaLabelledBy.value.value === 'string') {
      const ids = ariaLabelledBy.value.value.trim().split(/\s+/)
      for (const refId of ids) {
        if (!allIds.has(refId)) {
          issues.push({
            id: 'form-invalid-aria-labelledby',
            message: `aria-labelledby references non-existent ID: "${refId}"`,
            severity: 'error'
          })
        }
      }
    }
  }
  
  return issues
}
