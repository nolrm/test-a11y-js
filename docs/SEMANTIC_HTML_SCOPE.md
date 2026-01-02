# Semantic HTML Validation Scope

This document lists all semantic HTML elements and patterns that will be validated in Phase 1.

## Semantic HTML Elements

### Supported Elements (Phase 1 - v0.8.0)

#### Text Content Elements
- ✅ `<h1>` through `<h6>` - Headings (already supported)
- ✅ `<p>` - Paragraph
- ✅ `<blockquote>` - Block quotation
- ✅ `<pre>` - Preformatted text
- ✅ `<code>` - Inline code
- ✅ `<em>` - Emphasis
- ✅ `<strong>` - Strong importance
- ✅ `<mark>` - Marked/highlighted text
- ✅ `<small>` - Small print
- ✅ `<time>` - Time element
- ✅ `<abbr>` - Abbreviation
- ✅ `<dfn>` - Definition term
- ✅ `<cite>` - Citation
- ✅ `<q>` - Inline quotation
- ✅ `<samp>` - Sample output
- ✅ `<kbd>` - Keyboard input
- ✅ `<var>` - Variable
- ✅ `<sub>` - Subscript
- ✅ `<sup>` - Superscript

#### Sectioning Elements
- ✅ `<header>` - Header (already supported)
- ✅ `<footer>` - Footer (already supported)
- ✅ `<nav>` - Navigation (already supported)
- ✅ `<main>` - Main content (already supported)
- ✅ `<article>` - Article (already supported)
- ✅ `<section>` - Section (already supported)
- ✅ `<aside>` - Aside (already supported)
- ✅ `<address>` - Contact information

#### List Elements
- ✅ `<ul>` - Unordered list
- ✅ `<ol>` - Ordered list
- ✅ `<li>` - List item
- ✅ `<dl>` - Description list
- ✅ `<dt>` - Description term
- ✅ `<dd>` - Description details

#### Form Elements
- ✅ `<form>` - Form (already supported)
- ✅ `<fieldset>` - Fieldset (already supported)
- ✅ `<legend>` - Legend (already supported)
- ✅ `<label>` - Label (already supported)
- ✅ `<input>` - Input (already supported)
- ✅ `<button>` - Button (already supported)
- ✅ `<select>` - Select (already supported)
- ✅ `<textarea>` - Textarea (already supported)
- ✅ `<output>` - Output element
- ✅ `<meter>` - Meter element
- ✅ `<progress>` - Progress element

#### Table Elements
- ✅ `<table>` - Table (already supported)
- ✅ `<caption>` - Table caption (already supported)
- ✅ `<thead>` - Table head
- ✅ `<tbody>` - Table body
- ✅ `<tfoot>` - Table foot
- ✅ `<tr>` - Table row
- ✅ `<th>` - Table header (already supported)
- ✅ `<td>` - Table data (already supported)
- ✅ `<colgroup>` - Column group
- ✅ `<col>` - Column

#### Interactive Elements
- ✅ `<a>` - Anchor/link (already supported)
- ✅ `<button>` - Button (already supported)
- ✅ `<details>` - Details (already supported)
- ✅ `<summary>` - Summary (already supported)
- ✅ `<dialog>` - Dialog (already supported)
- ✅ `<menu>` - Menu element

#### Media Elements
- ✅ `<img>` - Image (already supported)
- ✅ `<video>` - Video (already supported)
- ✅ `<audio>` - Audio (already supported)
- ✅ `<picture>` - Picture element
- ✅ `<source>` - Source element
- ✅ `<track>` - Track element (already supported)
- ✅ `<figure>` - Figure element
- ✅ `<figcaption>` - Figure caption

#### Other Semantic Elements
- ✅ `<hr>` - Horizontal rule (thematic break)
- ✅ `<br>` - Line break
- ✅ `<wbr>` - Word break opportunity

### Not Supported in Phase 1 (Future)

