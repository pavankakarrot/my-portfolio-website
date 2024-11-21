module.exports = {
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
    ],
    plugins: ['react', 'jsx-a11y'],
    rules: {
      'react/prop-types': 0,
      'react/no-unescaped-entities': 0,
      'react/display-name': 0,
      'react/jsx-no-target-blank': 0,
      'jsx-a11y/anchor-is-valid': 0,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };