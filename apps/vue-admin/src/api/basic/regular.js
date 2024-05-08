import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'foundation',
    url: '/manager/guestRule/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 修改
export function update(data) {
  return request({
    api: 'foundation',
    url: '/manager/guestRule/update',
    method: 'put',
    data: data
  })
}

// 新增
export function save(data) {
  return request({
    api: 'foundation',
    url: '/manager/guestRule/save',
    method: 'post',
    data: data
  })
}

// 删除
export function deleteGuestRule(id) {
  return request({
    api: 'foundation',
    url: `/manager/guestRule/delete/${id}`,
    method: 'delete'
  })
}

// 导入Excel
export function importExcel(data) {
  return request({
    api: 'foundation',
    url: '/manager/guestRule/importExcel',
    method: 'post',
    data: data
  })
}

// 导出excel
export function exportExcel(query) {
  return request({
    api: 'foundation',
    url: '/manager/guestRule/exportExcel',
    method: 'post',
    responseType: 'blob',
    data: transformListQuery(query)
  })
}
