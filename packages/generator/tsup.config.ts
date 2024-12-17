import { defineConfig } from "tsup";
import fs from "node:fs";
import path from "node:path";

export default defineConfig({
  entry: {
    react: "packages/react/src/index.ts",
  },
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: "terser",
  dts: true,
  format: ["esm", "cjs"],
  plugins: [{
    name: "add banner",
    buildEnd(ctx) {
        for (const file of ctx.writtenFiles.map(x => x.name)) {
            if (file.endsWith('.js') || file.endsWith('.mjs')) {
                const fileContent = fs.readFileSync(file, 'utf-8');
                fs.writeFileSync(file, `'use client';\n${fileContent}`);
            }
        }
    },
  }]
});
