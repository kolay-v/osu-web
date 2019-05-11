module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: [
    './eslint-typescript.js',
    'standard'
  ],
  globals: {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  }
}
