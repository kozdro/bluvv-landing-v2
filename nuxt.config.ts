import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'node-server',
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    emailPass: process.env.VITE_EMAIL_PASS,
    mailerLiteApiKey: process.env.VITE_MAILERLITE_API_KEY,
    public: {
      emailUser: process.env.VITE_EMAIL_USER,
      contactEmail: process.env.VITE_CONTACT_EMAIL,
      mailerLiteListId: process.env.VITE_MAILERLITE_LIST_ID,
      googleTagId: process.env.VITE_GOOGLE_TAG_ID,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Beauty shopping with real video reviews – discover with confidence - Bluvv',
      meta: [
        { name: 'description', content: 'Explore beauty products through short, authentic video reviews. See how they work for others and shop smarter – no more disappointing purchases.' },
        { property: 'og:title', content: 'Beauty shopping with real video reviews – discover with confidence – Bluvv' },
        { property: 'og:description', content: 'Explore beauty products through short, authentic video reviews. See how they work for others and shop smarter – no more disappointing purchases.' },
        { property: 'og:image', content: '/bluvv-og-image.png' },
        // { name: 'robots', content: 'index, follow' }
      ],
      link: [
        {
          rel: 'preload',
          href: '/mango-grotesque-900.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: true
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@storyblok/nuxt',
    '@nuxt/image',
    '@nuxt/fonts',
    'nuxt-svgo',
    'nuxt-viewport',
    '@nuxtjs/i18n',
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
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
    ],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})