import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 可回收列表查询
export function queryCanRecycled(query) {
  return request({
    api: 'order',
    url: '/manager/agent/voided/ticket/query-can-recycled',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 回收处理
export function ticketApplyRecycled(data) {
  return request({
    api: 'order',
    url: '/manager/agent/voided/ticket/apply-recycled',
    method: 'post',
    data: data
  })
}
