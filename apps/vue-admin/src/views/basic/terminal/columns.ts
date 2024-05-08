const columns = [
  {
    fieldType: 'text',
    label: '机场名称',
    prop: 'name'
  },
  {
    fieldType: 'boolean',
    booleanOptions: '0所有|1国内|2国际',
    label: '国内国际',
    prop: 'natInternational'
  },
  {
    fieldType: 'text',
    label: '航站楼',
    prop: 'terminal'
  },
  {
    fieldType: 'text',
    label: '航空公司',
    prop: 'airlineCompany'
  },
  {
    fieldType: 'dateYMD',
    label: '出发日期',
    prop: 'departureDate'
  },
  {
    fieldType: 'dateYMD',
    label: '生效日期',
    prop: 'destinationDate'
  },
  {
    fieldType: 'text',
    label: '提前登记',
    prop: 'book',
    width: '150px'
  },
  {
    fieldType: 'date',
    label: '操作时间',
    prop: 'operatingTime',
    width: '150px'
  }
]

export default {
  columns
}
