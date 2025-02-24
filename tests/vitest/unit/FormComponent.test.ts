import { describe, it, beforeEach, afterEach } from 'vitest';
import { FormComponent } from '../../../src/components';
import { testA11y } from '../utils/a11yTestHelper';

describe('FormComponent', () => {
  let component: FormComponent;

  beforeEach(() => {
    component = new FormComponent();
    document.body.appendChild(component);
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should render both good and bad examples', () => {
    const inputs = component.shadowRoot!.querySelectorAll('input');
    expect(inputs.length).toBe(3); // 2 good, 1 bad
  });

  it('should have one inaccessible form input', async () => {
    await testA11y({
      component,
      expectedViolations: 1,
      violationMatchers: [{
        id: 'form-label',
        description: 'Form control must have an associated label',
        impact: 'critical'
      }]
    });
  });
}); 