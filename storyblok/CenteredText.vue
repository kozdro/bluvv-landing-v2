<template>
  <section
    v-editable="blok"
    class="centered-text container flex flex-col gap-12 md:gap-24 py-16 md:py-32"
  >
    <div
      v-if="blok.heading"
      class="flex flex-col md:w-1/2"
    >
      <div class="w-10 h-2 rounded-lg bg-blue-blizzard mb-5" />
      <HTMLText :content="blok.heading" />
    </div>
    <div class="md:w-1/2 md:ml-auto md:mr-24">
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
