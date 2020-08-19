module.exports = {
  globals: {
    atom: 'readonly',
    waitsForPromise: 'readonly'
  },
  env: {
    browser: true,
    es2020: true,
    jasmine: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
  }
}
