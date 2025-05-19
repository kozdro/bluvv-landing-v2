<template>
  <section
    v-editable="blok"
    class="stack-cards container py-16 md:py-32"
  >
    <div class="stack-cards-wrapper flex flex-col lg:flex-row items-center justify-center min-h-svh lg:-mt-[50svh] gap-16">
      <div class="w-full lg:basis-1/2 flex flex-col gap-8 relative">
        <div>
          <div
            class="w-10 h-2 rounded-lg mb-5"
            :style="{ backgroundColor: extractTextColors(blok.heading)[0] }"
          />
          <HTMLText :content="blok.heading" />
        </div>
        <HTMLText
          v-if="blok.description"
          :content="blok.description"
          class="md:w-3/4"
        />

        <div
          v-show="activeIndex < blok.cards.length - 1"
          class="absolute -bottom-full left-1/2 -translate-x-1/2 size-10 bg-white rounded-full flex items-center justify-center"
        >
          <SvgoDoubleChevronDown
            filled
            aria-hidden="true"
            class="!mb-0 !size-8 animate-chevron"
          />
        </div>
      </div>

      <ul class="w-full lg:basis-1/2 stack-cards-content grid">
        <li
          v-for="(card, index) in blok.cards"
          :key="card._uid"
          class="stack-card min-h-[60svh] sm:min-h-[70svh] md:min-h-[80svh] lg:min-h-auto container py-10 rounded-4xl relative shadow-xl group"
          :style="{
            backgroundColor: card.backgroundColor,
          }"
        >
          <span
            class="bg-gray-100 text-sm font-semibold h-8 w-11 rounded-2xl flex items-center justify-center mb-12 transition-colors duration-500 group-hover:text-white group-hover:bg-black"
            v-text="(index + 1).toString().padStart(2, '0')"
          />
          <HTMLText
            :content="card.content"
            class="lg:[&_p]:w-3/4 [&_p]:mx-auto [&_p]:text-lg text-center lg:text-left"
          />
          <StoryblokImage
            v-if="card.image"
            :image="card.image"
            :webp-format="false"
            fit="contain"
            class="absolute -top-12 right-1/2 translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:-right-12 size-24 object-contain object-center group-hover:rotate-15 transition-transform duration-500"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'

import type { StackCard } from '~/types/storyblok'

interface Props {
  blok: {
    heading: any
    description?: any
    cards: StackCard[]
  }
}

const props = defineProps<Props>()

const activeIndex = ref<number>(0)

onMounted(async () => {
  await nextTick()

  if (!props.blok?.cards?.length) return

  const time = 2

  gsap.set('.stack-card', {
    transformStyle: 'preserve-3d',
    transformPerspective: 1000,
    transformOrigin: 'center top'
  })

  const tl = gsap.timeline({
    scrollTrigger:{
      trigger: '.stack-cards-wrapper',
      start: 'top top',
      end: `${window.innerHeight * props.blok.cards.length || 5} top`,
      scrub: true,
      pin: true,
    }
  })

  tl.scrollTrigger?.animation?.eventCallback('onUpdate', () => {
    const p = tl.scrollTrigger?.progress || 0
    const totalSteps = props.blok.cards.length
    const step = 1 / (totalSteps - 1)
    activeIndex.value = Math.round(p / step)
  })

  tl.from('.stack-card', {
    y: () => window.innerHeight,
    rotationX: 100,
    opacity: 0,
    duration: time / 2,
    stagger: time
  })

  tl.to(
    '.stack-card:not(:last-child)',
    {
      scale: 0.9,
      opacity: 0,
      duration: time / 2,
      stagger: {
        each: time
      }
    },
    time
  )

  tl.to(
    '.stack-card:not(:last-child)',
    {
      y: () => -window.innerHeight,
      duration: time,
      stagger: {
        each: time
      }
    },
    time + 0.5
  )
})
</script>

<style scoped>
.stack-cards-content {
  > * {
    grid-area: 1 / 1 / 2 / 2;
  }
}
</style>
