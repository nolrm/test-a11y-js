/**
 * Unit tests for runtime comment utilities
 */

import { describe, it, expect } from 'vitest'
import type { Rule } from 'eslint'
import { hasRuntimeCheckedComment, adjustSeverityForRuntimeComment } from '../../../../../src/linter/eslint-plugin/utils/runtime-comment'

describe('runtime-comment utilities', () => {
  describe('hasRuntimeCheckedComment', () => {
    it('should return false when settings are not configured', () => {
      const mockContext = {
        settings: {},
        getSourceCode: () => ({
          getCommentsBefore: () => [],
          getCommentsAfter: () => []
        })
      } as unknown as Rule.RuleContext

      const mockNode = {
        type: 'JSXOpeningElement',
        parent: null
      } as Rule.Node

      const result = hasRuntimeCheckedComment(mockContext, mockNode)
      expect(result.hasComment).toBe(false)
      expect(result.mode).toBe(null)
    })

    it('should return false when runtimeCheckedComment is not set', () => {
      const mockContext = {
        settings: {
          'test-a11y-js': {
            components: { Link: 'a' }
          }
        },
        getSourceCode: () => ({
          getCommentsBefore: () => [],
          getCommentsAfter: () => []
        })
      } as unknown as Rule.RuleContext

      const mockNode = {
        type: 'JSXOpeningElement',
        parent: null
      } as Rule.Node

      const result = hasRuntimeCheckedComment(mockContext, mockNode)
      expect(result.hasComment).toBe(false)
      expect(result.mode).toBe(null)
    })

    it('should detect comment in leading comments', () => {
      const mockContext = {
        settings: {
          'test-a11y-js': {
            runtimeCheckedComment: 'a11y-checked-at-runtime',
            runtimeCheckedMode: 'suppress'
          }
        },
        getSourceCode: () => ({
          getCommentsBefore: () => [
            { value: ' a11y-checked-at-runtime ' }
          ],
          getCommentsAfter: () => []
        })
      } as unknown as Rule.RuleContext

      const mockNode = {
        type: 'JSXOpeningElement',
        parent: null
      } as Rule.Node

      const result = hasRuntimeCheckedComment(mockContext, mockNode)
      expect(result.hasComment).toBe(true)
      expect(result.mode).toBe('suppress')
    })

    it('should detect comment in trailing comments', () => {
      const mockContext = {
        settings: {
          'test-a11y-js': {
            runtimeCheckedComment: 'a11y-checked-at-runtime',
            runtimeCheckedMode: 'downgrade'
          }
        },
        getSourceCode: () => ({
          getCommentsBefore: () => [],
          getCommentsAfter: () => [
            { value: ' a11y-checked-at-runtime ' }
          ]
        })
      } as unknown as Rule.RuleContext

      const mockNode = {
        type: 'JSXOpeningElement',
        parent: null
      } as Rule.Node

      const result = hasRuntimeCheckedComment(mockContext, mockNode)
      expect(result.hasComment).toBe(true)
      expect(result.mode).toBe('downgrade')
    })

    it('should detect comment in parent node comments', () => {
      const mockParent = {
        type: 'JSXElement',
        parent: null
      }

      const mockNode = {
        type: 'JSXOpeningElement',
        parent: mockParent
      } as Rule.Node

      const mockContext = {
        settings: {
          'test-a11y-js': {
            runtimeCheckedComment: 'a11y-checked-at-runtime',
            runtimeCheckedMode: 'suppress'
          }
        },
        getSourceCode: () => ({
          getCommentsBefore: (node: any) => {
            if (node === mockNode) return []
            if (node === mockParent) return [{ value: ' a11y-checked-at-runtime ' }]
            return []
          },
          getCommentsAfter: () => []
        })
      } as unknown as Rule.RuleContext

      const result = hasRuntimeCheckedComment(mockContext, mockNode)
      expect(result.hasComment).toBe(true)
      expect(result.mode).toBe('suppress')
    })

    it('should default to downgrade mode when not specified', () => {
      const mockContext = {
        settings: {
          'test-a11y-js': {
            runtimeCheckedComment: 'a11y-checked-at-runtime'
            // runtimeCheckedMode not specified
          }
        },
        getSourceCode: () => ({
          getCommentsBefore: () => [
            { value: ' a11y-checked-at-runtime ' }
          ],
          getCommentsAfter: () => []
        })
      } as unknown as Rule.RuleContext

      const mockNode = {
        type: 'JSXOpeningElement',
        parent: null
      } as Rule.Node

      const result = hasRuntimeCheckedComment(mockContext, mockNode)
      expect(result.hasComment).toBe(true)
      expect(result.mode).toBe('downgrade')
    })
  })

  describe('adjustSeverityForRuntimeComment', () => {
    it('should return original severity when no comment', () => {
      const result = adjustSeverityForRuntimeComment('error', { hasComment: false, mode: null })
      expect(result).toBe('error')
    })

    it('should return off when mode is suppress', () => {
      const result = adjustSeverityForRuntimeComment('error', { hasComment: true, mode: 'suppress' })
      expect(result).toBe('off')
    })

    it('should downgrade error to warn when mode is downgrade', () => {
      const result = adjustSeverityForRuntimeComment('error', { hasComment: true, mode: 'downgrade' })
      expect(result).toBe('warn')
    })

    it('should downgrade warn to off when mode is downgrade', () => {
      const result = adjustSeverityForRuntimeComment('warn', { hasComment: true, mode: 'downgrade' })
      expect(result).toBe('off')
    })

    it('should return off unchanged when mode is downgrade', () => {
      const result = adjustSeverityForRuntimeComment('off', { hasComment: true, mode: 'downgrade' })
      expect(result).toBe('off')
    })
  })
})
