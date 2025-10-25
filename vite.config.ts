import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      //an alias is the alternative name or shortcut/In this case for a path
      "@": "/src", //the src folder will be the root starting with @ when importing something
    },
  },
});

// '@components': '/src/components',
//     '@utils': '/src/utils'
