import { describe, it, beforeEach, afterEach } from 'vitest';
import { ButtonComponent } from '../../../src/components';
import { testA11y } from '../utils/a11yTestHelper';

describe('ButtonComponent', () => {
  let component: ButtonComponent;

  beforeEach(() => {
    component = new ButtonComponent();
    document.body.appendChild(component);
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should render both good and bad examples', () => {
    const buttons = component.shadowRoot!.querySelectorAll('button');
    expect(buttons.length).toBe(3); // 2 good, 1 bad
  });

  it('should have one inaccessible button', async () => {
    await testA11y({
      component,
      expectedViolations: 1,
      violationMatchers: [{
        id: 'button-label',
        description: 'Button must have a label or aria-label',
        impact: 'critical'
      }]
    });
  });
}); 