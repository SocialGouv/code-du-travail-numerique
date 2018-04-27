module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react", "prettier", "jsx-a11y"],
  globals: {
    React: true
  },
  rules: {
    "prettier/prettier": "warn",
    "react/react-in-jsx-scope": "warn",
    "react/prop-types": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    "jsx-a11y/accessible-emoji": "warn",
    "jsx-a11y/href-no-hash": "warn",
    "react/jsx-no-target-blank": "warn",
    "react/no-unescaped-entities": "warn",
    "react/no-find-dom-node": "warn",
    "no-console": "warn",
    "no-unused-vars": "warn",
    "react/display-name": "off"
  }
};
