const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const angular = require("@angular-eslint/eslint-plugin");
const angularTemplate = require("@angular-eslint/eslint-plugin-template");
const angularTemplateParser = require("@angular-eslint/template-parser");
const prettier = require("eslint-config-prettier");

module.exports = [
  {
    ignores: ["dist/**", ".angular/**", "node_modules/**", "coverage/**"]
  },
  js.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.app.json"],
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "@angular-eslint": angular
    },
    processor: angular.processInlineTemplates,
    rules: {
      ...tseslint.configs.recommended.rules,
      ...angular.configs.recommended.rules,
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case"
        }
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase"
        }
      ]
    }
  },
  {
    files: ["src/**/*.html"],
    languageOptions: {
      parser: angularTemplateParser
    },
    plugins: {
      "@angular-eslint/template": angularTemplate
    },
    rules: {
      ...angularTemplate.configs.recommended.rules
    }
  },
  prettier
];
