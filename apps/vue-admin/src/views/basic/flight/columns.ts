
const columns = [
  {
    fieldType: 'text',
    label: '航司',
    prop: 'carrierNumber'
  },
  {
    fieldType: 'text',
    label: '航班号',
    prop: 'flightNumber'
  },
  {
    fieldType: 'object',
    label: '出发城市',
    prop: 'departureFoundationCityBaseDTO',
    objectValue: 'cityNameCn'
  },
  {
    fieldType: 'object',
    label: '到达城市',
    prop: 'arrivalFoundationCityBaseDTO',
    objectValue: 'cityNameCn'
  },
  {
    fieldType: 'object',
    width: 100,
    label: '出发机场',
    prop: 'departureFoundationAirportBaseDTO',
    objectValue: 'airportName'
  },
  {
    fieldType: 'object',
    width: 100,
    label: '到达机场',
    prop: 'arrivalFoundationAirportBaseDTO',
    objectValue: 'airportName'
  },
  // {
  //   fieldType: 'object',
  //   label: '经停城市 ',
  //   prop: 'stopFoundationCityBaseDTO',
  //   // objectValue: 'cityNameCn'
  // },
  {
    fieldType: 'array',
    label: '经停机场 ',
    prop: 'stopFlightList'
  },
  {
    fieldType: 'text',
    label: '飞机机型',
    prop: 'planeModel'
  },
  {
    fieldType: 'text',
    label: '出发时刻',
    prop: 'departureTime'
  },
  {
    fieldType: 'text',
    label: '到达时刻',
    prop: 'arrivalTime'
  },
  {
    fieldType: 'text',
    width: 100,
    label: '经停出发时刻',
    prop: 'stopDepartureTime'
  },
  {
    fieldType: 'text',
    width: 100,
    label: '经停到达时刻',
    prop: 'stopArrivalTime'
  },
  {
    fieldType: 'array',
    width: 220,
    label: '适用班期',
    prop: 'schedule'
  },
  {
    fieldType: 'dateYMD',
    label: '有效期始',
    prop: 'validityBegin'
  },
  {
    fieldType: 'dateYMD',
    label: '有效期止',
    prop: 'validityEnd'
  },
  {
    fieldType: 'boolean',
    label: '是否共享',
    prop: 'isShare'
  },
  {
    fieldType: 'text',
    width: 100,
    label: '实际承运航班',
    prop: 'actualCarrierFlight'
  },
  {
    fieldType: 'text',
    width: 100,
    label: '是否支持单程',
    prop: 'isSupportOnewayTrip'
  },
  {
    fieldType: 'text',
    width: 100,
    label: '是否支持往返',
    prop: 'isSupportRoundTrip'
  },
  {
    fieldType: 'text',
    width: 100,
    label: '是否提供餐食',
    prop: 'isProvidedMeal'
  }
]

export default {
  columns
}
