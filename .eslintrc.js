// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  plugins: ["@typescript-eslint", "prettier", "import"],
  rules: {
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: false,
        },
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          "sibling",
          "parent",
          "index",
        ],
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": ["error"],
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "max-len": [
      "warn",
      {
        code: 120,
        tabWidth: 2,
        comments: 120,
      },
    ],
    "no-unused-expressions": "off",
    "object-shorthand": "warn",
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        classes: false,
        functions: false,
      },
    ],
    "no-useless-escape": "warn",
    "no-param-reassign": [2, { props: false }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "import/no-unresolved": 0,
  },
};
