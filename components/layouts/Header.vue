<template>
  <header
    class="fixed w-full z-20 py-10 transition-colors duration-300"
    :class="isScrolled || isOpen ? 'bg-white' : 'bg-transparent'"
  >
    <div class="container flex items-center justify-between h-10">
      <NuxtLink to="/">
        <StoryblokImage
          :image="story?.content?.logo"
          fit="cover"
        />
      </NuxtLink>
      <button
        class="flex flex-col gap-2 justify-center items-center cursor-pointer"
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
          class="fixed inset-0 top-30 bg-white z-50 flex"
        >
          <div class="basis-1/2 flex flex-col justify-end items-start gap-3 pb-10 pl-[10vw]">
            <NavLink
              v-for="link in story?.content?.menu"
              :key="link._uid"
              :to="link.link.url"
              :target="link.link.target"
              :label="link.label"
              class="heading-menu"
            />
          </div>
          <div class="basis-1/2 flex items-end pb-10 pl-[3vw]">
            <div class="flex flex-col items-start">
              <div class="w-10 h-2 rounded-lg bg-primary mb-5" />
              <HTMLText
                v-if="story?.content?.aside"
                :content="story.content.aside"
              />
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

const story = await useAsyncStoryblok('layouts/header', {
  version: 'draft',
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > window.innerHeight
}

const blockBodyScrolling = (isBlocked: boolean) => document?.body.style.setProperty('overflow', isBlocked ? 'hidden' : null)

onMounted(() => {
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
