<template>
  <section
    v-editable="blok"
    class="contact-form container pb-16 md:pb-32 flex flex-col lg:flex-row gap-10 lg:gap-20"
  >
    <HTMLText
      v-if="blok.content"
      :content="blok.content"
      class="lg:basis-1/2"
    />
    <Contact class="lg:basis-1/2 w-full lg:px-20" />
  </section>
</template>

<script lang="ts" setup>
interface Props {
  blok: {
    content?: any
  }
}

defineProps<Props>()
</script>
