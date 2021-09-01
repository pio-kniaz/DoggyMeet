module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  rules: {
    'import/prefer-default-export': 'off',
    'prettier/prettier': [
      1,
      {
        semi: true,
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2,
        endOfLine: 'auto',
      },
    ],
    'no-console': 0,
  },
};
