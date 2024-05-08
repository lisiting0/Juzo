import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'order',
    url: '/agent/change/order/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 获取订单下的客规
export function changeOrderGuestRule(orderNo) {
  return request({
    api: 'order',
    url: '/agent/change/order/guest-rule/queryAll/' + orderNo,
    method: 'get'
  })
}
// 订单详情页面
export function changeOrderDetail(ticketchangeOrderNo) {
  return request({
    api: 'order',
    url: '/agent/change/order/detail/' + ticketchangeOrderNo,
    method: 'get'
  })
}

// 查询order服务中-改签的手续费展示
export function changePreFeesAmountQuery(data) {
  return request({
    api: 'order',
    url: '/agent/change/order/query-pre-change',
    method: 'post',
    data: data
  })
}

// 查询预定服务中,新改签的航班数据
export function newChangeFlightSearch(data) {
  return request({
    url: '/api/booking/service/change/flight-list',
    method: 'get',
    params: data
  })
}

// 查询预定服务中,选择新改签航班时 查询下面所有的舱位信息
export function newChangeCabinListSearch(data) {
  return request({
    url: '/api/booking/service/change/cabin-class-price',
    method: 'post',
    data: data
  })
}

// 查询预定服务中,选择舱位后,查询真实价格
export function chooseCabinPriceQuery(data) {
  return request({
    url: '/api/booking/service/change/cabin-all-type',
    method: 'post',
    data: data
  })
}

// 预定服务中,进行提交改签
export function applyCreateChangeOrder(data) {
  return request({
    url: '/api/booking/service/change/order',
    method: 'post',
    data: data
  })
}

// 多程的查询价格
export function twoNewChangeFlightSearch(data) {
  return request({
    url: '/api/booking/service/change/two-wayflight-list',
    method: 'post',
    data: data
  })
}

// 多程的查询价格
export function changeTwoCabinPriceList(data) {
  return request({
    url: '/api/booking/service/change/two-cabin-price-list',
    method: 'post',
    data: data
  })
}

// 多程的实时价格 | 验价
export function twoFlightVerifyPrice(data) {
  return request({
    url: '/api/booking/service/change/two-way-verify-price',
    method: 'post',
    data: data
  })
}

// 多程提交
export function applyTwoCreateChangeOrder(data) {
  return request({
    url: '/api/booking/service/change/two/order',
    method: 'post',
    data: data
  })
}
