import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'foundation',
    url: '/manager/insurance/distribute/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 手工创单查询可选择的保险列表
export function queryManualCreatePage(data) {
  return request({
    api: 'foundation',
    url: '/manager/insurance/distribute/query-create-list',
    method: 'post',
    data: data
  })
}

// 修改
export function update(data) {
  return request({
    api: 'foundation',
    url: '/manager/insurance/distribute/update',
    method: 'put',
    data: data
  })
}

// 新增
export function save(data) {
  return request({
    api: 'foundation',
    url: '/manager/insurance/distribute/save',
    method: 'post',
    data: data
  })
}

// 删除
export function deleteInsuranceDistribute(id) {
  return request({
    api: 'foundation',
    url: '/manager/insurance/distribute/delete/' + id,
    method: 'delete'
  })
}

  // 查询分销商可分配的保险配置列表
export function queryCanList(query) {
  return request({
    api: 'foundation',
    url: '/manager/insurance/distribute/query-can-list',
    method: 'post',
    data: transformListQuery(query)
  })
}
