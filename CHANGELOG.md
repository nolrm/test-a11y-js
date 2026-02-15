# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Fixed `./core` CJS export — `require('eslint-plugin-test-a11y-js/core')` now correctly exports `A11yChecker` instead of the ESLint plugin
- Fixed `bin/eslint-with-progress.js` to work with both ESLint v8 and v9 (removed deprecated `useEslintrc` and `extensions` options)
- Removed `vitest` from `peerDependencies` (should only be in devDependencies)
- Replaced `TODO:` placeholder text in `link-text` autofix suggestions with user-friendly text

### Changed
- Updated `plugin-structure.test.ts` to verify all 36 rules (was stale at 6)
- Enhanced `build-verification.test.ts` with formatter/formatter-progress file checks and export-to-disk validation
- Rewrote `rule-structure.test.ts` to dynamically cover all 36 rules (was hardcoded to 6)
- Rewrote `config-presets.test.ts` to test built plugin with exact rule counts (minimal: 3, recommended: 24, strict: 36)
- Expanded `test:core` pipeline with config-presets, flat-config, plugin-structure, and all new integration tests
- Clarified recommended config comment about excluded rules (no longer "temporarily disabled")

### Added
- `package-publish-readiness.test.ts` — comprehensive publish gate covering npm pack contents, CJS require, export content validation, rule loading, version consistency, and package.json field checks
- `formatter-output.test.ts` — functional tests for formatter and formatter-with-progress output
- `bin-smoke.test.ts` — smoke test for bin/eslint-with-progress.js (shebang, syntax, structure)
- `core-export.test.ts` — integration test for ./core export path with A11yChecker runtime validation

## [0.13.0] - 2025-05-01

### Added
- 20 new accessibility rules (total: 36 rules)
  - Phase 1: `no-access-key`, `no-autofocus`, `tabindex-no-positive`, `no-distracting-elements`, `lang`
  - Phase 2: `no-aria-hidden-on-focusable`, `no-role-presentation-on-focusable`
  - Phase 3: `click-events-have-key-events`, `mouse-events-have-key-events`, `no-static-element-interactions`, `no-noninteractive-element-interactions`, `interactive-supports-focus`
  - Phase 4: `no-noninteractive-tabindex`, `autocomplete-valid`, `aria-activedescendant-has-tabindex`, `heading-has-content`
  - Phase 5: `anchor-ambiguous-text`, `img-redundant-alt`, `accessible-emoji`, `html-has-lang`

## [0.12.0] - 2025-04-01

### Added
- Phase 3: Static + Runtime Workflow Integration
- Phase 2: Suggestions and AST-first rule reintroduction
- Phase 1: Rule configurability, component mapping, and flat config support
- Polymorphic prop support (`as`, `component`)
- Design system component mapping via settings

### Changed
- Updated recommended and strict config presets to include new rules

## [0.11.0] - 2025-03-01

### Added
- Custom ESLint formatter with summary output
- Progress-aware ESLint wrapper (`bin/eslint-with-progress.js`)
- Comprehensive E2E CLI testing infrastructure

### Fixed
- Handle `JSXSpreadAttribute` in all 13 ESLint rules
- Add `JSXIdentifier` type guards to all rules

## [0.10.0] - 2025-02-01

### Changed
- Major architecture refactor: pure AST-first ESLint rules (removed jsdom/A11yChecker dependency from linter)
- Dual API design: ESLint plugin for static analysis, A11yChecker for runtime

### Added
- `fieldset-legend`, `table-structure`, `details-summary`, `video-captions`, `audio-captions`, `landmark-roles`, `dialog-modal`, `aria-validation`, `semantic-html`, `form-validation` rules

## [0.4.0] - 2024-12-01

### Added
- ESLint plugin with initial 6 rules: `image-alt`, `button-label`, `link-text`, `form-label`, `heading-order`, `iframe-title`
- Recommended, strict, react, and vue config presets
- `prepublishOnly` pre-check script

## [0.1.0] - 2024-10-01

### Added
- Initial release
- A11yChecker runtime API for programmatic accessibility testing
- Vitest integration with happy-dom