#### Specialized Elements (Phase 2+)
- ❌ `<template>` - Template element (complex validation)
- ❌ `<slot>` - Slot element (framework-specific)
- ❌ `<canvas>` - Canvas element (requires content validation)
- ❌ `<svg>` - SVG element (requires ARIA validation)
- ❌ `<iframe>` - Iframe (already has title validation, but semantic use not validated)
- ❌ `<object>` - Object element
- ❌ `<embed>` - Embed element

**Total Supported in Phase 1: ~60 semantic elements**  
**Total HTML Elements: ~100+ elements**

---

## Semantic HTML Patterns

### Supported Patterns (Phase 1 - v0.8.0)

#### 1. Generic Element Misuse Detection
**Pattern:** Using `<div>` or `<span>` where semantic element would be better

**Supported Checks:**
- ✅ `<div role="button">` → Should use `<button>` (warn)
- ✅ `<div role="link">` → Should use `<a>` (warn)
- ✅ `<div role="heading">` → Should use `<h1>`-`<h6>` (warn)
- ✅ `<div role="list">` → Should use `<ul>` or `<ol>` (warn)
- ✅ `<div role="listitem">` → Should use `<li>` (warn)
- ✅ `<div role="navigation">` → Should use `<nav>` (warn)
- ✅ `<div role="main">` → Should use `<main>` (warn)
- ✅ `<div role="article">` → Should use `<article>` (warn)
- ✅ `<div role="section">` → Should use `<section>` (warn)
- ✅ `<div role="header">` → Should use `<header>` (warn)
- ✅ `<div role="footer">` → Should use `<footer>` (warn)
- ✅ `<div role="complementary">` → Should use `<aside>` (warn)
- ✅ `<div role="form">` → Should use `<form>` (warn)
- ✅ `<div role="dialog">` → Should use `<dialog>` (warn)
- ✅ Framework-aware event handler detection:
  - JSX: `onClick`, `onKeyDown`, etc.
  - Vue: `@click`, `v-on:click`, `@keydown`, etc.
  - HTML: `onclick`, `onkeydown`, etc.
- ✅ `<div>` with event handlers → Should use `<button>` (warn)
- ✅ `<span>` with event handlers → Should use `<button>` (warn)
- ✅ Clickable non-focusable: element has click handler but no keyboard access (tabindex/role) (warn)

**Severity:**
- **Warn:** "Should prefer semantic element" (div/span with role/onclick)

**Not Supported in Phase 1:**
- ❌ Context-aware suggestions (e.g., div might be valid in some cases)
- ❌ Styling-based detection (requires CSS analysis)

#### 2. List Structure Validation
**Pattern:** Proper structure of list elements

**Supported Checks:**
- ✅ `<ul>` must contain `<li>` elements
- ✅ `<ol>` must contain `<li>` elements
- ✅ `<li>` must be child of `<ul>`, `<ol>`, or `<menu>` (not just ul/ol)
- ✅ `<dl>` must contain at least one `<dt>` or `<dd>` anywhere under it (allows `<div>` wrappers)
- ✅ `<dt>` must appear only under a `<dl>` (possibly via a wrapper)
- ✅ `<dd>` must appear only under a `<dl>` (possibly via a wrapper)
- ✅ Nested lists are properly structured

**Severity:**
- **Error:** `<li>` outside ul/ol/menu, `<dt>`/`<dd>` outside dl
- **Warn:** Empty `<ul>`/`<ol>`/`<dl>`

**Not Supported in Phase 1:**
- ❌ List item content validation
- ❌ List accessibility patterns (aria-setsize, aria-posinset)

#### 3. Heading Hierarchy Validation
**Pattern:** Proper heading structure (already implemented, but enhanced)

**Supported Checks:**
- ✅ No skipped heading levels (h1 → h3)
- ✅ Proper nesting within landmarks
- ✅ Headings in proper order

**Not Supported in Phase 1:**
- ❌ Heading content quality
- ❌ Multiple h1 validation (context-dependent)

#### 4. Form Structure Validation
**Pattern:** Proper form element structure

**Supported Checks:**
- ✅ `<fieldset>` contains `<legend>`
- ✅ Form controls have labels
- ✅ Proper nesting of form elements
- ✅ `<output>` is associated with form

**Not Supported in Phase 1:**
- ❌ Form validation patterns (covered in Form Validation feature)
- ❌ Form submission handling

