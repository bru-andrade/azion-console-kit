<template>
  <ListTableNoHeaderBlock
    ref="listAllowedRef"
    v-if="hasContentToList"
    pageTitleDelete="Waf Rules Allowed"
    addButtonLabel="Allowed Rule"
    :editInDrawer="openEditDrawerWafRulesAllowed"
    :columns="wafRulesAllowedColumns"
    :listService="handleListWafRulesAllowedService"
    :deleteService="handleDeleteWafRulesAllowedService"
    @on-load-data="handleLoadData"
    emptyListMessage="No Waf Rules Allowed found."
  >
    <template #addButton>
      <PrimeButton
        icon="pi pi-plus"
        label="Allowed Rule"
        @click="openCreateDrawerWafAllowed"
      />
    </template>
  </ListTableNoHeaderBlock>

  <EmptyResultsBlock
    v-else
    title="No Allowed Rules added."
    description="Allowed Rules are specific WAF rules customized for your web application."
    createButtonLabel="Allowed Rule"
    :documentationService="documentationServiceAllowed"
    :inTabs="true"
  >
    <template #default>
      <PrimeButton
        severity="secondary"
        label="Create from Tuning"
        @click="goToWafRulesTuning"
      >
      </PrimeButton>
      <PrimeButton
        severity="secondary"
        icon="pi pi-plus"
        label="Allowed Rule"
        @click="openCreateDrawerWafAllowed"
      />
    </template>
    <template #illustration>
      <Illustration />
    </template>
  </EmptyResultsBlock>

  <CreateDrawerBlock
    v-if="showCreateWafRulesAllowedDrawer"
    v-model:visible="showCreateWafRulesAllowedDrawer"
    :createService="handleCreateWafRulesAllowedService"
    :schema="validationSchemaAllowed"
    :initialValues="initialValues"
    @onSuccess="reloadWafRulesAllowedList"
    title="Create New"
  >
    <template #formFields>
      <FormFieldsAllowed :optionsRuleIds="props.optionsRuleIds"></FormFieldsAllowed>
    </template>
  </CreateDrawerBlock>

  <EditDrawerBlock
    v-if="showEditWafRulesAllowedDrawer"
    :id="selectedWafRulesAllowedToEdit"
    v-model:visible="showEditWafRulesAllowedDrawer"
    :loadService="handleLoadWafRulesAllowedService"
    :editService="handleEditWafRulesAllowedService"
    :schema="validationSchemaAllowed"
    @onSuccess="reloadWafRulesAllowedList"
    title="Edit Waf Rules Allowed"
  >
    <template #formFields>
      <FormFieldsAllowed
        :disabledRuleId="true"
        :optionsRuleIds="props.optionsRuleIds"
      />
    </template>
  </EditDrawerBlock>
</template>
<script setup>
  import Illustration from '@/assets/svg/illustration-layers.vue'
  import EmptyResultsBlock from '@/templates/empty-results-block'
  import { columnBuilder } from '@/templates/list-table-block/columns/column-builder'
  import CreateDrawerBlock from '@templates/create-drawer-block'
  import EditDrawerBlock from '@templates/edit-drawer-block'
  import ListTableNoHeaderBlock from '@templates/list-table-block/no-header'
  import PrimeButton from 'primevue/button'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import * as yup from 'yup'
  import FormFieldsAllowed from './FormFields/FormFieldsAllowed.vue'

  const route = useRoute()
  const hasContentToList = ref(true)
  const selectedWafRulesAllowedToEdit = ref(0)
  const showEditWafRulesAllowedDrawer = ref(false)
  const showCreateWafRulesAllowedDrawer = ref(false)
  const listAllowedRef = ref('')

  const emit = defineEmits(['update:visible', 'attack-on', 'handle-go-to-tuning'])

  const props = defineProps({
    listWafRulesAllowedService: {
      type: Function,
      required: true
    },
    deleteWafRulesAllowedService: {
      type: Function,
      required: true
    },
    createWafRulesAllowedService: {
      type: Function,
      required: true
    },
    loadWafRulesAllowedService: {
      type: Function,
      required: true
    },
    editWafRulesAllowedService: {
      type: Function,
      required: true
    },
    documentationServiceAllowed: {
      required: true,
      type: Function
    },
    optionsRuleIds: {
      required: true,
      type: Array,
      default: () => []
    }
  })

  const validationSchemaAllowed = yup.object({
    matchZones: yup.array(),
    path: yup.string().required(),
    reason: yup.string().required(),
    ruleId: yup.string().required().label('rule id'),
    status: yup.boolean(),
    useRegex: yup.boolean()
  })

  const initialValues = {
    matchZones: [{ matches_on: 'value', zone: 'path', zone_input: null }],
    path: '',
    reason: '',
    ruleId: 0,
    status: true,
    useRegex: false
  }

  const wafRuleId = ref(route.params.id)

  const wafRulesAllowedColumns = ref([
    {
      field: 'ruleId',
      header: 'Rule ID',
      type: 'component',
      component: (columnData) =>
        columnBuilder({ data: columnData, columnAppearance: 'expand-text-column' })
    },
    {
      field: 'reason',
      header: 'Description',
      type: 'component',
      component: (columnData) =>
        columnBuilder({ data: columnData, columnAppearance: 'expand-text-column' })
    },

    {
      field: 'path',
      header: 'URI'
    },
    {
      field: 'matchZones',
      header: 'Match Zone Set',
      type: 'component',
      component: (columnData) =>
        columnBuilder({ data: columnData, columnAppearance: 'expand-column' })
    },
    {
      field: 'lastModified',
      header: 'Last Modified'
    },
    {
      field: 'status',
      header: 'Status',
      type: 'component',
      component: (columnData) =>
        columnBuilder({
          data: columnData,
          columnAppearance: 'tag'
        })
    }
  ])

  const reloadWafRulesAllowedList = () => {
    if (hasContentToList.value) {
      listAllowedRef.value.reload()
      return
    }
    hasContentToList.value = true
  }

  const handleLoadData = (event) => {
    hasContentToList.value = event
  }

  const goToWafRulesTuning = () => {
    emit('handle-go-to-tuning', { index: 1 })
  }
  const handleListWafRulesAllowedService = async () => {
    return await props.listWafRulesAllowedService({ wafId: wafRuleId.value })
  }

  const handleDeleteWafRulesAllowedService = async (id) => {
    return await props.deleteWafRulesAllowedService({
      wafId: wafRuleId.value,
      allowedId: id
    })
  }

  const handleCreateWafRulesAllowedService = async (payload) => {
    return await props.createWafRulesAllowedService({ payload, id: wafRuleId.value })
  }

  const handleLoadWafRulesAllowedService = async (allowedId) => {
    return await props.loadWafRulesAllowedService({ id: wafRuleId.value, allowedId })
  }

  const handleEditWafRulesAllowedService = async (payload) => {
    return await props.editWafRulesAllowedService({
      payload,
      wafId: wafRuleId.value,
      allowedId: selectedWafRulesAllowedToEdit.value
    })
  }

  const openEditDrawerWafRulesAllowed = (event) => {
    selectedWafRulesAllowedToEdit.value = parseInt(event.id)
    showEditWafRulesAllowedDrawer.value = true
  }

  const openCreateDrawerWafAllowed = () => {
    showCreateWafRulesAllowedDrawer.value = true
  }
</script>
