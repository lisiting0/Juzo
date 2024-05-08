import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 分销商下可用的票证综合信息
export function agentAvailableTicket() {
  return request({
    api: 'order',
    url: '/agent/use/ticket/query-available',
    method: 'post'
  })
}

// 分销商下票证发放列表
export function agentTicketList(data) {
  return request({
    api: 'order',
    url: '/agent/use/ticket/queryPage',
    method: 'post',
    data: transformListQuery(data)
  })
}

// 分销商下退回票证号记录
export function agentRefundTicketList(data) {
  return request({
    api: 'order',
    url: '/agent/refund/ticket/queryPage',
    method: 'post',
    data: transformListQuery(data)
  })
}

// 查询可退回票证的列表
export function agentCanRefundTicketList(data) {
  return request({
    api: 'order',
    url: '/agent/refund/ticket/query-can-refund-page',
    method: 'post',
    data: transformListQuery(data)
  })
}

// 分销商下退回票证号记录
export function agentProcessRefund(data) {
  return request({
    api: 'order',
    url: '/agent/refund/ticket/process',
    method: 'post',
    data: data
  })
}
