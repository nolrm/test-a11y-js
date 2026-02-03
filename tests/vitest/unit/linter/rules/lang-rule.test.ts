import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import { getRule } from './rule-test-helper'

const lang = getRule('lang')

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
})

describe('lang rule - JSX', () => {
  it('should pass for elements without lang attribute', () => {
    ruleTester.run('lang', lang, {
      valid: [
        { code: '<div>Content</div>' },
        { code: '<html><body>Content</body></html>' },
        { code: '<span>Text</span>' }
      ],
      invalid: []
    })
  })

  it('should pass for elements with valid lang attribute', () => {
    ruleTester.run('lang', lang, {
      valid: [
        { code: '<html lang="en"></html>' },
        { code: '<html lang="en-US"></html>' },
        { code: '<html lang="en-GB"></html>' },
        { code: '<html lang="es"></html>' },
        { code: '<html lang="fr"></html>' },
        { code: '<html lang="de"></html>' },
        { code: '<html lang="zh"></html>' },
        { code: '<html lang="ja"></html>' },
        { code: '<html lang="pt-BR"></html>' },
        { code: '<p lang="es">Hola mundo</p>' },
        { code: '<span lang="fr">Bonjour</span>' }
      ],
      invalid: []
    })
  })

  it('should fail for elements with invalid lang attribute', () => {
    ruleTester.run('lang', lang, {
      valid: [],
      invalid: [
        {
          code: '<html lang="invalid"></html>',
          errors: [{ messageId: 'invalidLang', data: { value: 'invalid' } }]
        },
        {
          code: '<html lang="xyz"></html>',
          errors: [{ messageId: 'invalidLang', data: { value: 'xyz' } }]
        },
        {
          code: '<html lang="123"></html>',
          errors: [{ messageId: 'invalidLang', data: { value: '123' } }]
        },
        {
          code: '<p lang="notreal">Text</p>',
          errors: [{ messageId: 'invalidLang', data: { value: 'notreal' } }]
        }
      ]
    })
  })

  it('should fail for empty lang attribute', () => {
    ruleTester.run('lang', lang, {
      valid: [],
      invalid: [
        {
          code: '<html lang=""></html>',
          errors: [{ messageId: 'emptyLang' }]
        },
        {
          code: '<html lang="   "></html>',
          errors: [{ messageId: 'emptyLang' }]
        }
      ]
    })
  })

  it('should warn for dynamic lang attribute', () => {
    ruleTester.run('lang', lang, {
      valid: [],
      invalid: [
        {
          code: '<html lang={language}></html>',
          errors: [{ messageId: 'dynamicLang' }]
        },
        {
          code: '<html lang={getLang()}></html>',
          errors: [{ messageId: 'dynamicLang' }]
        }
      ]
    })
  })
})

describe('lang rule - Vue', () => {
  const vueRuleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module'
    }
  })

  it('should pass for Vue elements with valid lang', () => {
    vueRuleTester.run('lang', lang, {
      valid: [
        { code: '<template><div lang="en">Content</div></template>' },
        { code: '<template><p lang="es">Hola</p></template>' },
        { code: '<template><span lang="fr">Bonjour</span></template>' }
      ],
      invalid: []
    })
  })

  it('should fail for Vue elements with invalid lang', () => {
    vueRuleTester.run('lang', lang, {
      valid: [],
      invalid: [
        {
          code: '<template><div lang="invalid">Content</div></template>',
          errors: [{ messageId: 'invalidLang', data: { value: 'invalid' } }]
        }
      ]
    })
  })

  it('should fail for Vue elements with empty lang', () => {
    vueRuleTester.run('lang', lang, {
      valid: [],
      invalid: [
        {
          code: '<template><div lang="">Content</div></template>',
          errors: [{ messageId: 'emptyLang' }]
        }
      ]
    })
  })
})
