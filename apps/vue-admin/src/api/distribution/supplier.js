import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function ticketSupplierList(query) {
  return request({
    url: '/api/abp/partner/ticket-supplier',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 创建
export function createTicketSupplier(data) {
  return request({
    url: '/api/abp/partner/ticket-supplier/register',
    method: 'post',
    data: data
  })
}

// 详情
export function ticketSupplierDetail(id) {
  return request({
    url: `/api/abp/partner/ticket-supplier/${id}`,
    method: 'get'
  })
}

// 编辑
export function updateTicketSupplier(id, data) {
  return request({
    url: `/api/abp/partner/ticket-supplier/${id}`,
    method: 'put',
    data: data
  })
}

// 删除
export function deleteTicketSupplier(id) {
  return request({
    url: `/api/abp/partner/ticket-supplier/${id}`,
    method: 'delete'
  })
}

// 分销商子账号列表
export function ticketSupplierSubAccountList(id, query) {
  return request({
    url: `/api/abp/partner/ticket-supplier/${id}/sub-account`,
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 创建子账号
export function ticketSupplierSubAccount(id, data) {
  return request({
    url: `/api/abp/partner/ticket-supplier/${id}/sub-account`,
    method: 'post',
    data: data
  })
}

// 子账号详情
export function ticketSupplierSubAccountDetail(id, data) {
  return request({
    url: `/api/abp/partner/ticket-supplier/${id}`,
    method: 'get',
    params: data
  })
}

// 编辑子账号
export function updateTicketSupplierSubAccount(id, data) {
  return request({
    url: `/api/abp/partner/ticket-supplier/${id}/sub-account`,
    method: 'put',
    data: data
  })
}

// 删除子账号
export function deleteTicketSupplierSubAccount(id) {
  return request({
    url: `/api/abp/partner/ticket-supplier/${id}/sub-account`,
    method: 'delete'
  })
}
