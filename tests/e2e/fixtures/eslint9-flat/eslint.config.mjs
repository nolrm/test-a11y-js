import testA11yJs from 'eslint-plugin-test-a11y-js'
import tseslint from 'typescript-eslint'

export default [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'test-a11y-js': testA11yJs
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    ...testA11yJs.configs['flat/recommended']
  }
]
