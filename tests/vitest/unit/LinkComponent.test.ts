import { describe, it, beforeEach, afterEach } from 'vitest';
import { LinkComponent } from '../../../src/components';
import { testA11y } from '../utils/a11yTestHelper';

describe('LinkComponent', () => {
  let component: LinkComponent;

  beforeEach(() => {
    component = new LinkComponent();
    document.body.appendChild(component);
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should render both good and bad examples', () => {
    const links = component.shadowRoot!.querySelectorAll('a');
    expect(links.length).toBe(4); // 2 good, 2 bad
  });

  it('should have two inaccessible links', async () => {
    await testA11y({
      component,
      expectedViolations: 2,
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
    });
  });
}); 