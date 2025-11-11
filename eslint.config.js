import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  prettierConfig,
  {
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn'
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        gsap: 'readonly'
      }
    }
  },
  {
    ignores: ['dist/', 'node_modules/', '*.config.js']
  }
]
