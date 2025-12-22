# GitHub Actions Workflows

This directory contains GitHub Actions workflows for CI/CD.

## Workflows

### CI (`ci.yml`)
Runs on every push and pull request to `main` and `develop` branches:
- Runs pre-check (build, test, lint, type-check)
- Tests on Node.js 18.x and 20.x
- Generates test coverage reports

### Publish (`publish.yml`)
Publishes to npm when:
- A version tag is pushed (e.g., `v0.3.0`)
- Manually triggered via workflow_dispatch

**Workflow steps:**
1. **Pre-check job** (runs first):
   - Checkout code
   - Setup Node.js
   - Install dependencies
   - Run `npm run pre-check` (build, test, lint, type-check)
   - Upload build artifacts

2. **Publish job** (only runs if pre-check passes):
   - Checkout code
   - Setup Node.js with npm registry
   - Install dependencies
   - Extract/update version from tag or manual input
   - Build the project
   - Verify build output exists
   - Publish to npm
   - Create GitHub release (if triggered by tag)

## Setup

### NPM Token
1. Go to [npmjs.com](https://www.npmjs.com/settings/YOUR_USERNAME/tokens) and create an access token
   - Token type: **Automation** (for CI/CD)
   - Scopes: **Read and Publish**
2. Add it as a secret in GitHub:
   - Repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your npm access token
   - Click "Add secret"

### GitHub Token
The `GITHUB_TOKEN` is automatically provided by GitHub Actions and doesn't need to be set up manually. It's used for creating releases.

## Publishing a New Version

### Option 1: Using Git Tags (Recommended)

This is the recommended approach as it's automated and creates a GitHub release:

```bash
# 1. Update version in package.json
npm version patch   # for 0.3.0 → 0.3.1
# or
npm version minor   # for 0.3.0 → 0.4.0
# or
npm version major   # for 0.3.0 → 1.0.0

# 2. Get the new version
VERSION=$(node -p "require('./package.json').version")

# 3. Create and push tag (this triggers the workflow)
git tag v$VERSION
git push origin v$VERSION

# 4. Also push the version commit
git push origin main
```

The workflow will automatically:
- Run pre-check
- Publish to npm
- Create a GitHub release

### Option 2: Manual Workflow Dispatch

For quick patches or when you need more control:

1. Go to GitHub → Actions → "Publish to npm"
2. Click "Run workflow" (dropdown on the right)
3. Enter version number (e.g., `0.3.1`)
4. Click "Run workflow"

**Note:** Manual dispatch doesn't create a GitHub release automatically.

## Pre-check Requirements

The `pre-check` script must pass before publishing. It runs:
- ✅ `npm run build` - Builds the project
- ✅ `npm run test:core` - Runs critical tests
- ✅ `npm run lint` - Lints source code
- ✅ `npm run type-check` - Type-checks source code

If any step fails, the publish job will **not** run, preventing broken releases.

## Troubleshooting

### Workflow fails at pre-check
- Check the workflow logs to see which step failed
- Fix the issue locally by running `npm run pre-check`
- Commit and push the fix

### Workflow fails at publish
- Verify `NPM_TOKEN` secret is set correctly
- Check that the version doesn't already exist on npm
- Ensure you have publish permissions on npm

### Version already exists
- Update to a new version in `package.json`
- Create a new tag with the updated version

## Security

- Never commit `NPM_TOKEN` to the repository
- Use GitHub Secrets for all sensitive tokens
- The token should have minimal required permissions (Read and Publish only)
