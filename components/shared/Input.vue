<template>
  <div class="input w-full relative">
    <label
      v-if="label"
      :for="_id"
      class="block mb-1 heading-main"
      v-text="required ? `${label}*` : label"
    />
    <input
      v-model="model"
      :id="_id"
      :type="type"
      :placeholder="placeholder"
      class="heading-main w-full py-2 pr-3 border-b border-gray-500 text-black placeholder:text-gray-500 transition-all duration-500 focus:border-black focus:pl-4 focus:outline-0"
      :class="inputClass"
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
  type?: string
  placeholder?: string
  required?: boolean
  label?: string
  error?: string
  inputClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: 'text',
  placeholder: '',
  required: false,
  label: '',
  error: '',
  inputClass: '',
})

const model = defineModel<string>()

const uid = useId()

const _id = computed(() => props.id || uid)
</script>
