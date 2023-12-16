module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'standard-with-typescript'
  ],
  overrides: [],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {},
  ignorePatterns: [
    'dist/**/*',
    'next-env.d.ts',
    'node_modules/**/*',
    'public/**/*'
  ]
}
