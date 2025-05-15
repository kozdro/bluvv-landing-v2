import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    [
      '@storyblok/nuxt', {
        accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
      },
    ],
    '@nuxt/image',
    '@nuxt/fonts',
  ],
  fonts: {
    defaults: {
      weights: [400, 500, 700, 900],
      styles: ['normal', 'italic'],
    },
    families: [
      {
        name: 'Mango Grotesque',
        provider: 'local',
      },
      {
        name: 'Inter',
        provider: 'google',
      }
    ],
  },
  image: {
    domains: [
      'storyblok.com',
      'a.storyblok.com',
    ],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})