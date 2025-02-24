import { describe, it } from 'vitest'
import { A11yChecker } from '../../../src/core/a11y-checker'
import { testA11y } from '../utils/a11yTestHelper'
import {
  ImageComponent,
  ButtonComponent,
  FormComponent,
  LinkComponent,
  TableComponent,
  IframeComponent
} from '../../../src/components'

describe('A11yChecker', () => {
  describe('Component Integration Tests', () => {
    it('should check all accessibility rules', async () => {
      const componentTests = [
        {
          component: new ImageComponent(),
          expectedViolations: 1,
          impact: 'serious'
        },
        {
          component: new ButtonComponent(),
          expectedViolations: 1,
          impact: 'critical'
        },
        {
          component: new FormComponent(),
          expectedViolations: 1,
          impact: 'critical'
        },
        {
          component: new LinkComponent(),
          expectedViolations: 2,  // Link component has two violations
          violationMatchers: [
            {
              id: 'link-text',
              description: 'Link must have descriptive text',
              impact: 'serious'
            },
            {
              id: 'link-text-descriptive',
              description: 'Link text should be more descriptive',
              impact: 'moderate'
            }
          ]
        },
        {
          component: new TableComponent(),
          expectedViolations: 1,
          impact: 'serious'
        },
        {
          component: new IframeComponent(),
          expectedViolations: 1,
          impact: 'serious'
        }
      ] as const;  // Make the array readonly to ensure type safety

      // Test each component
      for (const test of componentTests) {
        document.body.appendChild(test.component);
        await testA11y({
          component: test.component,
          expectedViolations: test.expectedViolations,
          violationMatchers: test.violationMatchers ?? [{
            impact: test.impact
          }]
        });
        document.body.removeChild(test.component);
      }
    });
  })

  describe('Image Tests', () => {
    it('should detect missing alt attribute on images', () => {
      const checker = new A11yChecker()
      const container = document.createElement('div')
      container.innerHTML = '<img src="test.jpg">'
      
      const results = checker.check(container)
      
      expect(results.violations).toHaveLength(1)
      expect(results.violations[0]).toMatchObject({
        id: 'img',
        description: 'Images must have alt text for screen readers'
      })
    })

    it('should pass when image has alt attribute', () => {
      const checker = new A11yChecker()
      const container = document.createElement('div')
      container.innerHTML = '<img src="test.jpg" alt="Test image">'
      
      const results = checker.check(container)
      
      expect(results.violations).toHaveLength(0)
    })
  })

  describe('Button Tests', () => {
    it('should detect buttons without labels', () => {
      const checker = new A11yChecker()
      const container = document.createElement('div')
      container.innerHTML = '<button></button>'
      
      const results = checker.check(container)
      
      expect(results.violations).toHaveLength(1)
      expect(results.violations[0]).toMatchObject({
        id: 'button',
        description: 'Buttons must have text content or aria-label'
      })
    })

    it('should pass when button has text content', () => {
      const checker = new A11yChecker()
      const container = document.createElement('div')
      container.innerHTML = '<button>Click me</button>'
      
      const results = checker.check(container)
      
      expect(results.violations).toHaveLength(0)
    })

    it('should pass when button has aria-label', () => {
      const checker = new A11yChecker()
      const container = document.createElement('div')
      container.innerHTML = '<button aria-label="Close dialog">×</button>'
      
      const results = checker.check(container)
      
      expect(results.violations).toHaveLength(0)
    })
  })
}) 