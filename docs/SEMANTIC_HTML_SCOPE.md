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
- ✅ `<div role="button">` → Should use `<button>`
- ✅ `<div role="link">` → Should use `<a>`
- ✅ `<div role="heading">` → Should use `<h1>`-`<h6>`
- ✅ `<div role="list">` → Should use `<ul>` or `<ol>`
- ✅ `<div role="listitem">` → Should use `<li>`
- ✅ `<div role="navigation">` → Should use `<nav>`
- ✅ `<div role="main">` → Should use `<main>`
- ✅ `<div role="article">` → Should use `<article>`
- ✅ `<div role="section">` → Should use `<section>`
- ✅ `<div role="header">` → Should use `<header>`
- ✅ `<div role="footer">` → Should use `<footer>`
- ✅ `<div role="complementary">` → Should use `<aside>`
- ✅ `<div role="form">` → Should use `<form>`
- ✅ `<div role="dialog">` → Should use `<dialog>`
- ✅ `<div onclick="...">` → Should use `<button>`
- ✅ `<span role="button">` → Should use `<button>`
- ✅ `<span role="link">` → Should use `<a>`
- ✅ `<span onclick="...">` → Should use `<button>`

**Not Supported in Phase 1:**
- ❌ Context-aware suggestions (e.g., div might be valid in some cases)
- ❌ Styling-based detection (requires CSS analysis)

#### 2. List Structure Validation
**Pattern:** Proper structure of list elements

**Supported Checks:**
- ✅ `<ul>` must contain `<li>` elements
- ✅ `<ol>` must contain `<li>` elements
- ✅ `<li>` must be child of `<ul>` or `<ol>`
- ✅ `<dl>` must contain `<dt>` and/or `<dd>` elements
- ✅ `<dt>` must be child of `<dl>`
- ✅ `<dd>` must be child of `<dl>`
- ✅ Nested lists are properly structured

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
- ✅ `<table>` has `<caption>` or aria-label
- ✅ Table has `<thead>`, `<tbody>`, or `<tfoot>`
- ✅ `<th>` elements have scope attribute
- ✅ Proper nesting of table elements

**Not Supported in Phase 1:**
- ❌ Complex table relationships (headers attribute)
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

### Not Supported in Phase 1 (Future)

#### Advanced Patterns (Phase 2+)
- ❌ Context-aware semantic suggestions
- ❌ CSS-based semantic detection
- ❌ JavaScript-based semantic patterns
- ❌ Framework-specific semantic patterns
- ❌ Custom element validation
- ❌ Web Component semantic validation

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
    violation: '<ul> or <ol> must contain <li> elements'
  }
}
```

#### Rule 2: List Item Validation
```typescript
// Check li is child of ul or ol
if (element.tagName === 'li') {
  const parent = element.parentElement
  if (parent && parent.tagName.toLowerCase() !== 'ul' && parent.tagName.toLowerCase() !== 'ol') {
    violation: '<li> must be a child of <ul> or <ol>'
  }
}
```

#### Rule 3: Description List Validation
```typescript
// Check dl contains dt and/or dd
if (element.tagName === 'dl') {
  const hasDt = element.querySelector(':scope > dt')
  const hasDd = element.querySelector(':scope > dd')
  if (!hasDt && !hasDd) {
    violation: '<dl> must contain <dt> and/or <dd> elements'
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

---

## Validation Examples

### Valid Examples
```html
<!-- Proper semantic button -->
<button>Click me</button>

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

<!-- Proper description list -->
<dl>
  <dt>Term</dt>
  <dd>Definition</dd>
</dl>
```

### Invalid Examples
```html
<!-- Generic element with role -->
<div role="button">Click me</div>
<!-- Should be: <button>Click me</button> -->

<!-- Generic element with onclick -->
<div onclick="handleClick()">Click me</div>
<!-- Should be: <button onclick="handleClick()">Click me</button> -->

<!-- List without items -->
<ul></ul>
<!-- Should contain <li> elements -->

<!-- List item outside list -->
<li>Item</li>
<!-- Should be child of <ul> or <ol> -->

<!-- Description list without items -->
<dl></dl>
<!-- Should contain <dt> and/or <dd> elements -->
```

---

## Implementation Priority

### Phase 1.1: Generic Element Misuse (Week 1)
**Priority: High**
- Div/span with role detection
- Div/span with onclick detection
- Common role-to-element mappings

### Phase 1.2: List Structure (Week 1)
**Priority: High**
- ul/ol structure validation
- li parent validation
- dl structure validation

### Phase 1.3: Enhanced Heading Validation (Week 1)
**Priority: Medium**
- Heading in landmarks
- Heading structure enhancements

### Phase 1.4: Form Structure (Week 1-2)
**Priority: Medium**
- Form element nesting
- Output element association

### Phase 1.5: Table Structure Enhancements (Week 2)
**Priority: Low**
- Table element nesting validation
- Table structure enhancements

### Phase 1.6: Media Element Validation (Week 2)
**Priority: Low**
- Figure/figcaption validation
- Picture element validation

---

## Success Criteria

- ✅ All generic element misuse patterns detected
- ✅ All list structures validated
- ✅ Enhanced heading validation
- ✅ Form structure validated
- ✅ Table structure enhanced
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

