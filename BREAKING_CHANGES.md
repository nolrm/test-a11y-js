# Breaking Changes Archive

> **Note:** This document is kept for historical reference. Since the package is new and has no existing users, breaking changes have been removed and the API is now stable.

## Previous Versions

### v0.10.0 (Archived)

Version 0.10.0 fixed critical memory exhaustion issues in large projects by refactoring the ESLint plugin to use pure AST validation instead of JSDOM.

**Key improvements:**
- 73% smaller bundle (132KB → 35KB)
- Zero memory issues
- Faster linting
- 13 active rules (3 rules temporarily disabled for refactoring)

### v0.9.0 (Archived)

The package was renamed from `test-a11y-js` to `eslint-plugin-test-a11y-js` to follow ESLint naming conventions.

---

**Current Status:** The package API is now stable. All breaking changes have been resolved and the current version provides a clean, consistent API.
