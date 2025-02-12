<script setup>
  import FormHorizontal from '@/templates/create-form-block/form-horizontal'
  import FieldText from '@/templates/form-fields-inputs/fieldText'
  import PrimeButton from 'primevue/button'
  import Card from 'primevue/card'
  import Dropdown from 'primevue/dropdown'
  import InputNumber from 'primevue/inputnumber'
  import InputSwitch from 'primevue/inputswitch'
  import InputText from 'primevue/inputtext'
  import RadioButton from 'primevue/radiobutton'
  import PrimeTag from 'primevue/tag'
  import { useField } from 'vee-validate'
  import { computed } from 'vue'

  const props = defineProps({
    handleBlock: {
      type: Array,
      required: false,
      default: () => ['full']
    },
    contactSalesEdgeApplicationService: {
      type: Function
    }
  })

  const HTTP_PORT_LIST_OPTIONS = [
    { label: '80 (Default)', value: '80' },
    { label: '8008', value: '8008' },
    { label: '8080', value: '8080' }
  ]
  const HTTPS_PORT_LIST_OPTIONS = [
    { label: '443 (Default)', value: '443' },
    { label: '8443', value: '8443' },
    { label: '9440', value: '9440' },
    { label: '9441', value: '9441' },
    { label: '9442', value: '9442' },
    { label: '9443', value: '9443' }
  ]
  const TLS_VERSIONS_OPTIONS = [
    { label: 'None', value: '' },
    { label: 'TLS 1.0', value: 'tls_1_0' },
    { label: 'TLS 1.1', value: 'tls_1_1' },
    { label: 'TLS 1.2', value: 'tls_1_2' },
    { label: 'TLS 1.3', value: 'tls_1_3' }
  ]
  const SUPPORTED_LIST_OPTIONS = [
    { label: 'All', value: 'all' },
    { label: 'TLSv1.2_2018', value: '2018' },
    { label: 'TLSv1.2_2019', value: '2019' },
    { label: 'TLSv1.2_2021', value: '2021' },
    { label: 'TLSv1.3_2022', value: '2022' }
  ]
  const ORIGIN_TYPE_LIST_OPTIONS = [{ label: 'Single Origin', value: 'single_origin' }]

  const { value: deliveryProtocol } = useField('deliveryProtocol')
  const { value: http3 } = useField('http3')
  const { value: httpPort } = useField('httpPort')
  const { value: httpsPort } = useField('httpsPort')
  const { value: minimumTlsVersion } = useField('minimumTlsVersion')
  const { value: supportedVersion } = useField('supportedVersion')
  const { value: originType } = useField('originType')
  const { value: cdnCacheSettings } = useField('cdnCacheSettings')
  const { value: browserCacheSettings } = useField('browserCacheSettings')
  const { value: originProtocolPolicy } = useField('originProtocolPolicy')
  const { value: debugRules } = useField('debugRules')

  const { value: name } = useField('name')
  const { value: address, errorMessage: addressError } = useField('address')
  const { value: hostHeader, errorMessage: hostHeaderError } = useField('hostHeader')
  const { value: browserCacheSettingsMaximumTtl } = useField('browserCacheSettingsMaximumTtl')
  const { value: cdnCacheSettingsMaximumTtl } = useField('cdnCacheSettingsMaximumTtl')

  const { value: websocket } = useField('websocket')
  const { value: applicationAcceleration } = useField('applicationAcceleration')
  const { value: caching } = useField('caching')
  const { value: deviceDetection } = useField('deviceDetection')
  const { value: edgeFunctions } = useField('edgeFunctions')
  const { value: imageOptimization } = useField('imageOptimization')
  const { value: l2Caching } = useField('l2Caching')
  const { value: loadBalancer } = useField('loadBalancer')

  const setDeliveryProtocol = (protocol, enableHttp3) => {
    deliveryProtocol.value = protocol
    http3.value = enableHttp3
    setDefaultHttpAndHttpsPort(enableHttp3)
  }

  const setDefaultHttpAndHttpsPort = (enableHttp3) => {
    if (enableHttp3) {
      httpPort.value = { label: '80 (Default)', value: '80' }
      httpsPort.value = { label: '443 (Default)', value: '443' }
    }
  }

  const handleBlock = (block) => {
    const handle =
      props.handleBlock.filter((value) => {
        return value === block
      }).length > 0

    return handle
  }

  const isHttpProtocol = computed(() => deliveryProtocol.value === 'http')
  const isHttpsProtocol = computed(() => deliveryProtocol.value === 'http,https' && !http3.value)
  const isHttp3Protocol = computed(() => deliveryProtocol.value === 'http,https' && http3.value)
  const isBrowserCacheTypeHonor = computed(() => browserCacheSettings.value === 'honor')
  const websocketIsEnabled = computed(() => websocket.value)
  const l2CachingIsEnable = computed(() => l2Caching.value)
  const cdnCacheSettingsIsOverride = computed(() => cdnCacheSettings.value === 'override')
