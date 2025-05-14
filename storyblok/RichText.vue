<template>
  <HTMLText
    :content="blok.content"
    class="rich-text container"
  />
</template>

<script setup lang="ts">
interface Props {
  blok: {
    content: any
  }
}

defineProps<Props>()
</script>
