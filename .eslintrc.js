module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'overrides': [
    {
      'env': {
        'node': true
      },'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'plugins': [
    '@stylistic/js'
  ],
  'rules': {
    'indent': 'off',
    '@stylistic/js/indent': [
      'error',
      2
    ],
    'eqeqeq': 'error',
    'no-console': 0,
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    '@stylistic/js/linebreak-style': [
      'error',
      'unix'
    ],
    '@stylistic/js/quotes': [
      1,
      'error',
      'single',
      'avoid-escape'
    ],
    '@stylistic/js/semi': [
      'error',
      'never'
    ],
  },
}
