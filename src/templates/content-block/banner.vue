<template>
  <section class="w-full min-h-[calc(100vh-120px)] relative">
    <div class="surface-ground w-full">
      <div class="max-w-screen-2xl-test mx-auto">
        <Message
          severity="warn"
          :closable="false"
          :pt="{
            root: { class: 'mx-3 mt-4 sm:mx-8' },
            wrapper: { class: 'py-3 px-3 items-start sm:items-center' }
          }"
        >
          <template #messageicon>
            <Avatar
              icon="pi pi-exclamation-triangle"
              class="bg-yellow-600 bg-opacity-20 text-yellow-600 mr-2 min-w-[2rem]"
            />
          </template>
          <p class="text-color-secondary">
            <b class="text-color">Preview stage.</b>
            This platform is under development. Expect occasional instability or bugs during this
            time.
            <ButtonPrime
              class="p-0"
              label="Report an issue"
              icon="pi pi-external-link"
              iconPos="right"
              link
              @click="goToCreateIssue"
            />
          </p>
        </Message>
      </div>
    </div>
    <div class="w-full max-w-screen-2xl mx-auto"></div>
    <slot name="heading"></slot>
    <section class="w-full h-full flex flex-col max-w-screen-2xl-test mx-auto mb-8">
      <slot name="content"></slot>
    </section>
  </section>
</template>
<script setup>
  defineOptions({ name: 'BannerContentBlock' })
  import { windowOpen } from '@/helpers/window-open'

  import Message from 'primevue/message'
  import Avatar from 'primevue/avatar'
  import ButtonPrime from 'primevue/button'

  const goToCreateIssue = () => {
    windowOpen('https://github.com/aziontech/azion-platform-kit/issues/new', '_blank')
  }
</script>
