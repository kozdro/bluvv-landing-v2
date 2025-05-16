<template>
  <section
    v-editable="blok"
    class="features container py-16 md:py-32 grid grid-cols-1 md:grid-cols-4 gap-10 auto-cols-[1fr] grid-rows-[auto]"
  >
    <div class="md:col-span-2 flex flex-col items-start">
      <div class="w-10 h-2 rounded-lg bg-blue-blizzard mb-5" />
      <HTMLText :content="blok.heading" />
    </div>

    <div
      v-for="(feature, index) in blok.list"
      :key="feature._uid"
      class="flex flex-col relative group rounded-4xl p-6 bg-blue-blizzard md:bg-transparent hover:bg-blue-blizzard transition-colors duration-500 cursor-default"
    >
      <span
        class="bg-gray-100 text-sm font-semibold h-8 w-11 rounded-2xl flex items-center justify-center group-hover:text-blue-blizzard mb-12 transition-colors duration-300"
        v-text="(index + 1).toString().padStart(2, '0')"
      />
      <h3
        class="heading-main-semi-bold group-hover:text-white mb-2 transition-colors duration-300"
        v-text="feature.title"
      />
      <p
        class="text-gray-500 group-hover:text-white transition-colors duration-300"
        v-text="feature.description"
      />

      <div
        v-if="feature.icon"
        class="size-12 absolute -top-6 md:top-0 right-1/5 transition-all duration-500 md:opacity-0 group-hover:opacity-100 group-hover:-top-6"
      >
        <StoryblokImage
          :image="feature.icon"
          :webp-format="false"
          class="size-full object-contain object-center"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Feature } from '~/types/storyblok'

interface Props {
  blok: {
    heading: any
    list: Feature[]
  }
}

defineProps<Props>()
</script>
