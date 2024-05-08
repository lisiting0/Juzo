import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'foundation',
    url: '/manager/insurance/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 修改
export function update(data) {
  return request({
    api: 'foundation',
    url: '/manager/insurance/update',
    method: 'put',
    data: data
  })
}

// 新增
export function save(data) {
  return request({
    api: 'foundation',
    url: '/manager/insurance/save',
    method: 'post',
    data: data
  })
}

// 变更状态
export function updateStatus(data) {
  return request({
    api: 'foundation',
    url: '/manager/insurance/update-status',
    method: 'put',
    data: data
  })
}

// 删除
export function deleteInsurance(id) {
  return request({
    api: 'foundation',
    url: `/manager/insurance/delete/${id}`,
    method: 'delete'
  })
}
