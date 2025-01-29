/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], 
  server: {
    port: 3000, 
  },
  test: {
    globals: true, // Если хотите использовать глобальные тестовые функции, как describe, it
    environment: "jsdom", // Используем jsdom для тестов с DOM
    setupFiles: "./src/setupTests.ts", // Укажите путь к файлу с настройками
    mockReset: true,
  },
});
