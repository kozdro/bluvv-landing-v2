<template>
  <div
    v-editable="blok"
    class="text-ticker overflow-hidden w-full text-black relative py-10"
  >
    <div
      ref="topWrapperRef"
      class="will-change-transform py-4"
      :style="{ background: computedBackgrounds[0] }"
    >
      <div
        ref="topTickerRef"
        class="flex gap-2 will-change-transform"
      >
        <div
          v-for="(_, index) in 5"
          :key="'top-' + index"
          class="heading-regular whitespace-nowrap -translate-x-40"
          v-text="blok.text"
        />
      </div>
    </div>

    <div
      ref="bottomWrapperRef"
      class="will-change-transform py-4"
      :style="{ background: computedBackgrounds[1] }"
    >
      <div
        ref="bottomTickerRef"
        class="flex gap-2 will-change-transform"
      >
        <div
          v-for="(_, index) in 5"
          :key="'bottom-' + index"
          class="heading-regular whitespace-nowrap -translate-x-40"
          v-text="blok.text"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  blok: {
    text: string
    backgroundColors: string[]
  }
}

const props = defineProps<Props>()

const topTickerRef = ref<HTMLElement | null>(null)
const bottomTickerRef = ref<HTMLElement | null>(null)
const topWrapperRef = ref<HTMLElement | null>(null)
const bottomWrapperRef = ref<HTMLElement | null>(null)

const computedBackgrounds = computed(() => {
  const [top, bottom] = props.blok.backgroundColors
  return [top || '#D17AB3', bottom || '#F9CEB9']
})

onMounted(() => {
  if (!topTickerRef.value || !bottomTickerRef.value || !topWrapperRef.value || !bottomWrapperRef.value) return

  const topDistance = topTickerRef.value.scrollWidth / 30
  const bottomDistance = bottomTickerRef.value.scrollWidth / 30

  gsap.to(topTickerRef.value, {
    x: -topDistance,
    ease: 'none',
    scrollTrigger: {
      trigger: topTickerRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })

  gsap.to(bottomTickerRef.value, {
    x: bottomDistance,
    ease: 'none',
    scrollTrigger: {
      trigger: bottomTickerRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })

  let topTarget = 0
  let topCurrent = 3
  let bottomTarget = 0
  let bottomCurrent = -3

  const topSetter = gsap.quickSetter(topWrapperRef.value, 'rotate', 'deg')
  const bottomSetter = gsap.quickSetter(bottomWrapperRef.value, 'rotate', 'deg')

  topSetter(topCurrent)
  bottomSetter(bottomCurrent)

  ScrollTrigger.create({
    trigger: topWrapperRef.value,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      topTarget = -3 * self.progress
      bottomTarget = 3 * self.progress
    }
  })

  gsap.ticker.add(() => {
    topCurrent += (topTarget - topCurrent) * 0.07
    bottomCurrent += (bottomTarget - bottomCurrent) * 0.07
    topSetter(topCurrent)
    bottomSetter(bottomCurrent)
  })
})
</script>
