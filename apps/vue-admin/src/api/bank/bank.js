import request from '@/utils/request'

// 列表
export function bankList() {
  return request({
    api: 'foundation',
    url: '/agent/bank/queryList',
    method: 'get'
  })
}
