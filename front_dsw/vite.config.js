import VitePluginVue from 'vite-plugin-vue';
import path from 'path';
import vue from '@vitejs/plugin-vue';


e

export default {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': '/src', // Ajuste o caminho conforme a estrutura do seu projeto
      },
    },
  };
