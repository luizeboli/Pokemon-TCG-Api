module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import-helpers'
  ],
  rules: {
    "react/jsx-filename-extension": 0,
    "max-len": 0,
    "indent": ["error", 2],
    "react/jsx-curly-brace-presence": 0,
    "import-helpers/order-imports": [
      "error",
      {
        "groups": [
          '/^react/',
          'module',
          ['parent', 'sibling', 'index']
        ],
        "newlinesBetween": "ignore",
        "alphabetize": { "order": "asc", "ignoreCase": true }        
      }
    ]  
  },
};