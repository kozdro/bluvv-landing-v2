<template>
  <section
    v-editable="blok"
    ref="sectionRef"
    class="hero container h-screen flex items-center justify-center relative overflow-hidden"
  >
    <h1 class="text-center uppercase">
      <div
        ref="topLine"
        class="origin-center"
        v-text="topText"
      />
      <div
        ref="bottomLine"
        class="origin-center"
        v-text="bottomText"
      />
    </h1>

    <div
      v-if="blok.images"
      class="absolute inset-0"
    >
      <div
        v-for="(image, idx) in blok.images"
        :key="image._uid"
        ref="layers"
        class="rounded-full p-6 absolute transform transition-transform flex items-center justify-center"
        :class="layerClasses[idx]"
      >
        <img
          :src="image.filename"
          :alt="image.alt || ''"
          class="object-cover object-center h-full"
        />
      </div>
    </div>

    <HTMLText
      v-if="blok.caption"
      :content="blok.caption"
      class="absolute bottom-4 left-0"
    />
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'

import { type Image } from '~/types/storyblok/Image'

interface Props {
  blok: {
    heading: string
    images: Image[]
    caption?: any
  }
}

const props = defineProps<Props>()

const sectionRef = ref<HTMLElement | null>(null)
const topLine = ref<HTMLElement | null>(null)
const bottomLine = ref<HTMLElement | null>(null)
const layers = ref<Array<HTMLElement>>([])

const topText = computed<string>(() => props.blok.heading.replace(/\[.*?\]/, '').trim())

const bottomText = computed<string>(() => {
  const match = props.blok.heading.match(/\[(.*?)\]/)
  return match ? match[1].trim() : ''
})


const layerClasses = computed<string[]>(() => [
  'top-10 right-1/4 z-10 bg-primary size-44',
  'top-2/5 left-40 rotate-2deg z-10 bg-peach size-40',
  'bottom-0 left-1/3 rotate-[-2deg] z-10 bg-blue-blizzard size-60',
  'bottom-1/4 right-24 z-10 bg-lavender-old size-50',
])

onMounted(async() => {
  await nextTick()

  if (props.blok?.images) {
    layers.value?.forEach((layer, i) => {
      gsap.to(layer, {
        y: i % 2 === 0 ? -20 : 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 3 + i
      })
  
      gsap.to(layer, {
        yPercent: -(10 + i * 30),
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      })
    })
  }

  if (topLine.value && bottomLine.value) {
    gsap.to(topLine.value, {
      scale: 0.85,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=1000',
        scrub: true,
      },
    })

    gsap.to(bottomLine.value, {
      scale: 1.15,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=1000',
        scrub: true,
      },
    })
  }

  const repelX = layers.value.map(layer => gsap.quickTo(layer, 'x', { duration: 0.3 }))
  const repelY = layers.value.map(layer => gsap.quickTo(layer, 'y', { duration: 0.3 }))

  const handleMove = (e: MouseEvent) => {
    const rect = sectionRef.value!.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    layers.value.forEach((layer, i) => {
      const layerRect = layer.getBoundingClientRect()
      const centerX = layerRect.left + layerRect.width / 2 - rect.left
      const centerY = layerRect.top + layerRect.height / 2 - rect.top

      const dx = mouseX - centerX
      const dy = mouseY - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 180) {
        repelX[i](-dx * 0.4)
        repelY[i](-dy * 0.4)
      } else {
        repelX 
        repelY 
      }
    })
  }

  sectionRef.value?.addEventListener('mousemove', handleMove)
})
</script>
