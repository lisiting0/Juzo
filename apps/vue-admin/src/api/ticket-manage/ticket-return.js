import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 分页查询
export function queryPage(query) {
  return request({
    api: 'order',
    url: '/manager/agent/refund/ticket/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 票证可以退回列表查询
export function queryCanRefundPage(query) {
  return request({
    api: 'order',
    url: '/manager/agent/refund/ticket/query-can-refund-page',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 票证退回处理
export function refundTicketProcess(data) {
  return request({
    api: 'order',
    url: '/manager/agent/refund/ticket/process',
    method: 'post',
    data: data
  })
}
