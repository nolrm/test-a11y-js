import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/linter/eslint-plugin/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  external: ['jsdom'],
  onSuccess: 'echo "Build complete"',
  esbuildOptions(options) {
    // Suppress the require.resolve warning for jsdom's xhr-sync-worker.js
    options.logOverride = {
      'require-resolve-not-external': 'silent'
    }
  }
})

