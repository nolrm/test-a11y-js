# ESLint Plugin Implementation Plan

## Overview

This document outlines the plan to implement an ESLint plugin for `test-a11y-js` that provides real-time accessibility linting for React, Vue, and HTML components.

## Implementation Progress

### ✅ Phase 1: Foundation & Setup (COMPLETE)
- [x] Create ESLint plugin directory structure
- [x] Set up TypeScript types for ESLint rules (`src/linter/eslint-plugin/utils/types.ts`)
- [x] Create plugin entry point with basic structure (`src/linter/eslint-plugin/index.ts`)
- [x] Create recommended configuration (`src/linter/eslint-plugin/configs/recommended.ts`)
- [x] Add ESLint as peer dependency in `package.json`
- [x] Add `@types/eslint` to devDependencies
- [x] Update build configuration to include plugin
- [x] Update main exports to include plugin
- [x] Add package.json exports for plugin
- [x] Create structure verification test (`tests/vitest/unit/linter/plugin-structure.test.ts`)
- [x] Verify build process works correctly
- [x] All tests passing

### ✅ Phase 2: AST Utilities (COMPLETE)
- [x] Create AST traversal utilities (`src/linter/eslint-plugin/utils/ast-utils.ts`)
- [x] Implement JSX AST to DOM element conversion (`src/linter/eslint-plugin/utils/jsx-ast-utils.ts`)
- [x] Implement Vue template AST parsing (`src/linter/eslint-plugin/utils/vue-ast-utils.ts`) - placeholder for Phase 4
- [x] Implement HTML string parsing utilities (`src/linter/eslint-plugin/utils/html-ast-utils.ts`)
- [x] Add unit tests for AST utilities (`tests/vitest/unit/linter/ast-utils.test.ts`)
- [x] Add jsdom dependency for DOM parsing
- [x] All tests passing (15 tests)

### ✅ Phase 3: Core Rules Implementation (COMPLETE)
- [x] Implement `image-alt` rule (`src/linter/eslint-plugin/rules/image-alt.ts`)
- [x] Implement `button-label` rule (`src/linter/eslint-plugin/rules/button-label.ts`)
- [x] Implement `link-text` rule (`src/linter/eslint-plugin/rules/link-text.ts`)
- [x] Implement `form-label` rule (`src/linter/eslint-plugin/rules/form-label.ts`)
- [x] Implement `heading-order` rule (`src/linter/eslint-plugin/rules/heading-order.ts`)
- [x] Update plugin index to export all rules
- [x] Add rule structure verification tests
- [x] All rules integrated with A11yChecker
- [x] Rules support JSX and HTML string checking

### ✅ Phase 4: Vue Support (COMPLETE)
- [x] Add vue-eslint-parser support (peer dependency, optional)
- [x] Create Vue-specific AST utilities (`src/linter/eslint-plugin/utils/vue-ast-utils.ts`)
- [x] Update all rules to handle Vue template syntax (VElement nodes)
- [x] Support Vue v-bind and : syntax for attributes
- [x] Add Vue example tests (`tests/vitest/unit/linter/vue-support.test.ts`)
- [x] All 5 rules now support Vue templates
- [x] Vue parser detection and file type checking

### ✅ Phase 5: Configuration & Presets (COMPLETE)
- [x] Create strict configuration (`src/linter/eslint-plugin/configs/strict.ts`)
- [x] Add rule severity mapping based on impact (already in recommended)
- [x] Create framework-specific configs (React and Vue)
- [x] Add configuration documentation (`docs/CONFIGURATION.md`)
- [x] Export all configurations in plugin index
- [x] Add parser configurations for React and Vue
- [x] Update tests to verify all configurations

### ⏳ Phase 6: Integration & Export
- [ ] Verify plugin can be imported correctly
- [ ] Test build process includes plugin
- [ ] Verify package exports work correctly

### ⏳ Phase 7: Testing
- [ ] Create ESLint rule tester setup
- [ ] Add tests for each rule (JSX)
- [ ] Add tests for each rule (Vue)
- [ ] Add tests for each rule (HTML)
- [ ] Add integration tests
- [ ] Test with real-world examples

### ⏳ Phase 8: Documentation
- [ ] Update README with ESLint plugin usage
- [ ] Create ESLint plugin documentation
- [ ] Add framework-specific examples
- [ ] Add configuration examples
- [ ] Add troubleshooting guide

## Goals

1. Provide ESLint rules that check accessibility violations in source code
2. Support React (JSX), Vue (SFC), and HTML templates
3. Integrate with existing `A11yChecker` core functionality
4. Enable real-time feedback in IDEs and CI/CD pipelines
5. Maintain framework-agnostic core while adding framework-specific linting

## Project Structure

