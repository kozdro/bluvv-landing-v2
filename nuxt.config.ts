import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@storyblok/nuxt',
    '@nuxt/image',
    '@nuxt/fonts',
    'nuxt-svgo',
    'nuxt-viewport',
  ],
  storyblok: {
    accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
  },
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
  viewport: {
    breakpoints: {
      sm: 340,
      md: 768,
      lg: 1024,
      desktopMedium: 1280,
      desktopWide: 1440,
    },
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