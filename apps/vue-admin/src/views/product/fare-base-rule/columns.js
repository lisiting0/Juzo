
const columns = [
  {
    fieldType: 'text',
    width: 120,
    label: '运价基础名称',
    prop: 'name'
  },
  {
    fieldType: 'text',
    width: 130,
    label: '运价基础说明',
    prop: 'description'
  },
  {
    fieldType: 'text',
    label: '航司',
    prop: 'airline'
  },
  {
    fieldType: 'text',
    label: '航班号',
    prop: 'flightNo'
  },
  {
    fieldType: 'text',
    label: '出发机场',
    prop: 'departureAirport'
  },
  {
    fieldType: 'text',
    label: '到达机场',
    prop: 'arrivalAirport'
  },
  {
    fieldType: 'dateYMD',
    width: '110px',
    label: '出发日期起始',
    prop: 'departureDateBegin'
  },
  {
    fieldType: 'dateYMD',
    width: 110,
    label: '出发日期结束',
    prop: 'departureDateEnd'
  },
  {
    fieldType: 'dateYMD',
    width: 110,
    label: '销售日期起始',
    prop: 'saleDateBegin'
  },
  {
    fieldType: 'dateYMD',
    width: 110,
    label: '销售日期结束',
    prop: 'saleDateEnd'
  },
  {
    fieldType: 'other',
    width: 130,
    label: '包含的乘客类型',
    prop: 'passengerTypes'
  },
  {
    fieldType: 'text',
    width: 100,
    label: '包含舱位',
    prop: 'cabins'
  },
  {
    fieldType: 'text',
    label: '机型',
    prop: 'aircraftModels'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '票价基础关键字',
    prop: 'fareBaseCodeKeyword'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '票价基础服务说明',
    prop: 'fareBaseServiceDescription'
  },
  {
    fieldType: 'number',
    width: 130,
    label: '航司后返金额',
    prop: 'commissionFee'
  }
]
export default {
  columns
}
