<template>
  <section
    v-editable="blok"
    class="text-banner container py-16 md:py-32 flex flex-col gap-16 lg:gap-24"
  >
    <div>
      <div
        class="w-10 h-2 rounded-lg mb-5"
        :style="{ backgroundColor: extractTextColors(blok.heading)[0] }"
      />
      <HTMLText
        :content="blok.heading"
        class="lg:w-1/2"
      />
    </div>
    <div class="flex flex-col md:flex-row items-center gap-14 lg:gap-20">
      <div class="md:basis-1/2 lg:basis-2/5">
        <StoryblokImage
          :image="blok.image"
          fit="cover"
          class="w-2/3 md:w-full lg:w-2/3 object-cover object-center rounded-4xl mx-auto aspect-square -rotate-15"
        />
      </div>
      <div class="md:self-stretch md:basis-1/2 lg:basis-3/5 flex flex-col justify-center">
        <HTMLText
          :content="blok.description"
          class="text-lg xl:translate-y-1/2"
        />
        <Button
          v-if="blok.cta?.[0]"
          :href="blok.cta[0].link?.url"
          :target="blok.cta[0].link?.target"
          :label="blok.cta[0].label"
          class="ml-auto mt-4 lg:mt-auto"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Image, CTA } from '~/types/storyblok'

interface Props {
  blok: {
    heading: any
    description: any
    image: Image
    cta?: CTA[]
  }
}

defineProps<Props>()
</script>
