const columns = [
  {
    fieldType: 'enum',
    enumType: 'OriginType',
    enumNamespace: 'AdminService',
    label: '客规来源',
    prop: 'originType'
  },
  {
    fieldType: 'enum',
    enumType: 'PassengerType',
    enumNamespace: 'AdminService',
    label: '乘客类型',
    prop: 'passengerType'
  },
  {
    fieldType: 'enum',
    enumType: 'GuestRuleType',
    enumNamespace: 'AdminService',
    label: '客规类型 ',
    prop: 'guestRuleType'
  },
  {
    fieldType: 'object',
    label: '航司',
    prop: 'carrierBaseDTO',
    objectValue: 'carrierName'
  },
  {
    fieldType: 'object',
    label: '航司代码',
    prop: 'carrierBaseDTO',
    objectValue: 'carrierCode'
  },
  {
    fieldType: 'object',
    label: '舱位等级',
    prop: 'cabinBaseDTO',
    objectValue: 'cabinLevel'
  },
  {
    fieldType: 'object',
    label: '舱位',
    prop: 'cabinBaseDTO',
    objectValue: 'cabinCode'
  },
  {
    fieldType: 'text',
    label: '销售开始时间',
    prop: 'salesStartTime',
    width: '110px'
  },
  {
    fieldType: 'text',
    label: '销售结束时间',
    prop: 'salesEndTime',
    width: '110px'
  },
  {
    fieldType: 'text',
    label: '起飞开始时间',
    prop: 'takeoffStartTime',
    width: '110px'
  },
  {
    fieldType: 'text',
    label: '起飞结束时间',
    prop: 'takeoffEndTime',
    width: '110px'
  },
  {
    fieldType: 'text',
    label: '最大距离起飞前小时数',
    prop: 'beforeMaxDistanceHours',
    width: '105px'
  },
  {
    fieldType: 'text',
    label: '最小距离起飞前小时数',
    prop: 'beforeMinDistanceHours',
    width: '105px'
  },
  {
    fieldType: 'text',
    label: '手续费(%)',
    prop: 'feesRate'
  },
  {
    fieldType: 'text',
    label: '客规描述',
    prop: 'description',
    width: '180px'
  },
  {
    fieldType: 'text',
    label: '客规备注',
    prop: 'remark',
    width: '180px'
  }
]
export default {
  columns
}
