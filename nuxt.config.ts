// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxtjs/tailwindcss'],
  // css: [
  //   '@/assets/css/main.css',
  // ],

  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: "",
    // Keys within public, will be also exposed to the client-side
    public: {
      apiKey: process.env.OPENAI_API_KEY || "default_api_url",
    }
  }
})
