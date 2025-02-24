import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TableComponent } from '../../../src/components';
import { A11yChecker } from '../../../src/core/a11y-checker';

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
    const results = await A11yChecker.check(component.shadowRoot!);
    expect(results.violations.length).toBe(1);
    const violation = results.violations[0];
    expect(violation.description).toContain('Tables should have captions');
  });
}); 