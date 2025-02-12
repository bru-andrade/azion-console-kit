<template>
  <ContentBlock>
    <template #heading>
      <PageHeadingBlock pageTitle="Your Settings"></PageHeadingBlock>
    </template>
    <template #content>
      <EditFormBlock
        :editService="props.editUsersService"
        :schema="validationSchema"
        :loadService="loadUser"
        :disableRedirect="true"
      >
        <template #form>
          <FormFieldsYourSettings
            :listTimezonesService="listTimezonesService"
            :listCountriesPhoneService="listCountriesPhoneService"
          />
        </template>
        <template #action-bar="{ onSubmit, formValid, onCancel, loading, values, setValues }">
          <ActionBarBlockWithTeleport
            @onSubmit="formSubmit(onSubmit, values, setValues)"
            @onCancel="onCancel"
            :loading="loading"
            :submitDisabled="!formValid"
          />
        </template>
      </EditFormBlock>
    </template>
  </ContentBlock>
</template>

<script setup>
  import { ref } from 'vue'

  import EditFormBlock from '@/templates/edit-form-block'
  import ContentBlock from '@/templates/content-block'
  import PageHeadingBlock from '@/templates/page-heading-block'
  import FormFieldsYourSettings from './FormFields/FormFieldsYourSettings.vue'
  import ActionBarBlockWithTeleport from '@templates/action-bar-block/action-bar-with-teleport'
  import * as yup from 'yup'
  import { useToast } from 'primevue/usetoast'

  const toast = useToast()

  const currentEmail = ref('')

  const props = defineProps({
    loadUserService: {
      type: Function,
      required: true
    },
    listTimezonesService: {
      type: Function,
      required: true
    },
    listCountriesPhoneService: {
      type: Function,
      required: true
    },
    editUsersService: {
      type: Function,
      required: true
    }
  })

  const loadUser = async () => {
    const userData = await props.loadUserService()

    currentEmail.value = userData.email

    return userData
  }
  const formSubmit = (onSubmit, values, setValues) => {
    onSubmit()
    if (values.email !== currentEmail.value) {
      const toastConfig = {
        closable: true,
        severity: 'warn',
        summary: 'Confirmation email',
        detail: 'We have sent you a confirmation email.'
      }
      toast.add({ ...toastConfig })

      setValues({
        email: currentEmail.value
      })
    }
  }
  const passwordRequirementsList = ref([
    { label: '8 characters', valid: false },
    { label: '1 uppercase letter', valid: false },
    { label: '1 lowercase letter', valid: false },
    { label: '1 special character (example: !?<>@#$%)', valid: false }
  ])

  const validationSchema = yup.object({
    firstName: yup.string().required().max(30).label('First Name'),
    lastName: yup.string().required().max(30).label('Last Name'),
    timezone: yup.string(),
    language: yup.string(),
    countryCallCode: yup.string(),
    email: yup.string().email().required().max(254).label('Email'),
    mobile: yup.string().required().label('Phone Number'),
    twoFactorEnabled: yup.boolean(),
    oldPassword: yup.string(),
    password: yup.string().when('oldPassword', {
      is: (val) => !!val, // Set the field as required when oldPassword has a value
      then: () =>
        yup
          .string()
          .required()
          .test('max', 'Exceeded number of characters.', (value) => value?.length <= 128)
          .test('noSpaces', 'Spaces not allowed.', (value) => !value?.match(/\s/g))
          .test('requirements', '', (value) => {
            const hasUpperCase = value && /[A-Z]/.test(value)
            const hasLowerCase = value && /[a-z]/.test(value)
            const hasSpecialChar = value && /[!@#$%^&*(),.?":{}|<>]/.test(value)
            const hasMinLength = value?.length > 7
            passwordRequirementsList.value[0].valid = hasMinLength
            passwordRequirementsList.value[1].valid = hasUpperCase
            passwordRequirementsList.value[2].valid = hasLowerCase
            passwordRequirementsList.value[3].valid = hasSpecialChar
            return hasMinLength && hasUpperCase && hasLowerCase && hasSpecialChar
          })
          .label('Password')
    }),
    confirmPassword: yup.string().when('password', {
      is: (val) => !!val,
      then: () =>
        yup
          .string()
          .required()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .label('Confirm Password')
    })
  })
</script>
