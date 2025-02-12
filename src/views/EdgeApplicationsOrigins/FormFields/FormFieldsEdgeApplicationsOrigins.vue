<script setup>
  import FormHorizontal from '@/templates/create-form-block/form-horizontal'
  import FieldText from '@/templates/form-fields-inputs/fieldText'
  import PrimeButton from 'primevue/button'
  import Divider from 'primevue/divider'
  import Dropdown from 'primevue/dropdown'
  import InputNumber from 'primevue/inputnumber'
  import InputSwitch from 'primevue/inputswitch'
  import InputText from 'primevue/inputtext'
  import RadioButton from 'primevue/radiobutton'
  import { useField, useFieldArray } from 'vee-validate'
  import { computed, ref, watch } from 'vue'

  const props = defineProps({
    disabledFields: {
      type: Boolean,
      default: false
    },
    copyToClipboard: {
      type: Function,
      required: true
    },
    listOrigins: {
      required: true,
      type: Array
    },
    generatedOriginKey: {
      type: String,
      required: false
    }
  })

  const METHOD_TYPES_OPTIONS = [
    {
      label: 'IP Hash',
      value: 'ip_hash'
    },
    {
      label: 'Least connections',
      value: 'least_connections'
    },
    {
      label: 'Round-Robin',
      value: 'round_robin'
    }
  ]

  const ORIGIN_PROTOCOL_POLICIES = [
    {
      label: 'Preserve HTTP/HTTPS protocol',
      value: 'preserve'
    },
    {
      label: 'Enforce HTTP',
      value: 'http'
    },
    {
      label: 'Enforce HTTPS',
      value: 'https'
    }
  ]

  const SERVER_ROLES = [
    {
      label: 'Primary',
      value: 'primary'
    },
    {
      label: 'Backup',
      value: 'backup'
    }
  ]
  const originKeyInput = ref('')

  const { value: originKey, setValue: setOriginKey } = useField('originKey')
  const { value: name } = useField('name')
  const { value: hostHeader } = useField('hostHeader')
  const {
    push: pushAddress,
    remove: removeAddress,
    replace: resetAddresses,
    fields: addresses
  } = useFieldArray('addresses')
  const { value: originType } = useField('originType')
  const { value: originProtocolPolicy } = useField('originProtocolPolicy')
  const { value: method } = useField('method')
  const { value: originPath } = useField('originPath')
  const { value: connectionTimeout } = useField('connectionTimeout')
  const { value: timeoutBetweenBytes } = useField('timeoutBetweenBytes')
  const { value: hmacAuthentication } = useField('hmacAuthentication')
  const { value: hmacRegionName } = useField('hmacRegionName')
  const { value: hmacAccessKey } = useField('hmacAccessKey')
  const { value: hmacSecretKey } = useField('hmacSecretKey')

  const isSingleOriginType = computed(() => originType.value === 'single_origin')
  const isLoadBalancerOriginType = computed(() => originType.value === 'load_balancer')
  const isHmacAuthentication = computed(() => !!hmacAuthentication.value)
  const isIpHashMethod = computed(() => method.value === 'ip_hash')

  const defaultAddress = {
    address: '',
    weight: 1,
    serverRole: 'primary',
    isActive: true
  }

  const resetAddressesFields = (option) => {
    resetAddresses([{ ...defaultAddress }])
    if (option.value === 'load_balancer') {
      method.value = 'ip_hash'
      pushAddress({ ...defaultAddress })
    }
  }

  const removeCurrentAddress = (index) => {
    removeAddress(index)
    if (addresses.value.length === 1) {
      pushAddress({ ...defaultAddress })
    }
  }

  const addAddress = () => {
    pushAddress({ ...defaultAddress })
  }

  const scrollOriginKey = () => {
    originKeyInput.value.$el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  watch(
    () => props.generatedOriginKey,
    (value) => {
      setOriginKey(value)
    }
  )

  defineExpose({
    scrollOriginKey
  })
</script>

<template>
  <FormHorizontal
    :isDrawer="true"
    title="General"
    description="Create a origin server configuration for the edge application. Use Rules Engine to activate origins."
  >
    <template #inputs>
      <div class="flex flex-col sm:max-w-lg w-full gap-2">
        <FieldText
          label="Name *"
          placeholder="My origin"
          name="name"
          :value="name"
          description="Give a unique and descriptive name to identify the origin."
        />
      </div>
    </template>
  </FormHorizontal>

  <FormHorizontal
    :isDrawer="true"
    title="Origin Key"
    description="Save the origin to visualize the key attributed by Azion to this configuration."
  >
    <template #inputs>
      <div
        class="flex w-full gap-6 items-end max-sm:flex-col max-sm:align-items-baseline flex-wrap max-sm:gap-3:flex-col"
      >
        <div class="flex flex-col sm:max-w-lg w-full gap-2">
          <label class="text-color text-sm font-medium leading-5">Key</label>
          <span class="p-input-icon-right w-full flex max-w-lg flex-col items-start gap-2">
            <i
              class="pi pi-lock text-color-secondary"
              v-if="true"
            />
            <InputText
              class="w-full"
              v-model="originKey"
              ref="originKeyInput"
              type="text"
              :disabled="true"
            />
          </span>
        </div>
        <PrimeButton
          class="h-8 max-sm:w-full"
          icon="pi pi-clone"
          outlined
          type="button"
          aria-label="Copy Origin Key"
          label="Copy to Clipboard"
          :disabled="!originKey"
          @click="props.copyToClipboard(originKey)"
        />
      </div>
    </template>
  </FormHorizontal>

  <FormHorizontal
    :isDrawer="true"
    title="Host Settings"
    description="Customize settings related to origin servers and hosts."
  >
    <template #inputs>
      <div class="flex w-80 flex-col gap-2 sm:max-w-lg max-sm:w-full">
        <label
          for="originType"
          class="text-color text-sm font-medium leading-5"
          >Type *</label
        >
        <Dropdown
          @change="resetAddressesFields"
          inputId="originType"
          v-model="originType"
          :options="props.listOrigins"
          optionLabel="label"
          option-value="value"
          :optionDisabled="(option) => option.disabled"
        />
        <small
          class="text-xs text-color-secondary font-normal leading-5"
          v-if="!isLoadBalancerOriginType"
        >
          Select an option to customize the origin.
        </small>
      </div>
      <div class="flex flex-col w-full sm:max-w-3xl gap-2">
        <label class="text-color text-sm font-medium leading-5">Protocol Policy</label>
        <div class="flex flex-col gap-4">
          <div
            class="flex no-wrap gap-2 items-center"
            v-for="policy in ORIGIN_PROTOCOL_POLICIES"
            :key="policy.value"
          >
            <RadioButton
              v-model="originProtocolPolicy"
              :inputId="policy.value"
              name="originProtocolPolicy"
              :value="policy.value"
            />
            <label
              :for="policy.value"
              class="text-color text-sm font-normal leading-tight"
            >
              {{ policy.label }}
            </label>
          </div>
        </div>
        <small class="text-color-secondary text-xs font-normal leading-5">
          Select the protocol usage between the edge nodes and the origin.
        </small>
      </div>
      <div
        class="flex flex-col sm:max-w-lg w-full gap-2"
        v-if="isLoadBalancerOriginType"
      >
        <label
          for="method"
          class="text-color text-sm font-medium leading-5"
          >Method *</label
        >
        <Dropdown
          inputId="method"
          v-model="method"
          :options="METHOD_TYPES_OPTIONS"
          optionLabel="label"
          option-value="value"
        />
      </div>
      <div
        class="flex flex-col sm:max-w-lg w-full gap-2"
        v-if="isSingleOriginType"
      >
        <FieldText
          label="Address *"
          placeholder="example.com"
          :name="`addresses[0].address`"
          :value="addresses[0].value.address"
          description="Define an origin for the content in FQDN format or an IPv4/IPv6 address."
        />
      </div>
      <div class="flex flex-col sm:max-w-lg w-full gap-2">
        <FieldText
          label="Host Header *"
          placeholder="${host}"
          name="hostHeader"
          :value="hostHeader"
          description="Identify a virtualhost sent in the Host header to the origin."
        />
      </div>
      <div class="flex flex-col sm:max-w-lg w-full gap-2">
        <FieldText
          label="Path"
          placeholder="/example.com/path/content.txt"
          name="originPath"
          :value="originPath"
          description="Specify a custom path from which edge nodes will request the origin content. If this is
          blank, Azion will use the Address as the default."
        />
      </div>
    </template>
  </FormHorizontal>

  <FormHorizontal
    v-if="isLoadBalancerOriginType"
    :isDrawer="true"
    title="Origins"
    description="Add one or more origins in your settings."
  >
    <template #inputs>
      <div
        class="flex flex-col items-start gap-6"
        v-for="(address, index) in addresses"
        :key="address.key"
      >
        <div class="flex flex-col w-full gap-2">
          <Divider
            class="px-3 z-0"
            align="left"
            type="dashed"
            v-if="address.isFirst"
          >
            Then
          </Divider>
          <div
            v-else
            class="flex gap-3"
          >
            <Divider
              class="px-3 z-0"
              align="left"
              type="dashed"
            >
              And
            </Divider>
            <PrimeButton
              class="h-8 max-sm:w-full position-absolute right-0 top-0"
              icon="pi pi-trash"
              outlined
              type="button"
              aria-label="Remove Origin"
              @click="removeCurrentAddress(index)"
            />
          </div>
        </div>
        <div class="flex flex-col sm:max-w-lg w-full gap-2">
          <FieldText
            label="Address *"
            placeholder="example.com"
            :name="`addresses[${index}].address`"
            :value="addresses[index].value.address"
            description="Define an origin for the content, in FQDN format or an IPv4/IPv6 address."
          />
        </div>
        <div class="flex w-80 flex-col gap-2 sm:max-w-lg max-sm:w-full">
          <label
            :for="`${address.key}-weight`"
            class="text-color text-sm font-medium leading-5"
            >Weights</label
          >
          <InputNumber
            v-model="address.value.weight"
            :inputId="`${address.key}-weight`"
            mode="decimal"
            showButtons
            :min="0"
            :max="10"
          />
          <small class="text-xs text-color-secondary font-normal leading-5">
            Assigning to determine how much traffic a server can handle in comparison with each
            other.
          </small>
        </div>
        <div
          class="flex flex-col gap-2"
          v-if="!isIpHashMethod"
        >
          <label class="text-color text-sm not-italic font-medium leading-5">Server Role</label>
          <div class="flex flex-col gap-4">
            <div
              class="flex no-wrap gap-2 items-center"
              v-for="role in SERVER_ROLES"
              :key="role.value"
            >
              <RadioButton
                v-model="address.value.serverRole"
                :inputId="`${address.key}-${role.value}`"
                name="serverRole"
                :value="role.value"
              />
              <label
                :for="`${address.key}-${role.value}`"
                class="text-color text-sm font-normal leading-tight"
              >
                {{ role.label }}
              </label>
            </div>
          </div>
          <small class="text-color-secondary text-xs not-italic font-normal leading-5">
            Marking an origin as a backup server to specify that it will receive HTTP requests only
            if all primary servers are unavailable.
          </small>
        </div>
        <div class="flex w-full gap-2 items-start">
          <InputSwitch
            v-model="address.value.isActive"
            :inputId="`${address.key}-active`"
          />

          <label
            :for="`${address.key}-active`"
            class="flex flex-col items-start gap-1"
          >
            <span class="text-color text-sm font-normal leading-5"> Active </span>
            <span class="text-sm text-color-secondary font-normal leading-5"> Description</span>
          </label>
        </div>
      </div>
      <div class="flex flex-col w-full gap-2">
        <Divider type="dashed" />
      </div>
      <div>
        <PrimeButton
          class="h-8 max-sm:w-full"
          icon="pi pi-plus-circle"
          outlined
          type="button"
          aria-label="New Origin"
          label="New Origin"
          @click="addAddress"
        />
      </div>
    </template>
  </FormHorizontal>

  <FormHorizontal
    :isDrawer="true"
    v-if="isSingleOriginType"
    title="HMAC authentication"
    description="Provide HMAC authentication credentials to deliver private content."
  >
    <template #inputs>
      <div class="flex flex-col w-full gap-2">
        <div
          class="flex gap-6 md:align-items-center max-sm:flex-col max-sm:align-items-baseline max-sm:gap-3"
        >
          <span class="p-input-icon-right w-full flex max-w-lg items-start gap-2 pb-3 pt-2">
            <InputSwitch
              v-model="hmacAuthentication"
              inputId="hmacAuthentication"
            />
            <label
              for="hmacAuthentication"
              class="text-color text-sm font-normal leading-5"
              >Active</label
            >
          </span>
        </div>
      </div>
      <div
        class="max-w-3xl w-full flex flex-col gap-8 max-md:gap-6"
        v-if="isHmacAuthentication"
      >
        <div class="flex flex-col sm:max-w-lg w-full gap-2">
          <FieldText
            label="Region Name *"
            name="hmacRegionName"
            :value="hmacRegionName"
            description="Enter the Region supported by the object storage provider."
          />
        </div>
        <div class="flex flex-col sm:max-w-lg w-full gap-2">
          <FieldText
            label="Access Key *"
            name="hmacAccessKey"
            :value="hmacAccessKey"
            description="Enter the Access Key provided by the object storage provider."
          />
        </div>
        <div class="flex flex-col sm:max-w-lg w-full gap-2">
          <FieldText
            label="Secret Key *"
            name="hmacSecretKey"
            :value="hmacSecretKey"
            description="Enter the Secret Key provided by the object storage provider."
          />
        </div>
      </div>
    </template>
  </FormHorizontal>

  <FormHorizontal
    :isDrawer="true"
    title="Timeouts"
    description="Timeout settings are pre-defined by Azion and can’t be customized."
  >
    <template #inputs>
      <div class="w-full flex max-sm:flex-col gap-8 max-md:gap-6">
        <div class="flex flex-col sm:max-w-lg w-full gap-2">
          <label
            for="name"
            class="text-color text-sm font-medium leading-5"
            >Connection</label
          >
          <span class="p-input-icon-right w-full flex max-w-lg flex-col items-start gap-2">
            <i class="pi pi-lock text-color-secondary" />
            <InputText
              class="w-full"
              v-model="connectionTimeout"
              placeholder="60 seconds"
              type="text"
              disabled
            />
          </span>
          <small class="text-xs text-color-secondary font-normal leading-5">
            The amount of time that Azion will wait for a response from the origin before showing an
            error.
          </small>
        </div>
        <div class="flex flex-col sm:max-w-lg w-full gap-2">
          <label
            for="name"
            class="text-color text-sm font-medium leading-5"
          >
            Between bytes
          </label>
          <span class="p-input-icon-right w-full flex max-w-lg flex-col items-start gap-2">
            <i class="pi pi-lock text-color-secondary" />
            <InputText
              class="w-full"
              v-model="timeoutBetweenBytes"
              placeholder="120 bytes"
              type="text"
              disabled
            />
          </span>
          <small class="text-xs text-color-secondary font-normal leading-5">
            The amount of time that Azion will wait between receiving two packets of a response from
            the origin.
          </small>
        </div>
      </div>
    </template>
  </FormHorizontal>
</template>
