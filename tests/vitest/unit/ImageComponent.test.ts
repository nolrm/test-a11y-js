import { describe, it, beforeEach, afterEach } from 'vitest';
import { ImageComponent } from '../../../src/components';
import { testA11y } from '../utils/a11yTestHelper';

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

  it('should have one inaccessible image', async () => {
    await testA11y({
      component,
      expectedViolations: 1,
      violationMatchers: [{
        id: 'image-alt',
        description: 'Image must have an alt attribute',
        impact: 'serious'
      }]
    });
  });
}); 