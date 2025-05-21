<template>
  <form
    novalidate
    class="flex flex-col gap-6 md:gap-8"
    @submit.prevent="handleSubmit"
  >
    <Input
      v-model="form.name"
      required
      :placeholder="$t('form.placeholder.name')"
      :label="$t('form.label.name')"
      autocomplete="name"
      :error="v$.name.$error ? nameError : ''"
    />
    <Input
      v-model="form.email"
      required
      type="email"
      :placeholder="$t('form.placeholder.email')"
      :label="$t('form.label.email')"
      autocomplete="email"
      :error="getEmailErrorMessage"
    />
    <Textarea
      v-model="form.message"
      required
      :placeholder="$t('form.placeholder.message')"
      :label="$t('form.label.message')"
      :error="v$.message.$error ? messageError : ''"
    />
    <Checkbox
      v-model="form.termsAccepted"
      id="privacy_policy"
      required
      :error="v$.termsAccepted.$error ? termsError : ''"
    >
      {{ $t('form.privacy_policy_agreement') }}
      <NuxtLink
        :to="localePath('/privacy-policy')"
        :aria-label="$t('form.privacy_policy')"
        class="underline"
      >
        {{ $t('form.privacy_policy') }}
      </NuxtLink>
    </Checkbox>

    <Button
      :width="$viewport.isLessOrEquals('md') ? ButtonWidth.Full : ButtonWidth.Fit"
      type="submit"
      :loading="isLoading"
      :arrow-right="false"
      :label="$t('form.submit')"
      class="!py-2"
    />

    <p
      v-if="responseMessage"
      :class="isSuccess ? 'text-green-500' : 'text-error-500'"
      v-text="responseMessage"
    />
  </form>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

import { ButtonWidth } from '~/types'

const form = ref({
  name: '',
  email: '',
  message: '',
  termsAccepted: false,
})
const responseMessage = ref<string>('')
const isSuccess = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const rules = {
  name: { required },
  email: { required, email },
  message: { required, minLength: minLength(10) },
  termsAccepted: { required, sameAs: sameAs(true) },
}

const { t } = useI18n()
const localePath = useLocalePath()
const v$ = useVuelidate(rules, form)

const nameError = t('form.error.name')
const messageError = t('form.error.message')
const termsError = t('form.error.terms')

const getEmailErrorMessage = computed(() => {
  if (!v$.value?.email?.$error) return ''

  if (!v$.value.email.required.$pending && !v$.value.email.required.$response) {
    return t('form.error.email.required')
  } else if (!v$.value.email.email.$pending && !v$.value.email.email.$response) {
    return t('form.error.email.invalid')
  }
})

const handleSubmit = async () => {
  await v$.value.$validate()

  if (v$.value.$invalid || v$.value.error) return

  try {
    isLoading.value = true
    responseMessage.value = ''

    const { data } = await $fetch('/api/contact', {
      method: 'POST',
      body: form.value,
    })

    if (data.success) {
      responseMessage.value = t('form.send_success')
      isSuccess.value = true
      form.value = {
        name: '',
        email: '',
        message: '',
        termsAccepted: false,
      }
      v$.value.$reset()
    }
  } catch (error) {
    console.log(error)
    responseMessage.value = error?.data?.message || t('error.default')
    isSuccess.value = false
  } finally {
    isLoading.value = false
  }
}
</script>
