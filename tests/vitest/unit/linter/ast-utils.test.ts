import { describe, it, expect } from 'vitest'
import {
  getNodeText,
  isJSXElement,
  isVueElement,
  isHTMLLiteral,
  extractTextContent
} from '../../../../src/linter/eslint-plugin/utils/ast-utils.js'
import { jsxToElement, hasJSXAttribute, getJSXAttribute } from '../../../../src/linter/eslint-plugin/utils/jsx-ast-utils.js'
import { parseHTMLString, extractHTMLFromNode, htmlNodeToElement } from '../../../../src/linter/eslint-plugin/utils/html-ast-utils.js'
import { vueElementToDOM } from '../../../../src/linter/eslint-plugin/utils/vue-ast-utils.js'

// Mock ESLint context
function createMockContext(source: string): any {
  return {
    getSourceCode: () => ({
      getText: (node: any) => {
        if (node.range) {
          return source.substring(node.range[0], node.range[1])
        }
        return ''
      },
      getIndexFromLoc: (loc: any) => loc.column || 0,
      getLocForIndex: (index: number) => ({ line: 1, column: index })
    })
  }
}

describe('AST Utils', () => {
  describe('ast-utils', () => {
    it('should identify JSX elements', () => {
      const jsxNode = { type: 'JSXElement' } as any
      const openingNode = { type: 'JSXOpeningElement' } as any
      const nonJSXNode = { type: 'Literal' } as any

      expect(isJSXElement(jsxNode)).toBe(true)
      expect(isJSXElement(openingNode)).toBe(true)
      expect(isJSXElement(nonJSXNode)).toBe(false)
    })

    it('should identify Vue elements', () => {
      const vueNode = { type: 'VElement' } as any
      const nonVueNode = { type: 'JSXElement' } as any

      expect(isVueElement(vueNode)).toBe(true)
      expect(isVueElement(nonVueNode)).toBe(false)
    })

    it('should identify HTML literals', () => {
      const templateNode = { type: 'TemplateLiteral' } as any
      const literalNode = { type: 'Literal' } as any
      const taggedNode = { type: 'TaggedTemplateExpression', tag: { name: 'html' } } as any
      const nonHTMLNode = { type: 'JSXElement' } as any

      expect(isHTMLLiteral(templateNode)).toBe(true)
      expect(isHTMLLiteral(literalNode)).toBe(true)
      expect(isHTMLLiteral(taggedNode)).toBe(true)
      expect(isHTMLLiteral(nonHTMLNode)).toBe(false)
    })

    it('should extract text content from literal nodes', () => {
      const literalNode = { type: 'Literal', value: 'Hello World' } as any
      const jsxTextNode = { type: 'JSXText', value: '  Test  ' } as any
      const context = createMockContext('')

      expect(extractTextContent(literalNode, context)).toBe('Hello World')
      expect(extractTextContent(jsxTextNode, context)).toBe('Test')
    })
  })

  describe('jsx-ast-utils', () => {
    it('should convert JSX img element to DOM element', () => {
      const jsxNode = {
        type: 'JSXOpeningElement',
        name: { name: 'img' },
        attributes: [
          {
            name: { name: 'src' },
            value: { type: 'Literal', value: 'test.jpg' }
          },
          {
            name: { name: 'alt' },
            value: { type: 'Literal', value: 'Test image' }
          }
        ]
      } as any

      const context = createMockContext('<img src="test.jpg" alt="Test image" />')
      const element = jsxToElement(jsxNode, context)

      expect(element.tagName.toLowerCase()).toBe('img')
      expect(element.getAttribute('src')).toBe('test.jpg')
      expect(element.getAttribute('alt')).toBe('Test image')
    })

    it('should handle JSX button element with text content', () => {
      const jsxNode = {
        type: 'JSXElement',
        openingElement: {
          type: 'JSXOpeningElement',
          name: { name: 'button' },
          attributes: []
        },
        children: [
          { type: 'JSXText', value: 'Click me' }
        ]
      } as any

      const context = createMockContext('<button>Click me</button>')
      const element = jsxToElement(jsxNode, context)

      expect(element.tagName.toLowerCase()).toBe('button')
      expect(element.textContent).toBe('Click me')
    })

    it('should check if JSX element has attribute', () => {
      const jsxNode = {
        type: 'JSXOpeningElement',
        name: { name: 'img' },
        attributes: [
          {
            name: { name: 'alt' },
            value: { type: 'Literal', value: 'Test' }
          }
        ]
      } as any

      expect(hasJSXAttribute(jsxNode, 'alt')).toBe(true)
      expect(hasJSXAttribute(jsxNode, 'src')).toBe(false)
    })

    it('should get JSX attribute by name', () => {
      const jsxNode = {
        type: 'JSXOpeningElement',
        name: { name: 'img' },
        attributes: [
          {
            name: { name: 'alt' },
            value: { type: 'Literal', value: 'Test' }
          }
        ]
      } as any

      const attr = getJSXAttribute(jsxNode, 'alt')
      expect(attr).toBeDefined()
      expect(attr?.name.name).toBe('alt')
    })
  })

  describe('html-ast-utils', () => {
    it('should parse HTML string to DOM element', () => {
      const html = '<img src="test.jpg" alt="Test" />'
      const element = parseHTMLString(html)

      expect(element).not.toBeNull()
      expect(element?.tagName.toLowerCase()).toBe('img')
      expect(element?.getAttribute('src')).toBe('test.jpg')
      expect(element?.getAttribute('alt')).toBe('Test')
    })

    it('should parse HTML with multiple elements', () => {
      const html = '<div><img src="test.jpg" /><button>Click</button></div>'
      const element = parseHTMLString(html)

      expect(element).not.toBeNull()
      expect(element?.tagName.toLowerCase()).toBe('div')
      expect(element?.querySelector('img')).not.toBeNull()
      expect(element?.querySelector('button')).not.toBeNull()
    })

    it('should extract HTML from string literal', () => {
      const node = {
        type: 'Literal',
        value: '<img src="test.jpg" alt="Test" />',
        range: [0, 35]
      } as any

      const context = createMockContext('<img src="test.jpg" alt="Test" />')
      const html = extractHTMLFromNode(node, context)

      expect(html).toBe('<img src="test.jpg" alt="Test" />')
    })

    it('should extract HTML from template literal', () => {
      const node = {
        type: 'TemplateLiteral',
        quasis: [
          { value: { cooked: '<img src="test.jpg" alt="Test" />' } }
        ],
        expressions: [],
        range: [0, 35]
      } as any

      const context = createMockContext('`<img src="test.jpg" alt="Test" />`')
      const html = extractHTMLFromNode(node, context)

      expect(html).toBe('<img src="test.jpg" alt="Test" />')
    })

    it('should return null for template literal with expressions', () => {
      const node = {
        type: 'TemplateLiteral',
        quasis: [
          { value: { cooked: '<img src="' } },
          { value: { cooked: '" alt="Test" />' } }
        ],
        expressions: [{ type: 'Identifier', name: 'imageUrl' }],
        range: [0, 50]
      } as any

      const context = createMockContext('`<img src="${imageUrl}" alt="Test" />`')
      const html = extractHTMLFromNode(node, context)

      expect(html).toBeNull() // Can't analyze dynamic content
    })

    it('should convert HTML node to DOM element', () => {
      const node = {
        type: 'Literal',
        value: '<button>Click me</button>',
        range: [0, 25]
      } as any

      const context = createMockContext('<button>Click me</button>')
      const element = htmlNodeToElement(node, context)

      expect(element).not.toBeNull()
      expect(element?.tagName.toLowerCase()).toBe('button')
      expect(element?.textContent).toBe('Click me')
    })
  })

  describe('vue-ast-utils', () => {
    it('should return null when vue parser is not available', () => {
      const node = { type: 'VElement', name: 'img' } as any
      const context = createMockContext('')
      const element = vueElementToDOM(node, context)

      // Should return null since vue-eslint-parser is not installed yet
      expect(element).toBeNull()
    })
  })
})

