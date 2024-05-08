import request from '@/utils/request'

// 支付金额
export function queryPay(data) {
  return request({
    api: 'payment',
    url: '/trade/query-pay',
    method: 'post',
    data: data
  })
}

// 去支付
export function toPay(data) {
  return request({
    api: 'payment',
    url: '/trade/pay',
    method: 'post',
    data: data
  })
}

// 支付详情
export function payDetail(data) {
  return request({
    api: 'payment',
    url: '/trade/detail',
    method: 'post',
    data: data
  })
}

// 查询订单超时剩余时间 - 秒
export function payCountdown(data) {
  return request({
    api: 'payment',
    url: '/trade/countdown/' + data,
    method: 'get'
  })
}
