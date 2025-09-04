import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "../src/components"),
      "@hooks": path.resolve(__dirname, "../src/hooks"),
      "@utils": path.resolve(__dirname, "../src/utils"),
      "@types": path.resolve(__dirname, "../src/types"),
      "@assets": path.resolve(__dirname, "../src/assets"),
      "@providers": path.resolve(__dirname, "../src/providers"),
    },
  },
  optimizeDeps: {
    include: [
      "@storybook/theming",
      "@mdx-js/react",
      "@tanstack/react-query", // ✅ Force bundling react-query
      "sonner", // ✅ Force bundling sonner
    ],
  },
  ssr: {
    noExternal: ["@tanstack/react-query", "sonner"], // ✅ Important for Storybook/Vite SSR
  },
});
