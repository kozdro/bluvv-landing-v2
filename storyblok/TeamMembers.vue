<template>
  <section
    v-editable="blok"
    class="team-members container pt-16 lg:pt-0 pb-16 md:pb-32 flex flex-col gap-8 md:gap-20"
  >
    <div>
      <div class="w-10 h-2 rounded-lg bg-lavender-old mb-5" />
      <HTMLText :content="blok.heading" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 md:gap-10">
      <TeamMember
        v-for="member in blok.members"
        :key="member._uid"
        :member="member"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TeamMember as TeamMemberType } from '~/types/storyblok'

interface Props {
  blok: {
    heading: any
    members: TeamMemberType[]
  }
}

defineProps<Props>()
</script>
