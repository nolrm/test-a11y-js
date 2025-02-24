import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ButtonComponent } from '../../../src/components';
import { A11yChecker } from '../../../src/core/a11y-checker';

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
    const results = await A11yChecker.check(component.shadowRoot!);
    expect(results.violations.length).toBe(1);
    expect(results.violations[0].id).toBe('button-label');
  });
}); 