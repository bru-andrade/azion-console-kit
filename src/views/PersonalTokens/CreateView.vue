<script setup>
  import { ref } from 'vue'
  import CreateFormBlock from '@/templates/create-form-block'
  import { useToast } from 'primevue/usetoast'
  import ActionBarTemplate from '@/templates/action-bar-block/action-bar-with-teleport'
  import GoBack from '@/templates/action-bar-block/go-back'
  import ContentBlock from '@/templates/content-block'
  import PageHeadingBlock from '@/templates/page-heading-block'
  import FormFieldsPersonalToken from '@/views/PersonalTokens/FormFields/FormFieldsPersonalToken'
  import CopyTokenDialog from '@/views/PersonalTokens/Dialog/CopyTokenDialog'
  import '@/helpers/convert-date'
  import { useAccountStore } from '@/stores/account'
  import { storeToRefs } from 'pinia'
  import * as yup from 'yup'
  defineOptions({ name: 'create-personal-token' })

  const props = defineProps({
    createPersonalTokenService: {
      type: Function,
      required: true
    },
    clipboardWrite: {
      type: Function,
      required: true
    }
  })

  const personalTokenKey = ref('')
  const showCopyTokenDialog = ref(false)

  const validationSchema = yup.object({
    name: yup.string().required().max(100),
    description: yup.string().max(255),
    selectedExpiration: yup.string(),
    expiresAt: yup.string().required(),
    customExpiration: yup.string().when('selectedExpiration', {
      is: 'custom',
      then: (schema) => schema.required('Expiration date is required field'),
      otherwise: (schema) => schema.nullable()
    })
  })

  const store = useAccountStore()
  const { account } = storeToRefs(store)

  const getTomorrowInUserTimezone = () => {
    const today = new Date()
    const tomorrowDateValue = today.getDate() + 1
    today.setDate(tomorrowDateValue)
    const tomorrow = new Date(today)
    const userUtcOffset = account.value.utc_offset

    return tomorrow.convertDateToLocalTimezone(userUtcOffset)
  }

  const initialValues = {
    name: '',
    customExpiration: null,
    description: '',
    selectedExpiration: '1',
    expiresAt: getTomorrowInUserTimezone()
  }

  const toast = useToast()
  const handleResponse = ({ token }) => {
    personalTokenKey.value = token
  }

  const copyPersonalToken = async () => {
    const toastConfig = {
      closable: true,
      severity: 'success',
      summary: 'Personal Token copied to clipboard!'
    }

    try {
      props.clipboardWrite(personalTokenKey.value)
      toast.add({ ...toastConfig })
    } catch {
      toast.add({
        ...toastConfig,
        severity: 'error',
        detail: 'The Personal Token could not be copied to clipboard. Please try again.'
      })
    }
  }

  const openCopyTokenDialog = () => {
    showCopyTokenDialog.value = true
  }
</script>

<template>
  <ContentBlock>
    <template #heading>
      <PageHeadingBlock pageTitle="Create Personal Token"></PageHeadingBlock>
    </template>
    <template #content>
      <CreateFormBlock
        :createService="props.createPersonalTokenService"
        @on-response="handleResponse"
        :initialValues="initialValues"
        :schema="validationSchema"
        :disabledCallback="true"
      >
        <template #form>
          <FormFieldsPersonalToken
            :personalTokenKey="personalTokenKey"
            :copyPersonalToken="copyPersonalToken"
            :userUtcOffset="account?.utc_offset"
          />
          <CopyTokenDialog
            v-model:visible="showCopyTokenDialog"
            :personalToken="personalTokenKey"
            :copy="copyPersonalToken"
            :tokenAlreadySaved="!!personalTokenKey"
          />
        </template>
        <template #action-bar="{ onSubmit, formValid, onCancel, loading }">
          <teleport
            to="#action-bar"
            v-if="!!personalTokenKey"
          >
            <GoBack :goback="openCopyTokenDialog" />
          </teleport>
          <ActionBarTemplate
            v-if="!personalTokenKey"
            @onSubmit="onSubmit"
            @onCancel="onCancel"
            :loading="loading"
            :submitDisabled="!formValid"
          />
        </template>
      </CreateFormBlock>
    </template>
  </ContentBlock>
</template>
