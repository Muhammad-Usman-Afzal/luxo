import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  server: {
    port: 5173,
    strictPort: true,
    // Proxy all /api and /swagger calls to .NET backend on port 5050
    proxy: {
      "/api": {
        target: "http://localhost:5050",
        changeOrigin: true,
        secure: false,
      },
      "/swagger": {
        target: "http://localhost:5050",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "http://localhost:5050",
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
  build: {
    outDir: "dist",
    cssMinify: true,
  },
});
