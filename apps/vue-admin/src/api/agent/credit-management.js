import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'finance',
    url: '/manager/balance/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 增加授信
export function rechargeCredit(data) {
  return request({
    api: 'finance',
    url: '/manager/balance/recharge-credit',
    method: 'post',
    data: data
  })
}

// 充值余额
export function rechargeWallet(data) {
  return request({
    api: 'finance',
    url: '/manager/balance/recharge-wallet',
    method: 'post',
    data: data
  })
}
// manager/balance/flow/queryPage

// 查询流水
export function queryBalanceFlow(query) {
  return request({
    api: 'finance',
    url: '/manager/balance/flow/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}
