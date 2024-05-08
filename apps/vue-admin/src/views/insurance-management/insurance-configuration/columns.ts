
const columns = [
  {
    fieldType: 'boolean',
    booleanOptions: '0停止销售|1正常销售',
    label: '状态',
    prop: 'status'
  },
  {
    fieldType: 'text',
    label: '保险名称',
    prop: 'insuranceName'
  },
  {
    fieldType: 'text',
    label: '保险公司',
    prop: 'companyName'
  },
  {
    fieldType: 'enum',
    enumType: 'InsuranceType',
    enumNamespace: 'AdminService',
    label: '保险类型',
    prop: 'insuranceType'
  },
  {
    fieldType: 'other',
    label: '适用产品',
    prop: 'applicableProduct'
  },
  {
    fieldType: 'number',
    label: '限购份数/人',
    prop: 'purchaseLimit'
  },
  {
    fieldType: 'number',
    label: '销售价',
    prop: 'originPrice'
  },
  {
    fieldType: 'number',
    label: '采购价',
    prop: 'purchasePrice'
  },
  {
    fieldType: 'enum',
    enumType: 'MaterialType',
    enumNamespace: 'AdminService',
    label: '保单形式',
    prop: 'materialType'
  },
  {
    fieldType: 'text',
    label: '有效期',
    prop: 'validityPeriodLimit'
  }
]
export default {
  columns
}
