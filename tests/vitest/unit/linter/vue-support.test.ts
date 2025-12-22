import { describe, it, expect } from 'vitest'
import { vueElementToDOM, hasVueAttribute, getVueAttribute, isVueAttributeDynamic } from '../../../src/linter/eslint-plugin/utils/vue-ast-utils.js'

// Mock ESLint context
function createMockContext(): any {
  return {
    getFilename: () => 'test.vue',
    getSourceCode: () => ({
      parserServices: {}
    })
  }
}

describe('Vue AST Utils', () => {
  describe('vueElementToDOM', () => {
    it('should convert Vue img element to DOM element', () => {
      const vueNode = {
        type: 'VElement',
        name: 'img',
        startTag: {
          attributes: [
            {
              key: { name: 'src' },
              value: { value: 'test.jpg' }
            },
            {
              key: { name: 'alt' },
              value: { value: 'Test image' }
            }
          ]
        }
      } as any

      const context = createMockContext()
      const element = vueElementToDOM(vueNode, context)

      expect(element).not.toBeNull()
      expect(element?.tagName.toLowerCase()).toBe('img')
      expect(element?.getAttribute('src')).toBe('test.jpg')
      expect(element?.getAttribute('alt')).toBe('Test image')
    })

    it('should handle Vue v-bind syntax', () => {
      const vueNode = {
        type: 'VElement',
        name: 'img',
        startTag: {
          attributes: [
            {
              key: { name: 'src' },
              value: { value: 'test.jpg' }
            },
            {
              key: { argument: 'alt' }, // v-bind:alt or :alt
              value: { value: 'Dynamic alt' }
            }
          ]
        }
      } as any

      const context = createMockContext()
      const element = vueElementToDOM(vueNode, context)

      expect(element).not.toBeNull()
      expect(element?.getAttribute('alt')).toBe('Dynamic alt')
    })

    it('should handle Vue button with text content', () => {
      const vueNode = {
        type: 'VElement',
        name: 'button',
        startTag: {
          attributes: []
        },
        children: [
          {
            type: 'VText',
            value: 'Click me'
          }
        ]
      } as any

      const context = createMockContext()
      const element = vueElementToDOM(vueNode, context)

      expect(element).not.toBeNull()
      expect(element?.tagName.toLowerCase()).toBe('button')
      expect(element?.textContent).toBe('Click me')
    })
  })

  describe('hasVueAttribute', () => {
    it('should check if Vue element has attribute', () => {
      const vueNode = {
        type: 'VElement',
        name: 'img',
        startTag: {
          attributes: [
            {
              key: { name: 'alt' },
              value: { value: 'Test' }
            }
          ]
        }
      } as any

      expect(hasVueAttribute(vueNode, 'alt')).toBe(true)
      expect(hasVueAttribute(vueNode, 'src')).toBe(false)
    })

    it('should check v-bind attributes', () => {
      const vueNode = {
        type: 'VElement',
        name: 'img',
        startTag: {
          attributes: [
            {
              key: { argument: 'alt' }, // :alt or v-bind:alt
              value: { value: 'Test' }
            }
          ]
        }
      } as any

      expect(hasVueAttribute(vueNode, 'alt')).toBe(true)
    })
  })

  describe('getVueAttribute', () => {
    it('should get Vue attribute by name', () => {
      const vueNode = {
        type: 'VElement',
        name: 'img',
        startTag: {
          attributes: [
            {
              key: { name: 'alt' },
              value: { value: 'Test' }
            }
          ]
        }
      } as any

      const attr = getVueAttribute(vueNode, 'alt')
      expect(attr).toBeDefined()
      expect(attr?.key.name).toBe('alt')
    })
  })

  describe('isVueAttributeDynamic', () => {
    it('should detect dynamic Vue attributes', () => {
      const staticAttr = {
        key: { name: 'alt' },
        value: { value: 'Static' }
      } as any

      const dynamicAttr = {
        key: { name: 'alt' },
        value: { expression: { type: 'Identifier', name: 'altText' } }
      } as any

      expect(isVueAttributeDynamic(staticAttr)).toBe(false)
      expect(isVueAttributeDynamic(dynamicAttr)).toBe(true)
    })
  })
})

