import { describe, it, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ArticleCard from '../../../src/components/ArticleCard.vue'
import { testA11y } from '../utils/a11yTestHelper'

describe('ArticleCard', () => {
  let wrapper: any

  beforeEach(() => {
    // Mount with deliberately inaccessible props to test violations
    wrapper = mount(ArticleCard, {
      props: {
        imageUrl: '/test-image.jpg',
        title: 'Test Article',
        description: 'Test description',
        imgAlt: '', // Empty alt text to trigger violation
        readMoreText: 'read more' // Non-descriptive text to trigger violation
      }
    })
    document.body.appendChild(wrapper.element)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should identify accessibility violations', async () => {
    await testA11y({
      component: wrapper.element,
      expectedViolations: 1,
      violationMatchers: [
        {
          id: 'image-alt',
          description: 'Image alt attribute must not be empty',
          impact: 'serious'
        }
      ]
    })
  })

  it('should pass accessibility checks when properly configured', async () => {
    // Remount with accessible props
    wrapper = mount(ArticleCard, {
      props: {
        imageUrl: '/sample-image.jpg',
        title: 'Sample Article',
        description: 'This is a sample article description',
        imgAlt: 'A beautiful landscape',
        readMoreText: 'Read more about Sample Article'
      }
    })
    document.body.appendChild(wrapper.element)

    await testA11y({
      component: wrapper.element,
      expectedViolations: 0,
      violationMatchers: []
    })
  })
}) 