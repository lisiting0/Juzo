
const columns = [
  {
    fieldType: 'text',
    label: '产品名称',
    prop: 'name'
  },
  {
    fieldType: 'text',
    label: '产品说明',
    prop: 'description'
  },
  {
    fieldType: 'text',
    label: '适用航司',
    prop: 'airlines'
  },
  {
    fieldType: 'other',
    width: 140,
    label: '适用舱等',
    prop: 'cabinClass'
  },
  {
    fieldType: 'boolean',
    label: '固定舱位',
    prop: 'fixCabin'
  },
  {
    fieldType: 'boolean',
    label: '固定票价',
    prop: 'fixTicketPrice'
  },
  {
    fieldType: 'text',
    width: '110px',
    label: '限制出票时间',
    prop: 'issueTimeLimitMinutes'
  },
  {
    fieldType: 'text',
    width: '130px',
    label: '自愿退票完成时间',
    prop: 'voluntaryRefundTimeLimitMinutes'
  },
  {
    fieldType: 'text',
    width: '140px',
    label: '限制非自愿退票时间',
    prop: 'involuntaryRefundTimeLimitMinutes'
  },
  {
    fieldType: 'text',
    width: '130px',
    label: '限制自愿改签时间',
    prop: 'voluntaryChangeTimeLimitMinutes'
  },
  {
    fieldType: 'text',
    width: '130px',
    label: '限制非自愿改签时间',
    prop: 'involuntaryChangeTimeLimitMinutes'
  },
  {
    fieldType: 'boolean',
    width: '100px',
    label: '使用航司客规',
    prop: 'useAirlineRule'
  },
  {
    fieldType: 'other',
    label: '乘机人类型',
    prop: 'passengerType'
  },
  {
    fieldType: 'enum',
    enumType: 'ValidIdType',
    enumNamespace: 'AdminService',
    label: '有效证件类型',
    prop: 'validIdType'
  }
]
export default {
  columns
}
