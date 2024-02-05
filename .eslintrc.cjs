module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: '18.2', // React version. "detect" automatically picks the version you have installed.
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,jsx,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],

  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
