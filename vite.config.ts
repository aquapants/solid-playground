import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@context': '/src/context',
      '@layouts': '/src/layouts',
      '@pages': '/src/pages',
      '@public': '/public',
      '@utils': '/src/utils',
      '@custom-types': '/src/types',
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()], // trying to fix tailwind keyword warnings but this didn't help
    },
  },
});
