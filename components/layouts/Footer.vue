<template>
  <footer class="container mb-8">
    <div class="bg-peach container pt-20 pb-4 md:pb-10 rounded-4xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
          <HTMLText :content="story?.content?.newsletterContent" />
          <form
            class="flex items-center gap-2 md:gap-4 mt-20"
            @submit.prevent="handleSubmit"
          >
            <Input
              v-model="email"
              type="email"
              required
              :placeholder="$t('form.placeholder.email')"
            />
            <button
              type="submit"
              class="shrink-0 flex items-center justify-center bg-white rounded-full size-10 md:size-16 transition-all duration-300 hover:scale-105 hover:bg-white/80 cursor-pointer"
            >
              <SvgoArrowRight
                filled
                class="!mb-0 !size-6 md:!size-8 text-black"
              />
            </button>
          </form>
        </div>
  
        <div class="flex items-center justify-center">
          <div class="relative bg-white size-20 md:size-40 rounded-full shadow-xl">
            <StoryblokImage
              :image="story?.content?.image"
              :webp-format="false"
              class="w-full object-center object-contain"
            />
          </div>
        </div>
  
        <div class="flex flex-col md:items-end">
          <h6
            class="uppercase text-gray-500"
            v-text="story?.content?.contactTitle"
          />
          <div class="flex flex-col gap-4 heading-medium md:text-right">
            <a
              :href="`mailto:${story?.content?.email}`"
              v-text="story?.content?.email"
            />
            <a
              :href="`tel:${story?.content?.phone}`"
              v-text="story?.content?.phone"
            />
          </div>
        </div>
      </div>
  
      <div class="mt-20 md:mt-44 border-t border-gray-500 pt-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 text-sm">
        <p v-text="story?.content?.legalText" />
        <div
          v-if="story?.content?.links?.length"
          class="flex gap-4 flex-wrap"
        >
          <NuxtLink
            v-for="link in story.content.links"
            :key="link._uid"
            :to="link.link.url"
            :target="link.link.target"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const email = ref<string>('')

const story = await useAsyncStoryblok('layouts/footer', {
  version: 'draft',
})

const handleSubmit = (e) => {
  console.log(e)
}
</script>
