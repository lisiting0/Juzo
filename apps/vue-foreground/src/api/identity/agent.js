// 代理
import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function ticketAgentList(query) {
  return request({
    url: '/api/abp/partner/ticket-agent',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 新增
export function createTicketAgent(data) {
  return request({
    url: '/api/abp/partner/ticket-agent',
    method: 'post',
    data: data
  })
}

// 详情
export function ticketAgentDetail(id) {
  return request({
    url: `/api/abp/partner/ticket-agent/${id}`,
    method: 'get'
  })
}

// 编辑
export function updateTicketAgent(data) {
  return request({
    url: `/api/abp/partner/ticket-agent/${data.id}`,
    method: 'put',
    data: data
  })
}

// 子账号列表
export function subAccountList(id, query) {
  return request({
    url: `/api/abp/partner/ticket-agent/${id}/sub-account`,
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 子账号新增
export function createSubAccount(id, data) {
  return request({
    url: `/api/abp/partner/ticket-agent/${id}/sub-account`,
    method: 'post',
    data: data
  })
}

// 子账号详情
export function subAccountDetail(id) {
  return request({
    url: `/api/abp/partner/ticket-agent/${id}`,
    method: 'get'
  })
}

// 子账号编辑
export function updateSubAccount(id, data) {
  return request({
    url: `/api/abp/partner/ticket-agent/${id}/sub-account`,
    method: 'put',
    data: data
  })
}

// 子账号删除
export function deleteSubAccount(id) {
  return request({
    url: `/api/abp/partner/ticket-agent/${id}/sub-account`,
    method: 'delete'
  })
}

// 获取账户信息
export function getAgentByUser(id) {
  return request({
    url: `/api/abp/partner/ticket-agent/by-user/${id}`,
    method: 'get'
  })
}
