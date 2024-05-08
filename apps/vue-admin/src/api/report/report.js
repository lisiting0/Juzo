import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function issueFetchList(query) {
  return request({
    api: 'finance',
    url: '/manager/report/issue-order',
    method: 'post',
    data: transformListQuery(query)
  })
}

export function changeFetchList(query) {
  return request({
    api: 'finance',
    url: '/manager/report/change-order',
    method: 'post',
    data: transformListQuery(query)
  })
}

export function refundFetchList(query) {
  return request({
    api: 'finance',
    url: '/manager/report/refund-order',
    method: 'post',
    data: transformListQuery(query)
  })
}

export function tradeFetchList(query) {
  return request({
    api: 'finance',
    url: '/manager/report/query-trade',
    method: 'post',
    data: transformListQuery(query)
  })
}

export function issueRefundChangeTotal(query) {
  return request({
    api: 'finance',
    url: '/manager/report/query-financial-total',
    method: 'post',
    data: transformListQuery(query)
  })
}