#### 5. Table Structure Validation
**Pattern:** Proper table element structure (already implemented, but enhanced)

**Supported Checks:**
- ✅ Proper nesting of table elements (`<tr>` inside table, `<th>`/`<td>` inside `<tr>`, `<caption>` placement)
- ✅ `<caption>` or accessible name recommended (warn-level, not error - some tables are layout)
- ✅ `<th>` elements should have `scope` attribute or use `id`/`headers` strategy (warn when missing both)
- ✅ Table structure nesting validation

**Severity:**
- **Error:** Invalid nesting (tr outside table, th/td outside tr, etc.)
- **Warn:** Missing caption/accessible name, `<th>` without scope and no id/headers strategy

**Not Supported in Phase 1:**
- ❌ Requiring `<thead>`/`<tbody>`/`<tfoot>` (they're optional)
- ❌ Complex table relationships (headers attribute validation)
- ❌ Table accessibility patterns (aria-colcount, etc.)

#### 6. Media Element Validation
**Pattern:** Proper use of media elements

**Supported Checks:**
- ✅ `<figure>` contains `<figcaption>` when needed
- ✅ `<picture>` contains proper `<source>` elements
- ✅ `<video>` and `<audio>` have tracks (already supported)

**Not Supported in Phase 1:**
- ❌ Media content validation
- ❌ Responsive image patterns

#### 7. Navigation Structure Validation
**Pattern:** Proper navigation element usage

**Supported Checks:**
- ✅ `<nav>` contains navigation links
- ✅ Multiple `<nav>` elements have aria-label
- ✅ Navigation structure is logical

**Not Supported in Phase 1:**
- ❌ Navigation accessibility patterns
- ❌ Skip link validation

#### 6. Interactive Element Misuse ⭐ NEW
**Pattern:** Common interactive element misuse patterns

**Supported Checks:**
- ✅ **Interactive inside interactive** (error):
  - `<button>` inside `<a>`
  - `<a>` inside `<button>`
  - `<button>` inside `<button>`
  - `<label>` inside `<button>`
  - Other nested interactive elements
- ✅ **`<a>` without href used as button** (warn):
  - `<a>` without `href` → Suggest `<button>` or add `href`
- ✅ **`<button>` without type inside forms** (warn):
  - `<button>` without `type` inside `<form>` → Recommend `type="button"` unless it's a submit
  - Prevents accidental form submits
- ✅ **Clickable non-focusable** (warn):
  - Element has click handler but no keyboard access (tabindex/role)
  - Framework-aware: onClick/@click/onclick detection

**Severity:**
- **Error:** Nested interactive elements
- **Warn:** `<a>` without href, `<button>` missing type in form, clickable non-focusable

#### 7. Accessible Text Alternatives ⭐ NEW
**Pattern:** Ensure images and media have accessible text

**Supported Checks:**
- ✅ **`<img>` must have alt** (error):
  - `<img>` must have `alt` attribute (empty alt allowed for decorative, but require it to be explicit)
- ✅ **`<svg>` accessibility** (warn):
  - If `<svg>` has no `aria-label`/`title` and isn't `aria-hidden`, warn
  - Note: Full SVG validation is Phase 2+, but basic checks are Phase 1
- ✅ **`<figure>` structure** (error):
  - If `<figcaption>` exists, it must be inside `<figure>`
  - `<figure>` shouldn't have multiple `<figcaptions>`
  - Don't enforce figcaption "when needed" (hard to know statically)

**Severity:**
- **Error:** Missing alt on img, invalid figure/figcaption structure
- **Warn:** SVG without accessible name

#### 8. Landmark Uniqueness + Labeling ⭐ NEW
**Pattern:** Ensure landmarks are unique and properly labeled

**Supported Checks:**
- ✅ **Only one `<main>` per document** (error)
- ✅ **Multiple landmarks require accessible names** (warn):
  - If there are multiple `<nav>` elements → require `aria-label` or `aria-labelledby`
  - If there are multiple `<header>` elements → require accessible name
  - If there are multiple `<footer>` elements → require accessible name
  - Screen reader users need to distinguish them
- ✅ **`<section>` should have accessible name** (warn):
  - If `<section>` is used as meaningful region, should have accessible name
  - Often via `<h*>` inside it or `aria-labelledby`
  - Treat as warning (some sections might be purely structural)

**Severity:**
- **Error:** Multiple `<main>` elements
- **Warn:** Multiple nav/header/footer without labels, section without accessible name

#### 9. Form Label Completeness ⭐ NEW
**Pattern:** Ensure form controls have proper labels

**Supported Checks:**
- ✅ **Label mechanisms supported:**
  - `<label for>` + `id` association
  - Control wrapped by `<label>`
  - `aria-label` / `aria-labelledby`
  - `fieldset`/`legend` for grouped controls (radio/checkbox groups)
- ✅ **ID uniqueness checks** (error):
  - IDs must be unique (since labels depend on it)
  - Duplicate IDs break label associations
- ✅ **Autocomplete recommended** (warn):
  - Common fields should have `autocomplete` attribute
  - Very impactful for accessibility
  - Warn-level (recommended, not required)

**Severity:**
- **Error:** Missing label association, duplicate IDs
- **Warn:** Missing autocomplete on common fields

### Not Supported in Phase 1 (Future)

#### Advanced Patterns (Phase 2+)
- ❌ Context-aware semantic suggestions
- ❌ CSS-based semantic detection
- ❌ JavaScript-based semantic patterns
- ❌ Framework-specific semantic patterns (beyond event handler detection)
- ❌ Custom element validation
- ❌ Web Component semantic validation
- ❌ Full SVG validation (basic checks are Phase 1)

---

## Validation Rules

### Generic Element Misuse Rules

#### Rule 1: Role-Based Detection
```typescript
// Check if div/span has role that should be semantic element
if (element.tagName === 'div' && element.getAttribute('role') === 'button') {
  violation: 'Use <button> instead of <div role="button">'
}
```

#### Rule 2: Event Handler Detection
```typescript
// Check if div/span has onclick without proper role
if (element.tagName === 'div' && element.hasAttribute('onclick') && !element.getAttribute('role')) {
  violation: 'Use <button> instead of <div> with onclick'
}
```

#### Rule 3: Tabindex Detection
```typescript
// Check if div/span has tabindex without proper role
if (element.tagName === 'div' && element.hasAttribute('tabindex') && !element.getAttribute('role')) {
  violation: 'Consider using semantic element instead of <div> with tabindex'
}
```

### List Structure Rules

#### Rule 1: List Container Validation
```typescript
// Check ul/ol contains li elements
if (element.tagName === 'ul' || element.tagName === 'ol') {
  const listItems = element.querySelectorAll(':scope > li')
  if (listItems.length === 0) {
    violation: '<ul> or <ol> must contain <li> elements' // Warn
  }
}
```

#### Rule 2: List Item Validation (Fixed)
```typescript
// Check li is child of ul, ol, or menu
if (element.tagName === 'li') {
  const parent = element.parentElement
  const parentTag = parent?.tagName.toLowerCase()
  if (parent && parentTag !== 'ul' && parentTag !== 'ol' && parentTag !== 'menu') {
    violation: '<li> must be a child of <ul>, <ol>, or <menu>' // Error
  }
}
```

#### Rule 3: Description List Validation (Fixed)
```typescript
// Check dl contains dt and/or dd anywhere under it (allows div wrappers)
if (element.tagName === 'dl') {
  const hasDt = element.querySelector(':scope dt')
  const hasDd = element.querySelector(':scope dd')
  if (!hasDt && !hasDd) {
    violation: '<dl> must contain at least one <dt> or <dd> element' // Warn
  }
}

// Check dt/dd appear only under dl (possibly via wrapper)
if (element.tagName === 'dt' || element.tagName === 'dd') {
  const dl = element.closest('dl')
  if (!dl) {
    violation: '<dt> or <dd> must appear under a <dl>' // Error
  }
}
```

### Heading Hierarchy Rules

#### Rule 1: Skipped Levels
```typescript
// Check for skipped heading levels
// Already implemented in heading-order rule
```

#### Rule 2: Heading in Landmarks
```typescript
// Check headings in landmarks have proper structure
// Enhanced in Phase 1
```

### Interactive Element Misuse Rules ⭐ NEW

#### Rule 1: Nested Interactive Elements
```typescript
// Check for interactive elements inside interactive elements
const interactiveSelectors = 'button, a[href], input[type="button"], input[type="submit"], input[type="reset"], [role="button"], [role="link"]'

const interactiveElements = element.querySelectorAll(interactiveSelectors)
for (const el of Array.from(interactiveElements)) {
  const parent = el.parentElement
  if (parent && parent.matches(interactiveSelectors)) {
    violation: 'Interactive element cannot be nested inside another interactive element' // Error
  }
}
```

#### Rule 2: Anchor Without Href
```typescript
// Check <a> without href used as button
const anchors = element.querySelectorAll('a')
for (const anchor of Array.from(anchors)) {
  if (!anchor.hasAttribute('href')) {
    violation: '<a> without href should be <button> or have href attribute' // Warn
  }
}
```

#### Rule 3: Button Type in Forms
```typescript
// Check button without type inside forms
const forms = element.querySelectorAll('form')
for (const form of Array.from(forms)) {
  const buttons = form.querySelectorAll('button')
  for (const button of Array.from(buttons)) {
    if (!button.hasAttribute('type')) {
      violation: '<button> in form should have type="button" to prevent accidental submit' // Warn
    }
  }
}
```

#### Rule 4: Framework-Aware Event Handler Detection
```typescript
// Detect event handlers across frameworks
function hasEventHandlers(el: Element): boolean {
  // HTML: onclick, onkeydown, etc.
  if (Array.from(el.attributes).some(attr => attr.name.startsWith('on'))) {
    return true
  }
  
  // JSX: onClick, onKeyDown, etc. (check AST for JSX attributes)
  // Vue: @click, v-on:click, etc. (check AST for Vue directives)
  // This requires framework-specific AST analysis
  
  return false
}

// Check clickable non-focusable
const elementsWithHandlers = element.querySelectorAll('[onclick], [onClick], [@click]')
for (const el of Array.from(elementsWithHandlers)) {
  const isFocusable = el.matches('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
  const hasRole = el.hasAttribute('role')
  
  if (!isFocusable && !hasRole) {
    violation: 'Element with click handler should be focusable (add tabindex or use semantic element)' // Warn
  }
}
```

### Accessible Text Alternative Rules ⭐ NEW

#### Rule 1: Image Alt Text
```typescript
// Check img has alt attribute
const images = element.querySelectorAll('img')
for (const img of Array.from(images)) {
  if (!img.hasAttribute('alt')) {
    violation: '<img> must have alt attribute (use alt="" for decorative images)' // Error
  }
}
```

#### Rule 2: SVG Accessibility
```typescript
// Check svg has accessible name
const svgs = element.querySelectorAll('svg')
for (const svg of Array.from(svgs)) {
  const isHidden = svg.getAttribute('aria-hidden') === 'true'
  const hasLabel = svg.hasAttribute('aria-label')
  const hasLabelledBy = svg.hasAttribute('aria-labelledby')
  const hasTitle = svg.querySelector('title')
  
  if (!isHidden && !hasLabel && !hasLabelledBy && !hasTitle) {
    violation: '<svg> should have accessible name (aria-label, aria-labelledby, or title)' // Warn
  }
}
```

#### Rule 3: Figure Structure
```typescript
// Check figure/figcaption structure
const figures = element.querySelectorAll('figure')
for (const figure of Array.from(figures)) {
  const figcaptions = figure.querySelectorAll('figcaption')
  
  if (figcaptions.length > 1) {
    violation: '<figure> should not have multiple <figcaption> elements' // Error
  }
  
  // Check if figcaption is outside figure (should be caught by nesting validation)
}

const figcaptions = element.querySelectorAll('figcaption')
for (const figcaption of Array.from(figcaptions)) {
  const figure = figcaption.closest('figure')
  if (!figure) {
    violation: '<figcaption> must be inside <figure>' // Error
  }
}
```

### Landmark Rules ⭐ NEW

#### Rule 1: Single Main
```typescript
// Check only one main per document
const mains = element.querySelectorAll('main')
if (mains.length > 1) {
  violation: 'Document should have only one <main> element' // Error
}
```

#### Rule 2: Multiple Landmarks Require Labels
```typescript
// Check multiple nav/header/footer require accessible names
const navs = element.querySelectorAll('nav')
if (navs.length > 1) {
  for (const nav of Array.from(navs)) {
    const hasLabel = nav.hasAttribute('aria-label') || nav.hasAttribute('aria-labelledby')
    if (!hasLabel) {
      violation: 'Multiple <nav> elements require accessible names (aria-label or aria-labelledby)' // Warn
    }
  }
}

// Similar for header and footer
```

#### Rule 3: Section Accessible Name
```typescript
// Check section has accessible name if used as meaningful region
const sections = element.querySelectorAll('section')
for (const section of Array.from(sections)) {
  const hasHeading = section.querySelector('h1, h2, h3, h4, h5, h6')
  const hasLabel = section.hasAttribute('aria-label') || section.hasAttribute('aria-labelledby')
  
  if (!hasHeading && !hasLabel) {
    violation: '<section> used as meaningful region should have accessible name (heading or aria-label)' // Warn
  }
}
```

### Form Label Rules ⭐ NEW

#### Rule 1: Label Association
```typescript
// Check form controls have labels
const formControls = element.querySelectorAll('input, select, textarea')
for (const control of Array.from(formControls)) {
  const id = control.id
  const hasAriaLabel = control.hasAttribute('aria-label')
  const hasAriaLabelledBy = control.hasAttribute('aria-labelledby')
  const isWrappedInLabel = control.closest('label')
  const hasLabelFor = id && element.querySelector(`label[for="${id}"]`)
  
  if (!hasAriaLabel && !hasAriaLabelledBy && !isWrappedInLabel && !hasLabelFor) {
    violation: 'Form control must have associated label' // Error
  }
}
```

#### Rule 2: ID Uniqueness
```typescript
// Check IDs are unique
const ids = new Set<string>()
const elementsWithIds = element.querySelectorAll('[id]')
for (const el of Array.from(elementsWithIds)) {
  const id = el.id
  if (ids.has(id)) {
    violation: `Duplicate ID "${id}" found - IDs must be unique` // Error
  }
  ids.add(id)
}
```

#### Rule 3: Autocomplete Recommendation
```typescript
// Check autocomplete on common fields
const commonFields = {
  'email': 'email',
  'tel': 'tel',
  'name': 'name',
  'given-name': 'given-name',
  'family-name': 'family-name',
  'address-line1': 'address-line1',
  'address-line2': 'address-line2',
  'postal-code': 'postal-code',
  'country': 'country'
}

const inputs = element.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]')
for (const input of Array.from(inputs)) {
  const name = input.getAttribute('name')?.toLowerCase()
  const type = input.getAttribute('type')
  
  if (name && commonFields[name] && !input.hasAttribute('autocomplete')) {
    violation: `Input field "${name}" should have autocomplete attribute` // Warn
  }
}
```

---

## Validation Examples

### Valid Examples
```html
<!-- Proper semantic button -->
<button type="button">Click me</button>

<!-- Proper semantic navigation -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/home">Home</a></li>
  </ul>
</nav>

<!-- Proper list structure -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<!-- Proper description list (with div wrapper) -->
<dl>
  <div>
    <dt>Term</dt>
    <dd>Definition</dd>
  </div>
</dl>

<!-- Proper image with alt -->
<img src="photo.jpg" alt="A beautiful landscape" />

<!-- Proper figure -->
<figure>
  <img src="chart.png" alt="Sales chart" />
  <figcaption>Monthly sales data</figcaption>
</figure>

<!-- Proper form with label -->
<form>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" autocomplete="email" />
</form>

<!-- Single main -->
<main>
  <h1>Main Content</h1>
</main>
```

### Invalid Examples
```html
<!-- Generic element with role (warn) -->
<div role="button">Click me</div>
<!-- Should be: <button>Click me</button> -->

<!-- Generic element with onclick (warn) -->
<div onClick={handleClick}>Click me</div>
<!-- Should be: <button onClick={handleClick}>Click me</button> -->

<!-- Nested interactive (error) -->
<button>
  <a href="/link">Link</a>
</button>
<!-- Interactive elements cannot be nested -->

<!-- Anchor without href (warn) -->
<a>Click me</a>
<!-- Should be: <button>Click me</button> or <a href="...">Click me</a> -->

<!-- Button without type in form (warn) -->
<form>
  <button>Submit</button>
</form>
<!-- Should be: <button type="button">Submit</button> -->

<!-- List item outside list (error) -->
<li>Item</li>
<!-- Should be child of <ul>, <ol>, or <menu> -->

<!-- Description list without items (warn) -->
<dl></dl>
<!-- Should contain at least one <dt> or <dd> -->

<!-- Image without alt (error) -->
<img src="photo.jpg" />
<!-- Should be: <img src="photo.jpg" alt="..." /> -->

<!-- Multiple main (error) -->
<main>Content 1</main>
<main>Content 2</main>
<!-- Should have only one <main> -->

<!-- Multiple nav without labels (warn) -->
<nav>Nav 1</nav>
<nav>Nav 2</nav>
<!-- Should be: <nav aria-label="...">Nav 1</nav> -->

<!-- Form control without label (error) -->
<input type="email" name="email" />
<!-- Should have associated label -->

<!-- Duplicate IDs (error) -->
<label for="email">Email</label>
<input id="email" />
<input id="email" />
<!-- IDs must be unique -->
```

---

## Implementation Priority

### Phase 1.1: Generic Element Misuse + Interactive Misuse (Week 1)
**Priority: High**
- Div/span with role detection (warn)
- Framework-aware event handler detection (JSX/Vue/HTML)
- Interactive inside interactive (error)
- Anchor without href (warn)
- Button type in forms (warn)
- Clickable non-focusable (warn)

### Phase 1.2: List Structure (Week 1)
**Priority: High**
- ul/ol structure validation (warn)
- li parent validation - fixed to include menu (error)
- dl structure validation - fixed to allow div wrappers (warn/error)

### Phase 1.3: Accessible Text Alternatives (Week 1)
**Priority: High**
- Image alt text validation (error)
- SVG accessibility checks (warn)
- Figure/figcaption structure (error)

### Phase 1.4: Landmark Uniqueness + Labeling (Week 1-2)
**Priority: High**
- Single main validation (error)
- Multiple nav/header/footer labeling (warn)
- Section accessible name (warn)

### Phase 1.5: Form Label Completeness (Week 2)
**Priority: High**
- Label association (all mechanisms) (error)
- ID uniqueness checks (error)
- Autocomplete recommendations (warn)

### Phase 1.6: Enhanced Heading Validation (Week 2)
**Priority: Medium**
- Heading in landmarks
- Heading structure enhancements

### Phase 1.7: Table Structure (Week 2)
**Priority: Medium**
- Table element nesting validation (error)
- Caption/accessible name recommendation (warn)
- Th scope recommendation (warn)

### Phase 1.8: Media Element Validation (Week 2)
**Priority: Low**
- Picture element validation

---

## Success Criteria

- ✅ All generic element misuse patterns detected (with framework-aware event handlers)
- ✅ All interactive element misuse patterns detected
- ✅ All list structures validated (with fixed li/dl rules)
- ✅ Accessible text alternatives validated (img, svg, figure)
- ✅ Landmark uniqueness + labeling validated
- ✅ Form label completeness validated (all mechanisms + ID uniqueness)
- ✅ Enhanced heading validation
- ✅ Table structure validated (with appropriate severity levels)
- ✅ Proper severity levels (error/warn/info)
- ✅ ESLint rule working for JSX, Vue, HTML
- ✅ 90%+ test coverage
- ✅ Documentation complete

---

## Future Enhancements (Phase 2+)

- Context-aware semantic suggestions
- CSS-based semantic detection
- JavaScript pattern detection
- Framework-specific patterns
- Custom element validation
- Web Component semantic validation

