import { A11yChecker } from '../../../src/core/a11y-checker';

export interface A11yTestConfig {
  component: HTMLElement;
  expectedViolations: number;
  violationMatchers?: Array<{
    id?: string;
    description?: string;
    impact?: 'critical' | 'serious' | 'moderate' | 'minor';
  }>;
}

export const testA11y = async (config: A11yTestConfig) => {
  // Use the element directly if it's not a shadow root component
  const elementToTest = config.component.shadowRoot || config.component;
  const results = await A11yChecker.check(elementToTest);
  
  if (results.violations.length !== config.expectedViolations) {
    console.log('Accessibility Violations Found:', results.violations);
  }
  
  expect(results.violations).toHaveLength(config.expectedViolations);
  
  if (config.violationMatchers) {
    config.violationMatchers.forEach((matcher, index) => {
      const violation = results.violations[index];
      if (matcher.id) {
        expect(violation.id).toBe(matcher.id);
      }
      if (matcher.description) {
        expect(violation.description).toContain(matcher.description);
      }
      if (matcher.impact) {
        expect(violation.impact).toBe(matcher.impact);
      }
    });
  }
}; 