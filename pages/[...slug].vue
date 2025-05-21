<template>
  <div
    v-if="story"
    class="cms-page"
  >
    <StoryblokComponent :blok="story.content" />
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute()

const slugPath = computed(() => Array.isArray(params.slug) ? params.slug.join('/') : params.slug)

const story = await useAsyncStoryblok(`pages/${slugPath.value}`, {
  version: 'published',
})

const metaData = computed(() => story.value?.content?.meta?.[0])

if (!story.value) {
  throw createError({
    statusCode: 404,
    message: 'Page Not Found',
    fatal: true,
  })
}

useMeta(metaData.value)
</script>
