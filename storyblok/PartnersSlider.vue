<template>
  <section
    v-editable="blok"
    class="partners-slider py-16 md:py-32"
  >
    <div class="container flex flex-col md:flex-row items-center gap-10">
      <div class="md:basis-1/2">
        <div
          class="w-10 h-2 rounded-lg mb-5"
          :style="{ backgroundColor: extractTextColors(blok.heading)[0] }"
        />
        <HTMLText :content="blok.heading" />
      </div>
      <div class="md:basis-1/2">
        <HTMLText
          v-if="blok.description"
          :content="blok.description"
          class="md:w-3/4 [&>*]:font-normal md:mx-auto"
        />
      </div>
    </div>

    <div class="overflow-hidden w-full mt-20 md:mt-24">
      <div
        ref="trackRef"
        class="flex animate-slider will-change-transform min-w-max"
      >
        <template
          v-for="img in repeatedImages"
          :key="img._uid"
        >
          <div class="shrink-0 flex items-center justify-center border-y border-r border-gray-200 w-44 md:w-90 px-10 py-4 md:py-8">
            <StoryblokImage
              :image="img"
              fit="contain"
              class="object-contain object-center max-h-30"
            />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Image } from '~/types/storyblok'

interface Props {
  blok: {
    heading: any
    description?: any
    partners?: Image[]
  }
}

const props = defineProps<Props>()

const trackRef = ref<HTMLElement | null>(null)

const repeatedImages = computed(() => {
  const base = props.blok.partners || []

  if (base.length === 0) return []

  const repeatCount = Math.ceil(12 / base.length)

  return Array(repeatCount).fill(base).flat()
})
</script>

<style scoped>
@keyframes slider {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-slider {
  animation: slider 20s linear infinite;
}
</style>
