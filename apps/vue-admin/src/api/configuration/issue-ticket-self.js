// 代理
import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 查询自营出票配置
export function queryPage(data) {
  return request({
    url: '/api/order/manager/issue/ticket/self/queryPage',
    method: 'post',
    data: transformListQuery(data)
  })
}

// 修改自营出票配置
export function update(data) {
  return request({
    url: '/api/order/manager/issue/ticket/self/update',
    method: 'put',
    data: data
  })
}

// 修改自营出票配置
export function create(data) {
  return request({
    url: '/api/order/manager/issue/ticket/self/create',
    method: 'post',
    data: data
  })
}

// 修改自营出票配置
export function toDel(id) {
  return request({
    url: `/api/order/manager/issue/ticket/self/delete/${id}`,
    method: 'put'
  })
}

// 修改自营出票配置
export function airlineMappingQuery(id) {
  return request({
    url: `/api/order/manager/issue/ticket/self/query-airline-mapping/${id}`,
    method: 'get'
  })
}

export function airlineMappingCreate(data) {
  return request({
    url: `/api/order/manager/issue/ticket/self/create-airline-mapping`,
    method: 'post',
    data: data
  })
}

export function airlineMappingUpdate(data) {
  return request({
    url: `/api/order/manager/issue/ticket/self/update-airline-mapping`,
    method: 'put',
    data: data
  })
}

export function airlineMappingDelete(id) {
  return request({
    url: `/api/order/manager/issue/ticket/self/delete-airline-mapping/${id}`,
    method: 'post'
  })
}
