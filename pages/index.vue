<template>
  <StoryblokComponent
    v-if="story"
    :blok="story.content"
  />
</template>

<script setup lang="ts">
const story = await useAsyncStoryblok('pages/home', {
  version: 'draft',
})
</script>
