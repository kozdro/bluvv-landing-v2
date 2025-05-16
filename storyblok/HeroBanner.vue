<template>
  <section
    v-editable="blok"
    class="hero-banner relative overflow-hidden py-16 md:py-32 min-h-screen transition-colors duration-500"
    :style="{ background: currentBackground }"
  >
    <div class="container flex flex-col md:flex-row gap-20 mt-30">
      <div class="md:basis-1/2">
        <div class="w-10 h-2 rounded-lg bg-white mb-5" />
        <HTMLText :content="blok.content" />

        <div
          v-if="blok.cta?.length"
          class="flex items-center gap-6 mt-10"
        >
          <Button
            v-for="(cta, index) in blok.cta"
            :key="cta._uid"
            :variant="index % 2 ? ButtonVariant.Primary : ButtonVariant.Secondary"
            :href="cta.link.url"
            :target="cta.link.target"
            :label="cta.label"
          />
        </div>
      </div>
    </div>
    <div
      v-if="blok.image"
      class="absolute top-1/2 -translate-y-1/2 right-1/4 translate-x-1/4"
    >
      <StoryblokImage
        :image="blok.image"
        fit="cover"
        class="h-[80vh] drop-shadow-xl object-cover object-center rounded-4xl"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CTA, Image } from '~/types/storyblok'
import { ButtonVariant } from '~/types'

interface Props {
  blok: {
    content: any
    cta?: CTA[]
    image?: Image
    backgroundColor: string[]
  }
}

const props = defineProps<Props>()

const currentIndex = ref<number>(0)
const currentBackground = ref<string>('')

onMounted(() => {
  if (props.blok.backgroundColor?.length > 1) {
    currentBackground.value = props.blok.backgroundColor[0]

    setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % props.blok.backgroundColor.length
      currentBackground.value = props.blok.backgroundColor[currentIndex.value]
    }, 5000)

    return
  }

  currentBackground.value = props.blok.backgroundColor?.[0] || 'var(--color-primary)'
})
</script>