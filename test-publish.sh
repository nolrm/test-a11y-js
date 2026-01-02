#!/bin/bash
# Test script for npm publish - simulates GitHub Actions workflow

set -e

echo "🧪 Testing npm publish workflow locally..."
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Create a .env file with your NPM_TOKEN:"
    echo "   echo 'NPM_TOKEN=your_token_here' > .env"
    echo ""
    exit 1
fi

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

# Check if NPM_TOKEN is set
if [ -z "$NPM_TOKEN" ]; then
    echo "❌ NPM_TOKEN not found in .env file!"
    echo "📝 Add your token to .env:"
    echo "   NPM_TOKEN=your_token_here"
    echo ""
    exit 1
fi

echo "✅ NPM_TOKEN found"
echo ""

# Configure npm authentication
echo "🔧 Configuring npm authentication..."
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc

# Test authentication
echo "🔍 Testing npm authentication..."
npm whoami || { 
    echo "❌ Authentication failed - check your token"
    rm ~/.npmrc
    exit 1
}

echo "✅ Authenticated as $(npm whoami)"
echo ""

# Test package build
echo "🔍 Testing package build..."
npm ci
npm run pre-check

echo "✅ Build and tests passed!"
echo ""

# Test package creation
echo "🔍 Testing package creation..."
npm pack

echo "✅ Package created successfully!"
echo ""

# Ask if user wants to test publish
read -p "🚀 Do you want to test publish? (y/N): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📦 Publishing to npm..."
    npm publish --access public
    echo "✅ Published successfully!"
else
    echo "⏭️  Skipping publish (package tarball created for inspection)"
fi

echo ""
echo "✅ All tests passed! Ready for CI/CD"
echo ""
echo "🧹 Cleaning up..."
rm -f *.tgz
rm ~/.npmrc

echo "✅ Done!"

