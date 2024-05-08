import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'foundation',
    url: '/manager/airport/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 不分页列表
export function airportList(query) {
  return request({
    api: 'foundation',
    url: '/manager/airport/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 修改
export function update(data) {
  return request({
    api: 'foundation',
    url: '/manager/airport/update',
    method: 'put',
    data: data
  })
}

// 新增
export function save(data) {
  return request({
    api: 'foundation',
    url: '/manager/airport/save',
    method: 'post',
    data: data
  })
}

// 删除
export function deleteAirport(id) {
  return request({
    api: 'foundation',
    url: `/manager/airport/delete/${id}`,
    method: 'delete'
  })
}

// 导入Excel
export function importExcel(data) {
  return request({
    api: 'foundation',
    url: '/manager/airport/importExcel',
    method: 'post',
    data: data
  })
}

// 导出excel
export function exportExcel(query) {
  return request({
    api: 'foundation',
    url: '/manager/airport/exportExcel',
    method: 'post',
     responseType: 'blob',
    data: transformListQuery(query)
  })
}
