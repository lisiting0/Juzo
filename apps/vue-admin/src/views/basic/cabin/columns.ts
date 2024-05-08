const columns = [
  {
    fieldType: 'text',
    width: '105px',
    label: '航司二字代码',
    prop: 'carrierCode'

  },
  {
    fieldType: 'boolean',
    label: '可销售舱位',
    prop: 'isSold',
    width: '105px'
  },
  {
    fieldType: 'boolean',
    label: '公布运价 ',
    prop: 'publicFlightRates'
  },
  {
    fieldType: 'enum',
    enumType: 'CabinClassType',
    enumNamespace: 'AdminService',
    label: '舱位等级',
    prop: 'cabinLevel'
  },
  {
    fieldType: 'text',
    label: '舱位类型',
    prop: 'cabinType'
  },
  {
    fieldType: 'text',
    label: '舱位编号',
    prop: 'cabinCode'
  },
  {
    fieldType: 'text',
    label: '舱位名称',
    prop: 'cabinName'
  },
  {
    fieldType: 'text',
    label: '成人票价级别',
    prop: 'adultFareLevel',
    width: '110px'
  },
  {
    fieldType: 'text',
    label: '儿童票价级别',
    prop: 'childrenFareLevel',
    width: '110px'
  },
  {
    fieldType: 'text',
    label: '婴儿票价级别',
    prop: 'babyFareLevel',
    width: '110px'
  },
  {
    fieldType: 'text',
    label: '折扣率',
    prop: 'discountRate'
  },
  {
    fieldType: 'text',
    label: '携带行李重量',
    prop: 'luggageWeight',
    width: '110px'
  },
  {
    fieldType: 'text',
    label: '手提行李额',
    prop: 'handLuggageWeight',
    width: '110px'
  },
  {
    fieldType: 'dateYMD',
    label: '生效日期',
    prop: 'effectiveDate'
  },
  {
    fieldType: 'dateYMD',
    label: '起飞日期',
    prop: 'departureDate'
  }
  // ,
  // {
  //   fieldType: 'date',
  //   label: '操作时间',
  //   prop: 'operatingTime',
  //   width: '150px'
  // }
]
export default {
  columns
}
