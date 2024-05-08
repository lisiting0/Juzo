import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'foundation',
    url: '/manager/flight/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 修改
export function update(data) {
  return request({
    api: 'foundation',
    url: '/manager/flight/update',
    method: 'put',
    data: data
  })
}

// 新增
export function save(data) {
  return request({
    api: 'foundation',
    url: '/manager/flight/save',
    method: 'post',
    data: data
  })
}

// 删除
export function deleteAirline(id) {
  return request({
    api: 'foundation',
    url: `/manager/flight/delete/${id}`,
    method: 'post'
  })
}

// 导入Excel
export function importExcel(data) {
  return request({
    api: 'foundation',
    url: '/manager/flight/importExcel',
    method: 'post',
    data: data
  })
}

// 导出excel
export function exportExcel(query) {
  return request({
    api: 'foundation',
    url: '/manager/flight/exportExcel',
    method: 'post',
    responseType: 'blob',
    data: transformListQuery(query)
  })
}
