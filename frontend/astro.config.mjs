// @ts-check
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import { unified } from '@astrojs/markdown-remark'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: unified({
      gfm: true,
      smartypants: true,
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
})
