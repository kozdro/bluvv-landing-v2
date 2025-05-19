<template>
  <header
    class="fixed w-full z-20 py-10 transition-all duration-300"
    :class="[
      isScrolled || isOpen ? 'bg-white' : 'bg-transparent',
      isVisible ? 'translate-y-0' : '-translate-y-full',
    ]"
  >
    <div class="container flex items-center justify-between h-10">
      <NuxtLink to="/">
        <StoryblokImage
          :image="story?.content?.logo"
          fit="cover"
          class="h-16"
        />
      </NuxtLink>
      <button
        type="button"
        class="flex flex-col gap-2 justify-center items-center cursor-pointer p-4"
        @click="isOpen = !isOpen"
      >
        <div
          class="w-8 h-0.5 bg-black rounded-xs transition-transform ease-in duration-300"
          :class="{ 'rotate-45 translate-y-1': isOpen }"
        />
        <div
          class="w-8 h-0.5 bg-black rounded-xs transition-transform ease-in duration-300"
          :class="{ '-rotate-45 -translate-y-1.5': isOpen }"
        />
      </button>
    </div>
    
    <Teleport to="#teleports">
      <Transition
        name="menu-fade"
        appear
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 top-30 bg-white z-50 flex flex-col md:flex-row"
        >
          <div class="md:basis-1/2 flex flex-col md:justify-end items-start gap-3 pb-10 pl-4 md:pl-[10vw] mt-10 md:mt-0">
            <NavLink
              v-for="link in story?.content?.menu"
              :key="link._uid"
              :to="link.link.url"
              :target="link.link.target"
              :label="link.label"
              class="heading-menu"
            />
          </div>
          <div class="md:basis-1/2 flex md:items-end pb-10 pl-4 md:pl-[3vw] mt-auto">
            <div
              v-if="story?.content?.aside"
              class="flex flex-col items-start"
            >
              <div
                class="w-10 h-2 rounded-lg mb-5"
                :style="{ backgroundColor: extractTextColors(story?.content?.aside)[0] }"
              />
              <HTMLText :content="story.content.aside" />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const isScrolled = ref<boolean>(false)
const isOpen = ref<boolean>(false)
const isVisible = ref<boolean>(true)
let lastScroll = 0

const story = await useAsyncStoryblok('layouts/header', {
  version: 'draft',
})

const handleScroll = () => {
  const current = window.scrollY
  const scrollingDown = current > lastScroll

  if (current > window.innerHeight) {
    isVisible.value = !scrollingDown
  } else {
    isVisible.value = true
  }

  isScrolled.value = (route.name as string)?.includes('index') ? (current > (window.innerHeight + 120)) : (current > 120)
  lastScroll = current
}

const blockBodyScrolling = (isBlocked: boolean) => document?.body.style.setProperty('overflow', isBlocked ? 'hidden' : null)

onMounted(() => {
  lastScroll = window.scrollY
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(isOpen, (isOpen) => blockBodyScrolling(isOpen))
watch(route, () => {
  isOpen.value = false
})
</script>
