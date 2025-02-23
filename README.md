# test-a11y-js

A JavaScript library for testing component accessibility across multiple testing frameworks.

## Installation

```bash
npm install test-a11y-js
```

## Usage

```typescript
import { A11yChecker } from 'test-a11y-js'
// Test a DOM element for accessibility violations
const results = await A11yChecker.check(element)
// Individual checks
const imageViolations = A11yChecker.checkImageAlt(element)
const linkViolations = A11yChecker.checkLinkText(element)
const buttonViolations = A11yChecker.checkButtonLabel(element)
const formViolations = A11yChecker.checkFormLabels(element)
    const headingViolations = A11yChecker.checkHeadingOrder(element)
```

## API

### A11yChecker

#### `check(element: Element): Promise<A11yResults>`
Performs all accessibility checks on the given element.

#### `checkImageAlt(element: Element): A11yViolation[]`
Checks images for proper alt attributes.

#### `checkLinkText(element: Element): A11yViolation[]`
Validates link text for accessibility.

#### `checkButtonLabel(element: Element): A11yViolation[]`
Ensures buttons have proper labels.

#### `checkFormLabels(element: Element): A11yViolation[]`
Validates form control label associations.

#### `checkHeadingOrder(element: Element): A11yViolation[]`
Checks heading hierarchy.

### Types

```typescript
interface A11yViolation {
  id: string
  description: string
  element: Element
  impact: 'critical' | 'serious' | 'moderate' | 'minor'
}

interface A11yResults {
  violations: A11yViolation[]
}
```

## Features

- Image alt text validation
- Link text accessibility checks
- Button label validation
- Form label association checks
- Heading order validation

## Author

Marlon Maniti (https://github.com/nolrm)

## License

MIT
