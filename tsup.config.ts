import { defineConfig } from 'tsup'
import { readFileSync } from 'fs'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  entry: [
    'src/index.ts', 
    'src/linter/eslint-plugin/index.ts',
    'src/linter/eslint-plugin/formatter.ts',
    'src/linter/eslint-plugin/formatter-with-progress.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  external: ['jsdom', 'eslint'],
  onSuccess: 'echo "Build complete"',
  esbuildOptions(options) {
    // Suppress the require.resolve warning for jsdom's xhr-sync-worker.js
    options.logOverride = {
      'require-resolve-not-external': 'silent'
    }
    // Inject version from package.json at build time
    options.define = {
      ...options.define,
      '__PACKAGE_VERSION__': JSON.stringify(packageJson.version)
    }
  }
})

