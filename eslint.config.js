module.exports = [
  {
    ignores: ["node_modules/**", "coverage/**"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
    },
  },
];
