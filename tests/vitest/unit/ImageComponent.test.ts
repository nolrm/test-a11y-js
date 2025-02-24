import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ImageComponent } from '../../../src/components';
import { A11yChecker } from '../../../src/core/a11y-checker';

describe('ImageComponent', () => {
  let component: ImageComponent;

  beforeEach(() => {
    component = new ImageComponent();
    document.body.appendChild(component);
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should render both good and bad examples', () => {
    const images = component.shadowRoot!.querySelectorAll('img');
    expect(images.length).toBe(2);
  });

  it('should have one accessible and one inaccessible image', async () => {
    const results = await A11yChecker.check(component.shadowRoot!);
    expect(results.violations.length).toBe(1);
    expect(results.violations[0].id).toBe('image-alt');
  });
}); 