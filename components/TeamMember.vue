<template>
  <div class="flex flex-col group">
    <div class="bg-lavender-gray relative h-132 overflow-hidden rounded-[180px] flex items-end justify-center pt-16 mb-4 md:mb-8">
      <StoryblokImage
        :image="member.image"
        fit="cover"
        class="object-cover object-center h-full w-auto group-hover:scale-105 group-hover:rotate-z-2 transition-transform duration-500"
      />
    </div>
    <h6
      v-if="member.position"
      class="uppercase text-gray-500 text-base"
      v-text="member.position"
    />
    <h5
      class="group-hover:text-lavender-old group-hover:font-bold transition-colors duration-500 will-change-[color] text-xl"
      v-text="member.name"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TeamMember } from '~/types/storyblok'

interface Props {
  member: TeamMember
}

defineProps<Props>()
</script>
