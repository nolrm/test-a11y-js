import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LinkComponent } from '../../../src/components';
import { A11yChecker } from '../../../src/core/a11y-checker';

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
    const results = await A11yChecker.check(component.shadowRoot!);
    expect(results.violations.length).toBe(2);
    expect(results.violations[0].id).toBe('link-text');
    expect(results.violations[1].id).toBe('link-text-descriptive');
  });
}); 