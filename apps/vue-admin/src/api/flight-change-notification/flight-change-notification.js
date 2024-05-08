import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    url: '/api/flight/change/input/order/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 修改
export function update(data) {
  return request({
    url: '/api/flight/change/input/order/update',
    method: 'put',
    data: data
  })
}

// 新增
export function save(data) {
  return request({
    url: '/api/flight/change/input/order/save',
    method: 'post',
    data: data
  })
}

// 匹配的乘客
export function queryMappingPassenger(data) {
  return request({
    url: '/api/flight/change/input/order/query-mapping-passenger',
    method: 'post',
    data: data
  })
}

// 确认发布
export function confirmSend(data) {
  return request({
    url: '/api/flight/change/input/order/confirm-send',
    method: 'post',
    data: data
  })
}

// 确认发送
export function queryMatchIssue(id) {
  return request({
    url: `/api/flight/change/input/order/query-match-issue/${id}`,
    method: 'get'
  })
}
