import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function fareBaseRuleList(query) {
  return request({
    url: '/api/product/fare-base-rule',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 详情
export function fareBaseRuleDetail(id) {
  return request({
    url: `/api/product/fare-base-rule/${id}`,
    method: 'get'
  })
}

// 修改
export function updateFareBaseRule(data) {
  return request({
    url: `/api/product/fare-base-rule/${data.id}`,
    method: 'put',
    data: data
  })
}

// 新增
export function createFareBaseRule(data) {
  return request({
    url: '/api/product/fare-base-rule',
    method: 'post',
    data: data
  })
}

// 删除
export function deleteFareBaseRule(id) {
  return request({
    url: `/api/product/fare-base-rule/${id}`,
    method: 'delete'
  })
}

// 导入Excel
export function importFareBaseRuleExcel(data) {
  return request({
    url: '/api/product/fare-base-rule/import-export/import',
    method: 'post',
    data: data
  })
}

// 导出excel
export function exportFareBaseRuleExcel(data) {
  return request({
    url: '/api/product/fare-base-rule/import-export/export',
    method: 'get',
    responseType: 'blob',
    params: data
  })
}
