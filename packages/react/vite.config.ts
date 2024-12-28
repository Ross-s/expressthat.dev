import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import banner from "vite-plugin-banner";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    dts({
      rollupTypes: true,
      tsconfigPath: "tsconfig.app.json",
      insertTypesEntry: true,
    }),
    cssInjectedByJsPlugin(),
    banner({
      content: `"use client";`,
      verify: false,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ExpressThat",
      formats: ["cjs", "es"],
      fileName: "index",
    },
    minify: "terser",
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react/compiler-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
