<template>
  <NuxtImg
    v-if="image"
    :src="webpFormat ? `${image.filename}/m/` : image.filename"
    :alt="image.alt"
    :title="image.title || image.alt"
    :format="webpFormat ? 'webp' : undefined"
  />
</template>

<script lang="ts" setup>
import type { Image } from '~/types/storyblok'

interface Props {
  image: Image
  webpFormat?: boolean
}

withDefaults(defineProps<Props>(), {
  webpFormat: true,
})
</script>
