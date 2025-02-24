# test-a11y-js

A JavaScript library for testing component accessibility across multiple testing frameworks.

## Installation

```bash
npm install test-a11y-js
```

## Usage

### Basic Usage

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

## Contributing

Contributions are welcome! Please read our contributing guidelines for details.

## License

MIT

### Impact Levels

- `critical`: Must be fixed for basic accessibility
- `serious`: Should be fixed for proper accessibility
- `moderate`: Consider fixing for better accessibility
- `minor`: Optional improvements

## Testing Components

The library includes test components for validating accessibility rules:

- `ImageComponent`: Tests image accessibility
- `ButtonComponent`: Tests button accessibility
- `FormComponent`: Tests form control accessibility
- `LinkComponent`: Tests link accessibility
- `TableComponent`: Tests table accessibility
- `IframeComponent`: Tests iframe accessibility

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

### Accessibility Checks

The library checks for the following accessibility issues:

1. **Images**
   - Alt text presence
   - Empty alt attribute

2. **Buttons**
   - Text content or aria-label presence
   - Meaningful button labels

3. **Form Controls**
   - Associated labels
   - ARIA labels
   - Label associations

4. **Links**
   - Descriptive link text
   - Avoiding generic text ("click here", "read more")
   - ARIA labels

5. **Tables**
   - Caption presence
   - Proper table structure

6. **iframes**
   - Title attribute presence

7. **Headings**
   - Proper heading hierarchy
   - No skipped heading levels

### Example Response

```javascript
{
  violations: [
    {
      id: 'image-alt',
      description: 'Image must have an alt attribute',
      element: HTMLImageElement,
      impact: 'serious'
    }
  ]
}
```
