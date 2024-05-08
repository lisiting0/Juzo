import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'finance',
    url: '/manager/balance/audit/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 审批通过
export function auditSuccess(data) {
  return request({
    api: 'finance',
    url: '/manager/balance/audit/success',
    method: 'post',
    data: data
  })
}
