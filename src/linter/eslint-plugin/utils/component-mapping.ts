/**
 * Component mapping utilities for design-system components
 * 
 * Supports mapping custom components to native HTML elements and polymorphic `as=` props
 */

import type { Rule } from 'eslint'

/**
 * Plugin settings interface
 */
export interface A11yPluginSettings {
  'test-a11y-js'?: {
    components?: Record<string, string> // e.g., { Link: 'a', Button: 'button' }
    polymorphicPropNames?: string[] // e.g., ['as', 'component']
  }
}

/**
 * Get element role/tag from JSX node with component mapping support
 * 
 * Resolution precedence (documented and tested):
 * 1. Native HTML tag (highest priority)
 * 2. Polymorphic prop (as, component) when it's a static literal
 * 3. settings['test-a11y-js'].components[ComponentName] mapping
 * 4. Otherwise unknown (fallback)
 * 
 * @param node - JSX opening element node
 * @param context - ESLint rule context
 * @returns Resolved element tag name or null if unknown
 */
export function getElementRoleFromJSX(
  node: Rule.Node,
  context: Rule.RuleContext
): string | null {
  const jsxNode = node as any
  
  // Only handle simple identifiers (not member expressions like <UI.Image>)
  if (!jsxNode.name || jsxNode.name.type !== 'JSXIdentifier') {
    return null
  }
  
  const componentName = jsxNode.name.name
  const tagName = componentName.toLowerCase()
  
  // 1. Check if it's a native HTML tag
  const nativeTags = [
    'a', 'button', 'img', 'input', 'select', 'textarea',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'iframe', 'fieldset', 'table', 'details', 'summary',
    'video', 'audio', 'nav', 'main', 'header', 'footer',
    'aside', 'section', 'article', 'dialog', 'label'
  ]
  
  if (nativeTags.includes(tagName)) {
    return tagName
  }
  
  // 2. Check polymorphic props (as, component) - only if static literal
  const settings = (context.settings || {}) as A11yPluginSettings
  const polymorphicPropNames = settings['test-a11y-js']?.polymorphicPropNames || ['as', 'component']
  
  for (const propName of polymorphicPropNames) {
    const propAttr = jsxNode.attributes?.find((attr: any) => 
      attr.name?.name === propName
    )
    
    if (propAttr?.value?.type === 'Literal' && typeof propAttr.value.value === 'string') {
      const polymorphicValue = propAttr.value.value.toLowerCase()
      if (nativeTags.includes(polymorphicValue)) {
        return polymorphicValue
      }
    }
  }
  
  // 3. Check component mapping from settings
  const componentMapping = settings['test-a11y-js']?.components || {}
  if (componentMapping[componentName]) {
    const mappedTag = componentMapping[componentName].toLowerCase()
    if (nativeTags.includes(mappedTag)) {
      return mappedTag
    }
  }
  
  // 4. Unknown component
  return null
}

/**
 * Check if a JSX element should be treated as a specific native tag
 * 
 * @param node - JSX opening element node
 * @param context - ESLint rule context
 * @param targetTag - The native tag to check against (e.g., 'img', 'a', 'button')
 * @returns true if the element should be treated as the target tag
 */
export function isElementLike(
  node: Rule.Node,
  context: Rule.RuleContext,
  targetTag: string
): boolean {
  const resolvedTag = getElementRoleFromJSX(node, context)
  return resolvedTag === targetTag.toLowerCase()
}
