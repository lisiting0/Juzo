
const columns = [
  {
    fieldType: 'text',
    label: '航司简称',
    prop: 'carrierName'
  },
  {
    fieldType: 'text',
    label: '航司二字码',
    prop: 'carrierCode'
  },
  {
    fieldType: 'boolean',
    booleanOptions: '0国内|1国际',
    label: '航司归属',
    prop: 'carrierCountryType'
  },
  {
    fieldType: 'text',
    label: '航司编号(票号前缀)',
    prop: 'carrierPrefixNumber',
    width: '150px'
  },
  {
    fieldType: 'object',
    label: '所在城市',
    prop: 'foundationCityBaseDTO',
    objectValue: 'cityNameCn'
  },
  {
    fieldType: 'boolean',
    booleanOptions: '0没有|1有',
    label: '有国内航班',
    prop: 'haveDomesticAirport',
    width: '120'
  },
  {
    fieldType: 'boolean',
    booleanOptions: '0没有|1有',
    label: '有国际航班',
    prop: 'haveForeignAirport',
    width: '120'
  },
  {
    fieldType: 'boolean',
    booleanOptions: '0否|1是',
    label: '是否有效',
    prop: 'carrierStatus'
  },
  {
    fieldType: 'text',
    label: '电话',
    prop: 'phone',
    width: '140px'
  },
  {
    fieldType: 'text',
    width: 250,
    label: '官网网址',
    prop: 'officialUrl'
  },
  {
    fieldType: 'boolean',
    booleanOptions: '0否|1是',
    label: '支持两三方协议',
    prop: 'twoThreeProtocol',
    width: '140px'
  },
  {
    fieldType: 'boolean',
    booleanOptions: '0否|1是',
    label: '支持值机',
    prop: 'checkIn',
    width: '80'
  }
 //  ,
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
