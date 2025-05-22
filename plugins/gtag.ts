export default defineNuxtPlugin((ctx) => {
  const gtagId = ctx.$config.public.googleTagId

  useHead({
    script: [
      {
        'type': 'text/partytown',
        'innerHTML': `
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtagId}');
        `
      }
    ],
  })
})
