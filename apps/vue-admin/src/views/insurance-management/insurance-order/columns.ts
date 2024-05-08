
const columns = [
  {
    fieldType: 'text',
    width: 180,
    label: '分销商',
    prop: 'agentName'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '下单时间',
    prop: 'createTime'
  },
  {
    fieldType: 'enum',
    enumType: 'InsuranceOrderStatus',
    enumNamespace: 'AdminService',
    label: '投保状态',
    prop: 'insuranceStatus'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '保险单号',
    prop: 'insuranceSupplierNo'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '单证流水号',
    prop: 'insuranceSupplierFlow'
  },
  {
    fieldType: 'text',
    width: 120,
    label: '保险公司',
    prop: 'insuranceCompany'
  },
  {
    fieldType: 'text',
    width: 120,
    label: '保险名称',
    prop: 'insuranceName'
  },
  {
    fieldType: 'enum',
    enumType: 'InsuranceType',
    enumNamespace: 'AdminService',
    width: 120,
    label: '保险类型',
    prop: 'insuranceType'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '出票订单号',
    prop: 'orderNo'
  },
  {
    fieldType: 'text',
    width: 120,
    label: '票号',
    prop: 'carrierTicketNo'
  },
  {
    fieldType: 'object',
    label: '投保乘机人名字',
    width: 150,
    prop: 'passengerBO',
    objectValue: 'firstName'
  },
  {
    fieldType: 'object',
    label: '投保乘机人姓氏',
    width: 150,
    prop: 'passengerBO',
    objectValue: 'lastName'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'IdentityCardType',
    enumNamespace: 'AdminService',
    label: '证件类型',
    prop: 'passengerBO',
    objectValue: 'cardType'
  },
  {
    fieldType: 'object',
    width: 180,
    label: '证件号',
    prop: 'passengerBO',
    objectValue: 'cardNum'
  },
  {
    fieldType: 'text',
    width: 120,
    label: '生效日期',
    prop: 'effectiveDate'
  },
  {
    fieldType: 'text',
    width: 120,
    label: '截止日期',
    prop: 'deadlineDate'
  },
  {
    fieldType: 'number',
    label: '采购份数',
    prop: 'number'
  },
  {
    fieldType: 'number',
    label: '销售价',
    prop: 'insuranceSalePrice'
  },
  {
    fieldType: 'number',
    label: '采购价',
    prop: 'purchasePrice'
  },
  {
    fieldType: 'number',
    label: '利润',
    prop: 'insuranceProfit'
  },
  {
    fieldType: 'text',
    label: '操作员',
    prop: 'updateUserName'
  }
]
export default {
  columns
}
