import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 查询分销商账户余额
export function agentBalanceQuery() {
  return request({
    api: 'finance',
    url: '/agent/balance/detail',
    method: 'post'
  })
}

// 重置支付密码
export function resetAgentBalancePassword() {
  return request({
    api: 'finance',
    url: '/agent/balance/reset-password',
    method: 'post'
  })
}

// 修改支付密码
export function updateAgentBalancePassword(data) {
  return request({
    api: 'finance',
    url: '/agent/balance/update-password',
    method: 'post',
    data: data
  })
}

// 查询账户充值记录
export function agentBalanceFlowQuery(data) {
  return request({
    api: 'finance',
    url: '/agent/balance/query-recharge-record',
    method: 'post',
    data: data
  })
}

// 短信充值
export function agentShortMessageRecharge(data) {
  return request({
    api: 'finance',
    url: '/agent/short/message/recharge',
    method: 'post',
    data: data
  })
}

// 短信充值历史
export function shortMessageQuery(data) {
  return request({
    api: 'finance',
    url: '/agent/short/message/query-recharge-list',
    method: 'post',
    data: transformListQuery(data)
  })
}

