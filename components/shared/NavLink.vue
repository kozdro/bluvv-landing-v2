<template>
  <NuxtLink
    :to="to"
    :target="target"
    class="group relative inline-block transition-[transform, colors] duration-700 ease-out hover:text-peach hover:translate-x-8"
    :class="active ? 'text-peach translate-x-8' : 'text-black'"
  >
    {{ label }}
    <span
      class="absolute left-0 -bottom-3 h-1.5 md:h-3 w-full bg-peach origin-left transition-transform duration-700 rounded-2xl delay-150 group-hover:scale-x-100"
      :class="active ? 'scale-x-100' : 'scale-x-0'"
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

const props = withDefaults(defineProps<Props>(), {
  target: '_self',
  exact: true,
})

const route = useRoute()

const active = computed(() =>
  props.exact
    ? route.path === props.to
    : route.path.startsWith(props.to)
)
</script>
