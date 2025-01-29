import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  // Установка окружения для тестирования React (DOM API)
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$":
      "<rootDir>/src/__mocks__/fileMock.ts",
  },
  // Путь к файлам инициализации перед тестами
  //   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  //   // Настройка путей к модулям (для работы с алиасами)
  //   moduleNameMapper: {
  //     "\\.(css|scss|sass)$": "identity-obj-proxy", // Мок для стилей
  //     // "\\.(svg|png|jpg|jpeg|gif)$": "<rootDir>/__mocks__/fileMock.ts",
  //     // Если используются алиасы, добавьте их, например:
  //     "^assets/(.*)$": "<rootDir>/src/assets/$1",
  //   },
  //   // Расширения файлов для обработки
  //   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "svg"],
  //   // Пути для исключения тестов
  //   testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  //   // Обработка файлов через ts-jest
  //   transform: {
  //     "^.+\\.(ts|tsx)$": "ts-jest",
  //     // "\\.(svg|png|jpg|jpeg|gif)$": "jest-transform-stub",
  //   },
};

export default config;
