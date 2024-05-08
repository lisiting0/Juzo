// 代理
import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function priceSourceAccountList(query) {
  return request({
    url: '/api/eterm/price-source-account',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 新增
export function createPriceSourceAccount(data) {
  return request({
    url: '/api/eterm/price-source-account',
    method: 'post',
    data: data
  })
}

// 删除
export function priceSourceAccountDelete(id) {
  return request({
    url: `/api/eterm/price-source-account/${id}`,
    method: 'delete'
  })
}

// 详情
export function priceSourceAccountDetail(id) {
  return request({
    url: `/api/eterm/price-source-account/${id}`,
    method: 'get'
  })
}

// 编辑
export function updatePriceSourceAccount(data) {
  return request({
    url: `/api/eterm/price-source-account/${data.id}`,
    method: 'put',
    data: data
  })
}

// 上下线
export function enablePriceSourceAccount(id, enabled) {
  return request({
    url: `/api/eterm/price-source-account/${id}/enable/${enabled}`,
    method: 'put'
  })
}

