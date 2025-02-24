import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { IframeComponent } from '../../../src/components';
import { A11yChecker } from '../../../src/core/a11y-checker';

describe('IframeComponent', () => {
  let component: IframeComponent;

  beforeEach(() => {
    component = new IframeComponent();
    document.body.appendChild(component);
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should render both good and bad examples', () => {
    const iframes = component.shadowRoot!.querySelectorAll('iframe');
    expect(iframes.length).toBe(2);
  });

  it('should have one inaccessible iframe', async () => {
    const results = await A11yChecker.check(component.shadowRoot!);
    expect(results.violations.length).toBe(1);
    const violation = results.violations[0];
    expect(violation.description).toContain('iframes must have a title');
  });
}); 