import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FormComponent } from '../../../src/components';
import { A11yChecker } from '../../../src/core/a11y-checker';

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
    const results = await A11yChecker.check(component.shadowRoot!);
    expect(results.violations.length).toBe(1);
    expect(results.violations[0].id).toBe('form-label');
  });
}); 