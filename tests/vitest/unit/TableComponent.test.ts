import { describe, it, beforeEach, afterEach } from 'vitest';
import { TableComponent } from '../../../src/components';
import { testA11y } from '../utils/a11yTestHelper';

describe('TableComponent', () => {
  let component: TableComponent;

  beforeEach(() => {
    component = new TableComponent();
    document.body.appendChild(component);
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should render both good and bad examples', () => {
    const tables = component.shadowRoot!.querySelectorAll('table');
    expect(tables.length).toBe(2);
  });

  it('should have one inaccessible table', async () => {
    await testA11y({
      component,
      expectedViolations: 1,
      violationMatchers: [{
        id: 'table-caption',
        description: 'Tables should have captions for better accessibility',
        impact: 'serious'
      }]
    });
  });
}); 