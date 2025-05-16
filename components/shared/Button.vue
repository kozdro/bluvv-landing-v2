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
    class="button relative inline-flex items-center justify-center gap-5 shrink-0 rounded-[70px] cursor-pointer disabled:pointer-events-none py-4 px-6 group overflow-hidden before:absolute before:inset-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-out before:z-0 before:rounded-[inherit] hover:before:scale-x-100"
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
        class="relative z-10 py-2 font-medium text-lg tracking-[-.06em] whitespace-nowrap"
        :class="{ 'blur-sm': loading }"
        v-text="label"
      />
      <!-- <Spinner
        v-if="loading"
        class="absolute"
      /> -->
    </slot>
    <div class="size-10 rounded-full bg-gray-200 flex items-center justify-center group-hover:bg-white transition-all duration-500 relative z-10 delay-100 group-hover:scale-105">
      <SvgoArrowRight
        filled
        class="!mb-0 !size-3 text-black"
      />
    </div>
    <!-- <ArrowRightIcon
      v-if="arrowRight"
      class="w-4"
    /> -->
  </component>
</template>

<script lang="ts" setup>
import { ButtonWidth, ButtonVariant } from '~/types/Button'

const ButtonWidthClasses = {
  [ButtonWidth.Fit]: 'w-fit',
  [ButtonWidth.Full]: 'w-full'
}

const ButtonVariantClasses = {
  [ButtonVariant.Primary]: 'bg-primary text-white focus:ring-2 focus:ring-primary/50 active:bg-primary/70 before:bg-secondary',
  [ButtonVariant.Secondary]: 'bg-secondary text-white focus:ring-2 focus:ring-secondary/50 active:bg-secondary/70 before:bg-primary',
  [ButtonVariant.Tertiary]: 'bg-white text-primary focus:ring-2 focus:ring-secondary/50 active:bg-primary active:text-white before:bg-white/80',
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
