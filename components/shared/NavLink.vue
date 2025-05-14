<template>
  <NuxtLink
    :to="to"
    :target="target"
    class="group relative inline-block transition-[transform, colors] duration-700 ease-out hover:text-peach"
    :class="[
      active ? 'text-peach translate-x-2' : 'text-black',
      'hover:translate-x-8'
    ]"
  >
    {{ label }}
    <span
      class="absolute left-0 -bottom-3 h-3 w-full bg-peach origin-left transition-transform duration-700 rounded-2xl delay-150"
      :class="[
        active ? 'scale-x-100' : 'scale-x-0',
        'group-hover:scale-x-100'
      ]"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  to: string
  label: string
  target?: string
  exact?: boolean
}

const props = defineProps<Props>()

const route = useRoute()

const active = computed(() =>
  props.exact
    ? route.path === props.to
    : route.path.startsWith(props.to)
)
</script>
