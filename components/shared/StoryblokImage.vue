<template>
  <NuxtImg
    v-if="image"
    :src="`${image.filename}/m/`"
    :alt="image.alt"
    :title="image.title || image.alt"
    format="webp"
  />
</template>

<script lang="ts" setup>
import type { Image } from '~/types/storyblok'

interface Props {
  image: Image
}

defineProps<Props>()
</script>
