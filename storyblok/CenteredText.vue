<template>
  <section
    v-editable="blok"
    class="centered-text container flex flex-col gap-12 md:gap-24 py-16 md:py-32"
  >
    <div
      v-if="blok.heading"
      class="flex flex-col lg:w-1/2"
    >
      <div
        class="w-10 h-2 rounded-lg mb-5"
        :style="{ backgroundColor: extractTextColors(blok.heading)[0] }"
      />
      <HTMLText :content="blok.heading" />
    </div>
    <div class="lg:w-1/2 lg:ml-auto lg:mr-24">
      <HTMLText
        :content="blok.content"
        class="heading-main"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  blok: {
    heading?: any
    content: any
  }
}

defineProps<Props>()
</script>