```
src/
  core/
    a11y-checker.ts              # Existing core (unchanged)
  linter/
    eslint-plugin/
      index.ts                   # Plugin entry point
      configs/
        recommended.ts           # Recommended rule configuration
        strict.ts                # Strict rule configuration (optional)
      rules/
        image-alt.ts             # Image alt attribute rule
        button-label.ts           # Button label rule
        link-text.ts              # Link text rule
        form-label.ts             # Form label rule
        heading-order.ts          # Heading order rule
      utils/
        ast-utils.ts             # AST traversal utilities
        jsx-ast-utils.ts         # JSX AST to DOM conversion
        vue-ast-utils.ts         # Vue template AST parsing
        html-ast-utils.ts         # HTML string parsing
        types.ts                  # Shared TypeScript types
  index.ts                       # Main export (update to include plugin)
```

## Implementation Phases

### Phase 1: Foundation & Setup

**Tasks:**
1. Create ESLint plugin directory structure
2. Set up TypeScript types for ESLint rules
3. Create plugin entry point with basic structure
4. Add ESLint as peer dependency
5. Update build configuration to include plugin

**Files to Create:**
- `src/linter/eslint-plugin/index.ts`
- `src/linter/eslint-plugin/utils/types.ts`
- `src/linter/eslint-plugin/configs/recommended.ts`

**Dependencies to Add:**
```json
{
  "peerDependencies": {
    "eslint": ">=8.0.0"
  },
  "devDependencies": {
    "@types/eslint": "^8.0.0",
    "eslint": "^8.37.0"
  }
}
```

**Deliverables:**
- Plugin structure in place
- Can be imported but no rules yet
- Basic configuration exports

---

### Phase 2: AST Utilities

**Tasks:**
1. Create AST traversal utilities
2. Implement JSX AST to DOM element conversion
3. Implement Vue template AST parsing
4. Implement HTML string parsing utilities
5. Add unit tests for AST utilities

**Files to Create:**
- `src/linter/eslint-plugin/utils/ast-utils.ts`
- `src/linter/eslint-plugin/utils/jsx-ast-utils.ts`
- `src/linter/eslint-plugin/utils/vue-ast-utils.ts`
- `src/linter/eslint-plugin/utils/html-ast-utils.ts`
- `tests/vitest/unit/linter/ast-utils.test.ts`

**Key Functions:**
```typescript
// jsx-ast-utils.ts
function jsxToElement(node: JSXOpeningElement, context: RuleContext): Element
function getJSXAttributeValue(node: JSXAttribute): string | null

// vue-ast-utils.ts
function parseVueTemplate(template: string): Element
function vueElementToDOM(node: VElement): Element

// html-ast-utils.ts
function parseHTMLString(html: string): Element
```

**Challenges:**
- Converting AST nodes to DOM elements
- Handling dynamic attributes (e.g., `:alt="dynamicValue"`)
- Parsing Vue SFC template blocks
- Handling template literals with HTML

**Deliverables:**
- Working AST to DOM conversion utilities
- Test coverage for utilities
- Documentation for each utility

---

### Phase 3: Core Rules Implementation

**Tasks:**
1. Implement `image-alt` rule
2. Implement `button-label` rule
3. Implement `link-text` rule
4. Implement `form-label` rule
5. Implement `heading-order` rule
6. Add rule-specific tests

**Files to Create:**
- `src/linter/eslint-plugin/rules/image-alt.ts`
- `src/linter/eslint-plugin/rules/button-label.ts`
- `src/linter/eslint-plugin/rules/link-text.ts`
- `src/linter/eslint-plugin/rules/form-label.ts`
- `src/linter/eslint-plugin/rules/heading-order.ts`
- `tests/vitest/unit/linter/rules/*.test.ts`

**Rule Structure:**
```typescript
// Example: image-alt.ts
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce images have alt attributes',
      category: 'Accessibility',
      recommended: true
    },
    messages: {
      missingAlt: 'Image must have an alt attribute',
      emptyAlt: 'Image alt attribute must not be empty'
    },
    fixable: null, // or 'code' if we add auto-fix
    schema: [] // Rule options schema
  },
  create(context) {
    return {
      // Rule visitor methods
    }
  }
}
```

**Rule Visitors:**
- **JSX**: `JSXOpeningElement`, `JSXElement`
- **Vue**: `VElement` (via vue-eslint-parser)
- **HTML**: `Literal` (template strings), `TemplateLiteral`

**Integration with A11yChecker:**
- Use existing `A11yChecker.checkImageAlt()` etc.
- Convert AST node to DOM element
- Map violations to ESLint errors/warnings

**Deliverables:**
- All 5 rules implemented
- Rules work with JSX
- Rules work with Vue templates
- Rules work with HTML strings
- Test coverage for each rule

---

### Phase 4: Vue Support

