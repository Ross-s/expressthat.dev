import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      tsconfigPath: resolve(__dirname, "tsconfig.json"),
      include: ["packages/vue/src/**/*.ts"],
      outDir: resolve(__dirname, "dist/vue"),
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "packages/vue/src/index.ts"),
      formats: ["cjs", "es"],
    },
    minify: false,
    rollupOptions: {
      external: ["vue"],
      output: {
        dir: resolve(__dirname, "dist/vue"),
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
