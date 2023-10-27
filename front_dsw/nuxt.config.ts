// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [    '@nuxtjs/tailwindcss'  ],
  alias: {
    css: "/<rootDir>/assets",
  },
  css: ["@/assets/css/main.css"],
})
