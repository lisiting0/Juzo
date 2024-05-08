import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'order',
    url: '/agent/refund/order/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 获取订单下的客规
export function refundOrderGuestRule(orderNo) {
  return request({
    api: 'order',
    url: '/agent/refund/order/guest-rule/queryAll/' + orderNo,
    method: 'get'
  })
}

// 订单详情页面
export function refundOrderDetail(ticketrefundOrderNo) {
  return request({
    api: 'order',
    url: '/agent/refund/order/detail/' + ticketrefundOrderNo,
    method: 'get'
  })
}

// 提交退票
export function refundOrderCreate(data) {
  return request({
    api: 'order',
    url: '/agent/refund/order/create',
    method: 'post',
    data: data
  })
}

// 提交退票
export function refundPreAmountQuery(data) {
  return request({
    api: 'order',
    url: '/agent/refund/order/query-pre-refund',
    method: 'post',
    data: data
  })
}
