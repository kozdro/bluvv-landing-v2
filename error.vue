<template>
  <section class="error-page flex flex-col items-center justify-center h-screen text-center p-8">
    <div class="relative">
      <h1
        class="heading-hero font-secondary text-primary uppercase"
        v-text="error?.statusCode || 'Oops...'"
      />

      <p
        class="text-xl md:text-2xl mt-6 text-gray-500"
        v-text="messages[error?.statusCode] || t('error.default')"
      />
    </div>

    <Button
      :variant="ButtonVariant.Secondary"
      class="mt-10"
      :label="t('error.go_home')"
      @click="handleError"
    />
  </section>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import { ButtonVariant } from './types/Button'

defineProps({
  error: Object as () => NuxtError
})

const { t, locale } = useI18n()

const messages = {
  404: t('error.404'),
  500: t('error.500'),
}

const handleError = () => clearError({
  redirect: locale.value === 'en' ? '/' : `/${locale.value}`,
})
</script>
