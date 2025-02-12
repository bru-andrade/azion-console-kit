<script setup>
  import { computed, toRef } from 'vue'
  import { useField } from 'vee-validate'
  import Dropdown from 'primevue/dropdown'

  const props = defineProps({
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    optionLabel: {
      type: String,
      default: ''
    },
    optionValue: {
      type: String,
      default: ''
    },
    optionDisabled: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    inputClass: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    enableWorkaroundLabelToDisabledOptions: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['onBlur', 'onChange'])

  const name = toRef(props, 'name')

  const { value: inputValue, errorMessage } = useField(name, undefined, {
    initialValue: props.value
  })

  const emitBlur = () => {
    emit('onBlur')
  }

  const emitChange = () => {
    emit('onChange', inputValue.value)
  }

  /**
   * Workaround to resolve the issue described in https://github.com/primefaces/primevue/issues/4431
   * This should be remove from this field component as soon as the
   * primevue team fixes the issue.
   * When we select a disabled value, the label  is not showing
   * @param {*} selectedValue The selected value in the Dropdown component.
   * @returns {string | null} The selected value if it corresponds to a disabled option, or null otherwise.
   */
  const getLabelBySelectedValue = (selectedValue) => {
    const result = props.options.find((option) => option.value === selectedValue)
    return result?.label
  }
  const enableCustomLabel = computed(() => {
    return props.enableWorkaroundLabelToDisabledOptions && !!inputValue.value
  })
  /**
   * end of primevue workaround
   */
</script>

<template>
  <label
    :for="props.name"
    class="text-color text-sm font-medium leading-5"
    >{{ props.label }}</label
  >
  <Dropdown
    :id="name"
    :loading="loading"
    v-model="inputValue"
    :options="props.options"
    :optionLabel="props.optionLabel"
    :optionDisabled="props.optionDisabled"
    :optionValue="props.optionValue"
    :placeholder="props.placeholder"
    @change="emitChange"
    @blur="emitBlur"
    :class="inputClass"
  >
    <template
      v-if="enableCustomLabel"
      #value="slotProps"
    >
      <span>
        {{ getLabelBySelectedValue(slotProps.value) }}
      </span>
    </template>
  </Dropdown>

  <small
    v-if="errorMessage"
    class="p-error text-xs font-normal leading-tight"
    >{{ errorMessage }}</small
  >
  <small
    class="text-xs text-color-secondary font-normal leading-5"
    v-if="props.description"
  >
    {{ props.description }}
  </small>
</template>
