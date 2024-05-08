import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 采购明细报表
export function purchasesFetchList(data) {
  return request({
    api: 'finance',
    url: '/agent/report/query-trade',
    method: 'post',
    data: transformListQuery(data)
  })
}

// 余额明细报表
export function balanceFetchList(data) {
  return request({
    api: 'finance',
    url: '/agent/report/query-balance',
    method: 'post',
    data: transformListQuery(data)
  })
}

// 月度账单报表
export function monthFetchList(data) {
  return request({
    api: 'finance',
    url: '/agent/report/query-monthly',
    method: 'post',
    data: transformListQuery(data)
  })
}
