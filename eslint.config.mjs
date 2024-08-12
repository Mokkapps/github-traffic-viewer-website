import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: ['dist', '.nuxt', 'node_modules'],
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 0,
      'vue/max-attributes-per-line': 'off',
      'vue/no-v-html': 0,
    },
  },
)
