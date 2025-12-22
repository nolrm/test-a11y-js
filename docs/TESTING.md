# Testing Guide

This document describes the testing approach for the ESLint plugin.

## Test Structure

The test suite is organized into several categories:

### Unit Tests

#### Rule Structure Tests (`tests/vitest/unit/linter/rules/rule-structure.test.ts`)
- Verifies that all rule files exist and are properly structured
- Checks that rules export the `create` function
- Validates meta information (type, messages)
- Confirms support for JSX, Vue, and HTML string parsing

#### Vue Rule Tests (`tests/vitest/unit/linter/rules/vue-rules.test.ts`)
- Verifies Vue-specific support in all rules
- Checks for `VElement` node handling
- Validates use of `vue-ast-utils` for Vue parsing
- Confirms support for Vue attribute syntax (`:alt`, `v-bind:alt`)

#### AST Utility Tests (`tests/vitest/unit/linter/ast-utils.test.ts`)
- Tests AST utility functions for JSX, HTML, and Vue
- Verifies DOM conversion from AST nodes
- Tests attribute extraction and parsing

#### Vue Support Tests (`tests/vitest/unit/linter/vue-support.test.ts`)
- Tests Vue-specific AST utility functions
- Verifies Vue element to DOM conversion
- Tests Vue attribute handling

### Integration Tests

#### ESLint Rules Integration (`tests/vitest/integration/eslint-rules.test.ts`)
- Tests rules through ESLint's programmatic API
- Verifies each rule detects violations correctly
- Tests rule behavior with JSX code

**Note:** Currently, these tests have a limitation due to jsdom bundling issues. The plugin bundle includes jsdom, which has a known issue with `require.resolve` for `xhr-sync-worker.js`. This prevents the full plugin from loading in test environments.

**Workaround:** The rule structure tests verify that rules are correctly implemented and structured, which provides confidence in rule correctness without requiring full plugin execution.

#### Real-world Examples (`tests/vitest/integration/real-world-examples.test.ts`)
- Tests rules with realistic component code
- Verifies multiple violations in a single component
- Tests accessible vs. inaccessible component patterns

#### Build Verification (`tests/vitest/integration/build-verification.test.ts`)
- Verifies that the plugin builds correctly
- Checks that all exports are available
- Validates CJS and ESM formats

#### Plugin Import Tests (`tests/vitest/integration/eslint-plugin-import.test.ts`)
- Tests that the plugin can be imported correctly
- Verifies plugin structure (rules, configs, meta)

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/vitest/unit/linter/rules/rule-structure.test.ts

# Run tests in watch mode
npm test -- --watch
```

## Test Coverage

Current test coverage includes:
- ✅ Rule structure and exports
- ✅ Vue-specific support
- ✅ JSX support (verified through structure)
- ✅ HTML string support (verified through structure)
- ✅ AST utility functions
- ⚠️ Full ESLint integration (limited by jsdom bundling)

## Known Limitations

### jsdom Bundling Issue

The plugin bundle includes jsdom for HTML string parsing. When jsdom is bundled, it tries to dynamically require `xhr-sync-worker.js`, which causes issues in test environments.

**Impact:** Full integration tests that load the complete plugin bundle cannot run.

**Mitigation:**
1. Rule structure tests verify rule implementation
2. AST utility tests verify core functionality
3. Manual testing with actual ESLint execution validates end-to-end behavior

### Future Improvements

1. **Externalize jsdom**: Configure the build to externalize jsdom, allowing it to be loaded as a peer dependency
2. **Mock jsdom in tests**: Create test mocks for jsdom to enable full integration testing
3. **RuleTester tests**: Add ESLint RuleTester tests once module resolution issues are resolved

## Testing Best Practices

1. **Test Structure First**: Verify rule structure before testing behavior
2. **Test Utilities Separately**: Test AST utilities independently
3. **Verify Framework Support**: Ensure all frameworks (JSX, Vue, HTML) are tested
4. **Test Edge Cases**: Include tests for dynamic attributes, empty values, etc.

## Contributing Tests

When adding new rules:

1. Add structure tests to verify rule exports and meta
2. Add framework-specific tests (JSX, Vue, HTML)
3. Add AST utility tests if new utilities are needed
4. Update this documentation with new test patterns

