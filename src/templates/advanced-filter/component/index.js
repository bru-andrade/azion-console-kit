import { h } from 'vue'
import multiselectFilter from './fields/multiselect-filter'
import textFilter from './fields/text-filter'
import numberFilter from './fields/number-filter'
import chipsFilter from './fields/chips-filter'
import rangerFilter from './fields/range-filter'

export const FIELDS_MAPPING = {
  Int: h(numberFilter),
  Float: h(numberFilter),
  String: h(textFilter),
  Range: h(rangerFilter),
  ArrayObject: h(multiselectFilter),
  ArrayString: h(chipsFilter)
}

export const OPERATOR_MAPPING = {
  In: { value: 'In', label: 'In', format: 'in' },
  Eq: { value: 'Eq', label: 'Equals', format: '=' },
  Ne: { value: 'Ne', label: 'Not Equals', format: '≠' },
  Like: { value: 'Like', label: 'Contains', format: '⊃' },
  Ilike: { value: 'Ilike', label: 'Not Contains', format: '⊅' },
  Range: { value: 'Range', label: 'Between', format: '≤' },
  Lt: { value: 'Lt', label: 'Less Than', format: '<' },
  Lte: { value: 'Lte', label: 'Less Than or Equal', format: '≤' },
  Gt: { value: 'Gt', label: 'Greater Than', format: '>' },
  Gte: { value: 'Gte', label: 'Greater Than or Equal', format: '≥' }
}
