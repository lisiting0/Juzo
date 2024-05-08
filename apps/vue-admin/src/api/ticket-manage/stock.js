import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'order',
    url: '/manager/ticket/prove/stock/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 新增
export function save(data) {
  return request({
    api: 'order',
    url: '/manager/ticket/prove/stock/save',
    method: 'post',
    data: data
  })
}

// 审核
export function audit(id) {
  return request({
    api: 'order',
    url: '/manager/ticket/prove/stock/audit/' + id,
    method: 'put'
  })
}
