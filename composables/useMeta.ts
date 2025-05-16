import type { Image } from '~/types/storyblok'

interface Meta {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: Image
}

export default (options?: Meta) => {
  const { t } = useI18n()

  useSeoMeta({
    title: options?.title || t('meta.title'),
    ogTitle: options?.ogTitle || t('meta.ogTitle'),
    description: options?.description || t('meta.description'),
    ogDescription: options?.ogDescription || t('meta.ogDescription'),
    ogImage: options?.ogImage?.filename || '',
    ogImageAlt: options?.ogImage?.alt || 'Logo Bluvv',
    ogUrl: window?.location?.href || 'https://bluvv.shop/'
  })
}
