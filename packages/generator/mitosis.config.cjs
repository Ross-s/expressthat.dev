/**
 * @type {import('@builder.io/mitosis').MitosisConfig}
 */
module.exports = {
  files: "src/**",
  targets: ["react", "svelte", "vue"],
  dest: "packages",
  commonOptions: {
    typescript: true,
    prettier: true,
  },
  options: {
    react: {
      stylesType: "style-tag"
    },
    svelte: {}
  },
  parserOptions: {
    tsConfigFilePath: "tsconfig.mitosis.json",
  }
};
