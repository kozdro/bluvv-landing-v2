<template>
  <div class="flex justify-center">
    <div
      class="spinner inline-block border-[3px] border-lavender-gray border-t-lavender-deep rounded-full"
      :class="size === SpinnerSize.DEFAULT ? 'w-4 h-4' : 'w-16 h-16'"
    />
  </div>
</template>

<script lang="ts" setup>
import { SpinnerSize } from '~/types/Spinner'

interface Props {
  size?: SpinnerSize
}

withDefaults(defineProps<Props>(), {
  size: SpinnerSize.DEFAULT,
})
</script>

<style scoped>
.spinner {
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
