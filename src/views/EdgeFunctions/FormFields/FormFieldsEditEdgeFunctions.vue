<script setup>
  import InputText from 'primevue/inputtext'
  import InputSwitch from 'primevue/inputswitch'
  import Splitter from 'primevue/splitter'
  import SplitterPanel from 'primevue/splitterpanel'
  import TabView from 'primevue/tabview'
  import TabPanel from 'primevue/tabpanel'
  import FormHorizontal from '@/templates/create-form-block/form-horizontal'
  import CodeEditor from '../components/code-editor.vue'
  import CodePreview from '../components/code-preview.vue'
  import { useField } from 'vee-validate'
  import { computed, ref, watch } from 'vue'

  defineProps(['previewData'])
  const emit = defineEmits(['update:previewData'])

  const SPLITTER_PROPS = {
    height: '50vh',
    layout: 'horizontal',
    panelsSizes: [66, 34]
  }
  const ARGS_INITIAL_STATE = '{}'

  const showPreview = ref(true)

  const { value: name, errorMessage: nameError } = useField('name')
  const { value: isProprietaryCode } = useField('isProprietaryCode')
  const { value: jsonArgs, errorMessage: jsonArgsError } = useField('jsonArgs')
  const { value: code, errorMessage: codeError } = useField('code')
  const { value: language } = useField('language')
  const { value: active } = useField('active')

  let initialCodeValue = ''
  let initialJsonArgsValue = ARGS_INITIAL_STATE
  const unwatch = watch(name, () => {
    initialCodeValue = code.value
    initialJsonArgsValue = jsonArgs.value

    if (initialCodeValue) {
      unwatch()
    }
  })

  const languageLabel = computed(() => {
    const languageLabels = {
      javascript: 'JavaScript',
      lua: 'Lua'
    }

    return languageLabels[language.value]
  })

  const hasCodeError = computed(() => {
    return !!codeError.value
  })

  const hasArgsError = computed(() => {
    return !!jsonArgsError.value
  })

  const updateObject = computed(() => {
    const previewValues = {
      code: code.value,
      args: jsonArgs.value
    }
    emit('update:previewData', previewValues)
    return previewValues
  })
</script>

<template>
  <TabView class="w-full">
    <TabPanel header="Main Settings">
      <FormHorizontal
        class="mt-8"
        title="General"
        description="Edit an edge function that runs closer to users to use with Edge Application or Edge Firewall."
      >
        <template #inputs>
          <div class="flex flex-col sm:max-w-lg w-full gap-2">
            <label
              for="name"
              class="text-color text-base font-medium"
              >Name *</label
            >
            <InputText
              v-model="name"
              id="name"
              type="text"
              :class="{ 'p-invalid': nameError }"
            />
            <small
              v-if="nameError"
              class="p-error text-xs font-normal leading-tight"
              >{{ nameError }}</small
            >
            <small class="text-xs text-color-secondary font-normal leading-tight">
              Give a unique and easy-to-remember name.</small
            >
          </div>
        </template>
      </FormHorizontal>

      <FormHorizontal
        class="mt-8"
        title="Language"
        description="The language the edge function is written in."
      >
        <template #inputs>
          <div class="flex flex-col w-full sm:max-w-lg gap-2">
            <label
              for="language"
              class="text-color text-base font-medium"
              >Language</label
            >
            <span class="p-input-icon-right">
              <i class="pi pi-lock text-[var(--text-color-secondary)]" />
              <InputText
                v-model="languageLabel"
                id="language"
                type="text"
                class="w-full text-[var(--text-color-secondary)]"
                readonly
              />
            </span>
            <small class="text-xs text-color-secondary font-normal leading-tight">
              Language isn't an editable field.</small
            >
          </div>
        </template>
      </FormHorizontal>

      <FormHorizontal
        class="mt-8"
        title="Status"
      >
        <template #inputs>
          <div class="flex w-full sm:max-w-lg gap-2">
            <InputSwitch
              v-model="active"
              inputId="active"
            />
            <label
              for="active"
              class="text-color-secondary text-sm font-normal"
              >Active
            </label>
          </div>
        </template>
      </FormHorizontal>
    </TabPanel>

    <TabPanel header="Code">
      <Splitter
        :style="{ height: SPLITTER_PROPS.height }"
        class="mt-8 surface-border border rounded-md hidden md:flex"
        @resizestart="showPreview = false"
        @resizeend="showPreview = true"
        :layout="SPLITTER_PROPS.layout"
      >
        <SplitterPanel
          :size="SPLITTER_PROPS.panelsSizes[0]"
          class="flex flex-col h-full gap-2"
        >
          <CodeEditor
            v-model="code"
            :initialValue="initialCodeValue"
            language="javascript"
            :errors="hasCodeError"
            :readOnly="isProprietaryCode"
          />
          <small
            v-if="codeError"
            class="p-error text-xs font-normal"
          >
            {{ codeError }}
          </small>
        </SplitterPanel>

        <SplitterPanel :size="SPLITTER_PROPS.panelsSizes[1]">
          <CodePreview
            v-if="showPreview"
            :updateObject="updateObject"
          />
        </SplitterPanel>
      </Splitter>

      <div class="flex flex-col mt-8 surface-border border rounded-md gap-2 md:hidden h-[50vh]">
        <CodeEditor
          v-model="code"
          :initialValue="initialCodeValue"
          language="javascript"
          :errors="hasCodeError"
        />
        <small
          v-if="codeError"
          class="p-error text-xs font-normal"
        >
          {{ codeError }}
        </small>
      </div>
    </TabPanel>

    <TabPanel header="Arguments">
      <Splitter
        :style="{ height: SPLITTER_PROPS.height }"
        class="mt-8 surface-border border rounded-md hidden md:flex"
        @resizestart="showPreview = false"
        @resizeend="showPreview = true"
        :layout="SPLITTER_PROPS.layout"
      >
        <SplitterPanel :size="SPLITTER_PROPS.panelsSizes[0]">
          <CodeEditor
            v-model="jsonArgs"
            :initialValue="initialJsonArgsValue"
            language="json"
            :errors="hasArgsError"
          />
        </SplitterPanel>

        <SplitterPanel :size="SPLITTER_PROPS.panelsSizes[1]">
          <CodePreview
            v-if="showPreview"
            :updateObject="updateObject"
          />
        </SplitterPanel>
      </Splitter>
      <div class="flex flex-col mt-8 surface-border border rounded-md md:hidden h-[50vh]">
        <CodeEditor
          v-model="jsonArgs"
          :initialValue="initialJsonArgsValue"
          language="json"
          :errors="hasArgsError"
        />
      </div>
    </TabPanel>
  </TabView>
</template>
