import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 报废列表
export function queryPage(query) {
  return request({
    api: 'order',
    url: '/manager/agent/voided/ticket/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 报废列表
export function queryCanVoidedPage(query) {
  return request({
    api: 'order',
    url: '/manager/agent/voided/ticket/query-can-voided-page',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 票证报废处理
export function voidedTicketProcess(data) {
  return request({
    api: 'order',
    url: '/manager/agent/voided/ticket/process',
    method: 'post',
    data: data
  })
}

// 报废审核
export function voidedTicketAudit(ticketProveGroupId) {
  return request({
    api: 'order',
    url: '/manager/agent/voided/ticket/audit/' + ticketProveGroupId,
    method: 'put'
  })
}
