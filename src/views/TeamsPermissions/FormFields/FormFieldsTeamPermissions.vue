<!-- eslint-disable vue/no-mutating-props -->
<script setup>
  import { watch, ref, onMounted } from 'vue'

  import FormHorizontal from '@/templates/create-form-block/form-horizontal'
  import InputText from 'primevue/inputtext'
  import PickList from 'primevue/picklist'
  import InputSwitch from 'primevue/inputswitch'
  import { useField } from 'vee-validate'

  const props = defineProps({
    listPermissionService: {
      type: Function,
      required: true
    }
  })

  const permissionsList = ref([])

  const { value: name, errorMessage: errorName } = useField('name')
  const { value: isActive } = useField('isActive')
  const { value: permissions } = useField('permissions')

  const isAlreadySelected = ({ alreadySelectedPermissionsIds, id }) => {
    return alreadySelectedPermissionsIds.includes(id)
  }

  const formAlredyInitialized = ref(false)

  const fetchPermissions = async () => {
    const teamPermissions = await props.listPermissionService()
    const alreadySelectedPermissionsIds = permissions.value.map((permission) => permission.id)

    const alreadySelectedPermissions =
      teamPermissions.filter((permission) =>
        alreadySelectedPermissionsIds.includes(permission.id)
      ) || []
    const notSelectedPermissions = teamPermissions.filter(
      (teamPermissionItem) =>
        !isAlreadySelected({ alreadySelectedPermissionsIds, id: teamPermissionItem.id })
    )
    permissionsList.value = [notSelectedPermissions, alreadySelectedPermissions]
  }

  watch(permissionsList, (newPermissions) => {
    if (formAlredyInitialized.value) {
      const selectedPermissions = newPermissions[1]
      permissions.value = selectedPermissions
    }
  })

  onMounted(async () => {
    await fetchPermissions()
    formAlredyInitialized.value = true
  })
</script>
<template>
  <FormHorizontal
    title="General"
    description="Use permissions to manage and oversee users by defining access levels of client accounts.
"
  >
    <template #inputs>
      <div class="flex flex-col sm:max-w-lg w-full gap-2">
        <label
          for="name"
          class="text-color text-base font-medium"
          >Name *
        </label>
        <InputText
          v-model="name"
          type="text"
          id="name"
          :class="{ 'p-invalid': errorName }"
        />
        <small class="text-xs text-color-secondary font-normal leading-tight">
          Give a unique and easy-to-remember name.
        </small>
        <small
          v-if="errorName"
          class="p-error text-xs font-normal leading-tight"
          >{{ errorName }}</small
        >
      </div>
    </template>
  </FormHorizontal>
  <FormHorizontal
    title="Teams Permissions"
    description="Determine the level of access of the clients and assign permissions according to their team. Teams can be created based on the role and tasks of assigned clients.
"
  >
    <template #inputs>
      <div class="flex flex-col sm:max-w-3xl w-full gap-2">
        <label
          for="value"
          class="text-color text-base font-medium"
          >Permissions *
        </label>
        <PickList
          v-model="permissionsList"
          :pt="{
            sourceList: { class: ['h-80'] },
            targetList: { class: ['h-80'] }
          }"
          dataKey="id"
          breakpoint="1400px"
          :showSourceControls="false"
          :showTargetControls="false"
        >
          <template #sourceheader>Available Permissions</template>
          <template #targetheader>Chosen Permissions</template>
          <template #item="slotProps">
            <div>
              <div>
                <span class="font-normal">{{ slotProps.item.name }}</span>
              </div>
            </div>
          </template>
        </PickList>
        <small class="text-color-secondary text-sm font-normal leading-tight">
          Select an item from the list and then use the arrows to move it between the available and
          selected permissions boxes. Use the double-line arrows to move all items.
        </small>
      </div>
    </template>
  </FormHorizontal>
  <FormHorizontal title="Status">
    <template #inputs>
      <div class="flex flex-col w-full gap-2">
        <div
          class="flex gap-6 md:align-items-center max-sm:flex-col max-sm:align-items-baseline max-sm:gap-3"
        >
          <span class="p-input-icon-right w-full flex max-w-lg items-start gap-2 pb-3 pt-2">
            <InputSwitch
              v-model="isActive"
              id="active"
            />
            <div class="flex-col gap-1">
              <span class="text-color text-sm font-normal leading-5">Active</span>
            </div>
          </span>
        </div>
        <small class="text-color-secondary text-sm font-normal leading-tight">
          Activate or deactivate the team permissions for all clients within the team.
        </small>
      </div>
    </template>
  </FormHorizontal>
</template>
