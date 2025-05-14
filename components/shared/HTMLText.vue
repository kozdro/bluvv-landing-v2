<template>
  <div
    v-html="resolvedRichText"
    class="html-text [&_p]:pb-4"
  />
</template>

<script setup lang="ts">
interface Props {
  content: any
}

const props = defineProps<Props>()

const resolvedRichText = computed(() => renderRichText(props.content))
</script>
