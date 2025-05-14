<template>
  <component
    :is="el"
    v-bind="{
      ...(el === 'a' ? { href } : {})
    }"
    :to="href"
    :disabled="disabled || loading"
    :type="href ? null : (type === 'submit' ? 'submit' : 'button')"
    :target="openInNewWindow ? '_blank' : '_self'"
    class="button relative inline-flex items-center justify-center gap-5 shrink-0 border rounded-[70px] cursor-pointer disabled:pointer-events-none py-4 px-6"
    :class="[
      ButtonWidthClasses[width],
      ButtonVariantClasses[variant],
    ]"
    style="wordBreak: break-word;"
    @click="emit('click')"
  >
    <!-- <ArrowLeftIcon
      v-if="arrowLeft"
      class="w-4"
    /> -->
    <slot>
      <span
        :class="{ 'blur-sm': loading }"
        v-text="label"
      />
      <!-- <Spinner
        v-if="loading"
        class="absolute"
      /> -->
    </slot>
    <!-- <ArrowRightIcon
      v-if="arrowRight"
      class="w-4"
    /> -->
  </component>
</template>

<script lang="ts" setup>
import { ButtonWidth, ButtonVariant } from '~/types/Button'

// import ArrowRightIcon from '@/assets/icons/arrow-right.svg?skipsvgo'
// import ArrowLeftIcon from '@/assets/icons/arrow-left.svg?skipsvgo'

const ButtonWidthClasses = {
  [ButtonWidth.Fit]: 'w-fit',
  [ButtonWidth.Full]: 'w-full'
}

const ButtonVariantClasses = {
  [ButtonVariant.Primary]: 'bg-primary text-white hover:bg-primary/80 focus:ring-2 focus:ring-primary/50 active:bg-primary/70',
  [ButtonVariant.Secondary]: 'bg-secondary text-black hover:bg-secondary/80 focus:ring-2 focus:ring-secondary/50 active:bg-secondary/70',
  [ButtonVariant.Tertiary]: 'bg-white text-primary hover:bg-white/80 focus:ring-2 focus:ring-secondary/50 active:bg-primary active:text-white',
  [ButtonVariant.OutlinePrimary]: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-2 focus:ring-primary/50 active:bg-primary/70',
  [ButtonVariant.OutlineSecondary]: 'border-2 border-secondary text-black hover:bg-primary hover:text-white focus:ring-2 focus:ring-primary/50 active:bg-primary/70',
  [ButtonVariant.OutlineTertiary]: 'border-2 border-white text-white hover:opacity-70 focus:ring-2 focus:ring-primary active:bg-white active:text-primary active:opacity-100',
}

interface Props {
  label: string
  variant?: ButtonVariant
  width?: ButtonWidth
  type?: string
  href?: any
  disabled?: boolean
  loading?: boolean
  openInNewWindow?: boolean
  arrowLeft?: boolean
  arrowRight?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: ButtonVariant.Primary,
  width: ButtonWidth.Fit,
  type: '',
  href: '',
  disabled: false,
  loading: false,
  openInNewWindow: false,
  arrowLeft: false,
  arrowRight: true,
})

const emit = defineEmits(['click'])

const isInternal = computed(() => {
  const isObject = props.href instanceof Object
  const isUrl = `${props.href}`.startsWith('http') || `${props.href}`.startsWith('www')
  const isContactUrl = `${props.href}`.startsWith('mailto:') || `${props.href}`.startsWith('tel:')

  return isObject || (!!props.href && !isUrl && !isContactUrl)
})

const el = computed(() => {
  return props.href && !props.disabled ? (isInternal.value ? resolveComponent('NuxtLink') : 'a') : 'button'
})
</script>
