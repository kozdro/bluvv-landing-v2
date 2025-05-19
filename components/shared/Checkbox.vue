<template>
  <div class="checkbox relative">
    <div class="flex items-center gap-2">
      <input
        type="checkbox"
        :id="id"
        :checked="modelValue"
        :disabled="disabled"
        class="hidden"
        @change="$emit('update:modelValue', $event.target?.checked)"
      />
      <label
        :for="id"
        class="shrink-0 flex items-center justify-center w-5 h-5 border rounded cursor-pointer transition-all"
        :class="[
          modelValue ? 'border-primary bg-primary' : 'border-gray-500 bg-transparent',
          {
            'cursor-not-allowed opacity-50': disabled,
            'border-red-500': error,
          },
        ]"
      >
        <svg
          v-if="modelValue"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </label>
      <div v-if="$slots.default">
        <slot />{{ required ? '*' : '' }}
      </div>
    </div>

    <span
      v-if="error"
      class="text-red-500 text-sm absolute left-0 top-full mt-0 mx-1 text-left"
      v-text="error"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string
  modelValue: boolean
  disabled?: boolean
  error?: string
  required?: boolean
}

defineProps<Props>()
</script>
