import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ArticleCard from '../../../src/components/ArticleCard.vue'
import { A11yChecker, A11yViolation } from '../../../src/core/a11y-checker'

// Helper function to clean violations for logging
function cleanViolationsForLog(violations: A11yViolation[]) {
  return violations.map(violation => ({
    id: violation.id,
    description: violation.description,
    impact: violation.impact,
    element: violation.element.outerHTML
  }))
}

describe('ArticleCard', () => {
  it('should have accessibility violations', async () => {
    const wrapper = mount(ArticleCard, {
      props: {
        imageUrl: '/sample-image.jpg',
        title: 'Sample Article',
        description: 'This is a sample article description',
        imgAlt: '' // Empty alt text to trigger violation
      }
    })

    const results = await A11yChecker.check(wrapper.element)
    
    // Debug output
    console.log('\nDOM structure:', wrapper.html())
    console.log('\nViolations found:', JSON.stringify(cleanViolationsForLog(results.violations), null, 2))
    
    // Should have 2 violations:
    // 1. Empty alt attribute
    // 2. Non-descriptive link text ("Read more")
    expect(results.violations).toHaveLength(2)
    
    // Check image violation
    expect(results.violations).toContainEqual(
      expect.objectContaining({
        id: 'image-alt',
        impact: 'serious'
      })
    )

    // Check link text violation
    expect(results.violations).toContainEqual(
      expect.objectContaining({
        id: 'link-text-descriptive',
        impact: 'moderate'
      })
    )
  })

  it('should pass accessibility checks when properly configured', async () => {
    const wrapper = mount(ArticleCard, {
      props: {
        imageUrl: '/sample-image.jpg',
        title: 'Sample Article',
        description: 'This is a sample article description',
        imgAlt: 'A beautiful landscape',
        readMoreText: 'Read more about Sample Article'
      }
    })

    const results = await A11yChecker.check(wrapper.element)
    expect(results.violations).toHaveLength(0)
  })
}) 