**Tasks:**
1. Add vue-eslint-parser support
2. Create Vue-specific AST utilities
3. Update rules to handle Vue template syntax
4. Add Vue example tests
5. Document Vue-specific usage

**Files to Update:**
- `src/linter/eslint-plugin/utils/vue-ast-utils.ts`
- All rule files (add Vue visitor methods)
- `src/linter/eslint-plugin/index.ts` (Vue parser config)

**Dependencies:**
```json
{
  "peerDependencies": {
    "vue-eslint-parser": ">=9.0.0"
  }
}
```

**Vue-Specific Considerations:**
- Parse `<template>` blocks from SFC
- Handle Vue directives (`:alt`, `v-bind:alt`)
- Handle dynamic attributes
- Support both Vue 2 and Vue 3 syntax

**Deliverables:**
- Full Vue template support
- Vue example component tests
- Vue documentation

---

### Phase 5: Configuration & Presets

**Tasks:**
1. Create recommended configuration
2. Create strict configuration (optional)
3. Add rule severity mapping based on impact
4. Create framework-specific configs
5. Add configuration documentation

**Files to Create/Update:**
- `src/linter/eslint-plugin/configs/recommended.ts`
- `src/linter/eslint-plugin/configs/strict.ts` (optional)
- `src/linter/eslint-plugin/configs/react.ts` (optional)
- `src/linter/eslint-plugin/configs/vue.ts` (optional)

**Configuration Structure:**
```typescript
// recommended.ts
export default {
  rules: {
    'test-a11y-js/image-alt': 'error',
    'test-a11y-js/button-label': 'error',
    'test-a11y-js/link-text': 'warn',
    'test-a11y-js/form-label': 'error',
    'test-a11y-js/heading-order': 'warn'
  }
}
```

**Deliverables:**
- Recommended config
- Framework-specific configs
- Configuration examples in docs

---

### Phase 6: Integration & Export

**Tasks:**
1. Update main `index.ts` to export plugin
2. Update package.json exports
3. Update build configuration
4. Create plugin entry point file
5. Add plugin to npm package files

**Files to Update:**
- `src/index.ts`
- `package.json`
- `tsup.config.ts` (if needed)

**Package.json Updates:**
```json
{
  "main": "dist/index.js",
  "exports": {
    ".": "./dist/index.js",
    "./eslint-plugin": "./dist/linter/eslint-plugin/index.js"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ]
}
```

**Deliverables:**
- Plugin can be imported as `test-a11y-js/eslint-plugin`
- Build process includes plugin
- Package exports configured correctly

---

### Phase 7: Testing

**Tasks:**
1. Create ESLint rule tester setup
2. Add tests for each rule (JSX)
3. Add tests for each rule (Vue)
4. Add tests for each rule (HTML)
5. Add integration tests
6. Test with real-world examples

**Files to Create:**
- `tests/vitest/unit/linter/rules/image-alt.test.ts`
- `tests/vitest/unit/linter/rules/button-label.test.ts`
- `tests/vitest/unit/linter/rules/link-text.test.ts`
- `tests/vitest/unit/linter/rules/form-label.test.ts`
- `tests/vitest/unit/linter/rules/heading-order.test.ts`
- `tests/vitest/integration/eslint-plugin.test.ts`

**Test Structure:**
```typescript
import { RuleTester } from 'eslint'
import rule from '../../../src/linter/eslint-plugin/rules/image-alt'

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true }
  }
})

ruleTester.run('image-alt', rule, {
  valid: [
    '<img src="test.jpg" alt="Test" />'
  ],
  invalid: [
    {
      code: '<img src="test.jpg" />',
      errors: [{ messageId: 'missingAlt' }]
    }
  ]
})
```

**Deliverables:**
- Comprehensive test suite
- Tests for all supported frameworks
- Integration tests
- High test coverage (>80%)

---

### Phase 8: Documentation

**Tasks:**
1. Update README with ESLint plugin usage
2. Create ESLint plugin documentation
3. Add framework-specific examples
4. Add configuration examples
5. Add troubleshooting guide
6. Add migration guide (if applicable)

**Files to Create/Update:**
- `README.md` (add ESLint section)
- `docs/ESLINT_PLUGIN.md` (detailed plugin docs)
- `examples/eslint/` (example configurations)

**Documentation Sections:**
1. Installation
2. Basic Configuration
3. Framework-Specific Setup (React, Vue)
4. Rule Reference
5. Configuration Options
6. Examples
7. Troubleshooting
8. FAQ

**Deliverables:**
- Complete documentation
- Usage examples
- Configuration examples
- Troubleshooting guide

---

## Technical Considerations

### AST Parsing Challenges

1. **Dynamic Attributes**
   - Problem: `:alt="dynamicValue"` can't be statically analyzed
   - Solution: Check for presence of attribute, warn if dynamic
   - Example: `alt={variable}` → Warning: "Alt attribute is dynamic, ensure it's not empty"

