<template>
  <EditFormBlock
    :editService="props.editEdgeApplicationService"
    :loadService="loadEdgeApplication"
    :updatedRedirect="props.updatedRedirect"
    :schema="validationSchema"
    disableRedirect
    :isTabs="true"
  >
    <template #form>
      <FormFieldsCreateEdgeApplications
        :handleBlock="handleBlocks"
        :contactSalesEdgeApplicationService="contactSalesEdgeApplicationService"
      />
    </template>
    <template #action-bar="{ onSubmit, formValid, onCancel, loading, values }">
      <ActionBarBlockWithTeleport
        @onSubmit="formSubmit(onSubmit, values)"
        @onCancel="onCancel"
        :loading="loading"
        :submitDisabled="!formValid"
      />
    </template>
  </EditFormBlock>
</template>

<script setup>
  import EditFormBlock from '@/templates/edit-form-block'
  import ActionBarBlockWithTeleport from '@templates/action-bar-block/action-bar-with-teleport'
  import * as yup from 'yup'
  import FormFieldsCreateEdgeApplications from './FormFields/FormFieldsCreateEdgeApplications'

  defineOptions({ name: 'edit-edge-application' })
  const emit = defineEmits(['updatedApplication'])

  const props = defineProps({
    editEdgeApplicationService: {
      type: Function,
      required: true
    },
    updatedRedirect: {
      type: String,
      required: true
    },
    edgeApplication: { type: Object },
    contactSalesEdgeApplicationService: {
      type: Function,
      required: true
    }
  })

  const handleBlocks = ['general', 'delivery-settings', 'edge-application-modules', 'debug-rules']

  const validationSchema = yup.object({
    name: yup.string().required()
  })

  const loadEdgeApplication = async () => {
    return props.edgeApplication
  }

  const formSubmit = async (onSubmit, values) => {
    await onSubmit()
    emit('updatedApplication', values)
  }
</script>
