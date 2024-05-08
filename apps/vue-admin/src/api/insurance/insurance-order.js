import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'order',
    url: '/manager/order/insurance/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 修改
export function update(data) {
  return request({
    api: 'order',
    url: '/manager/order/insurance/update',
    method: 'put',
    data: data
  })
}

// 手工创单
export function manualCreate(data) {
  return request({
    api: 'order',
    url: '/manager/order/insurance/manual-create',
    method: 'post',
    data: data
  })
}

// 导出
export function exportExcel(data) {
    return request({
      api: 'order',
      url: '/manager/order/insurance/export',
      method: 'post',
      data: data
    })
  }