</script>

<template>
  <FormHorizontal
    title="General"
    description="Create an edge application to deliver your content from the edge."
    v-if="handleBlock('general')"
  >
    <template #inputs>
      <div class="flex flex-col sm:max-w-lg w-full gap-2">
        <FieldText
          label="Name *"
          name="name"
          placeholder="My edge application"
          :value="name"
          description="Give a unique and descriptive name to identify the edge application."
        />
      </div>
    </template>
  </FormHorizontal>

  <FormHorizontal
    title="Delivery Settings"
    description="Choose the delivery protocols for the application."
    v-if="handleBlock('delivery-settings')"
  >
    <template #inputs>
      <div class="flex flex-col gap-2">
        <label
          for="city"
          class="text-color text-base font-medium"
          >Delivery Protocols HTTP</label
        >
        <div class="flex flex-col gap-3">
          <Card
            :pt="{
              root: { class: 'shadow-none border-b rounded-none surface-border' },
              body: { class: 'py-4 border-0' },
              title: { class: 'flex items-center text-base m-0 gap-3 font-medium' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <InputSwitch
                class="pl-10"
                v-model="isHttpProtocol"
                name="http"
                value="http"
                @click="setDeliveryProtocol('http', false)"
              />
              <div class="flex-col gap-1">
                <div class="text-color text-sm font-normal">HTTP support</div>
                <div class="self-stretch text-color-secondary text-sm font-normal">
                  Use the HTTP protocol between the edge and users.
                </div>
              </div>
            </template>
          </Card>

          <Card
            :pt="{
              root: { class: 'shadow-none border-b rounded-none surface-border' },
              body: { class: 'py-4 border-0' },
              title: { class: 'flex items-center text-base m-0 gap-3 font-medium' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <InputSwitch
                class="pl-10"
                v-model="isHttpsProtocol"
                @click="setDeliveryProtocol('http,https', false)"
                name="http,https"
                value="http,https"
              />
              <div class="flex-col gap-1">
                <div class="text-color text-sm font-normal">HTTP and HTTPS support</div>
                <div class="self-stretch text-color-secondary text-sm font-normal">
                  Use both the HTTP and HTTPS protocols between the edge and users.
                </div>
              </div>
            </template>
          </Card>

          <Card
            :pt="{
              root: { class: 'shadow-none border-b rounded-none surface-border' },
              body: { class: 'py-4 border-0' },
              title: { class: 'flex items-center text-base m-0 gap-3 font-medium' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <InputSwitch
                class="pl-10"
                v-model="isHttp3Protocol"
                @click="setDeliveryProtocol('http,https', true)"
                name="http,https"
                value="http,https"
              />
              <div class="flex-col gap-1">
                <div class="text-color text-sm font-normal">HTTP, HTTPS, and HTTP/3 support</div>
                <div class="self-stretch text-color-secondary text-sm font-normal">
                  Use both the HTTP and HTTPS protocols between the edge and users and enable HTTP/3
                  support.
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>

      <div class="flex gap-6 max-sm:flex-col">
        <div class="flex flex-col w-full sm:max-w-xs gap-2">
          <label
            for="port-http"
            class="text-color text-base font-medium"
            >HTTP Ports <span v-if="isHttpProtocol || isHttpsProtocol">*</span></label
          >
          <span class="p-input-icon-right">
            <i class="pi pi-lock text-[var(--text-color-secondary)]" />
            <Dropdown
              :options="HTTP_PORT_LIST_OPTIONS"
              v-model="httpPort"
              optionLabel="label"
              placeholder="Select an HTTP port"
              class="w-full"
              :disabled="isHttp3Protocol"
              :pt="{
                trigger: {
                  class: `${isHttp3Protocol ? 'hidden' : ''}`
                }
              }"
            />
          </span>
        </div>

        <div class="flex flex-col w-full sm:max-w-xs gap-2">
          <label
            for="port-https"
            class="text-color text-base font-medium"
            >HTTPS Ports <span v-if="isHttpsProtocol">*</span></label
          >
          <span class="p-input-icon-right">
            <i class="pi pi-lock text-[var(--text-color-secondary)]" />
            <Dropdown
              :options="HTTPS_PORT_LIST_OPTIONS"
              v-model="httpsPort"
              optionLabel="label"
              placeholder="Select an HTTPS port"
              class="w-full"
              :disabled="isHttpProtocol || isHttp3Protocol"
              :pt="{
                trigger: {
                  class: `${isHttpProtocol || isHttp3Protocol ? 'hidden' : ''}`
                }
              }"
            />
          </span>
        </div>
      </div>

      <div
        class="flex gap-6 max-sm:flex-col"
        v-if="isHttpsProtocol || isHttp3Protocol"
      >
        <div class="flex flex-col w-full sm:max-w-xs gap-2">
          <label
            for="tls-version"
            class="text-color text-base font-medium"
            >Minimum TLS version</label
          >
          <Dropdown
            :options="TLS_VERSIONS_OPTIONS"
            v-model="minimumTlsVersion"
            optionLabel="label"
            placeholder="Select a minimum TLS Version"
            :disabled="isHttpProtocol"
          />

          <div class="text-color-secondary text-sm font-normal">
            Enable HTTP and HTTPS protocols to configure the minimum TLS version the application
            supports.
          </div>
        </div>

        <div class="flex flex-col w-full sm:max-w-xs gap-2">
          <label
            for="ciphers-list"
            class="text-color text-base font-medium"
            >Cipher suite</label
          >
          <Dropdown
            :options="SUPPORTED_LIST_OPTIONS"
            v-model="supportedVersion"
            optionLabel="label"
            placeholder="Select the supported cipher suite"
            :disabled="isHttpProtocol"
          />

          <div class="text-color-secondary text-sm font-normal">
            Select which cipher suite the application supports. See the list of supported ciphers in
            the documentation.
          </div>
        </div>
      </div>
    </template>
  </FormHorizontal>

  <FormHorizontal
    title="Default Origin"
    description="Customize settings related to origin servers and hosts."
    v-if="handleBlock('default-origins')"
  >
    <template #inputs>
      <div class="flex flex-col w-full sm:max-w-xs gap-2">
        <label
          for="origin-type"
          class="text-color text-base font-medium"
          >Type *</label
        >
        <span class="p-input-icon-right">
          <i class="pi pi-lock text-[var(--text-color-secondary)]" />
          <Dropdown
            :options="ORIGIN_TYPE_LIST_OPTIONS"
            v-model="originType"
            optionLabel="label"
            placeholder="Select an origin type"
            disabled
            class="w-full"
            :pt="{
              trigger: {
                class: 'hidden'
              }
            }"
          />
        </span>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-color text-base font-medium">Protocol Policy</label>
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 items-center">
            <RadioButton
              v-model="originProtocolPolicy"
              inputId="preserve"
              name="preserve"
              value="preserve"
            />
            <label
              for="preserve"
              class="text-color text-sm font-normal"
              >Preserve HTTP/HTTPS</label
            >
          </div>
          <div class="flex gap-2 items-center">
            <RadioButton
              v-model="originProtocolPolicy"
              inputId="http"
              name="http"
              value="http"
            />
            <label
              for="http"
              class="text-color text-sm font-normal"
              >Enforce HTTP</label
            >
          </div>
          <div class="flex gap-2 items-center">
            <RadioButton
              v-model="originProtocolPolicy"
              inputId="https"
              name="https"
              value="https"
            />
            <label
              for="https"
              class="text-color text-sm font-normal"
              >Enforce HTTPS</label
            >
          </div>
        </div>
        <div class="text-color-secondary text-sm font-normal">
          Select the protocol usage between the edge nodes and the origin.
        </div>
      </div>

      <div class="flex flex-col sm:max-w-lg w-full gap-2">
        <label
          for="address"
          class="text-color text-base font-medium"
          >Address *</label
        >
        <InputText
          id="address"
          v-model="address"
          :class="{ 'p-invalid': addressError }"
          aria-describedby="address-help"
          placeholder="example.com"
        />
        <div class="text-color-secondary text-sm font-normal">
          Define an origin for the content in FQDN format or an IPv4/IPv6 address.
        </div>
        <small
          v-if="addressError"
          class="p-error text-xs font-normal leading-tight"
          >{{ addressError }}</small
        >
      </div>

      <div class="flex flex-col sm:max-w-lg w-full gap-2">
        <label
          for="host-header"
          class="text-color text-base font-medium"
          >Host Header *</label
        >
        <InputText
          id="hostHeader"
          v-model="hostHeader"
          :class="{ 'p-invalid': hostHeaderError }"
          aria-describedby="hostHeader-help"
          placeholder="${host}"
        />
        <div class="text-color-secondary text-sm font-normal">
          Identify a virtualhost sent in the Host header to the origin.
        </div>
        <small
          v-if="hostHeaderError"
          class="p-error text-xs font-normal leading-tight"
          >{{ hostHeaderError }}</small
        >
      </div>
    </template>
  </FormHorizontal>

  <FormHorizontal
    title="Cache Expiration Policies"
    description="Define how the edge should handle TTL values sent by the origin as well as how long your content should remain cached at the edge."
    v-if="handleBlock('cache-expiration-policies')"
  >
    <template #inputs>
      <div class="flex flex-col gap-2">
        <label class="text-color text-base font-medium">Browser Cache Settings</label>
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 items-center">
            <RadioButton
              v-model="browserCacheSettings"
              inputId="browserCacheSettings-override"
              name="override"
              value="override"
            />
            <label
              for="browserCacheSettings-override"
              class="text-color text-sm font-normal"
              >Override Cache Settings</label
            >
          </div>
          <div class="flex gap-2 items-center">
            <RadioButton
              v-model="browserCacheSettings"
              inputId="browserCacheSettings-honor"
              name="honor"
              value="honor"
            />
            <label
              for="browserCacheSettings-honor"
              class="text-color text-sm font-normal"
              >Honor Origin Cache Headers</label
            >
          </div>
          <div class="text-color-secondary text-sm font-normal">
            Honor cache policies from the origin or define a new maximum cache TTL for browsers.
          </div>
        </div>
      </div>

      <div
        class="flex flex-col sm:max-w-lg w-full gap-2"
        v-if="!isBrowserCacheTypeHonor"
      >
        <div class="flex flex-col w-full sm:max-w-xs gap-2">
          <label
            for="maximun-ttl-seconds"
            class="text-color text-base font-medium"
            >Maximum TTL (seconds)</label
          >

          <InputNumber
            v-model="browserCacheSettingsMaximumTtl"
            showButtons
          />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-color text-base font-medium">Edge Cache Settings</label>
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 items-center">
            <RadioButton
              v-model="cdnCacheSettings"
              inputId="cdnCacheSettings-override"
              name="override"
              value="override"
            />
            <label
              for="cdnCacheSettings-override"
              class="text-color text-sm font-normal"
              >Override Cache Settings</label
            >
          </div>
          <div class="flex gap-2 items-center">
            <RadioButton
              v-model="cdnCacheSettings"
              inputId="cdnCacheSettings-honor"
              name="honor"
              value="honor"
            />
            <label
              for="cdnCacheSettings-honor"
              class="text-color text-sm font-normal"
              >Honor Origin Cache Settings</label
            >
          </div>
          <div class="text-color-secondary text-sm font-normal">
            Honor cache policies from the origin or define a new maximum cache TTL for the edge. If
            a TTL isn't received from the origin, cache will be maintained at a default TTL.
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:max-w-lg w-full gap-2">
        <div class="flex flex-col w-full sm:max-w-xs gap-2">
          <label
            for="cdn-maximun-ttl-seconds"
            class="text-color text-base font-medium"
            >{{ cdnCacheSettingsIsOverride ? 'Maximum TTL (seconds)' : 'Default TTL' }}</label
          >

          <InputNumber
            v-model="cdnCacheSettingsMaximumTtl"
            showButtons
          />

          <div class="text-color-secondary text-sm font-normal">
            Enable Application Acceleration on the Main Settings tab to use values lower than 60
            seconds. L2 Caching requires cache TTL to be equal to or greater than 3 seconds.
          </div>
        </div>
      </div>
    </template>
  </FormHorizontal>

  <FormHorizontal
    title="Modules"
    description="Activate modules to extend the configuration possibilities of the application. Some modules require subscription."
    v-if="handleBlock('edge-application-modules')"
  >
    <template #inputs>
      <div class="flex flex-col gap-2">
        <label class="text-color text-base font-medium">Default Modules</label>
        <div class="flex flex-col gap-3">
          <Card
            :pt="{
              body: {
                class: `p-4 border rounded-md ${
                  applicationAcceleration ? 'border-orange-500' : 'border-transparent'
                }`
              },
              title: { class: 'flex justify-between items-center text-base font-medium m-0' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">Application Acceleration</span>
              <InputSwitch v-model="applicationAcceleration" />
            </template>
            <template #subtitle>Optimize protocols and manage dynamic content delivery.</template>
          </Card>
          <Card
            :pt="{
              body: { class: 'p-4 border border-orange-500 rounded-md' },
              title: { class: 'flex justify-between items-center text-base font-medium m-0' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">Edge Caching</span>
              <InputSwitch
                v-model="caching"
                disabled
              />
            </template>
            <template #subtitle>Customize advanced cache settings.</template>
            <template #footer>
              <PrimeTag
                value="Automatically enabled in all accounts."
                icon="pi pi-lock"
                severity="info"
                class="mt-3"
              />
            </template>
          </Card>
          <Card
            :pt="{
              body: {
                class: `p-4 border rounded-md ${
                  deviceDetection ? 'border-orange-500' : 'border-transparent'
                }`
              },
              title: { class: 'flex justify-between items-center text-base font-medium m-0' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">Device Detection</span>
              <InputSwitch v-model="deviceDetection" />
            </template>
            <template #subtitle
              >Activate DeviceAtlas variables to configure responsive rules.</template
            >
          </Card>
          <Card
            :pt="{
              body: {
                class: `p-4 border rounded-md ${
                  edgeFunctions ? 'border-orange-500' : 'border-transparent'
                }`
              },
              title: { class: 'flex justify-between items-center text-base font-medium m-0' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">Edge Functions</span>
              <InputSwitch v-model="edgeFunctions" />
            </template>
            <template #subtitle>Build ultra-low latency functions that run on the edge.</template>
          </Card>
          <Card
            :pt="{
              body: {
                class: `p-4 border rounded-md ${
                  imageOptimization ? 'border-orange-500' : 'border-transparent'
                }`
              },
              title: { class: 'flex justify-between items-center text-base font-medium m-0' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">Image Processor</span>
              <InputSwitch v-model="imageOptimization" />
            </template>
            <template #subtitle>Enable dynamic image editing options.</template>
          </Card>
          <Card
            :pt="{
              body: {
                class: `p-4 border rounded-md ${
                  loadBalancer ? 'border-orange-500' : 'border-transparent'
                }`
              },
              title: { class: 'flex justify-between items-center text-base font-medium m-0' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">Load Balancer</span>
              <InputSwitch v-model="loadBalancer" />
            </template>
            <template #subtitle
              >Balance traffic to your origins ensuring reliability and network congestion
              control.</template
            >
          </Card>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-color text-base font-medium">Subscription modules</label>
        <div class="flex flex-col gap-3">
          <Card
            :pt="{
              body: {
                class: `p-4 border rounded-md ${
                  l2Caching ? 'border-orange-500' : 'border-transparent'
                }`
              },
              title: { class: 'flex justify-between items-center text-base font-medium m-0' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
            :class="!l2CachingIsEnable ? 'opacity-50' : ''"
          >
            <template #title>
              <span class="text-base">L2 Caching</span>
              <InputSwitch
                v-model="l2Caching"
                :disabled="!l2CachingIsEnable"
              />
            </template>
            <template #subtitle>Enable an additional cache layer at the edge. </template>
          </Card>
          <Card
            :pt="{
              body: {
                class: `p-4 border rounded-md ${
                  websocket ? 'border-orange-500' : 'border-transparent'
                }`
              },
              title: { class: 'flex justify-between items-center text-base font-medium m-0' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
            :class="!websocketIsEnabled ? 'opacity-50' : ''"
          >
            <template #title>
              <span class="text-base">WebSocket Proxy</span>
              <InputSwitch
                v-model="websocket"
                :disabled="!websocketIsEnabled"
              />
            </template>
            <template #subtitle
              >Enhance real-time data exchange between your edge application and backend services
              using the WebSocket protocol.</template
            >
          </Card>
        </div>
        <PrimeButton
          outlined
          icon="pi pi-shopping-cart"
          class="max-w-[150px]"
          label="Contact sales"
          @click="props.contactSalesEdgeApplicationService()"
        />
      </div>
    </template>
  </FormHorizontal>

  <FormHorizontal
    title="Debug Rules"
    description="Log executed rules created in Rules Engine. Query logs using Data Streaming, Real-Time Events, or Real-Time Events GraphQL API."
    v-if="handleBlock('debug-rules')"
  >
    <template #inputs>
      <div class="flex flex-col gap-2">
        <Card
          :pt="{
            root: { class: 'shadow-none  rounded-none' },
            body: { class: 'py-4 border-0' },
            content: { class: 'ml-12' },
            title: { class: 'flex items-center text-base m-0 gap-3 font-medium' },
            subtitle: {
              class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
            }
          }"
        >
          <template #title>
            <InputSwitch
              v-model="debugRules"
              inputId="debugRules"
            />
            <div class="flex-col gap-1">
              <label
                for="debugRules"
                class="text-color text-sm font-normal"
                >Active</label
              >
            </div>
          </template>
        </Card>
      </div>
    </template>
  </FormHorizontal>
</template>