2. **Template Literals**
   - Problem: HTML in template strings needs parsing
   - Solution: Use JSDOM or similar to parse HTML strings
   - Limitation: Can't check runtime-generated HTML

3. **Vue Directives**
   - Problem: Vue uses `:alt` instead of `alt`
   - Solution: Parse Vue AST and check for bound attributes
   - Consider: Both `alt` and `:alt` should be valid

### Performance Considerations

1. **AST Traversal**
   - Only visit relevant node types (e.g., JSXOpeningElement for images)
   - Cache parsed results when possible
   - Avoid full DOM conversion when simple attribute check suffices

2. **Large Files**
   - Consider file size limits
   - Option: Skip files over certain size
   - Option: Process in chunks

### Compatibility

1. **ESLint Versions**
   - Support ESLint 8.x (current)
   - Consider ESLint 9.x (flat config) for future
   - Document version requirements

2. **Framework Versions**
   - React: Support React 16+
   - Vue: Support Vue 2 and Vue 3
   - Document framework requirements

## Dependencies

### Required
- `eslint` (peer dependency, >=8.0.0)

### Optional (for framework support)
- `vue-eslint-parser` (peer dependency, for Vue support)
- `@typescript-eslint/parser` (peer dependency, for TypeScript/JSX)

### Development
- `@types/eslint` (for TypeScript types)
- `eslint` (for testing)

## Build Configuration

### TypeScript
- Include `src/linter/**/*.ts` in compilation
- Export types for plugin

### Build Output
- Plugin should be in `dist/linter/eslint-plugin/`
- Main export: `dist/linter/eslint-plugin/index.js`
- Types: `dist/linter/eslint-plugin/index.d.ts`

### tsup Configuration
```typescript
// May need separate entry for plugin
export default {
  entry: {
    index: 'src/index.ts',
    'eslint-plugin': 'src/linter/eslint-plugin/index.ts'
  },
  // ... rest of config
}
```

## Testing Strategy

### Unit Tests
- Test each rule independently
- Test AST utilities
- Test configuration exports

### Integration Tests
- Test plugin with real ESLint setup
- Test with React components
- Test with Vue components
- Test with HTML strings

### Example Tests
- Create example components with violations
- Verify ESLint catches violations
- Verify ESLint passes valid code

## Success Criteria

1. ✅ Plugin can be installed and configured
2. ✅ All 5 rules work with JSX
3. ✅ All 5 rules work with Vue templates
4. ✅ Rules integrate with existing A11yChecker
5. ✅ Real-time feedback in IDEs
6. ✅ Works in CI/CD pipelines
7. ✅ Comprehensive test coverage
8. ✅ Complete documentation
9. ✅ Performance is acceptable (<1s for typical file)

## Timeline Estimate

- **Phase 1**: 1-2 days (Foundation)
- **Phase 2**: 3-5 days (AST Utilities)
- **Phase 3**: 5-7 days (Core Rules)
- **Phase 4**: 3-4 days (Vue Support)
- **Phase 5**: 1-2 days (Configuration)
- **Phase 6**: 1 day (Integration)
- **Phase 7**: 3-4 days (Testing)
- **Phase 8**: 2-3 days (Documentation)

**Total Estimate**: 3-4 weeks

## Future Enhancements

1. **Auto-fix Support**
   - Automatically add missing alt attributes
   - Suggest fixes for violations
   - Implement `fixable: 'code'` in rules

2. **Additional Rules**
   - Color contrast checking
   - ARIA attribute validation
   - Keyboard navigation checks
   - Focus management

3. **Advanced Features**
   - Custom rule creation API
   - Rule severity customization
   - Framework-specific rule sets
   - Performance profiling

4. **IDE Integration**
   - VSCode extension
   - IntelliJ plugin
   - Real-time error highlighting

## Risks & Mitigations

### Risk 1: AST Parsing Complexity
- **Mitigation**: Start with simple attribute checks, add complexity gradually
- **Fallback**: Provide simpler rule variants

### Risk 2: Performance Issues
- **Mitigation**: Profile early, optimize hot paths
- **Fallback**: Add performance options (skip large files)

### Risk 3: Framework Compatibility
- **Mitigation**: Test with multiple framework versions
- **Fallback**: Document limitations, provide workarounds

### Risk 4: False Positives
- **Mitigation**: Focus on static analysis, document edge cases
- **Fallback**: Allow rule disabling, provide escape hatches

## Next Steps

1. Review and approve this plan
2. Set up project structure (Phase 1)
3. Begin implementation following phases
4. Regular checkpoints and reviews
5. Iterate based on feedback

---

**Last Updated**: [Current Date]
**Status**: Planning
**Owner**: [Your Name]

