module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    indent: ["error", 2], // Enforce 2 space indents
    semi: ["error", "always"], // Enforce the use of semicolons
    quotes: ["error", "double"], // Enforce double quotation marks
    "object-curly-spacing": ["error", "always"], // Enforce spacing inside import module brackets
    "no-multiple-empty-lines": ["error", { max: 1 }], // Enforce maximum one empty line between lines
  },
  settings: {
    react: {
      version: "detect", 
    },
  },
};
