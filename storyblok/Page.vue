<template>
  <div v-editable="blok">
    <StoryblokComponent
      v-for="blok in blok?.body"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  blok: Object
}

defineProps<Props>()
</script>
