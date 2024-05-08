import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function ticketAgentGroupList(query) {
  return request({
    url: '/api/abp/partner/ticket-agent-group',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 新增
export function createTicketAgentGroup(data) {
  return request({
    url: '/api/abp/partner/ticket-agent-group',
    method: 'post',
    data: data
  })
}

// 删除
export function deleteTicketAgentGroup(id) {
  return request({
    url: `/api/abp/partner/ticket-agent-group/${id}`,
    method: 'delete'
  })
}

// 详情
export function ticketAgentGroupDetail(id) {
  return request({
    url: `/api/abp/partner/ticket-agent-group/${id}`,
    method: 'get'
  })
}

// 编辑
export function updateTicketAgentGroup(data) {
  return request({
    url: `/api/abp/partner/ticket-agent-group/${data.id}`,
    method: 'put',
    data: data
  })
}
