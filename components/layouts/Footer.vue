<template>
  <footer class="container mb-8">
    <div class="bg-peach container pt-20 pb-4 md:pb-10 rounded-4xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
          <HTMLText :content="story?.content?.newsletterContent" />
          <form
            v-if="!submitted"
            novalidate
            class="flex flex-col gap-4 md:gap-2 mt-20"
            @submit.prevent="handleSubmit"
          >
            <div class="flex items-center gap-2 md:gap-4">
              <Input
                v-model="form.email"
                id="newsletter-email"
                type="email"
                required
                :placeholder="$t('newsletter.email_placeholder')"
                :error="getEmailErrorMessage"
                autocomplete="email"
              />
              <button
                type="submit"
                class="shrink-0 flex items-center justify-center bg-white rounded-full size-10 md:size-16 transition-all duration-300 hover:scale-105 hover:bg-white/80 cursor-pointer"
              >
                <SvgoArrowRight
                  filled
                  class="!mb-0 !size-6 md:!size-8 text-black"
                />
              </button>
            </div>
            <Checkbox
              v-model="form.termsAccepted"
              id="newsletter_privacy_policy"
              required
              :error="v$.termsAccepted.$error ? termsError : ''"
            >
              {{ $t('newsletter.privacy_policy_agreement') }}
              <NuxtLink
                :to="localePath('/privacy-policy')"
                :aria-label="$t('newsletter.privacy_policy')"
                class="underline"
              >
                {{ $t('newsletter.privacy_policy') }}
              </NuxtLink>
            </Checkbox>
          </form>
          <p
            v-else
            class="mt-20 text-lg text-green-500"
            v-text="t('newsletter.success_message')"
          />
        </div>
  
        <div class="flex items-center justify-center">
          <div class="relative bg-white size-20 md:size-40 rounded-full shadow-xl">
            <StoryblokImage
              :image="story?.content?.image"
              :webp-format="false"
              class="w-full object-center object-contain"
            />
          </div>
        </div>
  
        <div class="flex flex-col md:items-end">
          <h6
            class="uppercase text-gray-500"
            v-text="story?.content?.contactTitle"
          />
          <div class="flex flex-col gap-4 heading-medium md:text-right">
            <a
              :href="`mailto:${story?.content?.email}`"
              v-text="story?.content?.email"
            />
            <a
              :href="`tel:${story?.content?.phone}`"
              v-text="story?.content?.phone"
            />
          </div>
        </div>
      </div>
  
      <div class="mt-20 md:mt-44 border-t border-gray-500 pt-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 text-sm">
        <p v-text="story?.content?.legalText" />
        <div
          v-if="story?.content?.links?.length"
          class="flex gap-4 flex-wrap"
        >
          <NuxtLink
            v-for="link in story.content.links"
            :key="link._uid"
            :to="link.link.url"
            :target="link.link.target"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'

const rules = {
  email: { required, email },
  termsAccepted: { required, sameAs: sameAs(true) },
}

const form = reactive({
  email: '',
  termsAccepted: false,
})
const submitted = ref<boolean>(false)
const errorMessage = ref<string>('')

const v$ = useVuelidate(rules, form)
const localePath = useLocalePath()
const { t } = useI18n()
const story = await useAsyncStoryblok('layouts/footer', {
  version: 'draft',
})

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
    const { data } = await $fetch('/api/newsletter', {
      method: 'POST',
      body: {
        email: form.email,
      },
    })

    if (data.success) {
      submitted.value = true
      form.email = ''
      form.termsAccepted = false
      v$.value.$reset()
    } else {
      errorMessage.value = t('newsletter.error_message')
    }
  } catch (error) {
    console.error('Błąd podczas zapisu do newslettera: ', error)
    errorMessage.value = t('newsletter.error_message')
  }
}
</script>
