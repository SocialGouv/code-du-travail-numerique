// http://eslint.org/docs/user-guide/configuring

module.exports = {

  root: true,

  parserOptions: {
    sourceType: 'module'
  },

  'globals': {
    'describe': true,  // Used in unit tests.
    'it': true,  // Used in unit tests.
  },

  extends: 'standard',

  rules: {

    // Require or disallow trailing commas http://eslint.org/docs/rules/comma-dangle
    'comma-dangle': ['error', 'always-multiline'],

    // Limit multiple empty lines http://eslint.org/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': ['error', { 'max': 2 }],

    // Disable padding within blocks http://eslint.org/docs/rules/padded-blocks.html
    'padded-blocks': 'off',

  }

}
