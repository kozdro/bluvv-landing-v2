<template>
  <section
    v-editable="blok"
    class="banner w-full py-16 md:py-32 container"
  >
    <div
      class="container rounded-4xl relative"
      :style="{ background: blok.backgroundColor }"
    >
      <div class="flex gap-10">
        <div class="lg:basis-2/3 flex flex-col py-16 lg:py-24">
          <div
            class="w-10 h-2 rounded-lg mb-5"
            :style="{ backgroundColor: extractTextColors(blok.heading)[0] }"
          />
          <HTMLText :content="blok.heading" />
          <HTMLText
            v-if="blok.description"
            :content="blok.description"
            class="my-16 xl:mt-auto xl:ml-40 xl:mb-4"
          />
        </div>

        <div
          v-if="$viewport.isGreaterOrEquals('lg')"
          class="basis-1/3"
        >
          <StoryblokImage
            :image="blok.image"
            fit="cover"
            class="ml-auto w-2/3 h-full shadow-xl object-cover object-center"
          />
        </div>
      </div>

      <div class="absolute -bottom-24 left-1/2 -translate-x-1/2 bg-white size-48 rounded-full shadow-lg flex items-center justify-center">
        <StoryblokImage
          v-if="blok.logo"
          :image="blok.logo"
          fit="cover"
          class="object-cover object-center w-2/3"
        />

        <div
          class="absolute inset-0 animate-spin text-[5px] tracking-[2px] uppercase text-center"
          style="animation-duration: 15s;"
        >
          <svg
            viewBox="0 0 100 100"
            class="w-full h-full"
          >
            <path
              id="circlePath"
              fill="none"
              d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
            />
            <text>
              <textPath
                xlink:href="#circlePath"
                startOffset="0%"
              >
                {{ blok.caption }}
              </textPath>
            </text>
          </svg>
        </div>
      
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Image } from '~/types/storyblok'

interface Props {
  blok: {
    heading: any
    description: any
    image: Image
    backgroundColor?: string
    caption?: string
    logo?: Image
  }
}

defineProps<Props>()
</script>
