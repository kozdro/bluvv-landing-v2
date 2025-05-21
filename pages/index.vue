<template>
  <StoryblokComponent
    v-if="story"
    :blok="story.content"
  />
</template>

<script setup lang="ts">
const story = await useAsyncStoryblok('pages/home', {
  version: 'published',
})

const metaData = computed(() => story.value?.content?.meta?.[0])

useMeta(metaData.value)
</script>
