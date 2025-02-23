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
