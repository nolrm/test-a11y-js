# Local Testing Guide for npm Publish

This guide helps you test the npm publish workflow locally before pushing to GitHub Actions.

## Setup

### 1. Create `.env` file

Create a `.env` file in the project root with your npm token:

```bash
echo "NPM_TOKEN=your_npm_token_here" > .env
```

**Important:**
- Get your token from: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
- Must be a **Granular Access Token** (not Classic - those are revoked)
- Required permissions: **Read and Publish**
- Enable **"Bypass 2FA"** for CI/CD workflows
- Token expires in max 90 days for write tokens

### 2. Run the test script

```bash
./test-publish.sh
```

The script will:
- ✅ Check if `.env` file exists
- ✅ Load and verify your NPM_TOKEN
- ✅ Test npm authentication
- ✅ Run `npm ci` and `npm run pre-check`
- ✅ Create a package tarball
- ✅ Optionally test publish to npm

## Manual Testing

If you prefer to test manually:

```bash
# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

# Configure npm
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc

# Test authentication
npm whoami

# Run the same steps as CI/CD
npm ci
npm run pre-check

# Test package creation
npm pack

# Test publish (optional)
npm publish --access public
```

## Troubleshooting

### "Authentication failed"
- Check that your token is a **Granular Access Token** (not Classic)
- Verify token has **Read and Publish** permissions
- Ensure **"Bypass 2FA"** is enabled
- Check if token has expired (max 90 days)

### "Package not found" (404 error)
- If this is the first publish, the package will be created automatically
- Verify you have permission to publish to the package name
- Check that the package name in `package.json` matches what you expect

### Token type issues
- Classic tokens were revoked on December 9, 2025
- You must use **Granular Access Tokens** now
- Create a new token at: https://www.npmjs.com/settings/YOUR_USERNAME/tokens

## Security Notes

- ⚠️ Never commit `.env` file (it's in `.gitignore`)
- ⚠️ Never share your npm token
- ⚠️ Rotate tokens regularly (max 90 days for write tokens)
- ✅ Use OIDC Trusted Publishing for production (most secure)

