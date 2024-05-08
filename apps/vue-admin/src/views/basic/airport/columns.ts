const columns = [
  // {
  //   fieldType: 'text',
  //   label: '编号',
  //   prop: 'id'
  // },
  {
    fieldType: 'text',
    label: '机场三字编号',
    prop: 'airportCode'
  },
  {
    fieldType: 'text',
    label: '机场名称',
    prop: 'airportName'
  },
  {
    fieldType: 'text',
    label: '所在时区',
    prop: 'timeZone'
  },
  {
    fieldType: 'object',
    label: '城市中文名称',
    prop: 'foundationCityBaseDTO',
    objectValue: 'cityNameCn'
  },
  {
    fieldType: 'object',
    label: '城市英文名称 ',
    prop: 'foundationCityBaseDTO',
    objectValue: 'cityNameEn'
  },
  {
    fieldType: 'object',
    label: '国家省份',
    prop: 'foundationCityBaseDTO',
    objectValue: 'provinceName'
  },
  {
    fieldType: 'object',
    label: '城市三字编码',
    prop: 'foundationCityBaseDTO',
    objectValue: 'cityCode'
  },
  {
    fieldType: 'object',
    objectFieldType: 'boolean',
    booleanOptions: '0所有|1国内|2国际',
    label: '国内国际',
    prop: 'foundationCityBaseDTO',
    objectValue: 'cityType'
  },
  {
    fieldType: 'object',
    objectFieldType: 'boolean',
    booleanOptions: '0有|1无',
    label: '有无机场',
    prop: 'foundationCityBaseDTO',
    objectValue: 'haveAirport'
  },
  {
    fieldType: 'enum',
    enumType: 'RegionType',
    enumNamespace: 'AdminService',
    label: '所属区域',
    prop: 'region'
  }
]
export default {
  columns
}
