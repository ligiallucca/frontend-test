import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";
import dotenv from "dotenv";

dotenv.config();

const apiUrl = process.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("A variável de ambiente VITE_API_URL não está definida.");
}

export default defineConfig({
  plugins: [react()],
  test: {
    ...configDefaults,
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      reporter: ["text", "html"],
    },
  },
  server: {
    proxy: {
      "/api": {
        target: apiUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
