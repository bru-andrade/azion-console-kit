<template>
  <DrawerFunction
    ref="drawerFunctionRef"
    :edgeApplicationId="props.edgeApplicationId"
    :createFunctionService="props.createFunctionService"
    :listEdgeFunctionsService="props.listEdgeFunctionsService"
    :loadFunctionService="props.loadFunctionService"
    :editFunctionService="props.editFunctionService"
    @onSuccess="reloadList"
  />
  <div v-if="hasContentToList">
    <ListTableBlock
      ref="listFunctionsEdgeApplicationsRef"
      :listService="listFunctionsInstance"
      :deleteService="deleteFunctionsWithDecorator"
      :columns="getColumns"
      :editInDrawer="openEditFunctionDrawer"
      pageTitleDelete="Function"
      @on-load-data="handleLoadData"
    >
      <template #addButton>
        <PrimeButton
          icon="pi pi-plus"
          label="Instance"
          @click="openCreateFunctionDrawer"
        />
      </template>
    </ListTableBlock>
  </div>
  <EmptyResultsBlock
    v-else
    title="No functions have been instantiated"
    description="Click the button below to initiate the setup process and instantiate your first edge function."
    createButtonLabel="Add"
    :documentationService="props.documentationService"
    :inTabs="true"
  >
    <template #default>
      <PrimeButton
        severity="secondary"
        icon="pi pi-plus"
        label="Add"
        @click="openCreateFunctionDrawer"
      />
    </template>
    <template #illustration>
      <Illustration />
    </template>
  </EmptyResultsBlock>
</template>

<script setup>
  import Illustration from '@/assets/svg/illustration-layers'
  import EmptyResultsBlock from '@/templates/empty-results-block'
  import { columnBuilder } from '@/templates/list-table-block/columns/column-builder'
  import ListTableBlock from '@/templates/list-table-block/no-header'
  import PrimeButton from 'primevue/button'
  import { computed, ref } from 'vue'
  import DrawerFunction from './Drawer'

  defineOptions({ name: 'list-edge-applications-functions-tab' })

  const hasContentToList = ref(true)

  const props = defineProps({
    edgeApplicationId: {
      required: true,
      type: String
    },
    listEdgeApplicationFunctionsService: {
      required: true,
      type: Function
    },
    documentationService: {
      required: true,
      type: Function
    },
    listEdgeFunctionsService: {
      required: true,
      type: Function
    },
    loadFunctionService: {
      required: true,
      type: Function
    },
    createFunctionService: {
      required: true,
      type: Function
    },
    editFunctionService: {
      required: true,
      type: Function
    },
    deleteFunctionService: {
      required: true,
      type: Function
    }
  })

  const drawerFunctionRef = ref('')
  const listFunctionsEdgeApplicationsRef = ref('')

  const getColumns = computed(() => {
    return [
      {
        field: 'name',
        header: 'Name',
        type: 'component',
        filterPath: 'name.text',
        component: (columnData) => {
          return columnBuilder({
            data: columnData,
            columnAppearance: 'text-with-tag'
          })
        }
      },
      {
        field: 'functionInstanced',
        header: 'Function Instanced'
      },
      {
        field: 'version',
        header: 'Version'
      },
      {
        field: 'lastEditor',
        header: 'Last Editor'
      },
      {
        field: 'modified',
        sortField: 'lastModifiedDate',
        header: 'Last Modified'
      }
    ]
  })

  const listFunctionsInstance = async () => {
    return await props.listEdgeApplicationFunctionsService(props.edgeApplicationId)
  }

  const deleteFunctionsWithDecorator = async (functionId) => {
    return await props.deleteFunctionService(functionId, props.edgeApplicationId)
  }

  const handleLoadData = (event) => {
    hasContentToList.value = event
  }

  const openCreateFunctionDrawer = () => {
    drawerFunctionRef.value.openDrawerCreate()
  }

  const openEditFunctionDrawer = (data) => {
    drawerFunctionRef.value.openDrawerEdit(data.id)
  }

  const reloadList = () => {
    if (hasContentToList.value) {
      listFunctionsEdgeApplicationsRef.value.reload()
      return
    }
    hasContentToList.value = true
  }
</script>
