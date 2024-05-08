import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function policyList(query) {
  return request({
    url: '/api/product/domestic-policy',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 详情
export function policyDetail(id) {
  return request({
    url: `/api/product/domestic-policy/${id}`,
    method: 'get'
  })
}

// 修改
export function updatePolicy(data) {
  return request({
    url: `/api/product/domestic-policy/${data.id}`,
    method: 'put',
    data: data
  })
}

// 新增
export function createPolicy(data) {
  return request({
    url: '/api/product/domestic-policy',
    method: 'post',
    data: data
  })
}

// 删除
export function deletePolicy(id) {
  return request({
    url: `/api/product/domestic-policy/${id}`,
    method: 'delete'
  })
}

// 导入Excel
export function importPolicyExcel(data) {
  return request({
    url: '/api/product/domestic-policy/import-export/import',
    method: 'post',
    data: data
  })
}

// 导出excel
export function exportPolicyExcel(data) {
  return request({
    url: '/api/product/domestic-policy/import-export/export',
    method: 'get',
    responseType: 'blob',
    params: data
  })
}

// 复制
export function copyPolicy(id) {
  return request({
    url: `/api/product/domestic-policy/copy/${id}`,
    method: 'post'
  })
}
