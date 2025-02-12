<script setup>
  import { ref } from 'vue'
  import * as yup from 'yup'
  import CreateDrawerBlock from '@templates/create-drawer-block'
  import FormFieldsDrawerRulesEngine from '@/views/EdgeApplicationsRulesEngine/FormFields/FormFieldsEdgeApplicationsRulesEngine'
  import EditDrawerBlock from '@templates/edit-drawer-block'
  import { refDebounced } from '@vueuse/core'
  defineOptions({ name: 'drawer-rules-engine' })

  const emit = defineEmits(['onSuccess'])

  const props = defineProps({
    edgeApplicationId: {
      type: String,
      required: true
    },
    createRulesEngineService: {
      type: Function,
      required: true
    },
    editRulesEngineService: {
      type: Function,
      required: true
    },
    loadRulesEngineService: {
      type: Function,
      required: true
    },
    documentationService: {
      type: Function,
      required: true
    },
    isEnableApplicationAcceleration: {
      type: Boolean,
      required: true
    },
    isDeliveryProtocolHttps: {
      type: Boolean,
      required: true
    },
    listEdgeApplicationFunctionsService: {
      type: Function,
      required: true
    },
    listCacheSettingsService: {
      required: true,
      type: Function
    },
    listOriginsService: {
      required: true,
      type: Function
    }
  })

  const showCreateRulesEngineDrawer = ref(false)
  const showEditRulesEngineDrawer = ref(false)
  const debouncedDrawerAnimate = 300
  const loadCreateRulesEngineDrawer = refDebounced(
    showCreateRulesEngineDrawer,
    debouncedDrawerAnimate
  )
  const loadEditRulesEngineDrawer = refDebounced(showEditRulesEngineDrawer, debouncedDrawerAnimate)
  const selectedRulesEngineToEdit = ref({})

  const initialValues = ref({
    id: props.edgeApplicationId,
    name: '',
    description: '',
    phase: 'request',
    criteria: [
      [
        {
          variable: '${uri}',
          operator: 'is_equal',
          conditional: 'if',
          input_value: ''
        }
      ]
    ],
    behaviors: [
      {
        name: 'deliver',
        target: {}
      }
    ],
    isActive: true
  })

  const validationSchema = yup.object({
    name: yup.string().required().label('Name'),
    description: yup.string(),
    phase: yup.string(),
    criteria: yup.array(),
    behaviors: yup.array()
  })

  const createService = async (payload) => {
    return await props.createRulesEngineService({
      ...payload,
      edgeApplicationId: props.edgeApplicationId
    })
  }

  const editService = async (payload) => {
    return await props.editRulesEngineService({
      payload,
      id: props.edgeApplicationId
    })
  }

  const loadService = async () => {
    return await props.loadRulesEngineService({
      ...selectedRulesEngineToEdit.value,
      edgeApplicationId: props.edgeApplicationId
    })
  }

  const initialPhase = ref('request')
  const openDrawerCreate = (selectedPhase = 'request') => {
    initialPhase.value = selectedPhase
    showCreateRulesEngineDrawer.value = true
  }

  const openDrawerEdit = (rule) => {
    if (rule.id) {
      selectedRulesEngineToEdit.value = rule
      showEditRulesEngineDrawer.value = true
    }
  }

  const closeDrawerEdit = () => {
    showEditRulesEngineDrawer.value = false
  }

  const handleCreateRulesEngine = () => {
    emit('onSuccess')
  }

  defineExpose({
    openDrawerCreate,
    openDrawerEdit,
    closeDrawerEdit
  })
</script>

<template>
  <CreateDrawerBlock
    v-if="loadCreateRulesEngineDrawer"
    v-model:visible="showCreateRulesEngineDrawer"
    :createService="createService"
    :schema="validationSchema"
    :initialValues="initialValues"
    @onSuccess="handleCreateRulesEngine"
    :showBarGoBack="true"
    title="Create Rule"
  >
    <template #formFields>
      <FormFieldsDrawerRulesEngine
        :initialPhase="initialPhase"
        :edgeApplicationId="props.edgeApplicationId"
        :isEnableApplicationAcceleration="props.isEnableApplicationAcceleration"
        :isDeliveryProtocolHttps="props.isDeliveryProtocolHttps"
        :listEdgeApplicationFunctionsService="props.listEdgeApplicationFunctionsService"
        :listOriginsService="props.listOriginsService"
        :listCacheSettingsService="props.listCacheSettingsService"
      />
    </template>
  </CreateDrawerBlock>
  <EditDrawerBlock
    v-if="loadEditRulesEngineDrawer"
    :id="selectedRulesEngineToEdit.id.toString()"
    v-model:visible="showEditRulesEngineDrawer"
    :loadService="loadService"
    :editService="editService"
    :schema="validationSchema"
    @onSuccess="emit('onSuccess')"
    :showBarGoBack="true"
    @onError="closeDrawerEdit"
    title="Edit Rule"
  >
    <template #formFields>
      <FormFieldsDrawerRulesEngine
        :selectedRulesEngineToEdit="selectedRulesEngineToEdit"
        :edgeApplicationId="props.edgeApplicationId"
        :isEnableApplicationAcceleration="props.isEnableApplicationAcceleration"
        :isDeliveryProtocolHttps="props.isDeliveryProtocolHttps"
        :listEdgeApplicationFunctionsService="props.listEdgeApplicationFunctionsService"
        :listOriginsService="props.listOriginsService"
        :listCacheSettingsService="props.listCacheSettingsService"
      />
    </template>
  </EditDrawerBlock>
</template>
