
const columns = [
  // {
  //   fieldType: 'text',
  //   label: '分销账号',
  //   prop: 'agentId'
  // },
  {
    fieldType: 'text',
    label: '分销商',
    prop: 'agentOrganizationName'
  },
  {
    fieldType: 'object',
    label: '保险公司',
    prop: 'insuranceConfigBaseDTO',
    objectValue: 'companyName'
  },
  {
    fieldType: 'object',
    label: '保险名称',
    prop: 'insuranceConfigBaseDTO',
    objectValue: 'insuranceName'
  },
  {
    // fieldType: 'enum',
    // enumType: 'InsuranceType',
    // enumNamespace: 'AdminService',
    // label: '保险类型',
    // prop: 'insuranceType'
    fieldType: 'object',
    label: '保险类型',
    prop: 'insuranceConfigBaseDTO',
    objectValue: 'insuranceType'
  },
  {
    fieldType: 'object',
    label: '保额',
    prop: 'insuranceConfigBaseDTO',
    objectValue: 'insuranceCoverage'
  },
  {
    fieldType: 'object',
    label: '原始价',
    prop: 'insuranceConfigBaseDTO',
    objectValue: 'originPrice'

  },
  {
    fieldType: 'object',
    label: '采购成本',
    prop: 'insuranceConfigBaseDTO',
    objectValue: 'purchasePrice'
  },
  {
    fieldType: 'text',
    label: '销售价',
    prop: 'salesPrice'
  },
  {
    fieldType: 'object',
    label: '单人销售数量最大限制',
    width: 180,
    prop: 'insuranceConfigBaseDTO',
    objectValue: 'purchaseLimit'
  }
]
export default {
  columns
}
