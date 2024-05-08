import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function insuranceList(query) {
  return request({
    api: 'foundation',
    url: '/agent/insurance/queryList',
    method: 'post',
    data: transformListQuery(query)
  })
}
