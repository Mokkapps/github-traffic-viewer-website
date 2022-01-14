module.exports = {
  parserOptions: {
    // Required for certain syntax usages
    "ecmaVersion": 2017,
  },
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    quotes: ["error", "double"],
  },
};
