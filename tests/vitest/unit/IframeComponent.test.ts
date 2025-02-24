import { describe, it, beforeEach, afterEach } from 'vitest';
import { IframeComponent } from '../../../src/components';
import { testA11y } from '../utils/a11yTestHelper';

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
    await testA11y({
      component,
      expectedViolations: 1,
      violationMatchers: [{
        id: 'iframe-title',
        description: 'iframes must have a title attribute',
        impact: 'serious'
      }]
    });
  });
}); 