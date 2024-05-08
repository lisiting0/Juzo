import request from '@/utils/request'

// 价格列表
export function flightList(query) {
  return request({
    url: '/api/booking/service/issue/flight-list',
    method: 'get',
    params: query
  })
}

// 多程价格列表
export function twoFlightList(query) {
  return request({
    url: '/api/booking/service/issue/two-wayflight-list',
    method: 'get',
    params: query
  })
}

// 多程价格验价
export function twoWayPriceVerify(data) {
  return request({
    url: '/api/booking/service/issue/two-way-verify-price',
    method: 'post',
    data: data
  })
}

// 舱等价格信息
export function cabinClassPrice(query) {
  return request({
    url: '/api/booking/service/issue/cabin-class-price',
    method: 'get',
    params: query
  })
}

// 验价
export function verifyPrice(data) {
  return request({
    url: '/api/booking/service/issue/verify-price',
    method: 'post',
    data: data
  })
}

// 往返和多程的cabin价格列表
export function twoWayCabinPriceList(data) {
  return request({
    url: '/api/booking/service/issue/two-cabin-price-list',
    method: 'post',
    data: data
  })
}

// 往返和多程验价
export function twoWayVerifyPrice(data) {
  return request({
    url: '/api/booking/service/issue/two-way-verify-price',
    method: 'post',
    data: data
  })
}

// 创建订单
export function order(data) {
  return request({
    url: '/api/booking/service/issue/order',
    method: 'post',
    data: data
  })
}

// 航班下舱位行李额
export function flightCabinLuggageWeightSearch(data) {
  return request({
    api: 'foundation',
    url: '/share/luggage-weight/query',
    method: 'post',
    data: data
  })
}

// 航班下舱位客规
export function flightGuestRuleSearch(data) {
  return request({
    api: 'foundation',
    url: '/share/guest-rule/query-by-cabin',
    method: 'post',
    data: data
  })
}

// 城市机场列表
export function getCityAirportList() {
  return request({
    api: 'foundation',
    url: '/agent/city/queryCityAirportList',
    method: 'get',
  })
}


// 城市机场列表
export function belongWhiteList(data) {
  return request({
    url: '/api/order/agent/frequentflyer/belongWhiteList',
    method: 'post',
    data: data
  })
}



