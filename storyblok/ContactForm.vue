<template>
  <section
    v-editable="blok"
    class="contact-form container pb-16 md:pb-32 flex flex-col md:flex-row gap-10 md:gap-20"
  >
    <HTMLText
      v-if="blok.content"
      :content="blok.content"
      class="md:basis-1/2"
    />
    <Contact class="md:basis-1/2 w-full md:px-20" />
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
