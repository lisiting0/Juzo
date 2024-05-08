
const columns = [
  {
    fieldType: 'text',
    label: '分销商',
    prop: 'agentName'
  },
  {
    fieldType: 'text',
    label: '产品名称',
    prop: 'productName'
  },
  {
    fieldType: 'boolean',
    booleanOptions: 'true已关联|false未关联',
    label: '状态',
    prop: 'enabled'
  }
]
export default {
  columns
}
