module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    semi: 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    indent: [
      'error',
      2,
      { SwitchCase: 1, MemberExpression: 1, ObjectExpression: 1 },
    ],
    'key-spacing': ['error', { mode: 'strict' }],
  },
};
