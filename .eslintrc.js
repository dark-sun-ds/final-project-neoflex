export default {
  parser: "@typescript-eslint/parser", // Используем парсер для TypeScript
  parserOptions: {
    ecmaVersion: "latest", // Поддержка последних возможностей ECMAScript
    sourceType: "module", // Поддержка import/export
    ecmaFeatures: {
      jsx: true, // Поддержка JSX
    },
  },
  plugins: [
    "react", // Плагин для React
    "react-hooks", // Плагин для React Hooks
    "@typescript-eslint", // Плагин для TypeScript
    "import", // Плагин для обработки импортов
    "jest",
    "@testing-library",
  ],
  extends: [
    "eslint:recommended", // Рекомендованные правила ESLint
    "plugin:react/recommended", // Рекомендованные правила React
    "plugin:react-hooks/recommended", // Рекомендованные правила React Hooks
    "plugin:@typescript-eslint/recommended", // Рекомендованные правила TypeScript
    "plugin:import/recommended",
    "plugin:import/typescript", // Важно для корректной работы с TypeScript импортами
    "plugin:jest/recommended",
    "plugin:@testing-library/react",
  ],
  rules: {
    "react/react-in-jsx-scope": "off", // Отключаем требование импорта React в каждом JSX-файле (для React 17+)
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
