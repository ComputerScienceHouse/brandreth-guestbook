const path = require("path");

module.exports = {
  "extends": [ "wesbos/typescript" ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: [path.join(__dirname, '/tsconfig.json')],
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'global-require': 0,
    'eslint linebreak-style': [0, 'error', 'windows'],
    'no-console': 2,
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"]
  }
}