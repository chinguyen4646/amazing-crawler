module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    indent: ["error", 2],
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "object-curly-spacing": ["error", "always"],
    "no-multiple-empty-lines": ["error", { max: 1 }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        semi: ["off"], // Disable the semicolon rule for TypeScript files
      },
    },
  ],
};
