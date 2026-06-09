import eslintPluginAstro from 'eslint-plugin-astro'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslintConfigPrettier,
  ...tseslint.configs.recommendedTypeChecked,
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    files: ['**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
)
