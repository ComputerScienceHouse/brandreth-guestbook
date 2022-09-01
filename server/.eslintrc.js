const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [path.join(__dirname, '/tsconfig.json')]
  },
  rules: {
    'linebreak-style': 0,
    'global-require': 0,
    'eslint linebreak-style': [0, 'error', 'windows'],
    'no-console': 2,
    semi: ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'always']
  }
};
