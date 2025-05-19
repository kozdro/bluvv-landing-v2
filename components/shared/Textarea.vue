<template>
  <div class="textarea w-full relative">
    <label
      v-if="label"
      :for="_id"
      class="block mb-1 heading-main"
      v-text="required ? `${label}*` : label"
    />
    <textarea
      v-model="model"
      :id="_id"
      :placeholder="placeholder"
      :rows="rows"
      class="heading-main w-full h-auto min-h-32 py-2 pr-3 border-b border-gray-500 text-black placeholder:text-gray-500 transition-all duration-500 focus:border-black focus:pl-4 focus:outline-0"
      :class="textareaClass"
    />
    <span
      v-if="error"
      class="text-red-500 text-sm absolute left-0 top-full mt-1 mx-1 text-left"
      v-text="error"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string
  placeholder?: string
  required?: boolean
  label?: string
  error?: string
  rows?: number
  textareaClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  placeholder: '',
  required: false,
  label: '',
  error: '',
  textareaClass: '',
})

const model = defineModel<string>()

const uid = useId()

const _id = computed(() => props.id || uid)
</script>
