import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "host",
      remotes: {
        app1: "http://localhost:5175/remoteEntry.js",
        app2: "http://localhost:5174/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  resolve: {
    alias: {
      //an alias is the alternative name or shortcut/In this case for a path
      "@": "/src", //the src folder will be the root starting with @ when importing something
    },
  },
  build: {
    target: "esnext",
  },
});

// '@components': '/src/components',
//     '@utils': '/src/utils'
